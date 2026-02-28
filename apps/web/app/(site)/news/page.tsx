import { Metadata } from 'next';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Newsletter } from '@/components/sections';
import { NewsGrid } from '@/components/sections/NewsGrid';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, allNewsQuery, type NewsArticle } from '@/lib/sanity';

export const metadata: Metadata = generatePageMetadata({
  title: 'Data Protection News from India',
  description:
    'Curated updates on the DPDP Act, enforcement actions, court decisions, and data protection developments across India. Published by CADP Correspondent.',
  path: '/news',
  keywords: [
    'DPDP Act news',
    'data protection India news',
    'DPDP enforcement',
    'data protection board India',
    'privacy law India updates',
  ],
});

const fallbackNews: NewsArticle[] = [
  {
    _id: 'fn-1',
    title: 'DPDP Rules 2025 Draft Released for Public Consultation',
    slug: { current: 'dpdp-rules-2025-draft-released' },
    excerpt:
      'MeitY releases draft DPDP Rules for public consultation, outlining compliance timelines and data fiduciary obligations.',
    category: 'government-orders',
    sourceUrl: 'https://example.com',
    sourceName: 'LiveLaw',
    publishedAt: '2025-12-15',
  },
  {
    _id: 'fn-2',
    title: 'Data Protection Board of India Constituted Under DPDP Act',
    slug: { current: 'dpbi-constituted-under-dpdp-act' },
    excerpt:
      'The Central Government formally constitutes the Data Protection Board of India to adjudicate complaints under the DPDP Act.',
    category: 'government-orders',
    sourceUrl: 'https://example.com',
    sourceName: 'The Hindu',
    publishedAt: '2025-11-20',
  },
  {
    _id: 'fn-3',
    title: 'Karnataka High Court Rules on Consent Requirements Under DPDP',
    slug: { current: 'karnataka-hc-consent-ruling-dpdp' },
    excerpt:
      'A landmark ruling clarifies the scope of "informed consent" for digital services under the DPDP Act.',
    category: 'court-decisions',
    sourceUrl: 'https://example.com',
    sourceName: 'Bar and Bench',
    publishedAt: '2025-10-30',
  },
  {
    _id: 'fn-4',
    title: 'CADP Launches Advanced DPDP Compliance Certification Programme',
    slug: { current: 'cadp-launches-dpdp-certification' },
    excerpt:
      'CADP introduces a new certification programme for data protection professionals covering DPDP Act compliance end-to-end.',
    category: 'cadp-announcements',
    publishedAt: '2025-10-01',
  },
];

async function getNews(): Promise<NewsArticle[]> {
  try {
    const news = await client.fetch<NewsArticle[]>(allNewsQuery);
    return news.length > 0 ? news : fallbackNews;
  } catch {
    return fallbackNews;
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      {/* Hero */}
      <Section background="white" className="py-8 md:py-10">
        <Container>
          <Breadcrumbs
            items={[{ name: 'News', href: '/news' }]}
          />

          <div className="mt-4 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-2 leading-tight">
              Data Protection News from India
            </h1>
            <p className="text-base text-neutral-600 font-serif">
              Curated updates on the DPDP Act, enforcement actions, and data
              protection developments across India.
            </p>
          </div>
        </Container>
      </Section>

      {/* News Grid with Filters */}
      <Section background="gray">
        <Container>
          <NewsGrid news={news} />
        </Container>
      </Section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
