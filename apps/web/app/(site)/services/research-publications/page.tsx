import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, BookOpen, Users, Download, ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeader, Button, Card, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ServiceJsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, allWhitePapersQuery, type WhitePaper } from '@/lib/sanity';

export const metadata: Metadata = generatePageMetadata({
  title: 'Research & Publications',
  description:
    'Access CADP\'s research publications, white papers, and thought leadership on DPDP Act compliance and data protection in India.',
  path: '/services/research-publications',
  keywords: [
    'DPDP research',
    'data protection publications',
    'privacy law research',
    'DPDP white papers',
  ],
});

// Fallback publications
const fallbackPublications = [
  {
    _id: '1',
    title: 'DPDP Implementation Roadmap for Indian Organisations',
    slug: { current: 'dpdp-implementation-roadmap' },
    abstract:
      'A comprehensive framework for implementing DPDP Act compliance, including timelines, resource requirements, and best practices.',
    topics: ['Compliance', 'Implementation'],
    publishedAt: '2024-01-15',
  },
  {
    _id: '2',
    title: 'DPDP Act: Analysis and Commentary',
    slug: { current: 'dpdp-act-analysis-commentary' },
    abstract:
      'In-depth legal analysis of the Digital Personal Data Protection Act, 2023, covering key provisions and their implications.',
    topics: ['Legal Analysis', 'DPDP Act'],
    publishedAt: '2024-01-10',
  },
];

async function getPublications(): Promise<WhitePaper[]> {
  try {
    const papers = await client.fetch<WhitePaper[]>(allWhitePapersQuery);
    return papers.length > 0 ? papers : (fallbackPublications as WhitePaper[]);
  } catch {
    return fallbackPublications as WhitePaper[];
  }
}

const researchAreas = [
  {
    title: 'DPDP Act Analysis',
    description:
      'Detailed legal analysis of DPDP Act provisions, interpretations, and compliance requirements.',
  },
  {
    title: 'Comparative Studies',
    description:
      'Comparative analysis of DPDP Act with international frameworks like GDPR, CCPA, and others.',
  },
  {
    title: 'Sector-Specific Guidance',
    description:
      'Industry-focused research on data protection challenges and solutions for specific sectors.',
  },
  {
    title: 'Technology & Privacy',
    description:
      'Research on privacy-enhancing technologies, AI governance, and emerging tech challenges.',
  },
];

const collaborationOptions = [
  {
    icon: BookOpen,
    title: 'Joint Research',
    description:
      'Partner with us on research projects exploring specific aspects of data protection law.',
  },
  {
    icon: Users,
    title: 'Research Sponsorship',
    description:
      'Support our research program and gain early access to insights and findings.',
  },
  {
    icon: FileText,
    title: 'Custom Research',
    description:
      'Commission bespoke research addressing your specific regulatory or industry questions.',
  },
];

export default async function ResearchPublicationsPage() {
  const publications = await getPublications();

  return (
    <>
      <ServiceJsonLd
        name="Research & Publications"
        description="Cutting-edge research and publications on data protection law and practice in India."
        url="https://cadp.in/services/research-publications"
      />

      {/* Hero */}
      <Section background="gray">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Services', href: '/services' },
              {
                name: 'Research & Publications',
                href: '/services/research-publications',
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-primary-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Research & Publications
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Cutting-edge research and thought leadership on data protection
                law and practice, contributing to the evolving discourse on
                privacy in India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/resources/white-papers">
                  Browse Publications
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button href="/contact" variant="outline">
                  Collaborate with Us
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-12 flex items-center justify-center">
              <FileText className="w-40 h-40 text-primary-300" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Research Areas */}
      <Section background="white">
        <Container>
          <SectionHeader
            title="Research Areas"
            subtitle="Our key areas of focus and expertise"
            centered
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {researchAreas.map((area) => (
              <Card key={area.title} hover={false} className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {area.title}
                </h3>
                <p className="text-neutral-600">{area.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Latest Publications */}
      <Section background="gray">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <SectionHeader
              title="Recent Publications"
              subtitle="Our latest research and white papers"
              className="mb-0"
            />
            <Link
              href="/resources/white-papers"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
            >
              View all publications
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {publications.slice(0, 4).map((pub) => (
              <Card key={pub._id} hover className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {pub.title}
                  </h3>
                  <Download className="w-5 h-5 text-neutral-400 shrink-0" />
                </div>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {pub.abstract}
                </p>
                {pub.topics && (
                  <div className="flex flex-wrap gap-2">
                    {pub.topics.map((topic) => (
                      <Badge key={topic}>{topic}</Badge>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Collaboration */}
      <Section background="white">
        <Container>
          <SectionHeader
            title="Research Collaboration"
            subtitle="Partner with us to advance data protection knowledge"
            centered
          />

          <div className="grid md:grid-cols-3 gap-8">
            {collaborationOptions.map((option) => (
              <div key={option.title} className="text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <option.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-neutral-600">{option.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Interested in Collaborating?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Whether you want to partner on research, sponsor our work, or
              commission custom studies, we&apos;d love to hear from you.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Get in Touch
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
