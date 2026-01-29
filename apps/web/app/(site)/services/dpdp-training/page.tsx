import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  Building2,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { Container, Section, SectionHeader, Button, Card } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ServiceJsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'DPDP Training Programs',
  description:
    'Comprehensive DPDP Act training programs for organisations, professionals, and educational institutions. Executive workshops, DPO certification prep, and customised training.',
  path: '/services/dpdp-training',
  keywords: [
    'DPDP training',
    'data protection training India',
    'DPO certification',
    'DPDP Act workshops',
    'compliance training',
  ],
});

const programs = [
  {
    title: 'Executive Workshop',
    duration: '1 Day',
    audience: 'C-Suite & Senior Management',
    description:
      'Strategic overview of DPDP compliance for decision-makers. Understand obligations, risks, and implementation priorities.',
    features: [
      'DPDP Act overview and business impact',
      'Board-level responsibilities',
      'Risk assessment framework',
      'Compliance roadmap planning',
    ],
  },
  {
    title: 'DPO Certification Prep',
    duration: '5 Days',
    audience: 'Aspiring DPOs & Privacy Professionals',
    description:
      'Intensive program preparing participants for the Data Protection Officer role under the DPDP Act.',
    features: [
      'Comprehensive DPDP Act analysis',
      'DPO roles and responsibilities',
      'Practical compliance exercises',
      'Assessment and certification',
    ],
  },
  {
    title: 'Team Training',
    duration: 'Customised',
    audience: 'All Employees',
    description:
      'Role-specific training for different teams across your organisation to ensure everyone understands their data protection responsibilities.',
    features: [
      'Role-based curriculum',
      'Practical scenarios',
      'Interactive workshops',
      'Assessment and reporting',
    ],
  },
  {
    title: 'Educational Institution Program',
    duration: 'Semester-long',
    audience: 'Law Students & Faculty',
    description:
      'Comprehensive curriculum for law schools integrating DPDP Act into legal education.',
    features: [
      'Academic curriculum design',
      'Guest lectures and workshops',
      'Moot court support',
      'Research collaboration',
    ],
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Expert Faculty',
    description:
      'Learn from leading practitioners and academics in data protection law.',
  },
  {
    icon: Building2,
    title: 'Industry-Focused',
    description:
      'Training tailored to your sector with relevant case studies and scenarios.',
  },
  {
    icon: Clock,
    title: 'Flexible Delivery',
    description:
      'Choose from in-person, online, or hybrid formats to suit your needs.',
  },
];

export default function DPDPTrainingPage() {
  return (
    <>
      <ServiceJsonLd
        name="DPDP Compliance Training"
        description="Comprehensive DPDP Act training programs for organisations, professionals, and educational institutions."
        url="https://cadp.in/services/dpdp-training"
      />

      {/* Hero */}
      <Section background="gray">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Services', href: '/services' },
              { name: 'DPDP Training', href: '/services/dpdp-training' },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-primary-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                DPDP Training Programs
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Build data protection capability across your organisation with
                our comprehensive training programs designed for all levels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact">
                  Request Training
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button href="/resources/guides/dpdp-training-for-organisations" variant="outline">
                  Read Our Training Guide
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-12 flex items-center justify-center">
              <GraduationCap className="w-40 h-40 text-primary-300" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Programs */}
      <Section background="white">
        <Container>
          <SectionHeader
            title="Training Programs"
            subtitle="Programs designed for different audiences and needs"
            centered
          />

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Card key={program.title} hover={false} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-xl font-semibold text-neutral-900">
                    {program.title}
                  </h3>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {program.duration}
                  </span>
                </div>
                <p className="text-sm text-primary-600 mb-3">
                  For: {program.audience}
                </p>
                <p className="text-neutral-600 mb-4">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section background="gray">
        <Container>
          <SectionHeader
            title="Why Train with CADP?"
            subtitle="What sets our training programs apart"
            centered
          />

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600">{benefit.description}</p>
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
              Learn More About DPDP Training
            </h2>
            <p className="text-neutral-600 mb-6">
              Our comprehensive guide covers everything you need to know about
              building data protection capability in your organisation.
            </p>
            <Button href="/resources/guides/dpdp-training-for-organisations">
              Read the Training Guide
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
              Ready to Train Your Team?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Contact us to discuss your training needs and get a customised
              program proposal.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Request Training
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
