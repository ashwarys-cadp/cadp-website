import Link from 'next/link';
import { GraduationCap, Shield, FileText, ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeader } from '@/components/ui';

const services = [
  {
    icon: GraduationCap,
    title: 'DPDP Training',
    description:
      'Comprehensive training programs on DPDP Act compliance for professionals, organisations, and educational institutions.',
    href: '/services/dpdp-training',
    features: ['Executive workshops', 'DPO certification prep', 'Customised programs'],
  },
  {
    icon: Shield,
    title: 'Compliance Advisory',
    description:
      'Expert guidance on DPDP Act implementation, from gap assessment to full compliance roadmap.',
    href: '/services/compliance-advisory',
    features: ['Gap assessment', 'Policy development', 'Implementation support'],
  },
  {
    icon: FileText,
    title: 'Research & Publications',
    description:
      'Cutting-edge research and publications on data protection law, practice, and emerging trends.',
    href: '/services/research-publications',
    features: ['White papers', 'Legal analysis', 'Industry reports'],
  },
];

export function ServicesOverview() {
  return (
    <Section background="gray">
      <Container>
        <SectionHeader
          title="Our Services"
          subtitle="Expert support for every stage of your DPDP compliance journey"
          centered
        />

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg hover:border-primary-200 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                <service.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {service.title}
              </h3>

              <p className="text-neutral-600 text-sm mb-4">
                {service.description}
              </p>

              <ul className="space-y-2 mb-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-sm text-neutral-500 flex items-center gap-2"
                  >
                    <div className="w-1 h-1 bg-primary-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
