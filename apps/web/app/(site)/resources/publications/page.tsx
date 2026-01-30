import { Metadata } from 'next';
import Link from 'next/link';
import { Download, FileText } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Newsletter } from '@/components/sections';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, allWhitePapersQuery, allPostsQuery, type WhitePaper, type Post } from '@/lib/sanity';

// Combined publication type
type Publication = (Post | WhitePaper) & { publicationType: 'article' | 'whitePaper' };

export const metadata: Metadata = generatePageMetadata({
  title: 'All Publications',
  description:
    'Browse all CADP publications including research articles, white papers, and thought leadership on DPDP Act compliance and data protection in India.',
  path: '/resources/publications',
  keywords: ['DPDP publications', 'data protection research', 'privacy articles', 'white papers'],
});

// Fallback publications
const fallbackPublications: Publication[] = [
  {
    _id: '1',
    title: 'DPDP Implementation Roadmap for Indian Organisations',
    slug: { current: 'dpdp-implementation-roadmap' },
    abstract:
      'A comprehensive framework for implementing DPDP Act compliance, including timelines, resource requirements, and best practices.',
    topics: ['Compliance', 'Implementation'],
    publishedAt: '2024-01-15',
    publicationType: 'whitePaper',
  },
  {
    _id: '2',
    title: 'DPDP Act: Analysis and Commentary',
    slug: { current: 'dpdp-act-analysis-commentary' },
    abstract:
      'In-depth legal analysis of the Digital Personal Data Protection Act, 2023.',
    topics: ['Legal Analysis', 'DPDP Act'],
    publishedAt: '2024-01-10',
    publicationType: 'whitePaper',
  },
] as Publication[];

async function getPublications(): Promise<Publication[]> {
  try {
    const [posts, whitePapers] = await Promise.all([
      client.fetch<Post[]>(allPostsQuery),
      client.fetch<WhitePaper[]>(allWhitePapersQuery),
    ]);

    // Add publication type and combine
    const articles: Publication[] = posts.map(post => ({
      ...post,
      publicationType: 'article' as const,
    }));

    const papers: Publication[] = whitePapers.map(paper => ({
      ...paper,
      publicationType: 'whitePaper' as const,
    }));

    const combined = [...articles, ...papers];

    // Sort by publishedAt date (most recent first)
    combined.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

    return combined.length > 0 ? combined : fallbackPublications;
  } catch {
    return fallbackPublications;
  }
}

export default async function AllPublicationsPage() {
  const publications = await getPublications();

  return (
    <>
      {/* Hero */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'All Publications', href: '/resources/publications' },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Research & Thought Leadership
                </div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                All Publications
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                Browse our complete collection of research articles, white papers, and thought
                leadership on DPDP Act compliance and data protection in India.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Publications Grid */}
      <Section background="gray">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {publications.map((pub) => {
              const isArticle = pub.publicationType === 'article';
              const description = isArticle ? (pub as Post).excerpt : (pub as WhitePaper).abstract;
              const topics = isArticle ? (pub as Post).tags : (pub as WhitePaper).topics;
              const linkHref = isArticle
                ? `/resources/articles/${pub.slug.current}`
                : `/resources/white-papers/${pub.slug.current}`;

              return (
                <Link
                  key={pub._id}
                  href={linkHref}
                  className="group block bg-white border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  {/* Top accent bar */}
                  <div className="h-1.5 bg-accent-600 group-hover:bg-accent-700 transition-colors"></div>

                  <div className="p-6 flex items-start gap-4">
                    <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 shrink-0 transition-all">
                      {isArticle ? (
                        <FileText className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
                      ) : (
                        <Download className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 bg-primary-100 border border-primary-300 text-primary-800 text-xs font-semibold uppercase tracking-wider">
                          {isArticle ? 'Article' : 'White Paper'}
                        </span>
                      </div>
                      <h2 className="text-lg font-serif font-semibold text-neutral-950 mb-2 group-hover:text-primary-900 transition-colors">
                        {pub.title}
                      </h2>
                      {pub.publishedAt && (
                        <div className="text-xs text-primary-800 font-semibold uppercase tracking-wide mb-2">
                          {new Date(pub.publishedAt).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </div>
                      )}
                      <p className="text-sm text-neutral-700 leading-relaxed font-serif line-clamp-3 mb-3">
                        {description}
                      </p>
                      {topics && topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-200">
                          {topics.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-600 font-semibold bg-neutral-100 px-2 py-1 border border-neutral-300"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 pt-4 border-t border-neutral-200">
                        <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif inline-flex items-center gap-2">
                          {isArticle ? (
                            <>
                              <FileText className="w-4 h-4" />
                              Read Article
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              Download PDF
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
