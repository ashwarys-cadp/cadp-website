import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import {
  Calendar,
  MapPin,
  ExternalLink,
  User,
  Download,
  Video,
  ArrowLeft,
} from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { EventJsonLd } from '@/components/seo/JsonLd';
import { EventNav, type EventNavItem } from '@/components/events/EventNav';
import { EventAgenda } from '@/components/events/EventAgenda';
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
import { formatDate, formatDateShort, isUpcoming } from '@/lib/utils';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

const SPONSOR_TIERS: { value: NonNullable<Sponsor['tier']>; label: string }[] = [
  { value: 'knowledge-partner', label: 'Knowledge Partners' },
  { value: 'associate', label: 'Associate Sponsors' },
  { value: 'exhibitor', label: 'Exhibitors' },
  { value: 'other', label: 'Partners' },
];

const EVENT_TYPE_LABELS: Record<string, string> = {
  webinar: 'Webinar',
  workshop: 'Workshop',
  conference: 'Conference',
};

function formatDateRange(start: string, end?: string) {
  if (!end) return formatDate(start);
  const s = new Date(start);
  const e = new Date(end);
  const sameMonth =
    s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    const month = s.toLocaleDateString('en-IN', { month: 'long' });
    return `${s.getDate()}–${e.getDate()} ${month} ${e.getFullYear()}`;
  }
  return `${formatDateShort(start)} – ${formatDateShort(end)}`;
}

