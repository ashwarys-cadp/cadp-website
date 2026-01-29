import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Container, Section, SectionHeader, Badge } from '@/components/ui';
import { client, urlFor, featuredGuidesQuery, type Guide } from '@/lib/sanity';
import { getCategoryLabel } from '@/lib/utils';

// Fallback guides for when Sanity is not connected
const fallbackGuides = [
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
    const guides = await client.fetch<Guide[]>(featuredGuidesQuery);
    return guides.length > 0 ? guides : fallbackGuides as Guide[];
  } catch {
    return fallbackGuides as Guide[];
  }
}

export async function FeaturedGuides() {
  const guides = await getGuides();

  return (
    <Section background="white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeader
            title="Featured Guides"
            subtitle="In-depth resources on DPDP compliance and data protection"
            className="mb-0"
          />
          <Link
            href="/resources/guides"
            className="mt-4 md:mt-0 inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
          >
            View all guides
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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
                    {['I', 'II', 'III'][index]}
                  </div>
                </div>

                {/* Category */}
                {guide.category && (
                  <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-primary-800 font-semibold mb-3 bg-primary-50 px-2.5 py-1 border border-primary-200 inline-block">
                    {getCategoryLabel(guide.category)}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-4 leading-tight group-hover:text-primary-900 transition-colors min-h-[3.5rem]">
                  {guide.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-700 leading-relaxed font-serif text-[0.9375rem]">
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
  );
}
