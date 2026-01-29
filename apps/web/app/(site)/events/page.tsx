import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Video, ArrowRight, ExternalLink } from 'lucide-react';
import { Container, Section, SectionHeader, Button, Card, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, urlFor, allEventsQuery, type Event } from '@/lib/sanity';
import { formatDate, formatDateShort, isUpcoming } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'Events',
  description:
    'Join CADP\'s workshops, conferences, and webinars on DPDP Act compliance and data protection.',
  path: '/events',
  keywords: ['DPDP events', 'data protection workshops', 'compliance conferences'],
});

// Fallback events
const fallbackEvents: Event[] = [
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
    const events = await client.fetch<Event[]>(allEventsQuery);
    return events.length > 0 ? events : fallbackEvents;
  } catch {
    return fallbackEvents;
  }
}

export default async function EventsPage() {
  const allEvents = await getEvents();
  const upcomingEvents = allEvents.filter((e) => isUpcoming(e.date));
  const pastEvents = allEvents.filter((e) => !isUpcoming(e.date));
  const featuredEvent = upcomingEvents.find((e) => e.isFeatured) || upcomingEvents[0];

  return (
    <>
      {/* Hero */}
      <Section background="gray">
        <Container>
          <Breadcrumbs items={[{ name: 'Events', href: '/events' }]} />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Events
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Join us for workshops, conferences, and webinars on DPDP Act
              compliance and data protection.
            </p>
          </div>
        </Container>
      </Section>

      {/* Featured Event */}
      {featuredEvent && (
        <Section background="white">
          <Container>
            <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-2xl p-8 md:p-12 text-white">
              <Badge className="bg-accent-500 text-white mb-4">
                Featured Event
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {featuredEvent.title}
              </h2>
              <p className="text-primary-100 text-lg mb-6 max-w-2xl">
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

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href={`/events/${featuredEvent.slug.current}`} variant="secondary">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                {featuredEvent.registrationUrl && (
                  <a
                    href={featuredEvent.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 1 && (
        <Section background="gray">
          <Container>
            <SectionHeader
              title="Upcoming Events"
              subtitle="Mark your calendar for these upcoming sessions"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents
                .filter((e) => e._id !== featuredEvent?._id)
                .map((event) => (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug.current}`}
                    className="group"
                  >
                    <Card hover className="h-full">
                      {event.featuredImage ? (
                        <div className="relative aspect-video">
                          <Image
                            src={urlFor(event.featuredImage).width(600).height(340).url()}
                            alt={event.featuredImage.alt || event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-primary-300" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDateShort(event.date)}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-neutral-500">
                          {event.isOnline ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <Section background="white">
          <Container>
            <SectionHeader
              title="Past Events"
              subtitle="Browse recordings and materials from previous sessions"
            />

            <div className="space-y-4">
              {pastEvents.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event.slug.current}`}
                  className="block group"
                >
                  <Card hover className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm text-neutral-500">
                            {formatDateShort(event.date)}
                          </span>
                          <Badge variant="default">Past</Badge>
                        </div>
                        <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
                          {event.isOnline ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section background="primary">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to Host an Event?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Partner with us to bring DPDP training and awareness to your
              organisation or community.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Get in Touch
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
