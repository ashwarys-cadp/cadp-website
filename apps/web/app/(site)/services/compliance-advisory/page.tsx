import { Metadata } from 'next';
import {
  Shield,
  Search,
  FileCheck,
  Settings,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Container, Section, SectionHeader, Button, Card } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ServiceJsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'DPDP Compliance Advisory',
  description:
    'Expert DPDP Act compliance advisory services including gap assessment, policy development, and implementation support for Indian organisations.',
  path: '/services/compliance-advisory',
  keywords: [
    'DPDP compliance advisory',
    'data protection consulting',
    'DPDP gap assessment',
    'privacy compliance India',
  ],
});

const services = [
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

export default function ComplianceAdvisoryPage() {
  return (
    <>
      <ServiceJsonLd
        name="DPDP Compliance Advisory"
        description="Expert DPDP Act compliance advisory services including gap assessment, policy development, and implementation support."
        url="https://cadp.in/services/compliance-advisory"
      />

      {/* Hero */}
      <Section background="gray">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Services', href: '/services' },
              { name: 'Compliance Advisory', href: '/services/compliance-advisory' },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-primary-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Compliance Advisory
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Expert guidance on DPDP Act implementation, from initial
                assessment to full compliance and ongoing support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact">
                  Request Advisory
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button href="/resources/guides/dpdp-compliance-advisory-what-to-expect" variant="outline">
                  Read Our Advisory Guide
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-12 flex items-center justify-center">
              <Shield className="w-40 h-40 text-primary-300" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section background="white">
        <Container>
          <SectionHeader
            title="Advisory Services"
            subtitle="Comprehensive support for your compliance journey"
            centered
          />

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} hover={false} className="p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-4">{service.description}</p>
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">
                    Key Deliverables:
                  </p>
                  <ul className="space-y-1">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary-600" />
                        <span className="text-neutral-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section background="gray">
        <Container>
          <SectionHeader
            title="Our Advisory Process"
            subtitle="A structured approach to achieving compliance"
            centered
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6">
                <div className="text-3xl font-bold text-primary-200 mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Related Content */}
      <Section background="white">
        <Container size="narrow">
          <div className="bg-primary-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              What to Expect from DPDP Advisory
            </h2>
            <p className="text-neutral-600 mb-6">
              Our comprehensive guide walks you through the compliance advisory
              process, from gap assessment to implementation.
            </p>
            <Button href="/resources/guides/dpdp-compliance-advisory-what-to-expect">
              Read the Advisory Guide
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Compliance Journey
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Contact us for a consultation to discuss your compliance needs and
              how we can help.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Request Advisory
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
