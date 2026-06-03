import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  ExternalLink,
  User,
  Ticket,
  Download,
  HelpCircle,
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
  type Speaker,
  type Sponsor,
} from '@/lib/sanity';
import { formatDate, isUpcoming } from '@/lib/utils';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

// ---- Rendering config ----

const SESSION_FORMAT_LABELS: Record<string, string> = {
  inauguration: 'Inauguration',
  keynote: 'Keynote',
  panel: 'Panel',
  workshop: 'Workshop',
  discussion: 'Discussion',
  networking: 'Networking',
  break: 'Break',
  valedictory: 'Valedictory',
  other: 'Session',
};

// Sponsor tiers in display order.
const SPONSOR_TIERS: { value: NonNullable<Sponsor['tier']>; label: string }[] = [
  { value: 'knowledge-partner', label: 'Knowledge Partners' },
  { value: 'associate', label: 'Associate Sponsors' },
  { value: 'exhibitor', label: 'Exhibitors' },
  { value: 'other', label: 'Partners' },
];

const speakerSubtitle = (s: Speaker) =>
  [s.title, s.organization].filter(Boolean).join(', ');

const portableTextComponents = {
  marks: {
    link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => {
      const href = value?.href || '#';
      return (
        <a
          href={href}
          className="text-primary-700 underline hover:text-primary-900"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-serif font-semibold text-neutral-950 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-serif font-semibold text-neutral-950 mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-neutral-700 leading-relaxed font-serif mb-4">{children}</p>
    ),
  },
};

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
    keywords: [
      'DPDP event',
      'data protection',
      event.eventType || (event.isOnline ? 'webinar' : 'workshop'),
    ],
  });
}

