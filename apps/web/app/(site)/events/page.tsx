import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, Video, ArrowRight, ExternalLink } from 'lucide-react';
import { Container, Section, Button } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, allEventsQuery, type Event } from '@/lib/sanity';
import { formatDate, formatDateShort, isUpcoming } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'Events',
  description:
    'Upcoming and past workshops, conferences, and webinars on DPDP Act compliance and data protection hosted by the Centre for Applied Data Protection.',
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
      <Section background="white">
        <Container>
          <Breadcrumbs items={[{ name: 'Events', href: '/events' }]} />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Workshops & Conferences</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Events
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                Join us for workshops, conferences, and webinars on DPDP Act
                compliance and data protection.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Event */}
      {featuredEvent && (
        <Section background="gray">
          <Container>
            <div className="border-4 border-primary-950 bg-primary-950 p-8 md:p-12 shadow-xl relative">
              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent-600 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent-600 opacity-20"></div>

              <div className="relative z-10">
                {/* Featured Badge */}
                <div className="inline-block mb-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">Featured Event</div>
                  <div className="h-px w-24 bg-accent-600"></div>
                </div>

                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">
                  {featuredEvent.title}
                </h2>
                <p className="text-primary-100 text-lg mb-8 max-w-2xl leading-relaxed font-serif">
                  {featuredEvent.description}
                </p>

                <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-primary-800">
                  <div className="flex items-center gap-3 text-primary-100">
                    <div className="w-10 h-10 border-2 border-accent-600 flex items-center justify-center bg-accent-600/20">
                      <Calendar className="w-5 h-5 text-accent-400" strokeWidth={1.5} />
                    </div>
                    <span className="font-serif">
                      {formatDate(featuredEvent.date)}
                      {featuredEvent.endDate &&
                        ` - ${formatDateShort(featuredEvent.endDate)}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-100">
                    <div className="w-10 h-10 border-2 border-accent-600 flex items-center justify-center bg-accent-600/20">
                      {featuredEvent.isOnline ? (
                        <Video className="w-5 h-5 text-accent-400" strokeWidth={1.5} />
                      ) : (
                        <MapPin className="w-5 h-5 text-accent-400" strokeWidth={1.5} />
                      )}
                    </div>
                    <span className="font-serif">{featuredEvent.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href={`/events/${featuredEvent.slug.current}`} variant="secondary" size="lg">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  {featuredEvent.registrationUrl && (
                    <a
                      href={featuredEvent.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-primary-950 transition-colors font-serif"
                    >
                      Register Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 1 && (
        <Section background="white">
          <Container>
            <div className="mb-12">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Coming Soon</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-2">Upcoming Events</h2>
              <p className="text-neutral-600 font-serif">Mark your calendar for these upcoming sessions</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents
                .filter((e) => e._id !== featuredEvent?._id)
                .map((event) => (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug.current}`}
                    className="group block bg-white border-2 border-neutral-300 hover:border-primary-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    {/* Top accent bar */}
                    <div className="h-1.5 bg-primary-600 group-hover:bg-primary-800 transition-colors"></div>

                    <div className="p-6">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                        <div className="w-8 h-8 border border-neutral-300 flex items-center justify-center bg-neutral-50">
                          <Calendar className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <span className="font-serif">{formatDateShort(event.date)}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3 leading-tight group-hover:text-primary-900 transition-colors">
                        {event.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm text-neutral-600 pt-4 border-t border-neutral-200">
                        {event.isOnline ? (
                          <Video className="w-4 h-4" strokeWidth={1.5} />
                        ) : (
                          <MapPin className="w-4 h-4" strokeWidth={1.5} />
                        )}
                        <span className="font-serif">{event.location}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <Section background="gray">
          <Container>
            <div className="mb-12">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Archive</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-2">Past Events</h2>
              <p className="text-neutral-600 font-serif">Browse recordings and materials from previous sessions</p>
            </div>

            <div className="space-y-4">
              {pastEvents.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event.slug.current}`}
                  className="block group bg-white border-2 border-neutral-300 hover:border-neutral-400 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {/* Subtle accent bar for past events */}
                  <div className="h-1 bg-neutral-300 group-hover:bg-neutral-400 transition-colors"></div>

                  <div className="p-6 flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-neutral-500 font-serif">
                          {formatDateShort(event.date)}
                        </span>
                        <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-600 font-semibold bg-neutral-100 px-2 py-1 border border-neutral-300">
                          Past
                        </span>
                      </div>
                      <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2 group-hover:text-neutral-900 transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        {event.isOnline ? (
                          <Video className="w-4 h-4" strokeWidth={1.5} />
                        ) : (
                          <MapPin className="w-4 h-4" strokeWidth={1.5} />
                        )}
                        <span className="font-serif">{event.location}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 border-2 border-neutral-300 group-hover:border-neutral-400 flex items-center justify-center transition-all">
                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section background="white">
        <Container size="narrow">
          <div className="border-4 border-primary-950 bg-primary-950 p-10 md:p-14 shadow-xl relative">
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent-600 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent-600 opacity-20"></div>

            <div className="text-center relative z-10">
              {/* Academic header */}
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">Partnership Opportunities</div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">
                Want to Host an Event?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Partner with us to bring DPDP training and awareness to your
                organisation or community.
              </p>

              <Button href="/contact/" variant="secondary" size="lg">
                Get in Touch
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
