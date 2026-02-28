# News Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `/news/` section to CADP for curated data protection news from India, with Sanity CMS integration, client-side filtering/pagination, and editorial-grade card design.

**Architecture:** Dedicated `newsArticle` Sanity schema feeds a top-level `/news/` route (listing) and `/news/[slug]` (individual pages). The listing page is a server component that fetches all news at build, then delegates to a `NewsGrid` client component for filtering and pagination. Navigation updated to include News as top-level item and move Events under Programs & Initiatives.

**Tech Stack:** Next.js 16 (App Router, static export), Sanity v3, Tailwind CSS v4, TypeScript

**Design reference:** See `docs/plans/2026-02-28-news-section-design.md` for full design decisions.

---

### Task 1: Create Sanity Schema — `newsArticle`

**Files:**
- Create: `apps/studio/schemas/documents/newsArticle.ts`
- Modify: `apps/studio/schemas/index.ts`

**Step 1: Create the newsArticle schema**

Create `apps/studio/schemas/documents/newsArticle.ts`:

```typescript
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      description: 'News headline (max 120 characters)',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      description: 'Brief summary for cards and meta descriptions (100-200 characters)',
      validation: (Rule) => Rule.required().min(80).max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'CADP commentary — 2-4 short paragraphs providing context on this news',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to original news source. Leave blank for CADP Announcements.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'sourceName',
      title: 'Source Name',
      type: 'string',
      description: 'e.g., "LiveLaw", "The Hindu", "Economic Times"',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Government Orders', value: 'government-orders' },
          { title: 'Court Decisions', value: 'court-decisions' },
          { title: 'Industry News', value: 'industry-news' },
          { title: 'Opinion', value: 'opinion' },
          { title: 'CADP Announcements', value: 'cadp-announcements' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Optional — most news items won\'t need one',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override title for SEO (50-60 characters)',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description (150-160 characters)',
      validation: (Rule) => Rule.max(170),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Published (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'publishedAt',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { title, category, date } = selection;
      const categoryLabels: Record<string, string> = {
        'government-orders': 'Govt Order',
        'court-decisions': 'Court',
        'industry-news': 'Industry',
        opinion: 'Opinion',
        'cadp-announcements': 'CADP',
      };
      return {
        ...selection,
        title,
        subtitle: `${categoryLabels[category] || category} — ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
      };
    },
  },
});
```

**Step 2: Register the schema**

In `apps/studio/schemas/index.ts`, add the import and include it in the exports:

```typescript
import post from './documents/post';
import whitePaper from './documents/whitePaper';
import service from './documents/service';
import teamMember from './documents/teamMember';
import event from './documents/event';
import siteSettings from './documents/siteSettings';
import newsArticle from './documents/newsArticle';

export const schemaTypes = [
  // Documents
  post,
  whitePaper,
  service,
  teamMember,
  event,
  siteSettings,
  newsArticle,
];
```

**Step 3: Commit**

```bash
git add apps/studio/schemas/documents/newsArticle.ts apps/studio/schemas/index.ts
git commit -m "feat(sanity): add newsArticle schema for news section"
```

---

### Task 2: Add TypeScript Types and Sanity Queries

**Files:**
- Modify: `apps/web/lib/sanity/types.ts`
- Modify: `apps/web/lib/sanity/queries.ts`

**Step 1: Add the NewsArticle type**

Append to `apps/web/lib/sanity/types.ts` (after the `Event` interface):

```typescript
export interface NewsArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body?: PortableTextBlock[];
  sourceUrl?: string;
  sourceName?: string;
  category: string;
  tags?: string[];
  publishedAt: string;
  _updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: SanityImage;
}
```

**Step 2: Add GROQ queries**

Append to `apps/web/lib/sanity/queries.ts` (after the Event queries, before Site Settings):

```typescript
// News Article Queries
export const allNewsQuery = groq`
  *[_type == "newsArticle"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    sourceUrl,
    sourceName,
    category,
    tags,
    publishedAt,
    featuredImage {
      asset->,
      alt
    }
  }
`;

