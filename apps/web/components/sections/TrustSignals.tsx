import { GraduationCap, Scale, Microscope, Globe2 } from 'lucide-react';
import { Container, Section } from '@/components/ui';

const distinguishingFeatures = [
  {
    icon: GraduationCap,
    title: 'Academic Foundation',
    description:
      'Grounded in scholarly inquiry and critical legal analysis, our work reflects the rigorous intellectual tradition of KLE Law College.',
    detail: 'Est. within KLE Society (100+ years)',
  },
  {
    icon: Microscope,
    title: 'Research-Driven Approach',
    description:
      'Our programmes and publications draw on original empirical research and comparative jurisprudence in data protection law.',
    detail: 'Evidence-based policy contribution',
  },
  {
    icon: Scale,
    title: 'Practitioner Expertise',
    description:
      'Led by legal scholars and seasoned privacy practitioners who bridge theoretical frameworks with regulatory realities.',
    detail: 'Advisory board of leading practitioners',
  },
  {
    icon: Globe2,
    title: 'Capacity Building',
    description:
      'Training the next generation of DPOs and compliance officers through specialized professional education programmes.',
    detail: 'Multi-sectoral impact',
  },
];

export function TrustSignals() {
  return (
    <Section background="gray">
      <Container>
        <div className="max-w-3xl mb-14">
          <div className="inline-block mb-5">
            <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
              Core Institutional Strengths
            </div>
            <div className="h-px w-24 bg-accent-600"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-5 leading-tight">
            A Research Institute Committed to
            <br />
            Applied Legal Scholarship
          </h2>
          <p className="text-neutral-700 font-serif text-lg leading-relaxed">
            The Centre occupies a unique position at the intersection of academic research,
            professional education, and policy engagement—advancing both theoretical understanding
            and practical implementation of data protection principles in India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {distinguishingFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
            >
              {/* Decorative number */}
              <div className="absolute -left-3 -top-3 text-8xl font-serif font-bold text-neutral-200 leading-none pointer-events-none select-none">
                {(index + 1).toString().padStart(2, '0')}
              </div>

              <div className="relative bg-white border-2 border-neutral-300 p-7 transition-all duration-300 hover:border-accent-600 hover:shadow-lg">
                <div className="flex items-start gap-5 mb-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-14 h-14 bg-primary-950 border-2 border-accent-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <feature.icon className="w-7 h-7 text-accent-500" strokeWidth={1.75} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-semibold text-neutral-950 mb-2 text-xl leading-tight">
                      {feature.title}
                    </h3>
                    <div className="text-xs uppercase tracking-wider text-accent-700 font-semibold mb-3">
                      {feature.detail}
                    </div>
                  </div>
                </div>

                <p className="text-neutral-700 leading-relaxed font-serif text-[0.9375rem]">
                  {feature.description}
                </p>

                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Academic credibility note */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="relative bg-primary-950 text-white p-8 border-l-4 border-accent-600">
            <div className="absolute top-4 left-4 text-6xl text-accent-600 opacity-20 font-serif leading-none">"</div>
            <p className="relative text-neutral-100 italic font-serif text-base leading-relaxed pl-8">
              As an academic centre within a law college, CADP contributes to the development of
              India's data protection framework through rigorous scholarship, informed training,
              and evidence-based policy analysis—rather than commercial interests.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
