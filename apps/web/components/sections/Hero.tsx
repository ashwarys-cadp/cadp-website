import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, GraduationCap, Scale } from "lucide-react";
import { Button, Container } from "@/components/ui";
import {
  client,
  latestNewsQuery,
  latestPostsQuery,
  latestWhitePapersQuery,
  siteSettingsQuery,
  upcomingEventsQuery,
  type Event,
  type HomepageFeaturedContent,
  type HomepageHeroItem,
  type NewsArticle,
  type Post,
  type SiteSettings,
  type WhitePaper,
} from "@/lib/sanity";
import { formatDateShort, getCategoryLabel, getNewsCategoryLabel } from "@/lib/utils";

const fallbackPosts: Post[] = [
  {
    _type: "post",
    _id: "post-fallback-1",
    title: "DPDP Act Key Provisions Explained: A Detailed Analysis",
    slug: { current: "dpdp-act-key-provisions-explained" },
    excerpt:
      "A breakdown of the most important provisions in the Digital Personal Data Protection Act and what they mean for your organisation.",
    category: "dpdp-compliance",
    publishedAt: "2026-03-01",
    author: { _id: "author-1", name: "CADP Editorial" },
  },
  {
    _type: "post",
    _id: "post-fallback-2",
    title: "DPDP vs GDPR: Key Differences and Convergences",
    slug: { current: "dpdp-vs-gdpr-comparison" },
    excerpt: "Understanding how India's DPDP Act compares to the GDPR and what that means for compliance planning in India.",
    category: "legal-updates",
    publishedAt: "2026-02-18",
    author: { _id: "author-2", name: "CADP Research Desk" },
  },
];

const fallbackWhitePapers: WhitePaper[] = [
  {
    _type: "whitePaper",
    _id: "white-paper-fallback-1",
    title: "DPDP Compliance Readiness for Significant Data Fiduciaries",
    slug: { current: "dpdp-compliance-readiness-significant-data-fiduciaries" },
    abstract:
      "A practical publication on phased compliance planning, governance controls, and readiness checkpoints for significant data fiduciaries.",
    publishedAt: "2026-02-28",
    authors: [{ _id: "author-3", name: "CADP Publications Unit" }],
  },
];

const fallbackNews: NewsArticle[] = [
  {
    _type: "newsArticle",
    _id: "news-fallback-1",
    title: "Supreme Court to Hear Constitutional Challenge to the DPDP Act, 2023",
    slug: { current: "supreme-court-hears-dpdp-constitutional-challenge" },
    excerpt:
      "The Court has issued notice on petitions challenging the DPDP Act and the 2025 Rules over press freedom, RTI, and privacy, with a fuller hearing expected later this year.",
    category: "court-decisions",
    sourceName: "Internet Freedom Foundation",
    sourceUrl: "https://internetfreedom.in",
    publishedAt: "2026-02-16",
  },
  {
    _type: "newsArticle",
    _id: "news-fallback-2",
    title: "Karnataka proposes social-media ban for children under 16",
    slug: { current: "karnataka-social-media-ban-under-16" },
    excerpt: "A proposed policy would restrict social media access for children under 16 as state-level safeguards are debated.",
    category: "policy-and-regulation",
    sourceName: "Deccan Herald",
    sourceUrl: "https://www.deccanherald.com",
    publishedAt: "2026-03-06",
  },
];

const fallbackEvents: Event[] = [
  {
    _type: "event",
    _id: "event-fallback-1",
    title: "Webinar — DPDP Implementation Best Practices",
    slug: { current: "webinar-dpdp-implementation-best-practices" },
    eventType: "webinar",
    description: "A practical webinar on implementation sequencing, governance controls, and internal readiness under the DPDP regime.",
    date: "2026-03-10T14:00:00Z",
    location: "Online",
    isOnline: true,
  },
];

const missionPoints = [
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description: "Rooted in legal scholarship",
  },
  {
    icon: BookOpen,
    title: "Research Focus",
    description: "Policy & jurisprudence",
  },
  {
    icon: Scale,
    title: "Legal Authority",
    description: "Practitioner guidance",
  },
];

