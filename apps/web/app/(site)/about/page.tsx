import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Briefcase, Building2, ExternalLink, Linkedin, Target, Eye } from "lucide-react";
import { Container, Section, SectionHeader, Button, Card, CardContent } from "@/components/ui";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { client, urlFor, allTeamMembersQuery, advisoryBoardQuery, type TeamMember } from "@/lib/sanity";

export const metadata: Metadata = generatePageMetadata({
  title: "About CADP",
  description:
    "Learn about the Centre for Applied Data Protection at KLE Law College, Bengaluru. Our mission, team, and commitment to building data protection capability in India.",
  path: "/about",
  keywords: ["CADP about", "KLE Law College", "data protection centre", "DPDP training institute"],
});

// Fallback team members
const fallbackTeam: TeamMember[] = [
  {
    _id: "1",
    name: "Dr. Priya Sharma",
    role: "Director",
    bio: "Leading data protection expert with over 15 years of experience in privacy law.",
  },
  {
    _id: "2",
    name: "Adv. Rajesh Kumar",
    role: "Head of Training",
    bio: "Specializes in corporate data protection training and compliance programs.",
  },
  {
    _id: "3",
    name: "Dr. Anjali Menon",
    role: "Research Lead",
    bio: "Published researcher in privacy law and data protection frameworks.",
  },
];

const fallbackAdvisors: TeamMember[] = [
  {
    _id: "1",
    name: "Justice K.S. Puttaswamy (Retd.)",
    role: "Chairman, Advisory Board",
    bio: "Former Judge, Supreme Court of India.",
    isAdvisoryBoard: true,
  },
  {
    _id: "2",
    name: "Ms. Amba Salelkar",
    role: "Advisory Board Member",
    bio: "Privacy expert and accessibility advocate.",
    isAdvisoryBoard: true,
  },
];

async function getTeamData(): Promise<{
  team: TeamMember[];
  advisors: TeamMember[];
}> {
  try {
    const [team, advisors] = await Promise.all([client.fetch<TeamMember[]>(allTeamMembersQuery), client.fetch<TeamMember[]>(advisoryBoardQuery)]);
    return {
      team: team.length > 0 ? team : fallbackTeam,
      advisors: advisors.length > 0 ? advisors : fallbackAdvisors,
    };
  } catch {
    return { team: fallbackTeam, advisors: fallbackAdvisors };
  }
}

const verticals = [
  {
    icon: BookOpen,
    title: "Research",
    description: "Advancing the understanding of data protection through rigorous academic research, publications, and thought leadership.",
    features: ["Peer-reviewed publications", "Policy analysis and recommendations", "Comparative legal studies", "Industry-specific research"],
  },
  {
    icon: Briefcase,
    title: "Practice",
    description: "Providing hands-on training and legal advisory to help organisations achieve and maintain DPDP compliance.",
    features: ["Compliance training programs", "Gap assessment and advisory", "Policy development support", "Implementation guidance"],
  },
];

