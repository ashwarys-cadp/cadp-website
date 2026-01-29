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
    <Section background="gray">
      <Container>
        {/* Academic section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="inline-block mb-4">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Academic Events
              </div>
              <div className="h-px w-20 bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-3">
              Upcoming Events
            </h2>
            <p className="text-neutral-600 leading-relaxed font-serif">
              Workshops, conferences, and scholarly discussions
            </p>
          </div>
          <Link
            href="/events"
            className="mt-6 md:mt-0 inline-flex items-center text-primary-900 font-serif font-semibold hover:text-primary-700 border-b-2 border-primary-300 hover:border-primary-700 pb-1 transition-all"
          >
            View All Events
            <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2.5} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Event */}
          <div className="lg:col-span-2">
            <div className="bg-primary-950 border-4 border-accent-600 p-10 text-white h-full shadow-lg relative">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent-600 opacity-20"></div>

              <div className="relative z-10">
                <div className="inline-block bg-accent-600 text-white px-4 py-1.5 mb-6 font-serif font-semibold text-sm tracking-wide">
                  Featured Event
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-5 text-white leading-tight">
                  {featuredEvent.title}
                </h3>
                <p className="text-primary-100 mb-8 max-w-2xl font-serif text-[1.0625rem] leading-relaxed">
                  {featuredEvent.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-5 mb-10 pb-8 border-b-2 border-primary-800">
                  <div className="flex items-center gap-3 text-primary-100 font-serif">
                    <Calendar className="w-5 h-5 text-accent-500" strokeWidth={1.5} />
                    <span>
                      {formatDate(featuredEvent.date)}
                      {featuredEvent.endDate &&
                        ` - ${formatDateShort(featuredEvent.endDate)}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-100 font-serif">
                    {featuredEvent.isOnline ? (
                      <Video className="w-5 h-5 text-accent-500" strokeWidth={1.5} />
                    ) : (
                      <MapPin className="w-5 h-5 text-accent-500" strokeWidth={1.5} />
                    )}
                    <span>{featuredEvent.location}</span>
                  </div>
                </div>

                <Button
                  href={`/events/${featuredEvent.slug.current}`}
                  variant="secondary"
                  size="lg"
                >
                  Learn More & Register
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Other Events */}
          <div className="space-y-5">
            {otherEvents.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event.slug.current}`}
                className="block bg-white p-6 border-2 border-neutral-300 hover:border-primary-700 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3 font-serif">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  {formatDateShort(event.date)}
                </div>
                <h4 className="font-serif font-semibold text-neutral-950 mb-3 text-lg leading-snug">
                  {event.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-neutral-600 font-serif">
                  {event.isOnline ? (
                    <Video className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                  )}
                  {event.location}
                </div>
              </Link>
            ))}

            {otherEvents.length === 0 && (
              <div className="bg-white p-6 border-2 border-neutral-300 text-center">
                <p className="text-neutral-600 font-serif italic">Additional events to be announced</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
