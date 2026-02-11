import { Metadata } from 'next';
import {
  Shield,
  Search,
  FileCheck,
  Settings,
  ArrowRight,
  BookOpen,
  Scale,
  Target,
  Users,
} from 'lucide-react';
import { Container, Section, Button } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ServiceJsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'DPDP Compliance Advisory',
  description:
    'Research-informed legal guidance on DPDP Act compliance including institutional assessment, policy frameworks, and implementation methodologies for Indian organisations.',
  path: '/programs-and-initiatives/compliance-advisory',
  keywords: [
    'DPDP compliance advisory',
    'data protection consulting',
    'DPDP gap assessment',
    'privacy compliance India',
  ],
});

const advisoryAreas = [
  {
    icon: Search,
    title: 'Institutional Assessment',
    description:
      'Systematic evaluation of current data governance practices against DPDP Act requirements and compliance benchmarks.',
    deliverables: [
      'Current state analysis',
      'Gap identification report',
      'Risk prioritisation matrix',
      'Governance-level summary',
    ],
  },
  {
    icon: FileCheck,
    title: 'Policy Framework Development',
    description:
      'Development and evaluation of data protection policy frameworks, procedural documentation, and governance instruments.',
    deliverables: [
      'Privacy policy frameworks',
      'Data processing agreements',
      'Consent mechanism design',
      'Procedural documentation',
    ],
  },
  {
    icon: Settings,
    title: 'Implementation Guidance',
    description:
      'Technical and legal guidance for implementing compliance frameworks across institutional functions.',
    deliverables: [
      'Implementation roadmap',
      'Process adaptation frameworks',
      'Technical architecture guidance',
      'Stakeholder engagement strategy',
    ],
  },
  {
    icon: Shield,
    title: 'Ongoing Advisory',
    description:
      'Continuous analytical support for maintaining compliance amid regulatory and operational evolution.',
    deliverables: [
      'Periodic compliance evaluation',
      'Regulatory development analysis',
      'Incident response guidance',
      'Annual compliance assessment',
    ],
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Institutional Discovery',
    description:
      'Mapping organizational structures, data flows, and existing governance practices.',
  },
  {
    step: '02',
    title: 'Legal Assessment',
    description:
      'Systematic evaluation of current practices against DPDP Act requirements.',
  },
  {
    step: '03',
    title: 'Strategic Roadmap',
    description:
      'Development of prioritized compliance pathways aligned with institutional objectives.',
  },
  {
    step: '04',
    title: 'Framework Implementation',
    description:
      'Guidance on operationalizing compliance measures across policy, process, and technical domains.',
  },
  {
    step: '05',
    title: 'Compliance Validation',
    description:
      'Verification that implemented frameworks satisfy regulatory requirements.',
  },
  {
    step: '06',
    title: 'Continuous Advisory',
    description:
      'Ongoing analytical support for sustained compliance maintenance.',
  },
];

const valuePropositions = [
  {
    icon: Scale,
    title: 'Legal Scholarship',
    description: 'Guidance grounded in rigorous legal analysis and doctrinal research',
  },
  {
    icon: Target,
    title: 'Applied Methodology',
    description: 'Frameworks adapted to institutional contexts and operational requirements',
  },
  {
    icon: Users,
    title: 'Academic Foundation',
    description: 'Scholarly resources and institutional credibility of KLE Law College, Bengaluru',
  },
];

export default function ComplianceAdvisoryPage() {
  return (
    <>
      <ServiceJsonLd
        name="DPDP Compliance Advisory"
        description="Research-informed legal guidance on DPDP Act compliance including institutional assessment, policy frameworks, and implementation methodologies."
        url="https://cadp.in/programs-and-initiatives/compliance-advisory"
      />

      {/* Hero Section */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Programs & Initiatives', href: '/programs-and-initiatives' },
              { name: 'Compliance Advisory', href: '/programs-and-initiatives/compliance-advisory' },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Legal & Technical Guidance
                </div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                DPDP Act <span className="italic text-primary-900">Compliance Advisory</span>
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif mb-8">
                Research-informed legal and technical guidance on achieving and maintaining DPDP Act compliance,
                from institutional assessment through implementation frameworks to ongoing regulatory analysis.
                Academic rigour integrated with applied methodologies.
              </p>

              {/* Decorative divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="h-px w-16 bg-accent-600"></div>
                <div className="w-2 h-2 rotate-45 bg-accent-600"></div>
                <div className="h-px w-16 bg-accent-600"></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" size="lg" variant="primary">
                  Advisory Enquiry
                </Button>
                {/* <Button
                  href="/resources/guides/dpdp-compliance-advisory-what-to-expect"
                  size="lg"
                  variant="outline"
                >
                  Advisory Guide
                </Button> */}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Advisory Services */}
      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Advisory Focus Areas
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Compliance Advisory
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Systematic guidance across the institutional compliance development pathway.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {advisoryAreas.map((area, index) => (
              <div key={area.title} className="bg-white border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="h-2 bg-accent-600"></div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50">
                      <area.icon className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
                    </div>
                    <div className="text-4xl font-serif text-neutral-200 leading-none">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-semibold text-neutral-950 mb-4">
                    {area.title}
                  </h3>
                  <p className="text-neutral-700 mb-6 leading-relaxed font-serif">
                    {area.description}
                  </p>

                  <div className="pt-5 border-t border-neutral-300">
                    <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-3">
                      Key Deliverables
                    </div>
                    <ul className="space-y-2">
                      {area.deliverables.map((deliverable) => (
                        <li key={deliverable} className="text-sm text-neutral-600 flex items-start gap-2 font-serif">
                          <span className="text-accent-600 mt-0.5">▪</span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Value Propositions */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Our Approach
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Scholarly Analysis, Applied Frameworks
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Legal guidance integrating doctrinal research with institutional implementation methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {valuePropositions.map((value) => (
              <div key={value.title} className="bg-white border-2 border-neutral-300 shadow-sm text-center">
                <div className="h-1.5 bg-accent-600"></div>
                <div className="p-8">
                  <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-serif">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Methodology
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Advisory Methodology
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Systematic, phased framework for developing sustainable institutional compliance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="bg-white border-2 border-neutral-300 shadow-sm">
                <div className="h-1.5 bg-primary-600"></div>
                <div className="p-6">
                  <div className="text-4xl font-serif text-primary-200 mb-4 leading-none">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-serif">
                    {step.description}
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
                  Get Started
                </div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">
                Advance Institutional Compliance
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Connect with the Centre to discuss compliance requirements
                and explore advisory frameworks suited to institutional contexts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="secondary" size="lg">
                  Advisory Enquiry
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
