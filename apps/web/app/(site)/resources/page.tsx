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
      <Section background="gray">
        <Container>
          <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }]} />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Resources
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Comprehensive guides, articles, and white papers to help you
              understand and implement DPDP Act compliance.
            </p>
          </div>
        </Container>
      </Section>

      {/* Featured Guides */}
      <Section background="white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <SectionHeader
              title="Guides"
              subtitle="In-depth resources on key compliance topics"
              className="mb-0"
            />
            <Link
              href="/resources/guides"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
            >
              View all guides
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide._id}
                href={`/resources/guides/${guide.slug.current}`}
                className="group"
              >
                <Card hover className="h-full">
                  <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-primary-50">
                    {guide.featuredImage ? (
                      <Image
                        src={urlFor(guide.featuredImage).width(600).height(340).url()}
                        alt={guide.featuredImage.alt || guide.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-primary-300" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge variant="primary">Guide</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {guide.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Latest Articles */}
      <Section background="gray">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <SectionHeader
              title="Articles"
              subtitle="Latest insights and updates"
              className="mb-0"
            />
            <Link
              href="/resources/articles"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
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
                className="group"
              >
                <Card hover className="h-full">
                  <div className="relative aspect-video bg-gradient-to-br from-neutral-100 to-neutral-50">
                    {post.featuredImage ? (
                      <Image
                        src={urlFor(post.featuredImage).width(600).height(340).url()}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="w-12 h-12 text-neutral-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      {post.category && (
                        <Badge>{getCategoryLabel(post.category)}</Badge>
                      )}
                      {post.publishedAt && (
                        <span className="text-xs text-neutral-500">
                          {formatDateShort(post.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* White Papers */}
      <Section background="white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <SectionHeader
              title="White Papers"
              subtitle="In-depth research and analysis"
              className="mb-0"
            />
            <Link
              href="/resources/white-papers"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
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
                className="group"
              >
                <Card hover className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <Download className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {paper.abstract}
                    </p>
                    {paper.topics && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {paper.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="default">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section background="primary">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Get the latest guides, articles, and updates on DPDP compliance
              delivered to your inbox.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Subscribe to Updates
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
