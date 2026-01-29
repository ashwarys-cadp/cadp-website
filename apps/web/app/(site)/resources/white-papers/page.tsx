import { Metadata } from 'next';
import Link from 'next/link';
import { Download, FileText } from 'lucide-react';
import { Container, Section, Card, Badge } from '@/components/ui';
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
      <Section background="gray">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'White Papers', href: '/resources/white-papers' },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              White Papers
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              In-depth research and analysis on DPDP Act compliance, data
              protection frameworks, and industry best practices.
            </p>
          </div>
        </Container>
      </Section>

      {/* Papers Grid */}
      <Section background="white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {papers.map((paper) => (
              <Link
                key={paper._id}
                href={`/resources/white-papers/${paper.slug.current}`}
                className="group"
              >
                <Card hover className="h-full p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-7 h-7 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {paper.title}
                      </h2>
                      <p className="text-neutral-600 mb-4 line-clamp-3">
                        {paper.abstract}
                      </p>
                      {paper.topics && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {paper.topics.map((topic) => (
                            <Badge key={topic}>{topic}</Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-primary-600 text-sm font-medium">
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </div>
                    </div>
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
