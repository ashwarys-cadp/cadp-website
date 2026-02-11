import { Metadata } from 'next';
import {
  Shield,
  FileText,
  Lock,
  AlertCircle,
  Users,
  Database,
  Clock,
  CheckCircle,
  ArrowRight,
  Download,
  Calendar,
  Target,
  Bell,
  Key,
  Globe,
  FileCheck,
  Layers,
  Activity,
} from 'lucide-react';
import { Container, Section, Button } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleJsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'DPDP Implementation Roadmap',
  description:
    'Implementation roadmap for the DPDP Act 2023 and Rules 2025. Phased compliance guidance, priority actions, and organisational readiness.',
  path: '/resources/guides/dpdp-implementation-roadmap',
  keywords: [
    'DPDP implementation',
    'DPDP compliance roadmap',
    'data protection implementation',
    'DPDP Act timeline',
    'compliance checklist',
  ],
});

const timelinePhases = [
  {
    date: 'November 13, 2025',
    label: 'Immediate Effect',
    rules: 'Rules 1, 2, 17-21',
    title: 'Foundation Phase',
    description: 'Board establishment, definitions, and governance framework',
    status: 'active',
    items: [
      'Data Protection Board setup',
      'Key definitions in effect',
      'Board procedures established',
      'Appeal mechanisms defined',
    ],
  },
  {
    date: 'November 13, 2026',
    label: '1 Year from Publication',
    rules: 'Rule 4',
    title: 'Consent Infrastructure',
    description: 'Consent Manager registration and ecosystem development',
    status: 'upcoming',
    items: [
      'Consent Manager registration opens',
      'Platform interoperability standards',
      'Consent infrastructure deployment',
      'Technical compliance frameworks',
    ],
  },
  {
    date: 'May 13, 2027',
    label: '18 Months from Publication',
    rules: 'Rules 3, 5-16, 22-23',
    title: 'Full Compliance',
    description: 'Core obligations and organizational accountability requirements',
    status: 'future',
    items: [
      'Notice and consent requirements',
      'Security safeguards mandatory',
      'Data breach notification protocols',
      'Rights management frameworks',
      'Cross-border transfer mechanisms',
    ],
  },
];

const priorityMatrix = [
  {
    phase: 'Immediate',
    timeline: '0-6 Months',
    color: 'border-red-600 bg-red-50',
    accentColor: 'bg-red-600',
    icon: AlertCircle,
    priorities: [
      {
        title: 'Data Inventory & Mapping',
        description: 'Comprehensive audit of personal data processing activities',
        icon: Database,
      },
      {
        title: 'Notice Framework Design',
        description: 'Develop compliant notice mechanisms per Rule 3',
        icon: FileText,
      },
      {
        title: 'DPO Appointment',
        description: 'Designate Data Protection Officer or equivalent function',
        icon: Users,
      },
      {
        title: 'Gap Analysis',
        description: 'Assess current practices against DPDP requirements',
        icon: Target,
      },
    ],
  },
  {
    phase: 'Short-term',
    timeline: '6-12 Months',
    color: 'border-orange-600 bg-orange-50',
    accentColor: 'bg-orange-600',
    icon: Clock,
    priorities: [
      {
        title: 'Security Safeguards Implementation',
        description: 'Deploy technical and organizational security measures',
        icon: Lock,
      },
      {
        title: 'Breach Response Protocols',
        description: 'Establish 72-hour notification procedures',
        icon: Bell,
      },
      {
        title: 'Consent Management Systems',
        description: 'Evaluate and integrate Consent Manager platforms',
        icon: Key,
      },
      {
        title: 'Vendor Assessments',
        description: 'Review Data Processor contracts and compliance',
        icon: FileCheck,
      },
    ],
  },
  {
    phase: 'Medium-term',
    timeline: '12-18 Months',
    color: 'border-yellow-700 bg-yellow-50',
    accentColor: 'bg-yellow-700',
    icon: Layers,
    priorities: [
      {
        title: 'Full Compliance Readiness',
        description: 'Complete implementation of all DPDP obligations',
        icon: CheckCircle,
      },
      {
        title: 'Data Retention Policies',
        description: 'Implement automated retention and erasure mechanisms',
        icon: Database,
      },
      {
        title: 'Cross-border Mechanisms',
        description: 'Establish compliant international transfer procedures',
        icon: Globe,
      },
      {
        title: 'Rights Management Infrastructure',
        description: 'Deploy systems for Data Principal rights requests',
        icon: Users,
      },
    ],
  },
  {
    phase: 'Ongoing',
    timeline: 'Continuous',
    color: 'border-primary-600 bg-primary-50',
    accentColor: 'bg-primary-600',
    icon: Activity,
    priorities: [
      {
        title: 'Staff Training Programs',
        description: 'Regular capacity building and awareness initiatives',
        icon: Users,
      },
      {
        title: 'Compliance Audits',
        description: 'Periodic DPIA and audit assessments',
        icon: FileCheck,
      },
      {
        title: 'Policy Updates',
        description: 'Continuous alignment with regulatory guidance',
        icon: FileText,
      },
      {
        title: 'Monitoring & Reporting',
        description: 'Ongoing compliance monitoring and Board reporting',
        icon: Activity,
      },
    ],
  },
];

