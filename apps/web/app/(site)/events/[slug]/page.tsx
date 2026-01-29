import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Video,
  ExternalLink,
  User,
  ArrowLeft,
} from 'lucide-react';
import { Container, Section, Button, Card, Badge } from '@/components/ui';
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
  try {
    const events = await client.fetch<Event[]>(allEventsQuery);
    return events.map((event) => ({ slug: event.slug.current }));
  } catch {
    return [
      { slug: 'dpdp-conference-2026' },
      { slug: 'webinar-dpdp-implementation' },
    ];
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
      <Section background="gray">
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
              <div className="flex items-center gap-3 mb-4">
                {upcoming ? (
                  <Badge variant="success">Upcoming</Badge>
                ) : (
                  <Badge variant="default">Past Event</Badge>
                )}
                {event.isOnline && <Badge variant="primary">Online</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 text-balance">
                {event.title}
              </h1>

              <p className="text-lg text-neutral-600 mb-6">
                {event.description}
              </p>

              {event.featuredImage && (
                <div className="relative aspect-video rounded-xl overflow-hidden">
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
              <Card hover={false} className="p-6 sticky top-24">
                <h2 className="font-semibold text-neutral-900 mb-4">
                  Event Details
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-neutral-900">Date</p>
                      <p className="text-neutral-600">
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
                    {event.isOnline ? (
                      <Video className="w-5 h-5 text-primary-600 mt-0.5" />
                    ) : (
                      <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">
                        {event.isOnline ? 'Format' : 'Location'}
                      </p>
                      <p className="text-neutral-600">{event.location}</p>
                    </div>
                  </div>
                </div>

                {upcoming && event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-5 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}

                {!upcoming && (
                  <p className="text-neutral-500 text-sm text-center">
                    This event has ended.
                  </p>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Speakers */}
      {event.speakers && event.speakers.length > 0 && (
        <Section background="white">
          <Container>
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">
              Speakers
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {event.speakers.map((speaker) => (
                <Card key={speaker._id} hover={false} className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 relative rounded-full overflow-hidden bg-neutral-100">
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
                  <h3 className="font-semibold text-neutral-900">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-primary-600">{speaker.role}</p>
                  {speaker.bio && (
                    <p className="text-sm text-neutral-600 mt-2">{speaker.bio}</p>
                  )}
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Back to Events */}
      <Section background="gray">
        <Container>
          <div className="flex justify-center">
            <Button href="/events" variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Events
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