function sentenceCase(value?: string): string {
  if (!value) return "Update";
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizePost(post: Post): HomepageHeroItem {
  return {
    id: post._id,
    kind: "post",
    title: post.title,
    summary: post.excerpt,
    href: `/resources/articles/${post.slug.current}`,
    displayLabel: post.category ? getCategoryLabel(post.category) : "Article",
    displayDate: post.publishedAt ? formatDateShort(post.publishedAt) : undefined,
    sortDate: post.publishedAt || "1970-01-01T00:00:00Z",
    authorName: post.author?.name,
  };
}

function normalizeWhitePaper(paper: WhitePaper): HomepageHeroItem {
  return {
    id: paper._id,
    kind: "whitePaper",
    title: paper.title,
    summary: paper.abstract,
    href: `/resources/white-papers/${paper.slug.current}`,
    displayLabel: "Publication",
    displayDate: paper.publishedAt ? formatDateShort(paper.publishedAt) : undefined,
    sortDate: paper.publishedAt || "1970-01-01T00:00:00Z",
    authorName: paper.authors?.map((author) => author.name).join(", "),
  };
}

function normalizeEvent(event: Event): HomepageHeroItem {
  return {
    id: event._id,
    kind: "event",
    title: event.title,
    summary: event.description,
    href: `/events/${event.slug.current}`,
    displayLabel: event.eventType ? sentenceCase(event.eventType) : "Event",
    displayDate: formatDateShort(event.date),
    sortDate: event.date,
    location: event.isOnline ? "Online" : event.location,
    isOnline: event.isOnline,
  };
}

function normalizeNewsArticle(article: NewsArticle): HomepageHeroItem {
  return {
    id: article._id,
    kind: "newsArticle",
    title: article.title,
    summary: article.excerpt,
    href: `/news/${article.slug.current}`,
    displayLabel: getNewsCategoryLabel(article.category),
    displayDate: formatDateShort(article.publishedAt),
    sortDate: article.publishedAt,
    sourceName: article.sourceName,
  };
}

function normalizeFeaturedContent(item: HomepageFeaturedContent | null | undefined): HomepageHeroItem | null {
  if (!item?._type) return null;

  switch (item._type) {
    case "post":
      return normalizePost(item);
    case "whitePaper":
      return normalizeWhitePaper(item);
    case "event":
      return normalizeEvent(item);
    case "newsArticle":
      return normalizeNewsArticle(item);
    default:
      return null;
  }
}

function sortItems(items: HomepageHeroItem[]): HomepageHeroItem[] {
  return [...items].sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());
}

function getPrimaryCta(item: HomepageHeroItem): { label: string; href: string } {
  switch (item.kind) {
    case "event":
      return { label: "View Event", href: item.href };
    case "whitePaper":
      return { label: "View Publication", href: item.href };
    case "newsArticle":
      return { label: "Read Coverage", href: item.href };
    case "post":
    default:
      return { label: "Read Article", href: item.href };
  }
}

function getSecondaryCta(item: HomepageHeroItem): { label: string; href: string } {
  switch (item.kind) {
    case "event":
      return { label: "Browse Events", href: "/events/" };
    case "whitePaper":
      return { label: "Browse Publications", href: "/resources/publications/" };
    case "newsArticle":
      return { label: "Browse News", href: "/news/" };
    case "post":
    default:
      return { label: "Browse Articles", href: "/resources/articles/" };
  }
}

function getFeaturedMeta(item: HomepageHeroItem): string[] {
  switch (item.kind) {
    case "event":
      return [item.displayDate, item.location || (item.isOnline ? "Online" : undefined)].filter(Boolean) as string[];
    case "whitePaper":
      return ["Publication", item.displayDate, item.authorName].filter(Boolean) as string[];
    case "newsArticle":
      return ["CADP Correspondent", item.displayDate, item.sourceName ? `via ${item.sourceName}` : undefined].filter(Boolean) as string[];
    case "post":
    default:
      return [item.authorName || "CADP Editorial", item.displayDate].filter(Boolean) as string[];
  }
}

function isSameItem(a: HomepageHeroItem, b: HomepageHeroItem): boolean {
  return a.id === b.id && a.kind === b.kind;
}

async function getHeroItems() {
  const [settings, posts, papers, news, events] = await Promise.all([
    client.fetch<SiteSettings | null>(siteSettingsQuery).catch(() => null),
    client.fetch<Post[]>(latestPostsQuery, { limit: 4 }).catch(() => []),
    client.fetch<WhitePaper[]>(latestWhitePapersQuery, { limit: 3 }).catch(() => []),
    client.fetch<NewsArticle[]>(latestNewsQuery, { limit: 4 }).catch(() => []),
    client.fetch<Event[]>(upcomingEventsQuery).catch(() => []),
  ]);

  const normalizedItems = sortItems([
    ...(news.length ? news : fallbackNews).map(normalizeNewsArticle),
    ...(posts.length ? posts : fallbackPosts).map(normalizePost),
    ...(papers.length ? papers : fallbackWhitePapers).map(normalizeWhitePaper),
    ...(events.length ? events.slice(0, 3) : fallbackEvents).map(normalizeEvent),
  ]);

  const manualFeatured = normalizeFeaturedContent(settings?.homepageFeaturedContent);
  const featured = manualFeatured || normalizedItems[0];
  const latest = normalizedItems.filter((item) => !isSameItem(item, featured)).slice(0, 5);

  return { featured, latest };
}

