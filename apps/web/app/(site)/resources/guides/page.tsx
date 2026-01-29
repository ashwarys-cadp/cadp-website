import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Newsletter } from '@/components/sections';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, allGuidesQuery, type Guide } from '@/lib/sanity';
import { getCategoryLabel } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'Guides',
  description:
    'Comprehensive guides on DPDP Act compliance, data protection training, and advisory services.',
  path: '/resources/guides',
  keywords: ['DPDP guides', 'compliance guides', 'data protection resources'],
});

// Fallback guides
const fallbackGuides: Guide[] = [
  {
    _id: '1',
    title: 'Complete Guide to DPDP Act Compliance for Indian Organisations',
    slug: { current: 'complete-guide-dpdp-act-compliance' },
    excerpt:
      'Everything you need to know about achieving and maintaining compliance with India\'s Digital Personal Data Protection Act.',
    category: 'dpdp-compliance',
    publishedAt: '2024-01-15',
  },
  {
    _id: '2',
    title: 'DPDP Training Programs: Building Data Protection Capability',
    slug: { current: 'dpdp-training-for-organisations' },
    excerpt:
      'How to build data protection expertise in your organisation through structured training programs.',
    category: 'training',
    publishedAt: '2024-01-10',
  },
  {
    _id: '3',
    title: 'DPDP Compliance Advisory: From Gap Assessment to Implementation',
    slug: { current: 'dpdp-compliance-advisory-what-to-expect' },
    excerpt:
      'A comprehensive look at the compliance advisory process and what organisations can expect.',
    category: 'advisory',
    publishedAt: '2024-01-05',
  },
];

async function getGuides(): Promise<Guide[]> {
  try {
    const guides = await client.fetch<Guide[]>(allGuidesQuery);
    return guides.length > 0 ? guides : fallbackGuides;
  } catch {
    return fallbackGuides;
  }
}

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <>
      {/* Hero */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Guides', href: '/resources/guides' },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Pillar Content</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Guides
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                In-depth resources covering key aspects of DPDP Act compliance and
                data protection best practices.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Guides Grid */}
      <Section background="gray">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <Link
                key={guide._id}
                href={`/resources/guides/${guide.slug.current}`}
                className="group block bg-white border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {/* Top accent bar */}
                <div className="h-2 bg-accent-600 group-hover:bg-accent-700 transition-colors"></div>

                <div className="p-7">
                  {/* Icon and Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 transition-all">
                      <BookOpen className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <div className="text-5xl font-serif text-neutral-200 group-hover:text-accent-600 transition-colors leading-none">
                      {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][index] || (index + 1)}
                    </div>
                  </div>

                  {/* Category */}
                  {guide.category && (
                    <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-primary-800 font-semibold mb-3 bg-primary-50 px-2.5 py-1 border border-primary-200 inline-block">
                      {getCategoryLabel(guide.category)}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-serif font-semibold text-neutral-950 mb-4 leading-tight group-hover:text-primary-900 transition-colors">
                    {guide.title}
                  </h2>

                  {/* Description */}
                  <p className="text-neutral-700 leading-relaxed font-serif text-[0.9375rem] line-clamp-3">
                    {guide.excerpt}
                  </p>

                  {/* Learn more arrow */}
                  <div className="mt-6 pt-5 border-t border-neutral-300 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif">
                      Read Guide
                    </span>
                    <div className="w-8 h-8 border-2 border-primary-700 group-hover:border-primary-900 group-hover:bg-primary-900 flex items-center justify-center transition-all">
                      <span className="text-primary-700 group-hover:text-white transition-colors text-lg">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
