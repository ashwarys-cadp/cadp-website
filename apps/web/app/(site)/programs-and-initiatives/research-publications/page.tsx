import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  BookOpen,
  Users,
  Download,
  ArrowRight,
  Lightbulb,
  Award,
  Target,
} from 'lucide-react';
import { Container, Section, Button, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ServiceJsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { client, allWhitePapersQuery, type WhitePaper } from '@/lib/sanity';

export const metadata: Metadata = generatePageMetadata({
  title: 'Research & Publications',
  description:
    'Access CADP\'s research publications, white papers, and thought leadership on DPDP Act compliance and data protection in India.',
  path: '/programs-and-initiatives/research-publications',
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

const researchFocus = [
  {
    icon: Lightbulb,
    title: 'Theoretical Foundations',
    description: 'Examining the conceptual underpinnings of data protection and privacy law',
  },
  {
    icon: Award,
    title: 'Comparative Analysis',
    description: 'Studying global data protection frameworks to inform Indian jurisprudence',
  },
  {
    icon: Target,
    title: 'Applied Research',
    description: 'Addressing practical implementation challenges faced by organisations',
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
      'Support our research programme and gain early access to insights and findings.',
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
        url="https://cadp.in/programs-and-initiatives/research-publications"
      />

      {/* Hero Section */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Programs & Initiatives', href: '/programs-and-initiatives' },
              { name: 'Research & Publications', href: '/programs-and-initiatives/research-publications' },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Academic Research
                </div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Research & <span className="italic text-primary-900">Publications</span>
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif mb-8">
                Contributing to the scholarly discourse on data protection through rigorous research,
                publications, and thought leadership. Our work bridges academic inquiry with practical
                application to advance the jurisprudence of privacy law in India.
              </p>

              {/* Decorative divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="h-px w-16 bg-accent-600"></div>
                <div className="w-2 h-2 rotate-45 bg-accent-600"></div>
                <div className="h-px w-16 bg-accent-600"></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/resources/white-papers" size="lg" variant="primary">
                  View Publications
                </Button>
                <Button
                  href="/contact"
                  size="lg"
                  variant="outline"
                >
                  Collaborate With Us
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Research Focus */}
      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Research Areas
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Our Research Focus
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Three complementary streams of inquiry informing our research agenda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {researchFocus.map((focus) => (
              <div key={focus.title} className="bg-white border-2 border-neutral-300 shadow-sm text-center">
                <div className="h-1.5 bg-accent-600"></div>
                <div className="p-8">
                  <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 mx-auto mb-4">
                    <focus.icon className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">
                    {focus.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-serif">
                    {focus.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Recent Publications */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Latest Work
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="text-left md:text-center flex-1">
                <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-4">
                  Recent Publications
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed font-serif">
                  Our latest research and white papers on data protection law.
                </p>
              </div>
              <Link
                href="/resources/white-papers"
                className="inline-flex items-center text-primary-800 hover:text-primary-900 font-semibold font-serif border-b-2 border-primary-300 hover:border-primary-800 pb-1 transition-all self-start md:self-end"
              >
                View All Publications
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {publications.slice(0, 4).map((pub, index) => (
              <div key={pub._id} className="bg-white border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="h-2 bg-primary-600"></div>
                <div className="p-8">
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-semibold text-neutral-950 mb-2">
                        {pub.title}
                      </h3>
                      {pub.publishedAt && (
                        <div className="text-sm text-primary-800 font-semibold uppercase tracking-wide mb-3">
                          {new Date(pub.publishedAt).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </div>
                      )}
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl font-serif text-neutral-200 leading-none">
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 border-2 border-neutral-300 flex items-center justify-center bg-neutral-50 hover:bg-primary-50 hover:border-primary-600 transition-colors">
                        <Download className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-700 mb-6 leading-relaxed font-serif">
                    {pub.abstract}
                  </p>

                  {pub.topics && pub.topics.length > 0 && (
                    <div className="pt-5 border-t border-neutral-300">
                      <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-3">
                        Research Topics
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pub.topics.map((topic) => (
                          <span
                            key={topic}
                            className="inline-block px-3 py-1 bg-accent-100 border border-accent-300 text-accent-800 text-xs font-semibold uppercase tracking-wider"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Collaboration */}
      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Partnership Opportunities
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Research Collaboration
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Partner with us to advance data protection knowledge and scholarship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {collaborationOptions.map((option) => (
              <div key={option.title} className="bg-white border-2 border-neutral-300 shadow-sm">
                <div className="h-1.5 bg-accent-600"></div>
                <div className="p-8 text-center">
                  <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 mx-auto mb-4">
                    <option.icon className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">
                    {option.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-serif">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="white">
        <Container size="narrow">
          <div className="border-4 border-primary-950 bg-primary-950 p-10 md:p-14 shadow-xl relative">
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent-600 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent-600 opacity-20"></div>

            <div className="text-center relative z-10">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">
                  Get Involved
                </div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">
                Interested in Collaborating?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Whether you wish to partner on research, sponsor our work, or commission
                custom studies, we welcome the opportunity to collaborate with you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="secondary" size="lg">
                  Get in Touch
                </Button>
                <Button
                  href="/programs-and-initiatives"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-950 transition-colors font-semibold"
                >
                  Explore All Programmes
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
