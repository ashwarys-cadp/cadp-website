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
            <div key={signal.title} className="text-center group">
              <div className="w-16 h-16 bg-primary-800 border-2 border-primary-900 flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-primary-900">
                <signal.icon className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-3" style={{fontFamily: 'var(--font-heading)'}}>
                {signal.title}
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">{signal.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
