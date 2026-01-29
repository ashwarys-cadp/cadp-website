import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Video } from 'lucide-react';
import { Container, Section, SectionHeader, Button, Badge } from '@/components/ui';
import { client, upcomingEventsQuery, type Event } from '@/lib/sanity';
import { formatDate, formatDateShort } from '@/lib/utils';

// Fallback events for when Sanity is not connected
const fallbackEvents = [
  {
    _id: '1',
    title: 'DPDP Act Compliance Conference 2026',
    slug: { current: 'dpdp-conference-2026' },
    description:
      'Join industry leaders and legal experts for a comprehensive exploration of DPDP Act compliance strategies.',
    date: '2026-06-15T09:00:00Z',
    endDate: '2026-06-16T17:00:00Z',
    location: 'KLE Law College, Bengaluru',
    isOnline: false,
    isFeatured: true,
  },
  {
    _id: '2',
    title: 'Webinar: DPDP Implementation Best Practices',
    slug: { current: 'webinar-dpdp-implementation' },
    description:
      'Learn practical strategies for implementing DPDP compliance in your organisation.',
    date: '2026-03-10T14:00:00Z',
    location: 'Online',
    isOnline: true,
    isFeatured: false,
  },
];

async function getEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch<Event[]>(upcomingEventsQuery);
    return events.length > 0 ? events : fallbackEvents as Event[];
  } catch {
    return fallbackEvents as Event[];
  }
}

export async function UpcomingEvents() {
  const events = await getEvents();
  const featuredEvent = events.find((e) => e.isFeatured) || events[0];
  const otherEvents = events.filter((e) => e._id !== featuredEvent?._id).slice(0, 2);

  if (!featuredEvent) return null;

  return (
    <Section background="white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeader
            title="Upcoming Events"
            subtitle="Join us for workshops, conferences, and webinars"
            className="mb-0"
          />
          <Link
            href="/events"
            className="mt-4 md:mt-0 inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
          >
            View all events
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Event */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-xl p-8 text-white h-full">
              <Badge className="bg-accent-500 text-white mb-4">Featured</Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {featuredEvent.title}
              </h3>
              <p className="text-primary-100 mb-6 max-w-xl">
                {featuredEvent.description}
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-primary-100">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {formatDate(featuredEvent.date)}
                    {featuredEvent.endDate &&
                      ` - ${formatDateShort(featuredEvent.endDate)}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-primary-100">
                  {featuredEvent.isOnline ? (
                    <Video className="w-5 h-5" />
                  ) : (
                    <MapPin className="w-5 h-5" />
                  )}
                  <span>{featuredEvent.location}</span>
                </div>
              </div>

              <Button
                href={`/events/${featuredEvent.slug.current}`}
                variant="secondary"
              >
                Learn More & Register
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Other Events */}
          <div className="space-y-4">
            {otherEvents.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event.slug.current}`}
                className="block bg-neutral-50 rounded-xl p-5 hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  {formatDateShort(event.date)}
                </div>
                <h4 className="font-semibold text-neutral-900 mb-1">
                  {event.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  {event.isOnline ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  {event.location}
                </div>
              </Link>
            ))}

            {otherEvents.length === 0 && (
              <div className="bg-neutral-50 rounded-xl p-5 text-center">
                <p className="text-neutral-500">More events coming soon</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
