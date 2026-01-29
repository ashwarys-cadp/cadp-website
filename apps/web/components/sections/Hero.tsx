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
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
      </div>

      <Container size="wide" className="relative">
        <div className="py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm mb-6">
              <Shield className="w-4 h-4" />
              <span>KLE Law College, Bengaluru</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Building India&apos;s Data Protection Capability
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg md:text-xl text-primary-100 max-w-2xl">
              CADP provides expert DPDP Act compliance training, advisory
              services, and research to help organisations navigate India&apos;s
              evolving data protection landscape.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/services" size="lg" variant="secondary">
                Explore Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                href="/resources/guides"
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Read Our Guides
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-200 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
