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
    'Expert DPDP Act compliance advisory services including gap assessment, policy development, and implementation support for Indian organisations.',
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
    title: 'Gap Assessment',
    description:
      'Comprehensive review of your current data practices against DPDP Act requirements.',
    deliverables: [
      'Current state analysis',
      'Gap identification report',
      'Risk prioritisation matrix',
      'Executive summary',
    ],
  },
  {
    icon: FileCheck,
    title: 'Policy Development',
    description:
      'Drafting and review of data protection policies, procedures, and documentation.',
    deliverables: [
      'Privacy policy',
      'Data processing agreements',
      'Consent mechanisms',
      'Internal procedures',
    ],
  },
  {
    icon: Settings,
    title: 'Implementation Support',
    description:
      'Hands-on guidance to implement compliance measures across your organisation.',
    deliverables: [
      'Implementation roadmap',
      'Process redesign support',
      'Technology recommendations',
      'Stakeholder coordination',
    ],
  },
  {
    icon: Shield,
    title: 'Ongoing Compliance',
    description:
      'Continuous support to maintain compliance as regulations and your business evolve.',
    deliverables: [
      'Regular compliance reviews',
      'Regulatory update briefings',
      'Incident response support',
      'Annual compliance audit',
    ],
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We understand your organisation, data flows, and current privacy practices.',
  },
  {
    step: '02',
    title: 'Assessment',
    description:
      'We conduct a thorough gap assessment against DPDP Act requirements.',
  },
  {
    step: '03',
    title: 'Roadmap',
    description:
      'We develop a prioritised compliance roadmap aligned with your business goals.',
  },
  {
    step: '04',
    title: 'Implementation',
    description:
      'We support you in implementing necessary changes across policies, processes, and technology.',
  },
  {
    step: '05',
    title: 'Validation',
    description:
      'We verify that implemented measures meet compliance requirements.',
  },
  {
    step: '06',
    title: 'Maintenance',
    description:
      'We provide ongoing support to maintain compliance over time.',
  },
];

const valuePropositions = [
  {
    icon: Scale,
    title: 'Legal Expertise',
    description: 'Advisory grounded in rigorous legal analysis and scholarly research',
  },
  {
    icon: Target,
    title: 'Practical Focus',
    description: 'Solutions tailored to your operational realities and business context',
  },
  {
    icon: Users,
    title: 'Institutional Backing',
    description: 'Credibility and resources of KLE Law College, Bengaluru',
  },
];

export default function ComplianceAdvisoryPage() {
  return (
    <>
      <ServiceJsonLd
        name="DPDP Compliance Advisory"
        description="Expert DPDP Act compliance advisory services including gap assessment, policy development, and implementation support."
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
                  Legal Advisory Services
                </div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                DPDP Act <span className="italic text-primary-900">Compliance Advisory</span>
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif mb-8">
                Expert legal guidance on achieving and maintaining DPDP Act compliance,
                from initial assessment through implementation to ongoing regulatory support.
                Our advisory services combine scholarly rigour with practical application.
              </p>

              {/* Decorative divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="h-px w-16 bg-accent-600"></div>
                <div className="w-2 h-2 rotate-45 bg-accent-600"></div>
                <div className="h-px w-16 bg-accent-600"></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" size="lg" variant="primary">
                  Request Advisory
                </Button>
                <Button
                  href="/resources/guides/dpdp-compliance-advisory-what-to-expect"
                  size="lg"
                  variant="outline"
                >
                  Advisory Guide
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Value Propositions */}
      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Our Approach
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Academic Rigour, Practical Solutions
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Advisory services that bridge legal scholarship and business implementation.
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

      {/* Advisory Services */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Service Areas
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Advisory Services
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Comprehensive support for your compliance journey.
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
              Our Advisory Process
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              A structured, phased approach to achieving sustainable compliance.
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

      {/* Related Resources */}
      <Section background="white">
        <Container size="narrow">
          <div className="bg-white border-2 border-neutral-300 shadow-sm">
            <div className="h-2 bg-accent-600"></div>
            <div className="p-10">
              <div className="text-center mb-6">
                <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 mx-auto mb-4">
                  <BookOpen className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-3">
                  Further Reading
                </div>
              </div>
              <h2 className="text-2xl font-serif font-semibold text-neutral-950 mb-4 text-center">
                What to Expect from DPDP Advisory
              </h2>
              <p className="text-neutral-700 mb-6 leading-relaxed font-serif text-center max-w-2xl mx-auto">
                Our comprehensive guide examines the compliance advisory process,
                from initial gap assessment through implementation to ongoing regulatory support.
              </p>
              <div className="text-center">
                <Button
                  href="/resources/guides/dpdp-compliance-advisory-what-to-expect"
                  variant="outline"
                  size="lg"
                  className="inline-flex items-center gap-2"
                >
                  Read the Advisory Guide
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
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
                Start Your Compliance Journey
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Contact us for a consultation to discuss your compliance requirements
                and how our advisory services can support your organisation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="secondary" size="lg">
                  Request Advisory
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
