import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  Building2,
  Clock,
  BookOpen,
  Award,
  Target,
  ArrowRight,
} from 'lucide-react';
import { Container, Section, Button } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ServiceJsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'DPDP Training Programs',
  description:
    'Comprehensive DPDP Act training programs for organisations, professionals, and educational institutions. Executive workshops, DPO certification prep, and customised training.',
  path: '/programs-and-initiatives/dpdp-training',
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

const learningOutcomes = [
  {
    icon: BookOpen,
    title: 'Comprehensive Understanding',
    description: 'Deep knowledge of DPDP Act provisions, scope, and application',
  },
  {
    icon: Award,
    title: 'Practical Skills',
    description: 'Hands-on experience with compliance frameworks and implementation',
  },
  {
    icon: Target,
    title: 'Strategic Capability',
    description: 'Ability to develop and execute data protection strategies',
  },
];

export default function DPDPTrainingPage() {
  return (
    <>
      <ServiceJsonLd
        name="DPDP Compliance Training"
        description="Comprehensive DPDP Act training programs for organisations, professionals, and educational institutions."
        url="https://cadp.in/programs-and-initiatives/dpdp-training"
      />

      {/* Hero Section */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Programs & Initiatives', href: '/programs-and-initiatives' },
              { name: 'DPDP Training', href: '/programs-and-initiatives/dpdp-training' },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Professional Development
                </div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                DPDP Act Training <span className="italic text-primary-900">Programmes</span>
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif mb-8">
                Build comprehensive data protection capability across your organisation through
                rigorous training programmes designed for decision-makers, compliance professionals,
                and legal practitioners.
              </p>

              {/* Decorative divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="h-px w-16 bg-accent-600"></div>
                <div className="w-2 h-2 rotate-45 bg-accent-600"></div>
                <div className="h-px w-16 bg-accent-600"></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" size="lg" variant="primary">
                  Request Training
                </Button>
                <Button
                  href="/resources/guides/dpdp-training-for-organisations"
                  size="lg"
                  variant="outline"
                >
                  Training Guide
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Learning Outcomes */}
      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Learning Outcomes
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              What You Will Achieve
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Our training programmes equip participants with both theoretical knowledge and practical competencies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningOutcomes.map((outcome) => (
              <div key={outcome.title} className="bg-white border-2 border-neutral-300 shadow-sm text-center">
                <div className="h-1.5 bg-accent-600"></div>
                <div className="p-8">
                  <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 mx-auto mb-4">
                    <outcome.icon className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">
                    {outcome.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-serif">
                    {outcome.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Programs */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Our Offerings
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Training Programmes
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Programmes designed for different audiences and organisational needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div key={program.title} className="bg-white border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="h-2 bg-primary-600"></div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-serif font-semibold text-neutral-950 mb-2">
                        {program.title}
                      </h3>
                      <div className="text-sm text-primary-800 font-semibold uppercase tracking-wide mb-3">
                        For {program.audience}
                      </div>
                    </div>
                    <div className="text-4xl font-serif text-neutral-200 leading-none">
                      {index + 1}
                    </div>
                  </div>

                  <div className="inline-block px-3 py-1 bg-accent-100 border border-accent-300 text-accent-800 text-xs font-semibold uppercase tracking-wider mb-4">
                    {program.duration}
                  </div>

                  <p className="text-neutral-700 mb-6 leading-relaxed font-serif">
                    {program.description}
                  </p>

                  <div className="pt-5 border-t border-neutral-300">
                    <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-3">
                      Programme Content
                    </div>
                    <ul className="space-y-2">
                      {program.features.map((feature) => (
                        <li key={feature} className="text-sm text-neutral-600 flex items-start gap-2 font-serif">
                          <span className="text-accent-600 mt-0.5">▪</span>
                          <span>{feature}</span>
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

      {/* Benefits */}
      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Our Distinction
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Why Train with CADP?
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Academic rigour combined with practical application.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white border-2 border-neutral-300 shadow-sm">
                <div className="h-1.5 bg-accent-600"></div>
                <div className="p-8 text-center">
                  <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-serif">
                    {benefit.description}
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
                Comprehensive Training Guide
              </h2>
              <p className="text-neutral-700 mb-6 leading-relaxed font-serif text-center max-w-2xl mx-auto">
                Our detailed guide examines the strategic imperatives of DPDP training,
                implementation frameworks, and best practices for building organisational capability.
              </p>
              <div className="text-center">
                <Button
                  href="/resources/guides/dpdp-training-for-organisations"
                  variant="outline"
                  size="lg"
                  className="inline-flex items-center gap-2"
                >
                  Read the Training Guide
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
                Ready to Build Your Data Protection Capability?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Contact us to discuss your training requirements and receive a customised
                programme proposal tailored to your organisation&apos;s needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="secondary" size="lg">
                  Request Training
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
