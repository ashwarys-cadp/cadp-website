import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Scale, BookOpen, ArrowRight } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { loadAllDocuments, countSections } from '@/lib/official-texts/utils';
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

const typeIcons = {
  act: Scale,
  rules: BookOpen,
  notification: FileText,
};

const typeLabels = {
  act: 'Act',
  rules: 'Rules',
  notification: 'Notification',
};

export default async function OfficialTextsPage() {
  const documents = await loadAllDocuments();

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

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {documents.map((doc) => {
              const Icon = typeIcons[doc.type];
              const sectionCount = countSections(doc);
              return (
                <Link
                  key={doc.id}
                  href={`/resources/official-texts/${doc.id}/`}
                  className="group block bg-white border-2 border-neutral-300 hover:border-primary-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <div className="h-2 bg-primary-600 group-hover:bg-primary-800 transition-colors"></div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 transition-all">
                        <Icon
                          className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-primary-800 font-semibold bg-primary-50 px-2.5 py-1 border border-primary-200">
                        {typeLabels[doc.type]}
                      </div>
                    </div>

                    <h2 className="text-xl font-serif font-semibold text-neutral-950 mb-3 leading-tight group-hover:text-primary-900 transition-colors">
                      {doc.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600 font-serif mb-4">
                      <span>{doc.gazetteNumber}</span>
                      <span>{formatDate(doc.dateEnacted)}</span>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm mb-6">
                      <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                        {sectionCount} Sections
                      </span>
                      <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                        {doc.schedules.length} Schedules
                      </span>
                      <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                        {doc.definitions.length} Definitions
                      </span>
                    </div>

                    <div className="pt-5 border-t border-neutral-300 flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif">
                        Read Full Text
                      </span>
                      <div className="w-8 h-8 border-2 border-primary-700 group-hover:border-primary-900 group-hover:bg-primary-900 flex items-center justify-center transition-all">
                        <ArrowRight className="w-4 h-4 text-primary-700 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