const keyRequirements = [
  {
    title: 'Notice Requirements',
    rule: 'Rule 3',
    icon: FileText,
    description: 'Clear and plain language notice to Data Principals',
    requirements: [
      'Itemized description of personal data',
      'Specified purpose of processing',
      'Goods/services to be provided',
      'Communication link for rights exercise',
      'Withdrawal mechanism with comparable ease',
    ],
  },
  {
    title: 'Consent Management',
    rule: 'Rules 10-11',
    icon: Key,
    description: 'Verifiable consent for children and persons with disability',
    requirements: [
      'Parental consent verification for children',
      'Guardian consent for persons with disability',
      'Identity and age verification mechanisms',
      'Digital Locker integration support',
      'Technical and organizational due diligence',
    ],
  },
  {
    title: 'Security Safeguards',
    rule: 'Rule 6',
    icon: Lock,
    description: 'Reasonable technical and organizational measures',
    requirements: [
      'Encryption, obfuscation, or tokenization',
      'Access control to computer resources',
      'Logging, monitoring, and review systems',
      'Data backup and continuity measures',
      'One-year log retention minimum',
    ],
  },
  {
    title: 'Breach Notification',
    rule: 'Rule 7',
    icon: AlertCircle,
    description: 'Immediate notification to affected individuals and Board',
    requirements: [
      'Data Principal notification without delay',
      'Board notification within 72 hours',
      'Description of breach nature and extent',
      'Mitigation measures and remedial actions',
      'Safety measures for Data Principals',
    ],
  },
  {
    title: 'Rights Management',
    rule: 'Rule 14',
    icon: Shield,
    description: 'Mechanisms for Data Principal rights exercise',
    requirements: [
      'Accessible means for rights requests',
      'Grievance redressal within 90 days',
      'Nomination facility for rights exercise',
      'Prominent publication of procedures',
      'Technical and organizational systems',
    ],
  },
  {
    title: 'Significant Data Fiduciary',
    rule: 'Rule 13',
    icon: Database,
    description: 'Enhanced obligations for notified organizations',
    requirements: [
      'Annual DPIA and compliance audits',
      'Algorithmic risk assessment',
      'Report submission to Board',
      'Data localization for specified categories',
      'Committee-based data governance',
    ],
  },
];

