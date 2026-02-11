import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Scale,
  FileText,
  ArrowRight,
} from 'lucide-react';
import {
  Container,
  Section,
  Button,
} from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Programs & Initiatives',
  description:
    'CADP offers comprehensive DPDP Act compliance programs including training, advisory, and research initiatives.',
  path: '/programs-and-initiatives',
  keywords: [
    'DPDP compliance programs',
    'data protection training',
    'DPDP advisory',
    'compliance consulting India',
  ],
});

const programs = [
  {
    icon: FileText,
    number: 'I',
    title: 'Research & Publications',
    description:
      'Scholarly research and publications advancing the understanding of data protection law, comparative jurisprudence, and emerging regulatory frameworks.',
    href: '/programs-and-initiatives/research-publications',
    features: [
      'Academic white papers',
      'Comparative legal analysis',
      'Policy research reports',
    ],
  },
  {
    icon: GraduationCap,
    number: 'II',
    title: 'DPDP Training Programmes',
    description:
      'Comprehensive professional development programmes on DPDP Act compliance designed for legal practitioners, corporate officers, and institutional stakeholders.',
    href: '/programs-and-initiatives/dpdp-training',
    features: [
      'Executive training workshops',
      'Data Protection Officer certification',
      'Customised institutional programmes',
    ],
  },
  {
    icon: Scale,
    number: 'III',
    title: 'Compliance Advisory',
    description:
      'Expert legal guidance on DPDP Act implementation, encompassing gap assessment, policy formulation, and compliance strategy development.',
    href: '/programs-and-initiatives/compliance-advisory',
    features: [
      'Regulatory gap assessment',
      'Policy framework development',
      'Compliance implementation support',
    ],
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <Section background="white">
        <Container>
          <Breadcrumbs items={[{ name: 'Programs & Initiatives', href: '/programs-and-initiatives' }]} />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Institutional Initiatives
                </div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Programmes & Initiatives
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                The Centre advances data protection scholarship and practice through specialized
                training, legal advisory, and rigorous academic research.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Programs Grid */}
      <Section background="gray">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group block bg-white border-2 border-neutral-400 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {/* Top accent bar */}
                <div className="h-2 bg-accent-600 group-hover:bg-accent-700 transition-colors"></div>

                <div className="p-7">
                  {/* Icon and Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 group-hover:border-primary-900 transition-all">
                      <program.icon className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <div className="text-5xl font-serif text-neutral-200 group-hover:text-accent-600 transition-colors leading-none">
                      {program.number}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-4 leading-tight group-hover:text-primary-900 transition-colors min-h-[3.5rem]">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-700 leading-relaxed mb-6 font-serif text-[0.9375rem]">
                    {program.description}
                  </p>

                  {/* Key Areas */}
                  <div className="pt-5 border-t border-neutral-300">
                    <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-3">
                      Key Areas
                    </div>
                    <ul className="space-y-2">
                      {program.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-neutral-600 flex items-start gap-2 font-serif"
                        >
                          <span className="text-accent-600 mt-0.5">▪</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn more arrow */}
                  <div className="mt-6 pt-5 border-t border-neutral-300 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif">
                      View Details
                    </span>
                    <div className="w-8 h-8 border-2 border-primary-700 group-hover:border-primary-900 group-hover:bg-primary-900 flex items-center justify-center transition-all">
                      <span className="text-primary-700 group-hover:text-white transition-colors text-lg">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="white">
        <Container size="narrow">
          <div className="border-4 border-primary-950 bg-primary-950 p-10 md:p-14 shadow-xl relative">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent-600 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent-600 opacity-20"></div>

            <div className="text-center relative z-10">
              {/* Academic header */}
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">
                  Connect with the Centre
                </div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">
                Engage with CADP
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Contact the Centre to discuss professional training, advisory engagement,
                or research collaboration aligned with your institutional requirements.
              </p>

              <Button href="/contact/" variant="secondary" size="lg">
                Initiate an Inquiry
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
