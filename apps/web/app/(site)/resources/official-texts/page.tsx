import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { loadAllDocuments } from '@/lib/official-texts/utils';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'Official Texts — DPDP Act & Rules',
  description:
    'Read the full text of the Digital Personal Data Protection Act, 2023 and DPDP Rules 2025. Searchable, annotated, with plain-language explanations.',
  path: '/resources/official-texts',
  keywords: [
    'DPDP Act full text',
    'DPDP Rules full text',
    'bare act DPDP',
    'digital personal data protection act text',
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

export default async function OfficialTextsPage() {
  const documents = (await loadAllDocuments()).sort(
    (a, b) =>
      new Date(b.dateEnacted).getTime() - new Date(a.dateEnacted).getTime()
  );

  return (
    <>
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

          {/* Table view */}
          <div className="max-w-3xl mx-auto">
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
        </Container>
      </Section>
    </>
  );
}
