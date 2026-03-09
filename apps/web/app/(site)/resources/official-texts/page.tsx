import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, BookOpen, FileText, ArrowRight, ListChecks } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { CollectionPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { loadAllDocuments } from '@/lib/official-texts/utils';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'DPDP Act & Rules Full Text — Interactive Legal Reference',
  description:
    'Interactive research tool for India\u2019s data protection law. Full verbatim text of the DPDP Act 2023 and Rules 2025 with searchable sections, defined term explanations, curated resources, and case law references.',
  path: '/resources/official-texts',
  keywords: [
    'DPDP Act full text',
    'DPDP Rules 2025 full text',
    'bare act DPDP',
    'digital personal data protection act text',
    'DPDP research tool',
    'DPDP interactive reference',
    'data protection India legal reference',
    'DPDP Act sections',
  ],
});

const typeIcons: Record<string, typeof Scale> = {
  act: Scale,
  rules: BookOpen,
  notification: FileText,
};

const typeLabels: Record<string, string> = {
  act: 'Act',
  rules: 'Rules',
  notification: 'Notification',
};

function DocumentTable({ documents, label }: { documents: Awaited<ReturnType<typeof loadAllDocuments>>; label: string }) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">
        {label}
      </h2>
      <div className="border-2 border-neutral-300 bg-white">
        {/* Table header */}
        <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_40px] gap-0 border-b-2 border-neutral-300 bg-neutral-50">
          <div className="px-5 py-3 text-[0.6875rem] uppercase tracking-[0.15em] font-semibold text-neutral-500">
            Title
          </div>
          <div className="px-4 py-3 text-[0.6875rem] uppercase tracking-[0.15em] font-semibold text-neutral-500">
            Type
          </div>
          <div className="px-4 py-3 text-[0.6875rem] uppercase tracking-[0.15em] font-semibold text-neutral-500">
            Published
          </div>
          <div />
        </div>

        {/* Table rows */}
        {documents.map((doc, i) => {
          const Icon = typeIcons[doc.type];
          return (
            <Link
              key={doc.id}
              href={`/resources/official-texts/${doc.id}/`}
              className={`group block transition-colors hover:bg-primary-50 ${
                i < documents.length - 1
                  ? 'border-b border-neutral-200'
                  : ''
              }`}
            >
              {/* Desktop row */}
              <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_40px] gap-0 items-center">
                <div className="px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 border border-primary-900 shrink-0 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 transition-all">
                    <Icon
                      className="w-4 h-4 text-primary-900 group-hover:text-white transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <span className="text-sm font-serif font-semibold text-neutral-950 group-hover:text-primary-900 transition-colors leading-snug">
                      {doc.shortTitle}
                    </span>
                    <span className="block text-xs text-neutral-500 font-serif mt-0.5">
                      {doc.gazetteNumber}
                    </span>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <span className="text-[0.6875rem] uppercase tracking-widest text-primary-800 font-semibold bg-primary-50 border border-primary-200 px-2 py-0.5">
                    {typeLabels[doc.type]}
                  </span>
                </div>
                <div className="px-4 py-4 text-sm text-neutral-700 font-serif">
                  {formatDate(doc.dateEnacted)}
                </div>
                <div className="px-5 py-4 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif">
                    Read
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Mobile row */}
              <div className="md:hidden p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 border border-primary-900 shrink-0 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 transition-all">
                      <Icon
                        className="w-4 h-4 text-primary-900 group-hover:text-white transition-colors"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-sm font-serif font-semibold text-neutral-950 group-hover:text-primary-900 transition-colors leading-snug">
                      {doc.shortTitle}
                    </span>
                  </div>
                  <span className="text-[0.6875rem] uppercase tracking-widest text-primary-800 font-semibold bg-primary-50 border border-primary-200 px-2 py-0.5 shrink-0">
                    {typeLabels[doc.type]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 font-serif">
                    <span>{doc.gazetteNumber}</span>
                    <span>{formatDate(doc.dateEnacted)}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif">
                    Read
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default async function OfficialTextsPage() {
  const allDocuments = (await loadAllDocuments()).sort(
    (a, b) =>
      new Date(b.dateEnacted).getTime() - new Date(a.dateEnacted).getTime()
  );

  const primaryDocs = allDocuments.filter((d) => d.type === 'act' || d.type === 'rules');
  const secondaryDocs = allDocuments.filter((d) => d.type !== 'act' && d.type !== 'rules');

  return (
    <>
      <CollectionPageJsonLd
        name="DPDP Act & Rules — Interactive Legal Reference"
        description="Interactive research tool for India's data protection law. Full verbatim text with searchable sections, defined term explanations, curated resources, and case law references."
        url="https://cadp.in/resources/official-texts"
        items={allDocuments.map((doc) => ({
          name: doc.title,
          url: `https://cadp.in/resources/official-texts/${doc.id}`,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Resources', href: '/resources' },
          { name: 'Official Texts', href: '/resources/official-texts' },
        ]}
      />
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Official Texts', href: '/resources/official-texts' },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Legal Reference
                </div>
                <div className="h-px w-24 bg-accent-600 mx-auto"></div>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Official Texts
              </h1>

              <p className="text-lg text-neutral-700 leading-relaxed font-serif max-w-2xl mx-auto">
                Full verbatim text of India&apos;s data protection legislation.
                Searchable, with defined term explanations and curated
                cross-references.
              </p>
            </div>
          </div>

          {/* Implementation Tracker callout */}
          <div className="max-w-3xl mx-auto mb-10">
            <Link
              href="/resources/guides/dpdp-implementation-tracker/"
              className="group block border-2 border-primary-200 bg-primary-50 p-5 hover:border-primary-600 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-primary-900 shrink-0 flex items-center justify-center bg-white group-hover:bg-primary-900 transition-all">
                  <ListChecks className="w-5 h-5 text-primary-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-serif font-semibold text-primary-900 mb-1">
                    Looking for implementation status?
                  </h2>
                  <p className="text-sm text-neutral-700 font-serif leading-relaxed">
                    See our comprehensive DPDP Implementation Tracker for the status of every delegated obligation — which notifications have been issued and what remains pending.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary-700 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="max-w-3xl mx-auto space-y-10">
            <DocumentTable documents={primaryDocs} label="Legislation" />
            {secondaryDocs.length > 0 && (
              <DocumentTable documents={secondaryDocs} label="Notifications & Orders" />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