export default async function AboutPage() {
  const { team, advisors } = await getTeamData();

  return (
    <>
      {/* Hero Section */}
      <Section background="white">
        <Container>
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">About the Centre</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">Centre for Applied Data Protection</h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                The Centre for Applied Data Protection (CADP) at KLE Law College, Bengaluru is dedicated to building India&apos;s data protection
                capability through research, education, and practical advisory services.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Vision & Mission */}
      <Section background="gray">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-neutral-300 shadow-sm">
              <div className="h-2 bg-primary-600"></div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50">
                    <Eye className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-neutral-950">Our Vision</h2>
                </div>
                <p className="text-neutral-700 leading-relaxed font-serif">
                  To be India&apos;s leading centre of excellence in data protection education and research, empowering organisations and individuals
                  to navigate the evolving privacy landscape with confidence.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-300 shadow-sm">
              <div className="h-2 bg-accent-600"></div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50">
                    <Target className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-neutral-950">Our Mission</h2>
                </div>
                <p className="text-neutral-700 leading-relaxed font-serif">
                  To bridge the gap between data protection law and practice by providing high-quality training, legal advisory, and research that
                  helps organisations comply with the DPDP Act and protect personal data effectively.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Two Verticals */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Our Approach</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">Two Complementary Verticals</h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              CADP operates through research and practice, bridging academic scholarship with real-world application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {verticals.map((vertical, index) => (
              <div
                key={vertical.title}
                className="bg-white border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="h-2 bg-accent-600"></div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50">
                      <vertical.icon className="w-7 h-7 text-primary-900" strokeWidth={1.5} />
                    </div>
                    <div className="text-5xl font-serif text-neutral-200 leading-none">{index + 1}</div>
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-neutral-950 mb-4">{vertical.title}</h3>
                  <p className="text-neutral-700 mb-6 leading-relaxed font-serif">{vertical.description}</p>
                  <div className="pt-5 border-t border-neutral-300">
                    <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-3">Key Activities</div>
                    <ul className="space-y-2">
                      {vertical.features.map((feature) => (
                        <li key={feature} className="text-sm text-neutral-600 flex items-start gap-2 font-serif">
                          <span className="text-accent-600 mt-0.5">▪</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Our People</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">The Team</h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Legal scholars and practitioners committed to advancing data protection in India.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member._id} className="bg-white border-2 border-neutral-300 shadow-sm text-center">
                <div className="h-1.5 bg-accent-600"></div>
                <div className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden bg-neutral-100 border-2 border-neutral-300">
                    {member.image ? (
                      <Image src={urlFor(member.image).width(200).height(200).url()} alt={member.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-neutral-400 font-serif">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-1">{member.name}</h3>
                  <p className="text-primary-800 text-sm font-semibold mb-3 uppercase tracking-wide">{member.role}</p>
                  {member.bio && <p className="text-sm text-neutral-600 leading-relaxed font-serif">{member.bio}</p>}
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-4 text-sm text-neutral-600 hover:text-primary-800 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="font-serif">LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Advisory Board */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Leadership</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">Advisory Board</h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">Distinguished experts guiding our mission and research agenda.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor) => (
              <div key={advisor._id} className="bg-white border-2 border-neutral-300 shadow-sm">
                <div className="h-1.5 bg-primary-600"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden bg-neutral-100 border-2 border-neutral-300 shrink-0">
                      {advisor.image ? (
                        <Image src={urlFor(advisor.image).width(150).height(150).url()} alt={advisor.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl font-bold text-neutral-400 font-serif">
                          {advisor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-1">{advisor.name}</h3>
                      <p className="text-primary-800 text-sm font-semibold mb-2 uppercase tracking-wide">{advisor.role}</p>
                      {advisor.bio && <p className="text-sm text-neutral-600 leading-relaxed font-serif">{advisor.bio}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* KLE Affiliation */}
      <Section background="gray">
        <Container size="narrow">
          <div className="bg-white border-2 border-neutral-300 shadow-sm">
            <div className="h-2 bg-accent-600"></div>
            <div className="p-10 text-center">
              <div className="w-16 h-16 border-2 border-primary-900 flex items-center justify-center bg-primary-50 mx-auto mb-6">
                <Building2 className="w-8 h-8 text-primary-900" strokeWidth={1.5} />
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-3">Institutional Affiliation</div>
              <h2 className="text-2xl font-serif font-semibold text-neutral-950 mb-5">Part of KLE Law College, Bengaluru</h2>
              <p className="text-neutral-700 mb-6 max-w-2xl mx-auto leading-relaxed font-serif">
                CADP is a centre of excellence at KLE Law College, Bengaluru, part of the prestigious KLE Society with over 100 years of excellence in
                education. This affiliation provides us with academic rigour, institutional support, and access to a rich network of legal scholars
                and practitioners.
              </p>
              <a
                href="https://klelawcollege.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-800 hover:text-primary-900 font-semibold font-serif border-b-2 border-primary-300 hover:border-primary-800 pb-1 transition-all"
              >
                Visit KLE Law College
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
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
                <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">Get Started</div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">Ready to Build Your Data Protection Capability?</h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Whether you need training, legal advisory, or want to partner with us on research, we&apos;re here to help.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="secondary" size="lg">
                  Get in Touch
                </Button>
                <Button
                  href="/programs-and-initiatives"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-950 transition-colors font-semibold"
                >
                  Explore Services
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