export async function Hero() {
  const { featured, latest } = await getHeroItems();
  const primaryCta = getPrimaryCta(featured);
  const secondaryCta = getSecondaryCta(featured);
  const featuredMeta = getFeaturedMeta(featured);

  return (
    <section className="relative overflow-hidden border-b-4 border-accent-700 bg-white">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4"/%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.45"/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <Container size="wide" className="relative">
        <div className="grid gap-14 py-12 md:py-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.9fr)] lg:gap-16 lg:py-20">
          <div className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-4 text-[0.82rem] uppercase tracking-[0.26em] text-accent-800">
              <span className="hero-live-dot" aria-hidden="true" />
              <span>{featured.displayLabel}</span>
            </div>

            <Link href={featured.href} className="group inline-block">
              <h1 className="max-w-4xl text-3xl leading-tight tracking-[-0.015em] text-neutral-950 transition-colors group-hover:text-primary-900 md:text-4xl lg:text-5xl">
                {featured.title}
              </h1>
            </Link>

            <div className="my-8 flex items-center gap-5 text-accent-700">
              <div className="h-px w-20 bg-accent-700" />
              <div className="h-3 w-3 rotate-45 bg-accent-700" />
              <div className="h-px w-20 bg-accent-700" />
            </div>

            <p className="max-w-3xl text-base leading-relaxed text-neutral-700 md:text-[1.0625rem]">
              {featured.summary}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-base text-neutral-500">
              {featuredMeta.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  {item === featured.displayDate ? <CalendarDays className="h-4 w-4 text-neutral-400" strokeWidth={1.75} /> : null}
                  <span className={item.startsWith("via ") ? "italic" : ""}>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button href={primaryCta.href} size="lg" variant="primary" className="min-w-56">
                {primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href={secondaryCta.href} size="lg" variant="outline" className="min-w-56">
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          <aside className="flex flex-col justify-start">
            <div className="mb-5 flex items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <span className="hero-live-dot" aria-hidden="true" />
                <h2 className="text-2xl font-semibold text-neutral-950">Latest</h2>
              </div>
              <Link
                href="/resources/"
                className="inline-flex items-center gap-1.5 border-b-2 border-neutral-300 pb-1 text-sm font-semibold text-primary-900 hover:border-primary-900 hover:text-primary-700"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="border-t-[3px] border-neutral-950">
              {latest.map((item, index) => (
                <Link
                  key={`${item.kind}-${item.id}`}
                  href={item.href}
                  className={`block py-6 transition-colors hover:text-primary-900 ${index < latest.length - 1 ? "border-b border-neutral-200" : ""}`}
                >
                  <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-neutral-500">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent-800">{item.displayLabel}</span>
                    {item.displayDate ? <span>{item.displayDate}</span> : null}
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-neutral-950 md:text-lg">{item.title}</h3>
                  {item.kind === "event" && item.location ? (
                    <p className="mt-2.5 text-base italic text-neutral-500">{item.location}</p>
                  ) : null}
                  {item.kind === "newsArticle" && item.sourceName ? (
                    <p className="mt-2.5 text-base italic text-neutral-500">via {item.sourceName}</p>
                  ) : null}
                  {item.kind === "whitePaper" && item.authorName ? (
                    <p className="mt-2.5 text-base italic text-neutral-500">{item.authorName}</p>
                  ) : null}
                </Link>
              ))}
            </div>
          </aside>
        </div>

      </Container>

      <div className="relative mt-2 border-y-[5px] border-accent-800 py-10 md:py-12">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)] lg:items-center">
            <p className="max-w-3xl text-base leading-relaxed text-neutral-700 md:text-[1.0625rem]">
              The <span className="italic text-neutral-900">Centre for Applied Data Protection</span> advances India&apos;s data-protection ecosystem
              through rigorous research, practical training, and compliance advisory that translates the DPDP Act into implementable frameworks.
            </p>

            <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
              {missionPoints.map((point) => (
                <div key={point.title} className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-primary-900 bg-white">
                    <point.icon className="h-6 w-6 text-primary-900" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="whitespace-nowrap text-base font-semibold leading-tight text-neutral-950">{point.title}</h3>
                    <p className="mt-2 whitespace-nowrap text-sm text-neutral-500">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