// ---- Reusable section heading ----
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12">
      <div className="inline-block mb-4">
        <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
          {eyebrow}
        </div>
        <div className="h-px w-20 bg-accent-600"></div>
      </div>
      <h2 className="text-3xl md:text-4xl font-serif text-neutral-950">{title}</h2>
    </div>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const subtitle = speakerSubtitle(speaker);
  return (
    <div className="bg-white border-2 border-neutral-300 shadow-sm text-center">
      <div className="h-1.5 bg-accent-600"></div>
      <div className="p-6">
        <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden bg-neutral-100 border-2 border-neutral-300">
          {speaker.headshot ? (
            <Image
              src={urlFor(speaker.headshot).width(160).height(160).url()}
              alt={speaker.headshot.alt || speaker.name}
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
        {subtitle && (
          <p className="text-sm text-primary-800 font-semibold uppercase tracking-wide mb-3">
            {subtitle}
          </p>
        )}
        {speaker.bio && (
          <p className="text-sm text-neutral-700 leading-relaxed font-serif">{speaker.bio}</p>
        )}
        {speaker.linkedIn && (
          <a
            href={speaker.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs uppercase tracking-wide text-primary-700 hover:text-primary-900 font-semibold"
          >
            <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const upcoming = isUpcoming(event.date);
  const sponsorsByTier = SPONSOR_TIERS.map((tier) => ({
    ...tier,
    items: (event.sponsors || []).filter((s) => (s.tier || 'other') === tier.value),
  })).filter((group) => group.items.length > 0);

  const hasGallery = event.gallery && event.gallery.length > 0;
  const hasPostEvent =
    !upcoming && (hasGallery || event.recordingsUrl || (event.resources && event.resources.length > 0));

  return (
    <>
      <EventJsonLd
        name={event.title}
        description={event.description}
        url={`https://cadp.in/events/${event.slug.current}`}
        startDate={event.date}
        endDate={event.endDate}
        location={event.venue?.name || event.location}
        isOnline={event.isOnline}
        organizer={event.organisedBy}
        offers={event.ticketTiers}
        performers={event.speakers}
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
                {event.eventType && (
                  <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-accent-800 font-semibold bg-accent-50 px-2.5 py-1 border border-accent-200">
                    {event.eventType}
                  </span>
                )}
                {event.isOnline && (
                  <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-primary-800 font-semibold bg-primary-50 px-2.5 py-1 border border-primary-200">
                    Online
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-950 mb-4 leading-tight">
                {event.title}
              </h1>

              {event.theme && (
                <p className="text-xl text-primary-800 italic font-serif mb-6">{event.theme}</p>
              )}

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
                        <p className="text-neutral-700 font-serif text-sm">
                          {event.venue?.name || event.location}
                        </p>
                      </div>
                    </div>

                    {event.registrationDeadline && upcoming && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 border-2 border-primary-900 flex items-center justify-center bg-primary-50 shrink-0">
                          <Clock className="w-5 h-5 text-primary-900" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.15em] text-primary-800 font-semibold mb-1">
                            Registration Closes
                          </p>
                          <p className="text-neutral-700 font-serif text-sm">
                            {formatDate(event.registrationDeadline)}
                          </p>
                        </div>
                      </div>
                    )}

                    {event.ticketTiers && event.ticketTiers.length > 0 && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 border-2 border-primary-900 flex items-center justify-center bg-primary-50 shrink-0">
                          <Ticket className="w-5 h-5 text-primary-900" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.15em] text-primary-800 font-semibold mb-1">
                            Fees
                          </p>
                          <p className="text-neutral-700 font-serif text-sm">
                            {event.ticketTiers
                              .map((t) => [t.name, t.price].filter(Boolean).join(': '))
                              .join(' · ')}
                          </p>
                        </div>
                      </div>
                    )}
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

      {/* Overview */}
      {event.overview && event.overview.length > 0 && (
        <Section background="white">
          <Container size="narrow">
            <SectionHeading eyebrow="About" title="Overview" />
            <div className="max-w-none">
              <PortableText value={event.overview} components={portableTextComponents} />
            </div>
            {event.whoShouldAttend && event.whoShouldAttend.length > 0 && (
              <div className="mt-10 bg-primary-50 border-2 border-primary-200 p-6">
                <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-4">
                  Who Should Attend
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {event.whoShouldAttend.map((who, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-700 font-serif text-sm">
                      <span className="text-accent-600 mt-1">▸</span>
                      {who}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* Agenda */}
      {event.agenda && event.agenda.length > 0 && (
        <Section background="gray">
          <Container>
            <SectionHeading eyebrow="Programme" title="Agenda" />
            <div className="space-y-12">
              {event.agenda.map((day, di) => (
                <div key={di}>
                  <div className="flex items-baseline gap-4 mb-6 pb-3 border-b-2 border-neutral-300">
                    <h3 className="text-2xl font-serif font-semibold text-neutral-950">
                      {day.label || `Day ${di + 1}`}
                    </h3>
                    {day.date && (
                      <span className="text-sm text-neutral-600 font-serif">
                        {formatDate(day.date)}
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {(day.sessions || []).map((session, si) => {
                      const isBreak = session.format === 'break';
                      const time = [session.startTime, session.endTime].filter(Boolean).join(' – ');
                      return (
                        <div
                          key={si}
                          className={`grid sm:grid-cols-[140px_1fr] gap-4 p-4 border-2 ${
                            isBreak
                              ? 'border-neutral-200 bg-neutral-100/60'
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          <div className="text-sm text-neutral-600 font-serif">
                            {time && (
                              <span className="inline-flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" /> {time}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              {session.format && session.format !== 'other' && (
                                <span
                                  className={`text-[0.625rem] uppercase tracking-[0.15em] font-semibold px-2 py-0.5 border ${
                                    isBreak
                                      ? 'text-neutral-500 border-neutral-300 bg-neutral-100'
                                      : 'text-accent-800 border-accent-200 bg-accent-50'
                                  }`}
                                >
                                  {SESSION_FORMAT_LABELS[session.format] || session.format}
                                </span>
                              )}
                              {session.room && (
                                <span className="text-xs text-neutral-500 font-serif">
                                  {session.room}
                                </span>
                              )}
                            </div>
                            <p
                              className={`font-serif ${
                                isBreak
                                  ? 'text-neutral-600 text-sm'
                                  : 'text-neutral-950 font-semibold'
                              }`}
                            >
                              {session.title}
                            </p>
                            {session.description && (
                              <p className="text-sm text-neutral-700 font-serif mt-1 leading-relaxed">
                                {session.description}
                              </p>
                            )}
                            {session.speakers && session.speakers.length > 0 && (
                              <p className="text-sm text-primary-800 font-serif mt-2">
                                {session.speakers
                                  .map((s) => {
                                    const sub = speakerSubtitle(s);
                                    return sub ? `${s.name} (${sub})` : s.name;
                                  })
                                  .join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Speakers */}
      {event.speakers && event.speakers.length > 0 && (
        <Section background="white">
          <Container>
            <SectionHeading eyebrow="Featured Speakers" title="Speakers" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {event.speakers.map((speaker, i) => (
                <SpeakerCard key={speaker._id || i} speaker={speaker} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Registration / Ticket tiers */}
      {event.ticketTiers && event.ticketTiers.length > 0 && (
        <Section background="gray">
          <Container>
            <SectionHeading eyebrow="Attend" title="Registration" />
            {event.registrationNote && (
              <p className="text-neutral-700 font-serif mb-8 max-w-2xl">{event.registrationNote}</p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {event.ticketTiers.map((tier, i) => (
                <div key={i} className="bg-white border-2 border-neutral-300 shadow-sm">
                  <div className="h-1.5 bg-accent-600"></div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2">
                      {tier.name}
                    </h3>
                    {tier.price && (
                      <p className="text-2xl font-serif text-primary-900 mb-3">{tier.price}</p>
                    )}
                    {tier.includes && (
                      <p className="text-sm text-neutral-700 font-serif leading-relaxed whitespace-pre-line">
                        {tier.includes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {upcoming && event.registrationUrl && (
              <div className="mt-10">
                <Button href={event.registrationUrl} variant="primary">
                  Register Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* Sponsors */}
      {sponsorsByTier.length > 0 && (
        <Section background="white">
          <Container>
            <SectionHeading eyebrow="Supported By" title="Sponsors & Partners" />
            <div className="space-y-10">
              {sponsorsByTier.map((group) => (
                <div key={group.value}>
                  <h3 className="text-sm uppercase tracking-[0.15em] text-primary-800 font-semibold mb-4">
                    {group.label}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.items.map((sponsor, i) => {
                      const inner = (
                        <>
                          {sponsor.logo ? (
                            <div className="relative h-16 mb-3">
                              <Image
                                src={urlFor(sponsor.logo).height(120).url()}
                                alt={sponsor.logo.alt || sponsor.name}
                                fill
                                className="object-contain object-left"
                              />
                            </div>
                          ) : (
                            <h4 className="text-lg font-serif font-semibold text-neutral-950 mb-2">
                              {sponsor.name}
                            </h4>
                          )}
                          {sponsor.blurb && (
                            <p className="text-sm text-neutral-700 font-serif leading-relaxed">
                              {sponsor.blurb}
                            </p>
                          )}
                        </>
                      );
                      return sponsor.url ? (
                        <a
                          key={i}
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-white border-2 border-neutral-300 p-6 hover:border-primary-400 transition-colors"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div key={i} className="bg-white border-2 border-neutral-300 p-6">
                          {inner}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Venue */}
      {event.venue && (event.venue.name || event.venue.address) && (
        <Section background="gray">
          <Container size="narrow">
            <SectionHeading eyebrow="Getting There" title="Venue" />
            <div className="bg-white border-2 border-neutral-300 p-6">
              {event.venue.name && (
                <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2">
                  {event.venue.name}
                </h3>
              )}
              {event.venue.address && (
                <p className="text-neutral-700 font-serif whitespace-pre-line mb-2">
                  {event.venue.address}
                </p>
              )}
              {event.venue.directions && (
                <p className="text-sm text-neutral-600 font-serif whitespace-pre-line mb-4">
                  {event.venue.directions}
                </p>
              )}
              {event.venue.mapUrl && (
                <a
                  href={event.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary-700 hover:text-primary-900 font-semibold"
                >
                  <MapPin className="w-4 h-4" /> View on map
                </a>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* FAQs */}
      {event.faqs && event.faqs.length > 0 && (
        <Section background="white">
          <Container size="narrow">
            <SectionHeading eyebrow="Questions" title="FAQs" />
            <div className="space-y-4">
              {event.faqs.map((faq, i) => (
                <details key={i} className="group border-2 border-neutral-300 bg-white">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                    <span className="font-serif font-semibold text-neutral-950 flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-accent-600 shrink-0 mt-0.5" />
                      {faq.question}
                    </span>
                    <span className="text-accent-600 text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  {faq.answer && (
                    <p className="px-5 pb-5 pl-12 text-neutral-700 font-serif leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </details>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Downloads */}
      {event.downloads && event.downloads.length > 0 && (
        <Section background="gray">
          <Container size="narrow">
            <SectionHeading eyebrow="Materials" title="Downloads" />
            <div className="grid sm:grid-cols-2 gap-4">
              {event.downloads
                .filter((d) => d.url)
                .map((d, i) => (
                  <a
                    key={i}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white border-2 border-neutral-300 p-5 hover:border-primary-400 transition-colors"
                  >
                    <Download className="w-5 h-5 text-primary-800 shrink-0" />
                    <span className="font-serif text-neutral-950">{d.title || 'Download'}</span>
                  </a>
                ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Post-event resources */}
      {hasPostEvent && (
        <Section background="white">
          <Container>
            <SectionHeading eyebrow="After the Event" title="Highlights & Resources" />
            {hasGallery && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {event.gallery!.map((img, i) => (
                  <div key={i} className="relative aspect-video border-2 border-neutral-300 overflow-hidden">
                    <Image
                      src={urlFor(img).width(600).height(338).url()}
                      alt={img.alt || `${event.title} photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-4">
              {event.recordingsUrl && (
                <Button href={event.recordingsUrl} variant="outline">
                  <Video className="w-4 h-4 mr-2" /> Watch Recordings
                </Button>
              )}
              {(event.resources || [])
                .map((r) => ({ ...r, link: r.url || r.fileUrl }))
                .filter((r) => r.link)
                .map((r, i) => (
                  <Button key={i} href={r.link!} variant="outline">
                    <Download className="w-4 h-4 mr-2" /> {r.title || 'Resource'}
                  </Button>
                ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Back to Events */}
      <Section background="gray">
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
