import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Newsletter } from '@/components/sections';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Guides',
  description:
    'Comprehensive guides on DPDP Act compliance, data protection implementation, and strategic frameworks for organizational readiness.',
  path: '/resources/guides',
  keywords: ['DPDP guides', 'compliance guides', 'data protection resources'],
});

// Static guides configuration
const guides = [
  {
    id: '1',
    title: 'DPDP Rules 2025: Complete Guide',
    slug: 'dpdp-rules-2025',
    excerpt:
      'Comprehensive breakdown of all 23 DPDP Rules 2025. Learn what the rules require, implementation timelines, and compliance obligations for Indian businesses.',
    category: 'Foundational',
    publishedAt: '2026-01-31',
  },
  {
    id: '2',
    title: 'DPDP Implementation Roadmap',
    slug: 'dpdp-implementation-roadmap',
    excerpt:
      'Comprehensive implementation roadmap for the Digital Personal Data Protection Act 2023 and Rules 2025. Strategic guidance on phased compliance, priority actions, and organizational readiness.',
    category: 'Implementation',
    publishedAt: '2026-01-30',
  },
];

export default function GuidesPage() {
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
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Pillar Content
                </div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Guides
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                In-depth resources covering key aspects of DPDP Act compliance, implementation
                strategies, and data protection best practices.
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
                key={guide.id}
                href={`/resources/guides/${guide.slug}`}
                className="group block bg-white border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {/* Top accent bar */}
                <div className="h-2 bg-accent-600 group-hover:bg-accent-700 transition-colors"></div>

                <div className="p-7">
                  {/* Icon and Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 transition-all">
                      <BookOpen
                        className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="text-5xl font-serif text-neutral-200 group-hover:text-accent-600 transition-colors leading-none">
                      {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][index] ||
                        index + 1}
                    </div>
                  </div>

                  {/* Category */}
                  {guide.category && (
                    <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-primary-800 font-semibold mb-3 bg-primary-50 px-2.5 py-1 border border-primary-200 inline-block">
                      {guide.category}
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
                      <span className="text-primary-700 group-hover:text-white transition-colors text-lg">
                        →
                      </span>
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
