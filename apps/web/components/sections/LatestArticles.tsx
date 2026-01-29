import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, Calendar, ChevronRight } from 'lucide-react';
import { Container, Section, SectionHeader, Badge, Button } from '@/components/ui';
import { client, urlFor, latestPostsQuery, type Post } from '@/lib/sanity';
import { formatDateShort, getCategoryLabel } from '@/lib/utils';

// Fallback posts for when Sanity is not connected
const fallbackPosts = [
  {
    _id: '1',
    title: 'DPDP Act Key Provisions Explained: A Detailed Analysis',
    slug: { current: 'dpdp-act-key-provisions-explained' },
    excerpt:
      'A breakdown of the most important provisions in the Digital Personal Data Protection Act and what they mean for your organisation.',
    category: 'dpdp-compliance',
    publishedAt: '2024-01-20',
  },
  {
    _id: '2',
    title: 'DPDP vs GDPR: Key Differences and Convergences',
    slug: { current: 'dpdp-vs-gdpr-comparison' },
    excerpt:
      'Understanding how India\'s DPDP Act compares to the EU\'s GDPR and what it means for compliance.',
    category: 'dpdp-compliance',
    publishedAt: '2024-01-18',
  },
  {
    _id: '3',
    title: 'The Imperative of DPDP Training for Corporate Governance',
    slug: { current: 'why-dpdp-training-matters-for-your-team' },
    excerpt:
      'The business case for investing in DPDP training and how it protects your organisation.',
    category: 'training',
    publishedAt: '2024-01-15',
  },
];

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch<Post[]>(latestPostsQuery, { limit: 4 });
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
        {/* Academic section header */}
        <div className="mb-10">
          <div className="inline-block mb-4">
            <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
              Academic Research
            </div>
            <div className="h-px w-20 bg-accent-600"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-3">
            Recent Publications
          </h2>
          <p className="text-neutral-600 leading-relaxed font-serif">
            Latest scholarly contributions to data protection discourse
          </p>
        </div>

        <div className="space-y-5">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/resources/articles/${post.slug.current}`}
              className="group block bg-white p-7 border-l-4 border-accent-600 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {post.category && (
                      <span className="text-[0.6875rem] font-bold text-primary-800 uppercase tracking-[0.15em] bg-primary-50 px-2.5 py-1 border border-primary-200">
                        {getCategoryLabel(post.category)}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span className="text-xs text-neutral-500 flex items-center gap-1.5 font-serif">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {formatDateShort(post.publishedAt)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-3 leading-snug group-hover:text-primary-900 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[0.9375rem] text-neutral-600 line-clamp-2 mb-4 leading-relaxed font-serif">
                    {post.excerpt}
                  </p>

                  <span className="text-sm text-primary-800 font-semibold inline-flex items-center border-b-2 border-primary-300 group-hover:border-primary-800 transition-all pb-0.5">
                    Read Full Article <ArrowRight className="w-3.5 h-3.5 ml-1.5" strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-300">
          <Link
            href="/resources/articles"
            className="inline-flex items-center text-primary-900 font-serif font-semibold hover:text-primary-700 border-b-2 border-primary-300 hover:border-primary-700 pb-1 transition-all"
          >
            View Complete Archive
            <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2.5} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
