import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { LegislationJsonLd, WebApplicationJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { formatDate } from '@/lib/utils';
import { formatSectionId } from '@/lib/official-texts/utils';
import {
  loadDocument,
  loadAllDocuments,
  getDocumentIds,
  countSections,
} from '@/lib/official-texts/utils';
import {
  client,
  annotationsByDocumentQuery,
  resourcesByDocumentQuery,
  casesByDocumentQuery,
} from '@/lib/sanity';
import type {
  Annotation,
  SectionResource,
  CaseReference,
  Corrigendum,
} from '@/data/official-texts/types';
import { DocumentReader } from '../components/DocumentReader';

interface PageProps {
  params: Promise<{ documentId: string }>;
}

export async function generateStaticParams() {
  return getDocumentIds().map((id) => ({ documentId: id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { documentId } = await params;
  const doc = await loadDocument(documentId);
  if (!doc) return {};

  return generatePageMetadata({
    title: `${doc.shortTitle} Full Text — Interactive Reference`,
    description: `Interactive research aid for ${doc.title}. Searchable sections with defined term explanations, cross-referenced resources, and case law \u2014 a comprehensive legal reference tool for compliance professionals and researchers.`,
    path: `/resources/official-texts/${documentId}`,
    keywords: [
      doc.shortTitle,
      `${doc.shortTitle} full text`,
      `${doc.shortTitle} bare act`,
      'DPDP research tool',
      'DPDP interactive reference',
      'data protection India',
      'legal reference tool',
    ],
  });
}

async function fetchSanityData(documentId: string) {
  try {
    const [annotations, resources, cases] = await Promise.all([
      client.fetch<Annotation[]>(annotationsByDocumentQuery, { documentId }),
      client.fetch<SectionResource[]>(resourcesByDocumentQuery, { documentId }),
      client.fetch<CaseReference[]>(casesByDocumentQuery, { documentId }),
    ]);
    return {
      annotations: annotations || [],
      resources: resources || [],
      cases: cases || [],
    };
  } catch {
    return { annotations: [], resources: [], cases: [] };
  }
}

function CorrigendaBanner({ corrigenda }: { corrigenda: Corrigendum[] }) {
  if (corrigenda.length === 0) return null;

  return (
    <div className="mb-12 border-l-4 border-neutral-300 bg-neutral-50 p-6">
      <div className="text-xs uppercase tracking-[0.2em] text-neutral-600 font-semibold mb-3">
        Corrections Incorporated
      </div>
      <div className="space-y-3">
        {corrigenda.map((c) => (
          <div key={c.id}>
            <div className="text-sm font-serif text-neutral-700">
              <span className="font-semibold">{c.description}</span>
              {' — '}
              {c.gazetteNumber}, {formatDate(c.date)}
            </div>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {c.affectedSections.map((sectionId) => (
                <a
                  key={sectionId}
                  href={`#${sectionId}`}
                  className="text-xs font-serif font-semibold text-primary-700 hover:text-primary-900 hover:underline"
                >
                  {formatSectionId(sectionId)}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function OfficialTextPage({ params }: PageProps) {
  const { documentId } = await params;
  const doc = await loadDocument(documentId);
  if (!doc) notFound();

  const allDocuments = await loadAllDocuments();
  const { annotations, resources, cases } = await fetchSanityData(documentId);

  return (
    <>
      <LegislationJsonLd
        title={doc.title}
        shortTitle={doc.shortTitle}
        description={`Interactive research aid for ${doc.title}. Searchable sections with defined term explanations, cross-referenced resources, and case law.`}
        type={doc.type}
        gazetteNumber={doc.gazetteNumber}
        dateEnacted={doc.dateEnacted}
        url={`https://cadp.in/resources/official-texts/${doc.id}`}
        parentLegislationUrl={
          doc.type !== 'act'
            ? 'https://cadp.in/resources/official-texts/dpdp-act-2023'
            : undefined
        }
        parentLegislationName={
          doc.type !== 'act'
            ? 'The Digital Personal Data Protection Act, 2023'
            : undefined
        }
      />
      <WebApplicationJsonLd
        name={`${doc.shortTitle} — Interactive Reference`}
        description={`Free interactive research tool for ${doc.title}. Search sections, explore defined terms, and access curated resources and case law references.`}
        url={`https://cadp.in/resources/official-texts/${doc.id}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Resources', href: '/resources' },
          { name: 'Official Texts', href: '/resources/official-texts' },
          { name: doc.shortTitle, href: `/resources/official-texts/${doc.id}` },
        ]}
      />
      <style>{`header { position: relative !important; }`}</style>
      <Section background="white">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Official Texts', href: '/resources/official-texts' },
              {
                name: doc.shortTitle,
                href: `/resources/official-texts/${doc.id}`,
              },
            ]}
          />

          <div className="mt-8 mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Official Text
                </div>
                <div className="h-px w-24 bg-accent-600 mx-auto"></div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-950 mb-4 leading-tight">
                {doc.title}
              </h1>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600 font-serif mb-4">
                <span>{doc.gazetteNumber}</span>
                <span>Enacted: {formatDate(doc.dateEnacted)}</span>
              </div>

              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                  {countSections(doc)} Sections
                </span>
                <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                  {doc.schedules.length} Schedules
                </span>
                <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                  {doc.definitions.length} Defined Terms
                </span>
              </div>
            </div>
          </div>

          <CorrigendaBanner corrigenda={doc.corrigenda} />

          <DocumentReader
            document={doc}
            allDocuments={allDocuments}
            annotations={annotations}
            resources={resources}
            cases={cases}
          />
        </Container>
      </Section>
    </>
  );
}
