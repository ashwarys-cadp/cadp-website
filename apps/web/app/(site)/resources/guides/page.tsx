import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { Container, Section, SectionHeader, Card, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, urlFor, allGuidesQuery, type Guide } from '@/lib/sanity';
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
      <Section background="gray">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Guides', href: '/resources/guides' },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Guides
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              In-depth resources covering key aspects of DPDP Act compliance and
              data protection best practices.
            </p>
          </div>
        </Container>
      </Section>

      {/* Guides Grid */}
      <Section background="white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide._id}
                href={`/resources/guides/${guide.slug.current}`}
                className="group"
              >
                <Card hover className="h-full">
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
                  <div className="p-5">
                    {guide.category && (
                      <div className="text-xs text-primary-600 font-medium mb-2">
                        {getCategoryLabel(guide.category)}
                      </div>
                    )}
                    <h2 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {guide.title}
                    </h2>
                    <p className="text-sm text-neutral-600 line-clamp-3">
                      {guide.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
