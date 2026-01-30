import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { groq } from 'next-sanity';

// Required for static export
export const dynamic = 'force-static';

const BASE_URL = 'https://cadp.in';

// Queries to fetch slugs and last modified dates
const guideSlugsQuery = groq`
  *[_type == "guide"] {
    "slug": slug.current,
    _updatedAt
  }
`;

const postSlugsQuery = groq`
  *[_type == "post"] {
    "slug": slug.current,
    _updatedAt
  }
`;

const whitePaperSlugsQuery = groq`
  *[_type == "whitePaper"] {
    "slug": slug.current,
    _updatedAt
  }
`;

const eventSlugsQuery = groq`
  *[_type == "event"] {
    "slug": slug.current,
    _updatedAt
  }
`;

type SanitySlug = {
  slug: string;
  _updatedAt: string;
};

// Static guides (not from Sanity CMS)
const staticGuides = [
  {
    slug: 'dpdp-implementation-roadmap',
    lastModified: '2026-01-30',
  },
  // Add more static guides here as you create them
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic content slugs from Sanity
  const [guides, posts, whitePapers, events] = await Promise.all([
    client.fetch<SanitySlug[]>(guideSlugsQuery).catch(() => []),
    client.fetch<SanitySlug[]>(postSlugsQuery).catch(() => []),
    client.fetch<SanitySlug[]>(whitePaperSlugsQuery).catch(() => []),
    client.fetch<SanitySlug[]>(eventSlugsQuery).catch(() => []),
  ]);

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/programs-and-initiatives`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/programs-and-initiatives/dpdp-training`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/programs-and-initiatives/compliance-advisory`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/programs-and-initiatives/research-publications`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/resources/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources/white-papers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  // Static guide pages (pillar content - high priority)
  const staticGuidePages: MetadataRoute.Sitemap = staticGuides.map((guide) => ({
    url: `${BASE_URL}/resources/guides/${guide.slug}`,
    lastModified: new Date(guide.lastModified),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Dynamic guide pages from Sanity (pillar content - high priority)
  const dynamicGuidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/resources/guides/${guide.slug}`,
    lastModified: new Date(guide._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Dynamic article pages
  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/resources/articles/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic white paper pages
  const whitePaperPages: MetadataRoute.Sitemap = whitePapers.map((wp) => ({
    url: `${BASE_URL}/resources/white-papers/${wp.slug}`,
    lastModified: new Date(wp._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic event pages
  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${BASE_URL}/events/${event.slug}`,
    lastModified: new Date(event._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...staticGuidePages,
    ...dynamicGuidePages,
    ...articlePages,
    ...whitePaperPages,
    ...eventPages,
  ];
}
