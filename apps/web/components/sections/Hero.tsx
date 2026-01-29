import Link from 'next/link';
import { ArrowRight, Shield, Users, BookOpen } from 'lucide-react';
import { Container, Button } from '@/components/ui';

const stats = [
  { value: '500+', label: 'Professionals Trained' },
  { value: '50+', label: 'Organizations Served' },
  { value: '10+', label: 'Research Publications' },
];

export function Hero() {
  return (
    <section className="relative bg-primary-900 text-white border-b-4 border-accent-600">
      <Container size="wide" className="relative">
        <div className="py-16 md:py-20 lg:py-24">
          <div className="max-w-4xl">
            {/* Institution */}
            <div className="text-accent-400 font-medium text-sm uppercase tracking-wider mb-4">
              KLE Law College, Bengaluru
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Centre for Applied Data Protection
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-primary-100 max-w-3xl leading-relaxed mb-10">
              Leading research and professional training in data protection law.
              We provide expert guidance on DPDP Act compliance, advisory services,
              and publish authoritative research to advance India&apos;s data protection framework.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/services" size="lg" variant="secondary">
                Our Services
              </Button>
              <Button
                href="/resources/guides"
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-900"
              >
                Research & Publications
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 pt-8 border-t border-primary-700">
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <div className="text-3xl md:text-4xl font-semibold text-accent-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-primary-200 mt-2 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
