import Link from 'next/link';
import { GraduationCap, Scale, FileText } from 'lucide-react';
import { Container, Section } from '@/components/ui';

const programmes = [
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

export function ProgrammesOverview() {
  return (
    <Section background="white">
      <Container>
        {/* Academic section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
              Institutional Initiatives
            </div>
            <div className="h-px w-24 mx-auto bg-accent-600"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
            Programmes & Initiatives
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-serif">
            The Centre advances data protection scholarship and practice through specialized
            training, legal advisory, and rigorous academic research.
          </p>
        </div>

        {/* Programme Cards - Three Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {programmes.map((programme) => (
            <Link
              key={programme.title}
              href={programme.href}
              className="group block bg-white border-2 border-neutral-400 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              {/* Top accent bar */}
              <div className="h-2 bg-accent-600 group-hover:bg-accent-700 transition-colors"></div>

              <div className="p-7">
                {/* Icon and Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 group-hover:border-primary-900 transition-all">
                    <programme.icon className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="text-5xl font-serif text-neutral-200 group-hover:text-accent-600 transition-colors leading-none">
                    {programme.number}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-4 leading-tight group-hover:text-primary-900 transition-colors min-h-[3.5rem]">
                  {programme.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-700 leading-relaxed mb-6 font-serif text-[0.9375rem]">
                  {programme.description}
                </p>

                {/* Key Areas */}
                <div className="pt-5 border-t border-neutral-300">
                  <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-3">
                    Key Areas
                  </div>
                  <ul className="space-y-2">
                    {programme.features.map((feature) => (
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

        {/* Academic note */}
        <div className="mt-8 pt-10 border-t-2 border-neutral-300 text-center">
          <p className="text-sm text-neutral-600 italic max-w-2xl mx-auto leading-relaxed font-serif">
            All programmes are designed and delivered by legal scholars and practitioners with
            expertise in data protection law, privacy regulation, and digital governance.
          </p>
        </div>
      </Container>
    </Section>
  );
}
