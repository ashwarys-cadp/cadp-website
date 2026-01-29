import { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, allWhitePapersQuery, type WhitePaper } from '@/lib/sanity';

export const metadata: Metadata = generatePageMetadata({
  title: 'White Papers',
  description:
    'Download CADP\'s research white papers on DPDP Act compliance, data protection frameworks, and industry best practices.',
  path: '/resources/white-papers',
  keywords: ['DPDP white papers', 'data protection research', 'compliance papers'],
});

// Fallback white papers
const fallbackPapers: WhitePaper[] = [
  {
    _id: '1',
    title: 'DPDP Implementation Roadmap for Indian Organisations',
    slug: { current: 'dpdp-implementation-roadmap' },
    abstract:
      'A comprehensive framework for implementing DPDP Act compliance, including timelines, resource requirements, and best practices.',
    topics: ['Compliance', 'Implementation'],
    publishedAt: '2024-01-15',
  },
  {
    _id: '2',
    title: 'DPDP Act: Analysis and Commentary',
    slug: { current: 'dpdp-act-analysis-commentary' },
    abstract:
      'In-depth legal analysis of the Digital Personal Data Protection Act, 2023.',
    topics: ['Legal Analysis', 'DPDP Act'],
    publishedAt: '2024-01-10',
  },
];

async function getWhitePapers(): Promise<WhitePaper[]> {
  try {
    const papers = await client.fetch<WhitePaper[]>(allWhitePapersQuery);
    return papers.length > 0 ? papers : fallbackPapers;
  } catch {
    return fallbackPapers;
  }
}

export default async function WhitePapersPage() {
  const papers = await getWhitePapers();

  return (
    <>
      {/* Hero */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'White Papers', href: '/resources/white-papers' },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Academic Research</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                White Papers
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                In-depth research and analysis on DPDP Act compliance, data
                protection frameworks, and industry best practices.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Papers Grid */}
      <Section background="gray">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {papers.map((paper) => (
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
                    <h2 className="text-lg font-serif font-semibold text-neutral-950 mb-2 group-hover:text-primary-900 transition-colors">
                      {paper.title}
                    </h2>
                    <p className="text-sm text-neutral-700 leading-relaxed font-serif line-clamp-3 mb-3">
                      {paper.abstract}
                    </p>
                    {paper.topics && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-200">
                        {paper.topics.map((topic) => (
                          <span key={topic} className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-600 font-semibold bg-neutral-100 px-2 py-1 border border-neutral-300">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif inline-flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
