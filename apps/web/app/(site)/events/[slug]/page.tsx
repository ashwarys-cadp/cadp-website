import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  Calendar,
  MapPin,
  Video,
  ExternalLink,
  User,
  ArrowLeft,
} from 'lucide-react';
import { Container, Section, Button } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { EventJsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  client,
  urlFor,
  eventBySlugQuery,
  allEventsQuery,
  type Event,
} from '@/lib/sanity';
import { formatDate, isUpcoming } from '@/lib/utils';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string): Promise<Event | null> {
  try {
    return await client.fetch<Event>(eventBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const fallback = [
    { slug: 'dpdp-conference-2026' },
    { slug: 'webinar-dpdp-implementation' },
  ];
  try {
    const events = await client.fetch<Event[]>(allEventsQuery);
    if (!events || events.length === 0) {
      return fallback;
    }
    return events.map((event) => ({ slug: event.slug.current }));
  } catch {
    return fallback;
  }
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return { title: 'Event Not Found' };
  }

  return generatePageMetadata({
    title: event.seoTitle || event.title,
    description: event.seoDescription || event.description,
    path: `/events/${event.slug.current}`,
    image: event.featuredImage
      ? urlFor(event.featuredImage).width(1200).height(630).url()
      : undefined,
    keywords: ['DPDP event', 'data protection', event.isOnline ? 'webinar' : 'workshop'],
  });
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const upcoming = isUpcoming(event.date);

  return (
    <>
      <EventJsonLd
        name={event.title}
        description={event.description}
        url={`https://cadp.in/events/${event.slug.current}`}
        startDate={event.date}
        endDate={event.endDate}
        location={event.location}
        isOnline={event.isOnline}
        imageUrl={
          event.featuredImage
            ? urlFor(event.featuredImage).width(1200).height(630).url()
            : undefined
        }
      />

      {/* Header */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Events', href: '/events' },
              { name: event.title, href: `/events/${event.slug.current}` },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                {upcoming ? (
                  <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-green-800 font-semibold bg-green-50 px-2.5 py-1 border border-green-200">
                    Upcoming
                  </span>
                ) : (
                  <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-600 font-semibold bg-neutral-100 px-2.5 py-1 border border-neutral-300">
                    Past Event
                  </span>
                )}
                {event.isOnline && (
                  <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-primary-800 font-semibold bg-primary-50 px-2.5 py-1 border border-primary-200">
                    Online
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                {event.title}
              </h1>

              <p className="text-lg text-neutral-700 mb-8 leading-relaxed font-serif">
                {event.description}
              </p>

              {event.featuredImage && (
                <div className="relative aspect-video border-2 border-neutral-300 overflow-hidden">
                  <Image
                    src={urlFor(event.featuredImage).width(1200).height(675).url()}
                    alt={event.featuredImage.alt || event.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white border-2 border-neutral-300 shadow-sm sticky top-24">
                <div className="h-2 bg-accent-600"></div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="inline-block mb-3">
                      <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Details</div>
                      <div className="h-px w-16 bg-accent-600"></div>
                    </div>
                    <h2 className="text-xl font-serif font-semibold text-neutral-950">
                      Event Information
                    </h2>
                  </div>

                  <div className="space-y-5 mb-6 pb-6 border-b border-neutral-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 border-2 border-primary-900 flex items-center justify-center bg-primary-50 shrink-0">
                        <Calendar className="w-5 h-5 text-primary-900" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-primary-800 font-semibold mb-1">Date</p>
                        <p className="text-neutral-700 font-serif text-sm">
                          {formatDate(event.date)}
                          {event.endDate && (
                            <>
                              <br />
                              to {formatDate(event.endDate)}
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 border-2 border-primary-900 flex items-center justify-center bg-primary-50 shrink-0">
                        {event.isOnline ? (
                          <Video className="w-5 h-5 text-primary-900" strokeWidth={1.5} />
                        ) : (
                          <MapPin className="w-5 h-5 text-primary-900" strokeWidth={1.5} />
                        )}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-primary-800 font-semibold mb-1">
                          {event.isOnline ? 'Format' : 'Location'}
                        </p>
                        <p className="text-neutral-700 font-serif text-sm">{event.location}</p>
                      </div>
                    </div>
                  </div>

                  {upcoming && event.registrationUrl && (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-5 py-3 bg-primary-950 text-white font-semibold hover:bg-primary-900 transition-colors font-serif border-2 border-primary-950"
                    >
                      Register Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}

                  {!upcoming && (
                    <p className="text-neutral-500 text-sm text-center font-serif">
                      This event has ended.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Speakers */}
      {event.speakers && event.speakers.length > 0 && (
        <Section background="gray">
          <Container>
            <div className="mb-12">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Featured Speakers</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-950">Speakers</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {event.speakers.map((speaker) => (
                <div key={speaker._id} className="bg-white border-2 border-neutral-300 shadow-sm text-center">
                  <div className="h-1.5 bg-accent-600"></div>
                  <div className="p-6">
                    <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden bg-neutral-100 border-2 border-neutral-300">
                      {speaker.image ? (
                        <Image
                          src={urlFor(speaker.image).width(160).height(160).url()}
                          alt={speaker.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-8 h-8 text-neutral-400" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-sm text-primary-800 font-semibold uppercase tracking-wide mb-3">
                      {speaker.role}
                    </p>
                    {speaker.bio && (
                      <p className="text-sm text-neutral-700 leading-relaxed font-serif">{speaker.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Back to Events */}
      <Section background="white">
        <Container>
          <div className="flex justify-center">
            <Button href="/events/" variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Events
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
