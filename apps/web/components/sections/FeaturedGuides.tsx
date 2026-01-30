import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Container, Section, SectionHeader } from '@/components/ui';
import { getCategoryLabel } from '@/lib/utils';

// Static guides data (must match guides in /resources/guides/page.tsx)
const staticGuides = [
  {
    _id: '1',
    title: 'DPDP Rules 2025: Complete Guide',
    slug: 'dpdp-rules-2025',
    excerpt:
      'Comprehensive breakdown of all 23 DPDP Rules 2025. Learn what the rules require, implementation timelines, and compliance obligations for Indian businesses.',
    category: 'Foundational',
  },
  {
    _id: '2',
    title: 'DPDP Implementation Roadmap',
    slug: 'dpdp-implementation-roadmap',
    excerpt:
      'Comprehensive implementation roadmap for the Digital Personal Data Protection Act 2023 and Rules 2025. Strategic guidance on phased compliance, priority actions, and organizational readiness.',
    category: 'Implementation',
  },
];

export async function FeaturedGuides() {
  const guides = staticGuides;

  if (guides.length === 0) {
    return null;
  }

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
          {guides.slice(0, 3).map((guide, index) => (
            <Link
              key={guide._id}
              href={`/resources/guides/${guide.slug}`}
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
