import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText } from 'lucide-react';
import { Container, Section, SectionHeader, Badge } from '@/components/ui';
import { client, urlFor, latestPostsQuery, type Post } from '@/lib/sanity';
import { formatDateShort, getCategoryLabel } from '@/lib/utils';

// Fallback posts for when Sanity is not connected
const fallbackPosts = [
  {
    _id: '1',
    title: 'DPDP Act Key Provisions Explained',
    slug: { current: 'dpdp-act-key-provisions-explained' },
    excerpt:
      'A breakdown of the most important provisions in the Digital Personal Data Protection Act and what they mean for your organisation.',
    category: 'dpdp-compliance',
    publishedAt: '2024-01-20',
  },
  {
    _id: '2',
    title: 'DPDP vs GDPR: Key Differences',
    slug: { current: 'dpdp-vs-gdpr-comparison' },
    excerpt:
      'Understanding how India\'s DPDP Act compares to the EU\'s GDPR and what it means for compliance.',
    category: 'dpdp-compliance',
    publishedAt: '2024-01-18',
  },
  {
    _id: '3',
    title: 'Why DPDP Training Matters for Your Team',
    slug: { current: 'why-dpdp-training-matters-for-your-team' },
    excerpt:
      'The business case for investing in DPDP training and how it protects your organisation.',
    category: 'training',
    publishedAt: '2024-01-15',
  },
];

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch<Post[]>(latestPostsQuery, { limit: 3 });
    return posts.length > 0 ? posts : fallbackPosts as Post[];
  } catch {
    return fallbackPosts as Post[];
  }
}

export async function LatestArticles() {
  const posts = await getPosts();

  return (
    <Section background="gray">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeader
            title="Latest Articles"
            subtitle="Insights and updates on DPDP compliance and data protection"
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

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/resources/articles/${post.slug.current}`}
              className="group"
            >
              <article className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-200">
                {/* Image */}
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

                {/* Content */}
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
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
