import Link from 'next/link';
import { BookOpen, Scale, GraduationCap } from 'lucide-react';
import { Container, Button } from '@/components/ui';

export function Hero() {
  return (
    <section className="relative bg-white border-b-4 border-accent-700 overflow-hidden">
      {/* Subtle paper texture background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4"/%3E%3C/svg%3E")',
        }}></div>
      </div>

      {/* Top accent line - classic institutional */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-900 via-accent-600 to-primary-900"></div>

      <Container size="wide" className="relative">
        <div className="py-16 md:py-24 lg:py-28">

          {/* Institutional Header */}
          <div className="text-center max-w-5xl mx-auto mb-14">
            {/* Institution Badge */}
            <div className="inline-flex items-center gap-3 mb-8 pb-3 border-b-2 border-accent-700">
              <div className="w-12 h-12 border-2 border-primary-900 flex items-center justify-center bg-primary-950">
                <Scale className="w-6 h-6 text-accent-500" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <div className="text-xs uppercase tracking-[0.2em] text-neutral-600 font-semibold">
                  KLE Law College
                </div>
                <div className="text-sm text-neutral-800 tracking-wide">
                  Bengaluru
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6 text-neutral-950">
              Centre for Applied
              <br />
              <span className="text-primary-900 italic">Data Protection</span>
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 my-8">
              <div className="h-px w-16 bg-accent-600"></div>
              <div className="w-2 h-2 rotate-45 bg-accent-600"></div>
              <div className="h-px w-16 bg-accent-600"></div>
            </div>

            {/* Mission Statement */}
            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto mb-10 font-serif">
              Advancing the jurisprudence of privacy and data protection through rigorous research,
              specialized training programmes, and policy advisory in response to the Digital Personal
              Data Protection Act, 2023.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button
                href="/programs-and-initiatives/dpdp-training"
                size="lg"
                variant="primary"
                className="min-w-[240px]"
              >
                Training Programmes
              </Button>
              <Button
                href="/resources/articles"
                size="lg"
                variant="outline"
                className="min-w-[240px]"
              >
                Research & Publications
              </Button>
            </div>
          </div>

          {/* Academic Credentials Bar */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-neutral-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-primary-800 mb-4 bg-primary-50">
                <GraduationCap className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-2">
                Academic Excellence
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Affiliated with a distinguished institution of legal education
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-primary-800 mb-4 bg-primary-50">
                <BookOpen className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-2">
                Research Focus
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Contributing to the discourse on data protection law and policy
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-primary-800 mb-4 bg-primary-50">
                <Scale className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-2">
                Legal Authority
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Expert guidance grounded in legal scholarship and practice
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
