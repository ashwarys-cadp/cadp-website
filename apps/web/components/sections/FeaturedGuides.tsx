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
          {guides.map((guide) => (
            <Link
              key={guide._id}
              href={`/resources/guides/${guide.slug.current}`}
              className="group"
            >
              <article className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-200">
                {/* Image */}
                <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-primary-50">
                  {guide.featuredImage ? (
                    <Image
                      src={urlFor(guide.featuredImage).width(600).height(340).url()}
                      alt={guide.featuredImage.alt || guide.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-primary-300" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">Guide</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {guide.category && (
                    <div className="text-xs text-primary-600 font-medium mb-2">
                      {getCategoryLabel(guide.category)}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-3">
                    {guide.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