const portableTextComponents = {
  marks: {
    link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => {
      const href = value?.href || '#';
      return (
        <a
          href={href}
          className="text-primary-700 underline decoration-accent-400 underline-offset-2 hover:text-primary-900"
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
      <h2 className="text-xl md:text-2xl font-serif font-semibold text-neutral-950 mt-9 mb-3 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg font-serif font-semibold text-neutral-950 mt-7 mb-2">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[1.0625rem] text-neutral-700 leading-[1.8] font-serif mb-5">{children}</p>
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

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
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

// ---- Shared bits ----

function EyebrowPill({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 border px-3 py-1.5 ${
        dark ? 'border-white/25 bg-white/5' : 'border-neutral-300 bg-white'
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
      <span
        className={`text-[0.625rem] uppercase tracking-[0.22em] font-semibold ${
          dark ? 'text-neutral-200' : 'text-primary-900'
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? 'text-center flex flex-col items-center' : ''}`}>
      <EyebrowPill>{eyebrow}</EyebrowPill>
      <h2 className="mt-5 text-3xl md:text-4xl font-serif font-semibold text-neutral-950 leading-tight">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-lg text-neutral-600 font-serif leading-relaxed max-w-2xl">{intro}</p>
      )}
    </div>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-primary-100 to-primary-50 border-2 border-neutral-200 border-b-0">
        {speaker.headshot ? (
          <Image
            src={urlFor(speaker.headshot).width(480).height(600).url()}
            alt={speaker.headshot.alt || speaker.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-12 h-12 text-primary-300" strokeWidth={1.25} />
          </div>
        )}
      </div>
      <div className="bg-white border-2 border-neutral-200 p-5">
        <div className="h-0.5 w-10 bg-accent-600 mb-3" />
        <h3 className="font-serif font-semibold text-lg text-neutral-950 leading-snug">
          {speaker.name}
        </h3>
        {speaker.title && (
          <p className="text-sm text-neutral-500 font-serif mt-1 leading-snug">{speaker.title}</p>
        )}
        {speaker.organization && (
          <p className="text-sm text-primary-900 font-serif font-semibold mt-1">
            {speaker.organization}
          </p>
        )}
        {speaker.linkedIn && (
          <a
            href={speaker.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-[0.6875rem] uppercase tracking-[0.15em] text-primary-700 hover:text-primary-900 font-semibold"
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
  const typeLabel = event.eventType ? EVENT_TYPE_LABELS[event.eventType] : null;
  const dateRange = formatDateRange(event.date, event.endDate);
  const venueLabel = event.isOnline ? 'Online' : event.venue?.name || event.location;

  const sponsorsByTier = SPONSOR_TIERS.map((tier) => ({
    ...tier,
    items: (event.sponsors || []).filter((s) => (s.tier || 'other') === tier.value),
  })).filter((group) => group.items.length > 0);

  const hasOverview =
    (event.overview && event.overview.length > 0) ||
    (event.whoShouldAttend && event.whoShouldAttend.length > 0);
  const hasAgenda = !!event.agenda && event.agenda.length > 0;
  const hasSpeakers = !!event.speakers && event.speakers.length > 0;
  const hasRegisterInterest = upcoming && !!event.registerInterestUrl && !event.registrationUrl;
  const hasRegistration =
    (!!event.ticketTiers && event.ticketTiers.length > 0) ||
    (upcoming && !!event.registrationUrl);
  const hasVenue = !!event.venue && !!(event.venue.name || event.venue.address);
  const hasFaqs = !!event.faqs && event.faqs.length > 0;
  const hasDownloads = !!event.downloads && event.downloads.some((d) => d.url);
  const hasGallery = !!event.gallery && event.gallery.length > 0;
  const hasPostEvent =
    !upcoming &&
    (hasGallery || !!event.recordingsUrl || (!!event.resources && event.resources.length > 0));

  const navItems: EventNavItem[] = [
    hasOverview && { id: 'overview', label: 'About' },
    hasAgenda && { id: 'agenda', label: 'Programme' },
    hasSpeakers && { id: 'speakers', label: 'Speakers' },
    hasRegisterInterest && { id: 'register-interest', label: 'Register Interest' },
    hasRegistration && { id: 'register', label: 'Register' },
    sponsorsByTier.length > 0 && { id: 'sponsors', label: 'Partners' },
    hasVenue && { id: 'venue', label: 'Venue' },
    hasFaqs && { id: 'faq', label: 'FAQ' },
    hasPostEvent && { id: 'highlights', label: 'Highlights' },
  ].filter(Boolean) as EventNavItem[];

  const heroImage = event.featuredImage
    ? urlFor(event.featuredImage).width(2000).height(1100).url()
    : null;

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
        imageUrl={heroImage || undefined}
      />

      {/* Breadcrumb strip */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="wide" className="py-3">
          <Breadcrumbs
            items={[
              { name: 'Events', href: '/events' },
              { name: event.title, href: `/events/${event.slug.current}` },
            ]}
          />
        </Container>
      </div>

      {/* ============ Hero (dark, center-aligned) ============ */}
      <section className="relative bg-primary-950 text-white overflow-hidden">
        {heroImage ? (
          <>
            <Image src={heroImage} alt={event.featuredImage?.alt || event.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/90 to-primary-950/55" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '52px 52px',
              }}
            />
            <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-accent-600/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-20 w-[26rem] h-[26rem] rounded-full bg-primary-700/40 blur-3xl" />
          </>
        )}
        {/* top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-600 via-accent-400 to-accent-600" />

        <Container size="wide" className="relative">
          <div className="py-20 md:py-28 text-center flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center gap-2.5 mb-6">
              <EyebrowPill dark>{typeLabel || 'Event'}</EyebrowPill>
              <span
                className={`text-[0.625rem] uppercase tracking-[0.18em] font-semibold px-2.5 py-1.5 border ${
                  upcoming
                    ? 'text-green-300 border-green-400/40 bg-green-400/10'
                    : 'text-neutral-300 border-white/20 bg-white/5'
                }`}
              >
                {upcoming ? 'Upcoming' : 'Past Event'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.08] text-white text-balance max-w-4xl">
              {event.title}
            </h1>

            {event.theme && (
              <p className="mt-5 text-xl md:text-2xl text-accent-300 italic font-serif leading-snug max-w-2xl">
                {event.theme}
              </p>
            )}

            <p className="mt-6 text-lg text-neutral-300 leading-relaxed font-serif max-w-2xl line-clamp-3">
              {event.description}
            </p>

            {/* meta row */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-neutral-200 font-serif">
              <span className="inline-flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-accent-400" strokeWidth={1.5} />
                {dateRange}
              </span>
              {venueLabel && (
                <span className="inline-flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-accent-400" strokeWidth={1.5} />
                  {venueLabel}
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
              {upcoming && event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-accent-600 hover:bg-accent-500 text-primary-950 font-semibold font-serif border-2 border-accent-600 transition-colors"
                >
                  Register
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              )}
              {hasRegisterInterest && (
                <a
                  href="#register-interest"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-accent-600 hover:bg-accent-500 text-primary-950 font-semibold font-serif border-2 border-accent-600 transition-colors"
                >
                  Register Your Interest
                </a>
              )}
              {hasAgenda && (
                <a
                  href="#agenda"
                  className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/40 text-white hover:bg-white/10 font-semibold font-serif transition-colors"
                >
                  View Programme
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Sticky section nav */}
      <EventNav items={navItems} />

      {/* ============ About / Overview ============ */}
      {hasOverview && (
        <Section background="white" id="overview">
          <Container size="narrow">
            <div className="text-center">
              <EyebrowPill>About</EyebrowPill>
              <h2 className="mt-5 text-3xl md:text-4xl font-serif font-semibold text-neutral-950 leading-tight">
                About the Conference
              </h2>
            </div>
            <div className="mt-8">
              {event.overview && event.overview.length > 0 ? (
                <PortableText value={event.overview} components={portableTextComponents} />
              ) : (
                <p className="text-[1.0625rem] text-neutral-700 leading-[1.8] font-serif">
                  {event.description}
                </p>
              )}
            </div>

            {event.whoShouldAttend && event.whoShouldAttend.length > 0 && (
              <div className="mt-14 pt-12 border-t border-neutral-200">
                <div className="text-center mb-10">
                  <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Audience</div>
                  <div className="h-px w-16 bg-accent-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-semibold text-neutral-950">Who Should Attend</h3>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {event.whoShouldAttend.map((who, i) => (
                    <div key={i} className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 px-5 py-4">
                      <span className="w-7 h-7 bg-primary-900 flex items-center justify-center shrink-0">
                        <User className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                      </span>
                      <span className="text-sm text-neutral-700 font-serif leading-snug">{who}</span>
                    </div>
                  ))}
                </div>
                {event.organisedBy && (
                  <p className="mt-8 text-center text-sm text-neutral-500 font-serif">
                    Organised by {event.organisedBy}
                  </p>
                )}
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* ============ Agenda ============ */}
      {hasAgenda && (
        <Section background="gray" id="agenda">
          <Container>
            <SectionHeading
              eyebrow="Programme"
              title="Conference Agenda"
              intro="Two days of keynotes, panels, and working sessions — from what the law requires to how compliance actually gets built."
              center
            />
            <EventAgenda days={event.agenda!} align="center" />
          </Container>
        </Section>
      )}

      {/* ============ Speakers ============ */}
      {hasSpeakers && (
        <Section background="white" id="speakers">
          <Container>
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-end mb-12">
              <div>
                <EyebrowPill>Featured Speakers</EyebrowPill>
                <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-neutral-950 leading-tight">
                  Meet the practitioners building DPDP compliance
                </h2>
              </div>
              <p className="text-lg text-neutral-600 font-serif leading-relaxed">
                A curated lineup of compliance, legal, and data-protection leaders bringing
                real-world practice to the stage.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {event.speakers!.map((speaker, i) => (
                <SpeakerCard key={speaker._id || i} speaker={speaker} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ============ Register Interest ============ */}
      {hasRegisterInterest && (
        <Section background="gray" id="register-interest">
          <Container size="narrow">
            <SectionHeading
              eyebrow="Attend"
              title="Register Your Interest"
              intro="Registration opens soon. Register your interest now to be prioritised when registrations go live."
              center
            />
            <iframe
              src={event.registerInterestUrl!}
              title="Register Interest Form"
              width="100%"
              height="1300"
              className="block border-0"
            >
              Loading form…
            </iframe>
            <p className="mt-4 text-center text-sm text-neutral-500 font-serif">
              Having trouble with the form?{' '}
              <a
                href={event.registerInterestUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 hover:text-primary-900 underline underline-offset-2"
              >
                Open it in a new tab
              </a>
            </p>
          </Container>
        </Section>
      )}

      {/* ============ Registration ============ */}
      {hasRegistration && (
        <Section background="gray" id="register">
          <Container>
            <SectionHeading eyebrow="Attend" title="Registration" intro={event.registrationNote} />
            {event.ticketTiers && event.ticketTiers.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.ticketTiers.map((tier, i) => (
                  <div key={i} className="bg-white border-2 border-neutral-200 shadow-sm flex flex-col">
                    <div className="h-1.5 bg-accent-600" />
                    <div className="p-7 flex flex-col h-full">
                      <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2">{tier.name}</h3>
                      {tier.price && (
                        <p className="text-3xl font-serif text-primary-900 mb-4 tnum">{tier.price}</p>
                      )}
                      {tier.includes && (
                        <p className="text-sm text-neutral-600 font-serif leading-relaxed whitespace-pre-line">
                          {tier.includes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {upcoming && event.registrationUrl && (
              <div className="mt-10">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-900 hover:bg-primary-800 text-white font-semibold font-serif border-2 border-primary-950 transition-colors"
                >
                  Register Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* ============ Sponsors (dark) ============ */}
      {sponsorsByTier.length > 0 && (
        <Section background="primary" id="sponsors">
          <Container>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white">
                Sponsors &amp; Partners
              </h2>
              <div className="h-0.5 w-16 bg-accent-500 mx-auto mt-5" />
            </div>
            <div className="space-y-12 max-w-4xl mx-auto">
              {sponsorsByTier.map((group) => (
                <div key={group.value}>
                  <div className="text-center mb-6">
                    <div className="text-xs uppercase tracking-[0.25em] text-neutral-300 font-semibold">
                      {group.label}
                    </div>
                    <div className="h-0.5 w-8 bg-accent-500 mx-auto mt-2" />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {group.items.map((sponsor, i) => {
                      const inner = sponsor.logo ? (
                        <div className="relative h-12 w-full">
                          <Image
                            src={urlFor(sponsor.logo).height(96).url()}
                            alt={sponsor.logo.alt || sponsor.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <span className="text-lg font-serif font-semibold text-primary-900 text-center">
                          {sponsor.name}
                        </span>
                      );
                      return sponsor.url ? (
                        <a
                          key={i}
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center bg-white border border-white/10 p-8 min-h-28 hover:opacity-90 transition-opacity"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div
                          key={i}
                          className="flex items-center justify-center bg-white border border-white/10 p-8 min-h-28"
                        >
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

      {/* ============ Venue ============ */}
      {hasVenue && (
        <Section background="white" id="venue">
          <Container>
            <SectionHeading eyebrow="Getting There" title="Venue" center />
            <div className="bg-white border-2 border-neutral-200 shadow-sm max-w-3xl mx-auto">
              <div className="h-1.5 bg-accent-600" />
              <div className="p-7 sm:p-8 flex items-start gap-5">
                <div className="w-12 h-12 border-2 border-primary-900 flex items-center justify-center bg-primary-50 shrink-0">
                  <MapPin className="w-5 h-5 text-primary-900" strokeWidth={1.5} />
                </div>
                <div>
                  {event.venue!.name && (
                    <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-1">
                      {event.venue!.name}
                    </h3>
                  )}
                  {event.venue!.address && (
                    <p className="text-neutral-700 font-serif whitespace-pre-line leading-relaxed">
                      {event.venue!.address}
                    </p>
                  )}
                  {event.venue!.directions && (
                    <p className="text-sm text-neutral-500 font-serif whitespace-pre-line mt-3 leading-relaxed">
                      {event.venue!.directions}
                    </p>
                  )}
                  {event.venue!.mapUrl && (
                    <a
                      href={event.venue!.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary-700 hover:text-primary-900 font-semibold font-serif"
                    >
                      <MapPin className="w-4 h-4" /> View on map
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ============ FAQ ============ */}
      {hasFaqs && (
        <Section background="gray" id="faq">
          <Container size="narrow">
            <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" center />
            <div className="border-t border-neutral-300">
              {event.faqs!.map((faq, i) => (
                <details key={i} className="group border-b border-neutral-300">
                  <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none">
                    <span className="font-serif text-lg text-neutral-900 leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-2xl leading-none text-accent-600 group-open:rotate-45 transition-transform shrink-0">
                      +
                    </span>
                  </summary>
                  {faq.answer && (
                    <p className="pb-6 pr-10 text-neutral-600 font-serif leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </details>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ============ Downloads ============ */}
      {hasDownloads && (
        <Section background="white">
          <Container size="narrow">
            <SectionHeading eyebrow="Materials" title="Downloads" />
            <div className="grid sm:grid-cols-2 gap-4">
              {event.downloads!
                .filter((d) => d.url)
                .map((d, i) => (
                  <a
                    key={i}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white border-2 border-neutral-200 p-5 hover:border-primary-400 transition-colors"
                  >
                    <Download className="w-5 h-5 text-primary-800 shrink-0" strokeWidth={1.5} />
                    <span className="font-serif text-neutral-950">{d.title || 'Download'}</span>
                  </a>
                ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ============ Post-event ============ */}
      {hasPostEvent && (
        <Section background="gray" id="highlights">
          <Container>
            <SectionHeading eyebrow="After the Event" title="Highlights & Resources" />
            {hasGallery && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {event.gallery!.map((img, i) => (
                  <div key={i} className="relative aspect-video border-2 border-neutral-200 overflow-hidden">
                    <Image
                      src={urlFor(img).width(640).height(360).url()}
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
                <a
                  href={event.recordingsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-7 py-3 border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white font-semibold font-serif transition-colors"
                >
                  <Video className="w-4 h-4 mr-2" /> Watch Recordings
                </a>
              )}
              {(event.resources || [])
                .map((r) => ({ ...r, link: r.url || r.fileUrl }))
                .filter((r) => r.link)
                .map((r, i) => (
                  <a
                    key={i}
                    href={r.link!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-7 py-3 border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white font-semibold font-serif transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" /> {r.title || 'Resource'}
                  </a>
                ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Back to events */}
      <div className="bg-neutral-50 border-t border-neutral-200">
        <Container className="py-8">
          <a
            href="/events/"
            className="inline-flex items-center text-sm font-serif font-semibold text-neutral-600 hover:text-primary-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Events
          </a>
        </Container>
      </div>
    </>
  );
}
