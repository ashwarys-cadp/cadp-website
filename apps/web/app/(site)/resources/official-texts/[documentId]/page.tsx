import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
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
    title: `${doc.shortTitle} — Full Text`,
    description: `Read the full text of ${doc.title}. Searchable, with defined term explanations, curated resources, and case law references.`,
    path: `/resources/official-texts/${documentId}`,
    keywords: [
      doc.shortTitle,
      'full text',
      'bare act',
      'DPDP',
      'data protection India',
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

export default async function OfficialTextPage({ params }: PageProps) {
  const { documentId } = await params;
  const doc = await loadDocument(documentId);
  if (!doc) notFound();

  const allDocuments = await loadAllDocuments();
  const { annotations, resources, cases } = await fetchSanityData(documentId);

  return (
    <>
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
                <span>Enacted: {doc.dateEnacted}</span>
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