const complianceChecklist = [
  {
    category: 'Data Governance',
    items: [
      'Comprehensive data inventory completed',
      'Data flow mapping documented',
      'Processing purposes clearly defined',
      'Legal basis for processing identified',
      'Data minimization principles applied',
    ],
  },
  {
    category: 'Notice & Consent',
    items: [
      'Notice templates drafted and approved',
      'Consent mechanisms implemented',
      'Withdrawal processes established',
      'Age verification systems deployed',
      'Consent records management in place',
    ],
  },
  {
    category: 'Security & Protection',
    items: [
      'Security safeguards assessment completed',
      'Encryption/tokenization implemented',
      'Access controls established',
      'Logging and monitoring deployed',
      'Backup and recovery tested',
    ],
  },
  {
    category: 'Breach Management',
    items: [
      'Incident response plan documented',
      'Breach detection mechanisms active',
      '72-hour notification process defined',
      'Communication templates prepared',
      'Board contact procedures established',
    ],
  },
  {
    category: 'Rights & Accountability',
    items: [
      'Rights request portal implemented',
      'Grievance redressal system operational',
      'DPO or equivalent appointed',
      'Staff training program initiated',
      'Compliance monitoring established',
    ],
  },
  {
    category: 'Vendor Management',
    items: [
      'Data Processor contracts reviewed',
      'Vendor security assessments completed',
      'SLA and liability terms negotiated',
      'Cross-border transfer mechanisms verified',
      'Subprocessor management in place',
    ],
  },
];

