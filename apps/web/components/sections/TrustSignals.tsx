import { Building2, Users, Award, BookOpen } from 'lucide-react';
import { Container, Section } from '@/components/ui';

const signals = [
  {
    icon: Building2,
    title: 'KLE Law College',
    description:
      'Part of the prestigious KLE Society, with over 100 years of excellence in education.',
  },
  {
    icon: Users,
    title: 'Expert Advisory Board',
    description:
      'Guided by leading practitioners in data protection, privacy law, and compliance.',
  },
  {
    icon: Award,
    title: 'Industry Recognition',
    description:
      'Trusted by organisations across sectors for DPDP compliance expertise.',
  },
  {
    icon: BookOpen,
    title: 'Research Excellence',
    description:
      'Contributing to the body of knowledge on data protection in India.',
  },
];

export function TrustSignals() {
  return (
    <Section background="gray">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Why Choose CADP?
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We bring together academic rigour and practical expertise to deliver
            world-class data protection education and advisory services.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {signals.map((signal) => (
            <div key={signal.title} className="text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <signal.icon className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                {signal.title}
              </h3>
              <p className="text-sm text-neutral-600">{signal.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
