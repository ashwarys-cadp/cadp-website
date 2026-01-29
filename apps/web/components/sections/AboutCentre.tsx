import Link from 'next/link';
import { BookOpen, Users, Award } from 'lucide-react';
import { Container, Section, Button } from '@/components/ui';

export function AboutCentre() {
  return (
    <Section background="white">
      <Container>
        <div className="grid md:grid-cols-[1.2fr,1fr] gap-16 items-start">
          {/* Main Content */}
          <div>
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  About the Centre
                </div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-5 leading-tight">
                Advancing Legal Scholarship in
                <br />
                Data Protection
              </h2>
            </div>

            <div className="space-y-5 text-neutral-700 font-serif text-[1.0625rem] leading-relaxed mb-10">
              <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-primary-900 first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:font-serif first-letter:mt-1">
                The Centre for Applied Data Protection (CADP) at KLE Law College, Bengaluru,
                is a dedicated research institute advancing the study and practice of data protection
                law in India.
              </p>
              <p>
                Established to bridge the divide between legal theory and practical application, the
                Centre addresses the implications and implementation of the Digital Personal Data
                Protection Act, 2023. Through rigorous academic research, policy analysis, and
                specialized professional training, CADP contributes to the evolving discourse on
                privacy rights and digital governance.
              </p>
              <p>
                The Centre serves as a nexus for scholars, practitioners, and policymakers engaged
                in shaping India's data protection framework.
              </p>
            </div>

            <Button href="/about" variant="outline" size="lg">
              Learn More About CADP
            </Button>
          </div>

          {/* Sidebar - Core Objectives */}
          <div>
            <div className="bg-primary-950 text-white p-8 border-4 border-accent-600 shadow-lg">
              <h3 className="text-2xl font-serif font-semibold text-white mb-7 pb-4 border-b-2 border-accent-600">
                Core Objectives
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <BookOpen className="w-6 h-6 text-accent-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-white mb-2 text-lg">
                      Research
                    </h4>
                    <p className="text-neutral-200 text-sm leading-relaxed">
                      Conducting scholarly research on evolving privacy jurisprudence and
                      comparative data protection frameworks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <Users className="w-6 h-6 text-accent-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-white mb-2 text-lg">
                      Education
                    </h4>
                    <p className="text-neutral-200 text-sm leading-relaxed">
                      Training legal professionals and Data Protection Officers in compliance
                      frameworks and regulatory standards.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <Award className="w-6 h-6 text-accent-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-white mb-2 text-lg">
                      Advisory
                    </h4>
                    <p className="text-neutral-200 text-sm leading-relaxed">
                      Providing expert guidance to public and private institutions on data
                      governance and regulatory compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Note */}
            <div className="mt-6 p-6 bg-neutral-100 border-l-4 border-accent-600">
              <p className="text-sm text-neutral-700 italic leading-relaxed font-serif">
                "The Centre is committed to contributing meaningfully to the development of India's
                data protection jurisprudence through evidence-based research and informed policy
                discourse."
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
