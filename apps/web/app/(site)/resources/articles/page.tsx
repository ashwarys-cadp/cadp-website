import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FileText } from 'lucide-react';
import { Container, Section, Card, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, urlFor, allPostsQuery, type Post } from '@/lib/sanity';
import { formatDateShort, getCategoryLabel } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'Articles',
  description:
    'Latest articles and insights on DPDP Act compliance, data protection trends, and industry updates.',
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
      <Section background="gray">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Articles', href: '/resources/articles' },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Articles
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Insights, analysis, and updates on DPDP Act compliance and data
              protection in India.
            </p>
          </div>
        </Container>
      </Section>

      {/* Articles Grid */}
      <Section background="white">
        <Container>
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
                    <h2 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-neutral-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
