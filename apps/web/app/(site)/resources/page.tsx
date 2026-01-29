import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, FileText, Download, ArrowRight } from 'lucide-react';
import {
  Container,
  Section,
  SectionHeader,
  Button,
  Card,
  Badge,
} from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Newsletter } from '@/components/sections';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  client,
  urlFor,
  featuredGuidesQuery,
  latestPostsQuery,
  allWhitePapersQuery,
  type Guide,
  type Post,
  type WhitePaper,
} from '@/lib/sanity';
import { formatDateShort, getCategoryLabel } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'Resources',
  description:
    'Access comprehensive guides, articles, and white papers on DPDP Act compliance and data protection in India.',
  path: '/resources',
  keywords: [
    'DPDP resources',
    'data protection guides',
    'DPDP articles',
    'compliance resources',
  ],
});

// Fallback data
const fallbackGuides: Guide[] = [
  {
    _id: '1',
    title: 'Complete Guide to DPDP Act Compliance',
    slug: { current: 'complete-guide-dpdp-act-compliance' },
    excerpt: 'Everything you need to know about achieving DPDP compliance.',
    category: 'dpdp-compliance',
  },
  {
    _id: '2',
    title: 'DPDP Training Programs Guide',
    slug: { current: 'dpdp-training-for-organisations' },
    excerpt: 'How to build data protection capability through training.',
    category: 'training',
  },
];

const fallbackPosts: Post[] = [
  {
    _id: '1',
    title: 'DPDP Act Key Provisions Explained',
    slug: { current: 'dpdp-act-key-provisions-explained' },
    excerpt: 'A breakdown of the most important DPDP Act provisions.',
    category: 'dpdp-compliance',
    publishedAt: '2024-01-20',
  },
  {
    _id: '2',
    title: 'DPDP vs GDPR: Key Differences',
    slug: { current: 'dpdp-vs-gdpr-comparison' },
    excerpt: 'How India\'s DPDP compares to the EU\'s GDPR.',
    category: 'dpdp-compliance',
    publishedAt: '2024-01-18',
  },
];

const fallbackWhitePapers: WhitePaper[] = [
  {
    _id: '1',
    title: 'DPDP Implementation Roadmap',
    slug: { current: 'dpdp-implementation-roadmap' },
    abstract: 'A framework for implementing DPDP Act compliance.',
    topics: ['Compliance'],
  },
];

async function getResourcesData(): Promise<{
  guides: Guide[];
  posts: Post[];
  whitePapers: WhitePaper[];
}> {
  try {
    const [guides, posts, whitePapers] = await Promise.all([
      client.fetch<Guide[]>(featuredGuidesQuery),
      client.fetch<Post[]>(latestPostsQuery, { limit: 6 }),
      client.fetch<WhitePaper[]>(allWhitePapersQuery),
    ]);
    return {
      guides: guides.length > 0 ? guides : fallbackGuides,
      posts: posts.length > 0 ? posts : fallbackPosts,
      whitePapers: whitePapers.length > 0 ? whitePapers : fallbackWhitePapers,
    };
  } catch {
    return {
      guides: fallbackGuides,
      posts: fallbackPosts,
      whitePapers: fallbackWhitePapers,
    };
  }
}

export default async function ResourcesPage() {
  const { guides, posts, whitePapers } = await getResourcesData();

  return (
    <>
      {/* Hero */}
      <Section background="white">
        <Container>
          <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }]} />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Research & Publications</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Resources
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                Comprehensive guides, articles, and white papers to help you
                understand and implement DPDP Act compliance.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Guides */}
      <Section background="gray">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Pillar Content</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-2">Guides</h2>
              <p className="text-neutral-600 font-serif">In-depth resources on key compliance topics</p>
            </div>
            <Link
              href="/resources/guides"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-700 hover:text-primary-900 font-semibold font-serif border-b-2 border-primary-300 hover:border-primary-700 pb-1 transition-all"
            >
              View all guides
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <Link
                key={guide._id}
                href={`/resources/guides/${guide.slug.current}`}
                className="group block bg-white border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {/* Top accent bar */}
                <div className="h-2 bg-accent-600 group-hover:bg-accent-700 transition-colors"></div>

                <div className="p-7">
                  {/* Icon and Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 transition-all">
                      <BookOpen className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <div className="text-5xl font-serif text-neutral-200 group-hover:text-accent-600 transition-colors leading-none">
                      {['I', 'II', 'III'][index] || 'IV'}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-4 leading-tight group-hover:text-primary-900 transition-colors">
                    {guide.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-700 leading-relaxed font-serif text-[0.9375rem] line-clamp-3">
                    {guide.excerpt}
                  </p>

                  {/* Learn more arrow */}
                  <div className="mt-6 pt-5 border-t border-neutral-300 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif">
                      Read Guide
                    </span>
                    <div className="w-8 h-8 border-2 border-primary-700 group-hover:border-primary-900 group-hover:bg-primary-900 flex items-center justify-center transition-all">
                      <span className="text-primary-700 group-hover:text-white transition-colors text-lg">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Latest Articles */}
      <Section background="white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Latest Insights</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-2">Articles</h2>
              <p className="text-neutral-600 font-serif">Latest insights and updates</p>
            </div>
            <Link
              href="/resources/articles"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-700 hover:text-primary-900 font-semibold font-serif border-b-2 border-primary-300 hover:border-primary-700 pb-1 transition-all"
            >
              View all articles
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/resources/articles/${post.slug.current}`}
                className="group block bg-white border-2 border-neutral-300 hover:border-primary-600 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {/* Top accent bar */}
                <div className="h-1.5 bg-primary-600 group-hover:bg-primary-800 transition-colors"></div>

                <div className="p-6">
                  {/* Metadata */}
                  <div className="flex items-center gap-3 mb-4">
                    {post.category && (
                      <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-primary-800 font-semibold bg-primary-50 px-2.5 py-1 border border-primary-200">
                        {getCategoryLabel(post.category)}
                      </div>
                    )}
                    {post.publishedAt && (
                      <span className="text-xs text-neutral-500 font-serif">
                        {formatDateShort(post.publishedAt)}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3 leading-tight group-hover:text-primary-900 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-neutral-700 leading-relaxed font-serif line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read more indicator */}
                  <div className="mt-5 pt-4 border-t border-neutral-200">
                    <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif inline-flex items-center gap-2">
                      Read Article
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* White Papers */}
      <Section background="gray">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Academic Research</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-2">White Papers</h2>
              <p className="text-neutral-600 font-serif">In-depth research and analysis</p>
            </div>
            <Link
              href="/resources/white-papers"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-700 hover:text-primary-900 font-semibold font-serif border-b-2 border-primary-300 hover:border-primary-700 pb-1 transition-all"
            >
              View all white papers
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whitePapers.slice(0, 4).map((paper) => (
              <Link
                key={paper._id}
                href={`/resources/white-papers/${paper.slug.current}`}
                className="group block bg-white border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {/* Top accent bar */}
                <div className="h-1.5 bg-accent-600 group-hover:bg-accent-700 transition-colors"></div>

                <div className="p-6 flex items-start gap-4">
                  <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 shrink-0 transition-all">
                    <Download className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2 group-hover:text-primary-900 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed font-serif line-clamp-2 mb-3">
                      {paper.abstract}
                    </p>
                    {paper.topics && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-200">
                        {paper.topics.slice(0, 3).map((topic) => (
                          <span key={topic} className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-600 font-semibold bg-neutral-100 px-2 py-1 border border-neutral-300">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