export const newsBySlugQuery = groq`
  *[_type == "newsArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    sourceUrl,
    sourceName,
    category,
    tags,
    publishedAt,
    _updatedAt,
    seoTitle,
    seoDescription,
    featuredImage {
      asset->,
      alt
    }
  }
`;
```

**Step 3: Commit**

```bash
git add apps/web/lib/sanity/types.ts apps/web/lib/sanity/queries.ts
git commit -m "feat(sanity): add NewsArticle type and GROQ queries"
```

---

### Task 3: Add News Category Labels to Utils

**Files:**
- Modify: `apps/web/lib/utils/index.ts`

**Step 1: Add news category helper**

Append to `apps/web/lib/utils/index.ts`:

```typescript
export function getNewsCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'government-orders': 'Government Orders',
    'court-decisions': 'Court Decisions',
    'industry-news': 'Industry News',
    opinion: 'Opinion',
    'cadp-announcements': 'CADP Announcements',
  };
  return labels[category] || category;
}
```

**Step 2: Commit**

```bash
git add apps/web/lib/utils/index.ts
git commit -m "feat(utils): add getNewsCategoryLabel helper"
```

---

### Task 4: Create NewsGrid Client Component (Filtering + Pagination)

**Files:**
- Create: `apps/web/components/sections/NewsGrid.tsx`

**Step 1: Create the NewsGrid component**

This is the core visual component. It receives all news items as props and handles client-side category filtering and pagination.

**Card design direction** (editorial/gazette aesthetic matching the site's academic tone):

- **No rounded corners** — matches the site's `radius-sm: 0` theme
- **Left accent border** (4px) colored by category, not a top bar — feels more like a newspaper column marker and differentiates from article cards
- **Category colors**: Government Orders = primary-800, Court Decisions = accent-700, Industry News = neutral-700, Opinion = primary-600, CADP = accent-600
- **Information-first hierarchy**: Category pill + date on first line, bold title on second, excerpt on third, source attribution ("via LiveLaw") as a subtle footer element
- **No images on cards** — text-driven for fast scanning, even if the news item has a featuredImage (that's for the detail page)
- **Compact but not cramped** — generous line-height on titles, tight vertical spacing between metadata elements
- **Hover**: border color shifts to full primary, subtle shadow lift

Create `apps/web/components/sections/NewsGrid.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn, getNewsCategoryLabel, formatDateShort } from '@/lib/utils';
import type { NewsArticle } from '@/lib/sanity';

const ITEMS_PER_PAGE = 10;

const categories = [
  { value: 'all', label: 'All' },
  { value: 'government-orders', label: 'Government Orders' },
  { value: 'court-decisions', label: 'Court Decisions' },
  { value: 'industry-news', label: 'Industry News' },
  { value: 'opinion', label: 'Opinion' },
  { value: 'cadp-announcements', label: 'CADP Announcements' },
];

const categoryAccentColor: Record<string, string> = {
  'government-orders': 'border-l-primary-800',
  'court-decisions': 'border-l-accent-700',
  'industry-news': 'border-l-neutral-600',
  opinion: 'border-l-primary-600',
  'cadp-announcements': 'border-l-accent-600',
};

interface NewsGridProps {
  news: NewsArticle[];
}

