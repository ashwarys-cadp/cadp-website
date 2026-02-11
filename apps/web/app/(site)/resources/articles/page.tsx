import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Newsletter } from '@/components/sections';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, allPostsQuery, type Post } from '@/lib/sanity';
import { formatDateShort, getCategoryLabel } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'Articles',
  description:
    'Articles and analysis on DPDP Act compliance, data protection trends, regulatory developments, and practical implementation guidance for Indian organisations.',
  path: '/resources/articles',
  keywords: ['DPDP articles', 'data protection news', 'compliance updates'],
});

// Fallback posts
const fallbackPosts: Post[] = [
  {
    _id: '1',
    title: 'DPDP Act Key Provisions Explained',
    slug: { current: 'dpdp-act-key-provisions-explained' },
    excerpt:
      'A breakdown of the most important provisions in the Digital Personal Data Protection Act.',
    category: 'dpdp-compliance',
    publishedAt: '2024-01-20',
  },
  {
    _id: '2',
    title: 'DPDP vs GDPR: Key Differences',
    slug: { current: 'dpdp-vs-gdpr-comparison' },
    excerpt:
      'Understanding how India\'s DPDP Act compares to the EU\'s GDPR.',
    category: 'dpdp-compliance',
    publishedAt: '2024-01-18',
  },
  {
    _id: '3',
    title: 'Why DPDP Training Matters for Your Team',
    slug: { current: 'why-dpdp-training-matters-for-your-team' },
    excerpt:
      'The business case for investing in DPDP training.',
    category: 'training',
    publishedAt: '2024-01-15',
  },
];

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch<Post[]>(allPostsQuery);
    return posts.length > 0 ? posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

export default async function ArticlesPage() {
  const posts = await getPosts();

  return (
    <>
      {/* Hero */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Articles', href: '/resources/articles' },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Latest Insights</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Articles
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                Insights, analysis, and updates on DPDP Act compliance and data
                protection in India.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Articles Grid */}
      <Section background="gray">
        <Container>
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
                  <h2 className="text-lg font-serif font-semibold text-neutral-950 mb-3 leading-tight group-hover:text-primary-900 transition-colors">
                    {post.title}
                  </h2>

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

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
