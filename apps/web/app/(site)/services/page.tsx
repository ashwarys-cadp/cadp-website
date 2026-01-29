import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Shield,
  FileText,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import {
  Container,
  Section,
  SectionHeader,
  Button,
  Card,
  CardContent,
} from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Services',
  description:
    'CADP offers comprehensive DPDP Act compliance services including training programs, compliance advisory, and research publications.',
  path: '/services',
  keywords: [
    'DPDP compliance services',
    'data protection training',
    'DPDP advisory',
    'compliance consulting India',
  ],
});

const services = [
  {
    icon: GraduationCap,
    title: 'DPDP Training',
    description:
      'Comprehensive training programs designed to build data protection expertise across your organisation.',
    href: '/services/dpdp-training',
    features: [
      'Executive workshops on DPDP compliance',
      'DPO certification preparation',
      'Customised training for teams',
      'Educational institution programs',
      'Online and in-person formats',
    ],
    cta: 'Learn about Training',
  },
  {
    icon: Shield,
    title: 'Compliance Advisory',
    description:
      'Expert guidance on DPDP Act implementation, from initial assessment to full compliance.',
    href: '/services/compliance-advisory',
    features: [
      'Comprehensive gap assessment',
      'Compliance roadmap development',
      'Policy and procedure drafting',
      'Implementation support',
      'Ongoing compliance monitoring',
    ],
    cta: 'Learn about Advisory',
  },
  {
    icon: FileText,
    title: 'Research & Publications',
    description:
      'Cutting-edge research and thought leadership on data protection law and practice.',
    href: '/services/research-publications',
    features: [
      'White papers and research reports',
      'Legal analysis and commentary',
      'Industry-specific guidance',
      'Policy recommendations',
      'Collaborative research projects',
    ],
    cta: 'Explore Research',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Initial Consultation',
    description:
      'We understand your organisation, industry, and specific data protection needs.',
  },
  {
    step: '02',
    title: 'Assessment & Planning',
    description:
      'We conduct a thorough assessment and develop a tailored compliance plan.',
  },
  {
    step: '03',
    title: 'Implementation',
    description:
      'We work alongside your team to implement necessary changes and training.',
  },
  {
    step: '04',
    title: 'Ongoing Support',
    description:
      'We provide continued guidance as regulations evolve and your needs change.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section background="gray">
        <Container>
          <Breadcrumbs items={[{ name: 'Services', href: '/services' }]} />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Expert support for every stage of your DPDP compliance journey.
              From training and awareness to full compliance implementation.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section background="white">
        <Container>
          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-neutral-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href={service.href}>
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div
                  className={`bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-12 flex items-center justify-center ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <service.icon className="w-32 h-32 text-primary-300" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section background="gray">
        <Container>
          <SectionHeader
            title="How We Work"
            subtitle="Our proven process ensures you get the support you need"
            centered
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-bold text-primary-100 mb-4">
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

      {/* CTA */}
      <Section background="primary">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Let&apos;s discuss your data protection needs and find the right
              solution for your organisation.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Schedule a Consultation
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