export function NewsGrid({ news }: NewsGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered =
    activeCategory === 'all'
      ? news
      : news.filter((item) => item.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          const count =
            cat.value === 'all'
              ? news.length
              : news.filter((n) => n.category === cat.value).length;

          return (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={cn(
                'px-4 py-2 text-[0.8125rem] font-serif font-medium border-2 transition-all',
                isActive
                  ? 'bg-primary-950 text-white border-primary-950'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-700 hover:text-primary-900'
              )}
            >
              {cat.label}
              <span
                className={cn(
                  'ml-2 text-[0.6875rem]',
                  isActive ? 'text-primary-200' : 'text-neutral-400'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* News cards grid */}
      {visible.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500 font-serif text-lg">
            No news articles in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {visible.map((item) => (
            <Link
              key={item._id}
              href={`/news/${item.slug.current}/`}
              className="group block"
            >
              <article
                className={cn(
                  'bg-white border-2 border-neutral-200 border-l-4 p-6',
                  'hover:border-neutral-300 hover:shadow-md transition-all duration-200',
                  categoryAccentColor[item.category] || 'border-l-primary-600'
                )}
              >
                {/* Meta line: category + date */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[0.6875rem] uppercase tracking-[0.15em] font-semibold text-primary-800 bg-primary-50 px-2 py-0.5 border border-primary-200">
                    {getNewsCategoryLabel(item.category)}
                  </span>
                  <span className="text-xs text-neutral-500 font-serif">
                    {formatDateShort(item.publishedAt)}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-lg font-serif font-semibold text-neutral-950 leading-snug mb-2 group-hover:text-primary-900 transition-colors line-clamp-2">
                  {item.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-neutral-600 font-serif leading-relaxed line-clamp-2 mb-4">
                  {item.excerpt}
                </p>

                {/* Footer: source + read more */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  {item.sourceName ? (
                    <span className="text-xs text-neutral-400 font-serif italic">
                      via {item.sourceName}
                    </span>
                  ) : (
                    <span className="text-xs text-accent-600 font-serif font-semibold">
                      CADP Original
                    </span>
                  )}
                  <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif inline-flex items-center gap-1.5">
                    Read
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      &rarr;
                    </span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            className="px-8 py-3 text-[0.9375rem] font-serif font-semibold text-primary-900 border-2 border-primary-950 hover:bg-primary-950 hover:text-white transition-all"
          >
            Load More News
          </button>
        </div>
      )}
    </>
  );
}
```

**Step 2: Commit**

```bash
git add apps/web/components/sections/NewsGrid.tsx
git commit -m "feat(ui): add NewsGrid component with filtering and pagination"
```

---

### Task 5: Create News Listing Page — `/news/`

**Files:**
- Create: `apps/web/app/(site)/news/page.tsx`

**Step 1: Create the listing page**

```tsx
import { Metadata } from 'next';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Newsletter } from '@/components/sections';
import { NewsGrid } from '@/components/sections/NewsGrid';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, allNewsQuery, type NewsArticle } from '@/lib/sanity';

export const metadata: Metadata = generatePageMetadata({
  title: 'Data Protection News from India',
  description:
    'Curated updates on the DPDP Act, enforcement actions, court decisions, and data protection developments across India. Published by CADP Correspondent.',
  path: '/news',
  keywords: [
    'DPDP Act news',
    'data protection India news',
    'DPDP enforcement',
    'data protection board India',
    'privacy law India updates',
  ],
});

const fallbackNews: NewsArticle[] = [
  {
    _id: 'fn-1',
    title: 'DPDP Rules 2025 Draft Released for Public Consultation',
    slug: { current: 'dpdp-rules-2025-draft-released' },
    excerpt:
      'MeitY releases draft DPDP Rules for public consultation, outlining compliance timelines and data fiduciary obligations.',
    category: 'government-orders',
    sourceUrl: 'https://example.com',
    sourceName: 'LiveLaw',
    publishedAt: '2025-12-15',
  },
  {
    _id: 'fn-2',
    title: 'Data Protection Board of India Constituted Under DPDP Act',
    slug: { current: 'dpbi-constituted-under-dpdp-act' },
    excerpt:
      'The Central Government formally constitutes the Data Protection Board of India to adjudicate complaints under the DPDP Act.',
    category: 'government-orders',
    sourceUrl: 'https://example.com',
    sourceName: 'The Hindu',
    publishedAt: '2025-11-20',
  },
  {
    _id: 'fn-3',
    title: 'Karnataka High Court Rules on Consent Requirements Under DPDP',
    slug: { current: 'karnataka-hc-consent-ruling-dpdp' },
    excerpt:
      'A landmark ruling clarifies the scope of "informed consent" for digital services under the DPDP Act.',
    category: 'court-decisions',
    sourceUrl: 'https://example.com',
    sourceName: 'Bar and Bench',
    publishedAt: '2025-10-30',
  },
  {
    _id: 'fn-4',
    title: 'CADP Launches Advanced DPDP Compliance Certification Programme',
    slug: { current: 'cadp-launches-dpdp-certification' },
    excerpt:
      'CADP introduces a new certification programme for data protection professionals covering DPDP Act compliance end-to-end.',
    category: 'cadp-announcements',
    publishedAt: '2025-10-01',
  },
];

async function getNews(): Promise<NewsArticle[]> {
  try {
    const news = await client.fetch<NewsArticle[]>(allNewsQuery);
    return news.length > 0 ? news : fallbackNews;
  } catch {
    return fallbackNews;
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      {/* Hero */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[{ name: 'News', href: '/news' }]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  News &amp; Updates
                </div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Data Protection News from India
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                Curated updates on the DPDP Act, enforcement actions, and data
                protection developments across India.{' '}
                <span className="text-neutral-500">
                  Published by CADP Correspondent.
                </span>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* News Grid with Filters */}
      <Section background="gray">
        <Container>
          <NewsGrid news={news} />
        </Container>
      </Section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
```

**Step 2: Commit**

```bash
git add apps/web/app/\(site\)/news/page.tsx
git commit -m "feat(pages): add /news/ listing page with category filters"
```

---

### Task 6: Create Individual News Page — `/news/[slug]`

**Files:**
- Create: `apps/web/app/(site)/news/[slug]/page.tsx`

**Step 1: Create the individual news page**

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { Container, Section, Button, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generateArticleMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  client,
  urlFor,
  newsBySlugQuery,
  allNewsQuery,
  type NewsArticle,
} from '@/lib/sanity';
import { formatDate, getNewsCategoryLabel } from '@/lib/utils';

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  try {
    return await client.fetch<NewsArticle>(newsBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const fallback = [
    { slug: 'dpdp-rules-2025-draft-released' },
    { slug: 'dpbi-constituted-under-dpdp-act' },
    { slug: 'karnataka-hc-consent-ruling-dpdp' },
    { slug: 'cadp-launches-dpdp-certification' },
  ];
  try {
    const news = await client.fetch<NewsArticle[]>(allNewsQuery);
    if (!news || news.length === 0) return fallback;
    return news.map((item) => ({ slug: item.slug.current }));
  } catch {
    return fallback;
  }
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) {
    return { title: 'News Not Found' };
  }

  return generateArticleMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path: `/news/${article.slug.current}`,
    image: article.featuredImage
      ? urlFor(article.featuredImage).width(1200).height(630).url()
      : undefined,
    publishedTime: article.publishedAt,
    modifiedTime: article._updatedAt,
    authors: ['CADP Correspondent'],
    keywords: [
      'DPDP',
      getNewsCategoryLabel(article.category),
      ...(article.tags || []),
    ],
  });
}

const portableTextComponents = {
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children: React.ReactNode;
    }) => {
      const href = value?.href || '#';
      return (
        <a
          href={href}
          className="text-primary-600 hover:underline"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-neutral-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic text-neutral-600 my-6">
        {children}
      </blockquote>
    ),
  },
};

export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* NewsArticle JSON-LD */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.excerpt,
          url: `https://cadp.in/news/${article.slug.current}/`,
          image: article.featuredImage
            ? urlFor(article.featuredImage).width(1200).height(630).url()
            : undefined,
          author: {
            '@type': 'Organization',
            name: 'CADP Correspondent',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Centre for Applied Data Protection (CADP)',
            logo: {
              '@type': 'ImageObject',
              url: 'https://cadp.in/logo.png',
            },
          },
          datePublished: article.publishedAt,
          dateModified: article._updatedAt || article.publishedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://cadp.in/news/${article.slug.current}/`,
          },
        }}
      />

      {/* Header */}
      <Section background="gray">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { name: 'News', href: '/news' },
              {
                name: article.title,
                href: `/news/${article.slug.current}`,
              },
            ]}
          />

          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge>{getNewsCategoryLabel(article.category)}</Badge>
              <span className="text-sm text-neutral-500">
                {formatDate(article.publishedAt)}
              </span>
              <span className="text-sm text-neutral-400 font-serif">
                &middot; CADP Correspondent
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 text-balance">
              {article.title}
            </h1>

            <p className="text-xl text-neutral-600 mb-6">{article.excerpt}</p>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section background="white">
        <Container size="narrow">
          {article.featuredImage && (
            <div className="relative aspect-video mb-10 overflow-hidden">
              <Image
                src={urlFor(article.featuredImage).width(1200).height(675).url()}
                alt={article.featuredImage.alt || article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg">
            {article.body ? (
              <PortableText
                value={article.body}
                components={portableTextComponents}
              />
            ) : (
              <p className="text-neutral-600">
                This news article content is coming soon.
              </p>
            )}
          </div>

          {/* Source Callout Box — only shown when sourceUrl exists */}
          {article.sourceUrl && (
            <div className="mt-12 border-2 border-neutral-300 bg-neutral-50 p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-950 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5 text-accent-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-serif mb-1">
                    Originally reported by
                  </p>
                  <p className="text-lg font-serif font-semibold text-neutral-900 mb-4">
                    {article.sourceName || 'External Source'}
                  </p>
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-950 text-white text-[0.9375rem] font-serif font-semibold border-2 border-primary-950 hover:bg-primary-900 transition-all"
                  >
                    Read Full Article
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help with DPDP Compliance?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Our team can help you navigate DPDP Act requirements and build
              your compliance program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact/" variant="secondary" size="lg">
                Get in Touch
              </Button>
              <Button
                href="/resources/"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                More Resources
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add apps/web/app/\(site\)/news/\[slug\]/page.tsx
git commit -m "feat(pages): add /news/[slug] individual news page with source callout"
```

---

### Task 7: Update Navigation — Add News, Move Events

**Files:**
- Modify: `apps/web/components/layout/Header.tsx`

**Step 1: Update the navigation array**

Replace the `navigation` const in `Header.tsx` with:

```typescript
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Programs & Initiatives',
    href: '/programs-and-initiatives',
    children: [
      { name: 'DPDP Training', href: '/programs-and-initiatives/dpdp-training' },
      { name: 'Compliance Advisory', href: '/programs-and-initiatives/compliance-advisory' },
      { name: 'Research & Publications', href: '/programs-and-initiatives/research-publications' },
      { name: 'Events', href: '/events' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    children: [
      { name: 'Guides', href: '/resources/guides' },
      { name: 'Articles', href: '/resources/articles' },
      { name: 'White Papers', href: '/resources/white-papers' },
    ],
  },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
];
```

**Step 2: Commit**

```bash
git add apps/web/components/layout/Header.tsx
git commit -m "feat(nav): add News top-level link, move Events under Programs"
```

---

### Task 8: Update Sitemap

**Files:**
- Modify: `apps/web/app/sitemap.ts`

**Step 1: Add news queries and entries to sitemap**

Add after the `eventSlugsQuery`:

```typescript
const newsSlugsQuery = groq`
  *[_type == "newsArticle"] {
    "slug": slug.current,
    _updatedAt
  }
`;
```

Add `newsArticles` to the `Promise.all` fetch:

```typescript
const [guides, posts, whitePapers, events, newsArticles] = await Promise.all([
  client.fetch<SanitySlug[]>(guideSlugsQuery).catch(() => []),
  client.fetch<SanitySlug[]>(postSlugsQuery).catch(() => []),
  client.fetch<SanitySlug[]>(whitePaperSlugsQuery).catch(() => []),
  client.fetch<SanitySlug[]>(eventSlugsQuery).catch(() => []),
  client.fetch<SanitySlug[]>(newsSlugsQuery).catch(() => []),
]);
```

Add to the static pages array (after the events entry):

```typescript
{
  url: `${BASE_URL}/news/`,
  lastModified: new Date(),
  changeFrequency: 'daily',
  priority: 0.8,
},
```

Add the dynamic news pages (after `eventPages`):

```typescript
const newsPages: MetadataRoute.Sitemap = newsArticles.map((item) => ({
  url: `${BASE_URL}/news/${item.slug}/`,
  lastModified: new Date(item._updatedAt),
  changeFrequency: 'monthly',
  priority: 0.6,
}));
```

Include `...newsPages` in the return array.

**Step 2: Commit**

```bash
git add apps/web/app/sitemap.ts
git commit -m "feat(seo): add /news/ and dynamic news URLs to sitemap"
```

---

### Task 9: Build Verification

**Files:** None (verification only)

**Step 1: Run the build**

```bash
cd apps/web && pnpm build
```

Expected: Build succeeds with static export. The `/news/` and `/news/[slug]` pages should generate. Check terminal output for any TypeScript or build errors.

**Step 2: If build fails, fix issues and re-run**

Common issues to watch for:
- Missing imports (check that `allNewsQuery`, `newsBySlugQuery`, `NewsArticle`, `getNewsCategoryLabel` are all exported properly from their barrel files)
- PortableText component type mismatches
- Badge `variant` prop — check that `"default"` and `"primary"` are valid variants in the existing Badge component

**Step 3: Commit any fixes**

```bash
git add -A && git commit -m "fix: resolve build errors in news section"
```

---

### Task 10: Visual Smoke Test

**Files:** None (testing only)

**Step 1: Start the dev server**

```bash
cd apps/web && pnpm dev
```

**Step 2: Check the following pages in the browser**

1. `http://localhost:3000/news/` — Verify:
   - Hero section renders with "News & Updates" label and H1
   - Category filter pills all appear with counts
   - News cards render in 2-column grid
   - Left accent border colors vary by category
   - "via [Source]" appears on external news cards
   - "CADP Original" appears on CADP Announcement cards
   - "Load More" button appears if >10 items
   - Clicking a category filters the grid
   - Newsletter section at bottom

2. `http://localhost:3000/news/dpdp-rules-2025-draft-released/` — Verify:
   - Breadcrumbs show Home > News > Title
   - Category badge, date, "CADP Correspondent" byline
   - Body text renders
   - Source callout box shows with "Originally reported by" and button
   - CTA section at bottom

3. Navigation — Verify:
   - "News" appears in the top nav between Resources and Contact
   - Events now appears under Programs & Initiatives dropdown
   - Mobile nav also reflects these changes

**Step 3: Commit verified state (no changes expected)**

```bash
# Only if fixes were needed
git add -A && git commit -m "fix: visual smoke test corrections"
```