export default function DPDPRoadmapPage() {
  return (
    <>
      <ArticleJsonLd
        title="DPDP Implementation Roadmap"
        description="Comprehensive implementation roadmap for the Digital Personal Data Protection Act 2023 and Rules 2025. Strategic guidance on phased compliance, priority actions, and organizational readiness."
        url="https://cadp.in/resources/guides/dpdp-implementation-roadmap"
        authorName="Centre for Applied Data Protection (CADP)"
        publishedAt="2026-01-30"
      />

      {/* Hero Section */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Guides', href: '/resources/guides' },
              { name: 'DPDP Implementation Roadmap', href: '/resources/guides/dpdp-implementation-roadmap' },
            ]}
          />

          <div className="mt-8 max-w-5xl mx-auto">
            {/* Ornamental header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Strategic Guidance
                </div>
                <div className="h-px w-24 bg-accent-600 mx-auto"></div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-950 mb-6 leading-tight">
                DPDP Implementation
                <br />
                <span className="italic text-primary-900">Roadmap</span>
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 my-8">
                <div className="h-px w-16 bg-accent-600"></div>
                <div className="w-2 h-2 rotate-45 bg-accent-600"></div>
                <div className="h-px w-16 bg-accent-600"></div>
              </div>

              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-serif max-w-3xl mx-auto">
                A comprehensive strategic framework for implementing the Digital Personal Data
                Protection Act 2023 and Rules 2025. Navigate compliance through phased action
                plans, priority matrices, and practical implementation guidance.
              </p>

              {/* Prerequisite callout */}
              <div className="mt-8 inline-block bg-primary-50 border border-primary-200 px-6 py-3">
                <p className="text-sm text-primary-800 font-serif">
                  <span className="font-semibold">First time here?</span> Start with our{' '}
                  <a
                    href="/resources/guides/dpdp-rules-2025/"
                    className="text-primary-700 underline hover:text-primary-900"
                  >
                    Complete Guide to DPDP Rules 2025
                  </a>{' '}
                  to understand what the rules require.
                </p>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button href="#timeline" variant="primary" size="lg">
                View Timeline
              </Button>
              <Button href="#checklist" variant="outline" size="lg">
                Compliance Checklist
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section background="gray" id="timeline">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Phased Implementation
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Implementation Timeline
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              The DPDP Rules 2025 establish a phased enforcement schedule, providing organizations
              with structured timelines for compliance readiness.
            </p>
          </div>

          {/* Timeline visualization */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline line - hidden on mobile */}
            <div className="hidden md:block absolute left-0 right-0 top-32 h-1 bg-accent-600"></div>
            <div className="hidden md:block absolute left-0 right-0 top-32 h-1 bg-linear-to-r from-accent-600 via-accent-500 to-accent-300"></div>

            {/* Timeline phases */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-4">
              {timelinePhases.map((phase, index) => (
                <div key={phase.date} className="relative">
                  {/* Timeline node - desktop */}
                  <div className="hidden md:flex absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-20 items-center justify-center z-10">
                    <div className="w-16 h-16 border-4 border-accent-600 bg-white flex items-center justify-center shadow-lg">
                      <Calendar className="w-8 h-8 text-accent-700" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Phase card */}
                  <div className="bg-white border-2 border-neutral-300 shadow-md mt-24 md:mt-28 hover:border-accent-600 transition-all duration-300">
                    <div className={`h-2 ${
                      phase.status === 'active'
                        ? 'bg-green-600'
                        : phase.status === 'upcoming'
                        ? 'bg-orange-600'
                        : 'bg-neutral-400'
                    }`}></div>

                    <div className="p-6">
                      {/* Phase number */}
                      <div className="text-6xl font-serif text-neutral-200 leading-none mb-4">
                        {index + 1}
                      </div>

                      {/* Date badge */}
                      <div className="inline-block px-3 py-1 bg-accent-100 border border-accent-300 text-accent-800 text-xs font-semibold uppercase tracking-wider mb-4">
                        {phase.date}
                      </div>

                      <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-2">
                        {phase.label}
                      </div>

                      <h3 className="text-2xl font-serif font-semibold text-neutral-950 mb-2">
                        {phase.title}
                      </h3>

                      <div className="text-sm text-primary-700 font-semibold mb-3">
                        {phase.rules}
                      </div>

                      <p className="text-neutral-700 text-sm leading-relaxed mb-4 font-serif">
                        {phase.description}
                      </p>

                      {/* Items list */}
                      <div className="pt-4 border-t border-neutral-300">
                        <ul className="space-y-2">
                          {phase.items.map((item) => (
                            <li
                              key={item}
                              className="text-sm text-neutral-600 flex items-start gap-2 font-serif"
                            >
                              <span className="text-accent-600 mt-0.5">▪</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Priority Matrix */}
      <Section background="white" id="priorities">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Action Planning
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Priority Matrix
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Strategic prioritization of compliance activities across implementation phases.
              Focus organizational resources on high-impact actions aligned with regulatory
              deadlines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {priorityMatrix.map((phase) => {
              const PhaseIcon = phase.icon;
              return (
                <div key={phase.phase} className={`bg-white border-2 ${phase.color} shadow-lg`}>
                  <div className={`h-2 ${phase.accentColor}`}></div>

                  <div className="p-8">
                    {/* Phase header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="text-sm uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-2">
                          {phase.timeline}
                        </div>
                        <h3 className="text-2xl font-serif font-semibold text-neutral-950">
                          {phase.phase} Priority
                        </h3>
                      </div>
                      <div className="w-12 h-12 border-2 border-neutral-900 bg-neutral-50 flex items-center justify-center flex-shrink-0">
                        <PhaseIcon className="w-6 h-6 text-neutral-900" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Priorities */}
                    <div className="space-y-6">
                      {phase.priorities.map((priority) => {
                        const PriorityIcon = priority.icon;
                        return (
                          <div
                            key={priority.title}
                            className="flex gap-4 items-start p-4 bg-white border border-neutral-300 hover:border-neutral-900 transition-colors"
                          >
                            <div className="w-10 h-10 border border-neutral-300 bg-neutral-50 flex items-center justify-center flex-shrink-0">
                              <PriorityIcon
                                className="w-5 h-5 text-neutral-700"
                                strokeWidth={1.5}
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-base font-serif font-semibold text-neutral-950 mb-1">
                                {priority.title}
                              </h4>
                              <p className="text-sm text-neutral-600 font-serif">
                                {priority.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Key Requirements */}
      <Section background="gray" id="requirements">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Core Obligations
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Key Requirements
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Essential compliance obligations under the DPDP Rules 2025, organized by functional
              area for implementation planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyRequirements.map((requirement) => {
              const RequirementIcon = requirement.icon;
              return (
                <div
                  key={requirement.title}
                  className="bg-white border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <div className="h-1.5 bg-primary-600"></div>

                  <div className="p-6">
                    {/* Icon and title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 border-2 border-primary-900 bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <RequirementIcon
                          className="w-6 h-6 text-primary-900"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-1">
                          {requirement.title}
                        </h3>
                        <div className="text-xs text-primary-700 font-semibold">
                          {requirement.rule}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-700 leading-relaxed mb-4 font-serif">
                      {requirement.description}
                    </p>

                    {/* Requirements list */}
                    <div className="pt-4 border-t border-neutral-300">
                      <ul className="space-y-2">
                        {requirement.requirements.map((req) => (
                          <li
                            key={req}
                            className="text-xs text-neutral-600 flex items-start gap-2 font-serif"
                          >
                            <CheckCircle
                              className="w-3.5 h-3.5 text-accent-600 mt-0.5 flex-shrink-0"
                              strokeWidth={2}
                            />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Compliance Checklist */}
      <Section background="white" id="checklist">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Implementation Tool
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">
              Compliance Checklist
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif mb-8">
              Comprehensive verification framework for organizational readiness assessment and
              compliance validation.
            </p>

            <Button
              href="#"
              variant="primary"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Printable Checklist
            </Button>
          </div>

          {/* Checklist grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-12">
            {complianceChecklist.map((category, catIndex) => (
              <div
                key={category.category}
                className="bg-white border-2 border-neutral-300 shadow-md"
              >
                <div className="h-2 bg-accent-600"></div>

                <div className="p-6">
                  {/* Category header */}
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-xl font-serif font-semibold text-neutral-950">
                      {category.category}
                    </h3>
                    <div className="text-3xl font-serif text-neutral-200 leading-none">
                      {catIndex + 1}
                    </div>
                  </div>

                  {/* Checklist items */}
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-neutral-400 bg-white flex-shrink-0 mt-0.5"></div>
                        <span className="text-sm text-neutral-700 font-serif">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Flow Diagrams Info */}
      <Section background="gray">
        <Container size="narrow">
          <div className="bg-white border-4 border-primary-950 p-10 shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-primary-900 bg-primary-50 flex items-center justify-center mx-auto mb-6">
                <Layers className="w-8 h-8 text-primary-900" strokeWidth={1.5} />
              </div>

              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Visual Guides
                </div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>

              <h2 className="text-3xl font-serif font-semibold text-neutral-950 mb-4">
                Process Flow Diagrams
              </h2>

              <p className="text-neutral-700 leading-relaxed font-serif mb-8">
                Detailed visual workflows illustrating data processing lifecycles, consent
                mechanisms, breach notification timelines, and rights management procedures under
                the DPDP framework.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-neutral-300 bg-neutral-50">
                  <span className="text-sm font-serif text-neutral-900">
                    Data Processing Lifecycle
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-600" />
                </div>
                <div className="flex items-center justify-between p-4 border border-neutral-300 bg-neutral-50">
                  <span className="text-sm font-serif text-neutral-900">Consent Flow Diagram</span>
                  <ArrowRight className="w-4 h-4 text-neutral-600" />
                </div>
                <div className="flex items-center justify-between p-4 border border-neutral-300 bg-neutral-50">
                  <span className="text-sm font-serif text-neutral-900">
                    Breach Notification Timeline
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-600" />
                </div>
              </div>

              <div className="mt-8">
                <Button href="/contact/" variant="outline" size="lg">
                  Request Full Visual Package
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="white">
        <Container size="narrow">
          <div className="border-4 border-primary-950 bg-primary-950 p-10 md:p-14 shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-600 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-600 opacity-20"></div>

            <div className="text-center relative z-10">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">
                  Expert Guidance
                </div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">
                Navigate DPDP Compliance with Confidence
              </h2>

              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Partner with CADP for strategic advisory services, implementation support, and
                capacity-building programs tailored to your organizational context.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/programs-and-initiatives/compliance-advisory/" variant="secondary" size="lg">
                  Compliance Advisory
                </Button>
                <Button
                  href="/programs-and-initiatives/dpdp-training/"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-950 transition-colors font-semibold"
                >
                  Training Programs
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
