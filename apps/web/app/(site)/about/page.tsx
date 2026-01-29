import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  Briefcase,
  Building2,
  ExternalLink,
  Linkedin,
  Target,
  Eye,
} from 'lucide-react';
import {
  Container,
  Section,
  SectionHeader,
  Button,
  Card,
  CardContent,
} from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  client,
  urlFor,
  allTeamMembersQuery,
  advisoryBoardQuery,
  type TeamMember,
} from '@/lib/sanity';

export const metadata: Metadata = generatePageMetadata({
  title: 'About CADP',
  description:
    'Learn about the Centre for Applied Data Protection at KLE Law College, Bengaluru. Our mission, team, and commitment to building data protection capability in India.',
  path: '/about',
  keywords: [
    'CADP about',
    'KLE Law College',
    'data protection centre',
    'DPDP training institute',
  ],
});

// Fallback team members
const fallbackTeam: TeamMember[] = [
  {
    _id: '1',
    name: 'Dr. Priya Sharma',
    role: 'Director',
    bio: 'Leading data protection expert with over 15 years of experience in privacy law.',
  },
  {
    _id: '2',
    name: 'Adv. Rajesh Kumar',
    role: 'Head of Training',
    bio: 'Specializes in corporate data protection training and compliance programs.',
  },
  {
    _id: '3',
    name: 'Dr. Anjali Menon',
    role: 'Research Lead',
    bio: 'Published researcher in privacy law and data protection frameworks.',
  },
];

const fallbackAdvisors: TeamMember[] = [
  {
    _id: '1',
    name: 'Justice K.S. Puttaswamy (Retd.)',
    role: 'Chairman, Advisory Board',
    bio: 'Former Judge, Supreme Court of India.',
    isAdvisoryBoard: true,
  },
  {
    _id: '2',
    name: 'Ms. Amba Salelkar',
    role: 'Advisory Board Member',
    bio: 'Privacy expert and accessibility advocate.',
    isAdvisoryBoard: true,
  },
];

async function getTeamData(): Promise<{
  team: TeamMember[];
  advisors: TeamMember[];
}> {
  try {
    const [team, advisors] = await Promise.all([
      client.fetch<TeamMember[]>(allTeamMembersQuery),
      client.fetch<TeamMember[]>(advisoryBoardQuery),
    ]);
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
    title: 'Research',
    description:
      'Advancing the understanding of data protection through rigorous academic research, publications, and thought leadership.',
    features: [
      'Peer-reviewed publications',
      'Policy analysis and recommendations',
      'Comparative legal studies',
      'Industry-specific research',
    ],
  },
  {
    icon: Briefcase,
    title: 'Practice',
    description:
      'Providing hands-on training and advisory services to help organisations achieve and maintain DPDP compliance.',
    features: [
      'Compliance training programs',
      'Gap assessment and advisory',
      'Policy development support',
      'Implementation guidance',
    ],
  },
];

export default async function AboutPage() {
  const { team, advisors } = await getTeamData();

  return (
    <>
      {/* Hero Section */}
      <Section background="gray">
        <Container>
          <Breadcrumbs items={[{ name: 'About', href: '/about' }]} />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              About CADP
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              The Centre for Applied Data Protection (CADP) at KLE Law College,
              Bengaluru is dedicated to building India&apos;s data protection
              capability through research, education, and practical advisory
              services.
            </p>
          </div>
        </Container>
      </Section>

      {/* Vision & Mission */}
      <Section background="white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Our Vision
              </h2>
              <p className="text-neutral-600">
                To be India&apos;s leading centre of excellence in data protection
                education and research, empowering organisations and individuals
                to navigate the evolving privacy landscape with confidence.
              </p>
            </div>

            <div className="bg-accent-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Our Mission
              </h2>
              <p className="text-neutral-600">
                To bridge the gap between data protection law and practice by
                providing high-quality training, advisory services, and research
                that helps organisations comply with the DPDP Act and protect
                personal data effectively.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Two Verticals */}
      <Section background="gray">
        <Container>
          <SectionHeader
            title="Our Two Verticals"
            subtitle="CADP operates through two complementary verticals: Research and Practice"
            centered
          />

          <div className="grid md:grid-cols-2 gap-8">
            {verticals.map((vertical) => (
              <Card key={vertical.title} hover={false} className="p-8">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <vertical.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  {vertical.title}
                </h3>
                <p className="text-neutral-600 mb-6">{vertical.description}</p>
                <ul className="space-y-3">
                  {vertical.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section background="white">
        <Container>
          <SectionHeader
            title="Our Team"
            subtitle="Meet the experts behind CADP"
            centered
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member._id} hover={false} className="text-center p-6">
                <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden bg-neutral-100">
                  {member.image ? (
                    <Image
                      src={urlFor(member.image).width(200).height(200).url()}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-neutral-400">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {member.name}
                </h3>
                <p className="text-primary-600 text-sm mb-3">{member.role}</p>
                {member.bio && (
                  <p className="text-sm text-neutral-600">{member.bio}</p>
                )}
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm text-neutral-500 hover:text-primary-600"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Advisory Board */}
      <Section background="gray">
        <Container>
          <SectionHeader
            title="Advisory Board"
            subtitle="Distinguished experts guiding our mission"
            centered
          />

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor) => (
              <Card key={advisor._id} hover={false} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden bg-neutral-100 shrink-0">
                    {advisor.image ? (
                      <Image
                        src={urlFor(advisor.image).width(150).height(150).url()}
                        alt={advisor.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl font-bold text-neutral-400">
                        {advisor.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {advisor.name}
                    </h3>
                    <p className="text-primary-600 text-sm mb-2">
                      {advisor.role}
                    </p>
                    {advisor.bio && (
                      <p className="text-sm text-neutral-600">{advisor.bio}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* KLE Affiliation */}
      <Section background="white">
        <Container size="narrow">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Part of KLE Law College
            </h2>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              CADP is a centre of excellence at KLE Law College, Bengaluru, part
              of the prestigious KLE Society with over 100 years of excellence
              in education. This affiliation provides us with academic rigour,
              institutional support, and access to a rich network of legal
              scholars and practitioners.
            </p>
            <a
              href="https://klelaw.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Visit KLE Law College
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your Data Protection Capability?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Whether you need training, advisory services, or want to partner
              with us on research, we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Explore Services
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
