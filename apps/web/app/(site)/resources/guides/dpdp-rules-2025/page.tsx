import { Metadata } from "next";
import {
  Shield,
  FileText,
  Clock,
  ArrowRight,
  Calendar,
  Users,
  Building2,
  Scale,
  AlertTriangle,
  Globe,
  Lock,
  Bell,
  Database,
  Gavel,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { Container, Section, Button } from "@/components/ui";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "DPDP Rules 2025: Complete Guide to India's Data Protection Rules",
  description:
    "Comprehensive breakdown of all 23 DPDP Rules 2025. Learn what the rules require, implementation timelines, and compliance obligations for Indian businesses.",
  path: "/resources/guides/dpdp-rules-2025",
  keywords: [
    "DPDP rules",
    "DPDP rules 2025",
    "DPDP act rules",
    "meity dpdp rules",
    "digital personal data protection rules",
    "data protection India",
  ],
});

const implementationPhases = [
  {
    phase: "Phase 1",
    date: "November 13, 2025",
    label: "Immediate Effect",
    rules: "Rules 1, 2, 17-21",
    description: "Foundation and governance framework",
    status: "active",
    items: [
      "Short title and commencement (Rule 1)",
      "Key definitions established (Rule 2)",
      "Data Protection Board appointments (Rule 17)",
      "Board procedures and digital office (Rules 19-20)",
    ],
  },
  {
    phase: "Phase 2",
    date: "November 13, 2026",
    label: "1 Year from Publication",
    rules: "Rule 4",
    description: "Consent infrastructure development",
    status: "upcoming",
    items: [
      "Consent Manager registration opens",
      "₹2 crore net worth requirement",
      "Platform interoperability standards",
      "First Schedule obligations activate",
    ],
  },
  {
    phase: "Phase 3",
    date: "May 13, 2027",
    label: "18 Months from Publication",
    rules: "Rules 3, 5-16, 22-23",
    description: "Full compliance obligations",
    status: "future",
    items: [
      "Notice and consent requirements (Rule 3)",
      "Security safeguards mandatory (Rule 6)",
      "Breach notification protocols (Rule 7)",
      "Cross-border transfer mechanisms (Rule 15)",
    ],
  },
];

const ruleCategories = [
  {
    title: "Foundation",
    rules: "1-2",
    icon: BookOpen,
    items: [
      {
        rule: "Rule 1",
        title: "Short Title & Commencement",
        description: "Establishes phased implementation timeline for different rule categories",
      },
      {
        rule: "Rule 2",
        title: "Definitions",
        description: 'Defines "techno-legal measures", "user account", and "verifiable consent"',
      },
    ],
  },
  {
    title: "Notice & Consent",
    rules: "3-4",
    icon: FileText,
    items: [
      {
        rule: "Rule 3",
        title: "Notice Requirements",
        description: "Itemized data description, specified purpose, withdrawal mechanism with comparable ease",
      },
      {
        rule: "Rule 4",
        title: "Consent Manager Registration",
        description: "Board registration, ₹2 crore net worth, interoperable platform, fiduciary duties",
      },
    ],
  },
  {
    title: "State Processing",
    rules: "5",
    icon: Shield,
    items: [
      {
        rule: "Rule 5",
        title: "State Processing Standards",
        description: "Processing by State for subsidies, benefits, services, certificates, licences, or permits must follow Second Schedule standards including lawful processing, purpose limitation, data minimization, and security safeguards",
      },
    ],
  },
  {
    title: "Security & Breach",
    rules: "6-8",
    icon: Lock,
    items: [
      {
        rule: "Rule 6",
        title: "Security Safeguards",
        description: "Encryption/tokenization, access controls, logging with 1-year retention, backups",
      },
      {
        rule: "Rule 7",
        title: "Breach Notification",
        description: "Immediate notification to Data Principals, 72-hour notification to Board with detailed report",
      },
      {
        rule: "Rule 8",
        title: "Data Retention Periods",
        description: "48-hour erasure notice, 3-year retention for large platforms per Third Schedule",
      },
    ],
  },
  {
    title: "Children & PWDs",
    rules: "10-12",
    icon: Users,
    items: [
      {
        rule: "Rule 10",
        title: "Children's Data",
        description: "Verifiable parental consent, identity verification via Digital Locker or government-issued details",
      },
      {
        rule: "Rule 11",
        title: "Persons with Disability",
        description: "Lawful guardian verification under RPwD Act 2016 or National Trust Act 1999",
      },
      {
        rule: "Rule 12",
        title: "Exemptions",
        description: "Healthcare, education, child safety tracking, transport monitoring per Fourth Schedule",
      },
    ],
  },
  {
    title: "Significant Data Fiduciary",
    rules: "13",
    icon: Building2,
    items: [
      {
        rule: "Rule 13",
        title: "Enhanced Obligations",
        description: "Annual DPIA and audit, algorithmic risk assessment, data localization for specified categories",
      },
    ],
  },
  {
    title: "Rights & Transfers",
    rules: "14-16",
    icon: Globe,
    items: [
      {
        rule: "Rule 14",
        title: "Data Principal Rights",
        description: "Rights exercise mechanism, 90-day grievance redressal, nomination facility",
      },
      {
        rule: "Rule 15",
        title: "Cross-Border Transfers",
        description: "Subject to Central Government requirements for foreign state data sharing",
      },
      {
        rule: "Rule 16",
        title: "Research Exemption",
        description: "Processing for research/archiving/statistics per Second Schedule standards",
      },
    ],
  },
  {
    title: "Data Protection Board",
    rules: "17-21",
    icon: Gavel,
    items: [
      {
        rule: "Rules 17-18",
        title: "Appointments & Terms",
        description: "Search-cum-Selection Committee process, ₹4.5L/month Chairperson salary",
      },
      {
        rule: "Rules 19-20",
        title: "Procedures",
        description: "Meeting quorum (1/3 members), digital office functioning, techno-legal measures",
      },
      {
        rule: "Rule 21",
        title: "Staff Appointments",
        description: "Officers on deputation up to 5 years per Sixth Schedule",
      },
    ],
  },
  {
    title: "Appeals & Information",
    rules: "22-23",
    icon: Scale,
    items: [
      {
        rule: "Rule 22",
        title: "Appeals",
        description: "Digital filing to Appellate Tribunal, UPI/RBI-authorized payment methods",
      },
      {
        rule: "Rule 23",
        title: "Information Calling",
        description: "Government power to require information per Seventh Schedule purposes",
      },
    ],
  },
];

const keyNumbers = [
  { label: "Breach notification to Board", value: "72 hours", icon: Bell },
  { label: "Grievance resolution deadline", value: "90 days", icon: Clock },
  { label: "Minimum log retention", value: "1 year", icon: Database },
  { label: "Consent Manager net worth", value: "₹2 crore", icon: Building2 },
  { label: "Maximum penalty", value: "₹250 crore", icon: AlertTriangle },
  { label: "Board inquiry completion", value: "6 months", icon: Gavel },
];

const schedules = [
  {
    number: "First",
    subject: "Consent Manager",
    content: "Registration conditions (Part A) and operational obligations (Part B)",
  },
  {
    number: "Second",
    subject: "Processing Standards",
    content: "Standards for State processing under Section 7(b) and research exemption",
  },
  {
    number: "Third",
    subject: "Data Retention",
    content: "Erasure timelines for e-commerce (2Cr users), gaming (50L users), social media",
  },
  {
    number: "Fourth",
    subject: "Child Data Exemptions",
    content: "Healthcare, education, transport tracking, safety monitoring exemptions",
  },
  {
    number: "Fifth",
    subject: "Board Member Terms",
    content: "Salaries, allowances, provident fund, travel, medical assistance",
  },
  {
    number: "Sixth",
    subject: "Board Staff Terms",
    content: "Deputation terms, gratuity, leave travel concession",
  },
  {
    number: "Seventh",
    subject: "Information Calling",
    content: "Purposes and authorised persons for government data requests",
  },
];

const faqs = [
  {
    question: "What are the DPDP Rules 2025?",
    answer:
      "The DPDP Rules 2025 are implementing regulations notified by MeitY on November 13, 2025, under Section 40 of the Digital Personal Data Protection Act, 2023. They contain 23 rules and 7 schedules that operationalize the Act's provisions.",
  },
  {
    question: "When do the DPDP Rules come into force?",
    answer:
      "The rules come into force in three phases: Rules 1, 2, 17-21 took effect immediately (November 13, 2025); Rule 4 comes into force on November 13, 2026; and Rules 3, 5-16, 22-23 come into force on May 13, 2027.",
  },
  {
    question: "What is the difference between DPDP Act and DPDP Rules?",
    answer:
      "The DPDP Act 2023 is the parent legislation enacted by Parliament that establishes rights, obligations, and penalties. The DPDP Rules 2025 are subordinate regulations made by the Central Government that provide operational details, procedures, timelines, and formats.",
  },
  {
    question: "What are the penalties under DPDP Rules?",
    answer:
      "Penalties are specified in the DPDP Act Schedule: up to ₹250 crore for security safeguard failures, up to ₹200 crore for breach notification failures, up to ₹200 crore for children's data violations, and up to ₹150 crore for Significant Data Fiduciary non-compliance.",
  },
  {
    question: "Who is a Significant Data Fiduciary?",
    answer:
      "A Significant Data Fiduciary is any Data Fiduciary notified by the Central Government based on volume/sensitivity of data processed, risk to Data Principals, impact on sovereignty/security, risk to electoral democracy, and public order considerations.",
  },
];

export default function DPDPRulesGuidePage() {
  return (
    <>
      <ArticleJsonLd
        title="DPDP Rules 2025: Complete Guide to India's Data Protection Rules"
        description="Comprehensive breakdown of all 23 DPDP Rules 2025. Learn what the rules require, implementation timelines, and compliance obligations for Indian businesses."
        url="https://cadp.in/resources/guides/dpdp-rules-2025"
        authorName="Centre for Applied Data Protection (CADP)"
        publishedAt="2026-01-31"
      />

      {/* Hero Section */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Resources", href: "/resources" },
              { name: "Guides", href: "/resources/guides" },
              { name: "DPDP Rules 2025", href: "/resources/guides/dpdp-rules-2025" },
            ]}
          />

          <div className="mt-8 max-w-5xl mx-auto">
            {/* Ornamental header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Comprehensive Guide</div>
                <div className="h-px w-24 bg-accent-600 mx-auto"></div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-950 mb-6 leading-tight">
                DPDP Rules 2025
                <br />
                <span className="italic text-primary-900">Complete Guide</span>
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 my-8">
                <div className="h-px w-16 bg-accent-600"></div>
                <div className="w-2 h-2 rotate-45 bg-accent-600"></div>
                <div className="h-px w-16 bg-accent-600"></div>
              </div>

              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-serif max-w-3xl mx-auto mb-8">
                The Digital Personal Data Protection Rules, 2025 were notified by MeitY on November 13, 2025, operationalizing India's landmark data
                protection framework. This guide provides a comprehensive breakdown of all 23 rules and their compliance requirements.
              </p>

              {/* Key stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { label: "23 Rules", icon: FileText },
                  { label: "7 Schedules", icon: BookOpen },
                  { label: "3 Phases", icon: Calendar },
                  { label: "₹250Cr Max Penalty", icon: AlertTriangle },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 text-primary-900">
                    <stat.icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-sm font-semibold">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#timeline" variant="primary" size="lg">
                Implementation Timeline
              </Button>
              <Button href="#rules" variant="outline" size="lg">
                Rule-by-Rule Breakdown
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* What Are DPDP Rules */}
      <Section background="gray" id="overview">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Understanding the Framework</div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">What Are the DPDP Rules 2025?</h2>
            </div>

            <div className="bg-white border-2 border-neutral-300 p-8 md:p-10 shadow-md mb-10">
              <p className="text-lg text-neutral-700 leading-relaxed font-serif mb-6">
                The Digital Personal Data Protection Rules, 2025 are implementing regulations issued by the Ministry of Electronics and Information
                Technology (MeitY) under Section 40 of the Digital Personal Data Protection Act, 2023. Published via Gazette notification G.S.R.
                846(E), these rules provide the operational framework for India's data protection regime.
              </p>
              <p className="text-neutral-600 leading-relaxed font-serif">
                Draft rules were published on January 3, 2025 for public consultation, with the final rules notified on November 13, 2025 after
                considering stakeholder objections and suggestions.
              </p>
            </div>

            {/* Act vs Rules comparison */}
            <div className="bg-white border-2 border-neutral-300 shadow-md overflow-hidden">
              <div className="h-2 bg-primary-600"></div>
              <div className="p-8">
                <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-6 text-center">DPDP Act 2023 vs DPDP Rules 2025</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="border-b-2 border-neutral-300">
                        <th className="text-left py-3 px-4 font-semibold text-neutral-950">Aspect</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-950">DPDP Act 2023</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-950">DPDP Rules 2025</th>
                      </tr>
                    </thead>
                    <tbody className="font-serif">
                      <tr className="border-b border-neutral-200">
                        <td className="py-3 px-4 font-semibold text-neutral-700">Nature</td>
                        <td className="py-3 px-4 text-neutral-600">Parent legislation (44 sections)</td>
                        <td className="py-3 px-4 text-neutral-600">Implementing regulations (23 rules)</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-3 px-4 font-semibold text-neutral-700">Enacted By</td>
                        <td className="py-3 px-4 text-neutral-600">Parliament of India</td>
                        <td className="py-3 px-4 text-neutral-600">Central Government (MeitY)</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-3 px-4 font-semibold text-neutral-700">Content</td>
                        <td className="py-3 px-4 text-neutral-600">Rights, obligations, penalties</td>
                        <td className="py-3 px-4 text-neutral-600">Procedures, timelines, formats</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-neutral-700">Amendment</td>
                        <td className="py-3 px-4 text-neutral-600">Requires Parliamentary process</td>
                        <td className="py-3 px-4 text-neutral-600">Central Government notification</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Implementation Timeline */}
      <Section background="white" id="timeline">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Phased Enforcement</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">When Do the DPDP Rules Come Into Effect?</h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              The rules establish a phased implementation schedule, providing organizations with structured timelines for compliance readiness.
            </p>
          </div>

          {/* Timeline cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {implementationPhases.map((phase, index) => (
              <div key={phase.phase} className="bg-white border-2 border-neutral-300 shadow-md hover:border-accent-600 transition-all duration-300">
                <div
                  className={`h-2 ${phase.status === "active" ? "bg-green-600" : phase.status === "upcoming" ? "bg-orange-600" : "bg-neutral-400"}`}
                ></div>

                <div className="p-6">
                  {/* Phase number */}
                  <div className="text-6xl font-serif text-neutral-200 leading-none mb-4">{index + 1}</div>

                  {/* Date badge */}
                  <div className="inline-block px-3 py-1 bg-accent-100 border border-accent-300 text-accent-800 text-xs font-semibold uppercase tracking-wider mb-4">
                    {phase.date}
                  </div>

                  <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-2">{phase.label}</div>

                  <h3 className="text-2xl font-serif font-semibold text-neutral-950 mb-2">{phase.phase}</h3>

                  <div className="text-sm text-primary-700 font-semibold mb-3">{phase.rules}</div>

                  <p className="text-neutral-700 text-base leading-relaxed mb-4 font-serif">{phase.description}</p>

                  {/* Items list */}
                  <div className="pt-4 border-t border-neutral-300">
                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li key={item} className="text-base text-neutral-600 flex items-start gap-2 font-serif">
                          <span className="text-accent-600 mt-0.5">▪</span>
                          <span>{item}</span>
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

      {/* Rule-by-Rule Breakdown */}
      <Section background="gray" id="rules">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Complete Analysis</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">All 23 DPDP Rules Explained</h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              A comprehensive breakdown of each rule category, organized by functional area for easy reference and implementation planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {ruleCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <div
                  key={category.title}
                  className="bg-white border-2 border-neutral-300 hover:border-primary-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <div className="h-1.5 bg-primary-600"></div>
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 border-2 border-primary-900 bg-primary-50 flex items-center justify-center shrink-0">
                        <CategoryIcon className="w-6 h-6 text-primary-900" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-semibold text-neutral-950">{category.title}</h3>
                        <div className="text-sm text-primary-700 font-semibold">Rules {category.rules}</div>
                      </div>
                    </div>

                    {/* Rules list */}
                    <div className="space-y-4">
                      {category.items.map((item) => (
                        <div key={item.rule} className="border-l-2 border-neutral-200 pl-4">
                          <div className="text-sm text-accent-700 font-semibold uppercase tracking-wider mb-1">{item.rule}</div>
                          <div className="text-lg font-semibold text-neutral-900 mb-1">{item.title}</div>
                          <p className="text-base text-neutral-600 font-serif leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </Container>
      </Section>

      {/* Key Numbers */}
      <Section background="white" id="numbers">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Critical Thresholds</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">Key Compliance Numbers</h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Essential deadlines and thresholds that organizations must know for DPDP compliance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {keyNumbers.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div key={item.label} className="bg-white border-2 border-neutral-300 p-6 text-center hover:border-accent-600 transition-colors">
                  <div className="w-12 h-12 border-2 border-neutral-300 bg-neutral-50 flex items-center justify-center mx-auto mb-4">
                    <ItemIcon className="w-6 h-6 text-neutral-700" strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl font-serif font-bold text-primary-900 mb-2">{item.value}</div>
                  <div className="text-base text-neutral-600 font-serif">{item.label}</div>
                </div>
              );
            })}
          </div>

          {/* Additional thresholds */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-primary-50 border-2 border-primary-200 p-8">
              <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-6 text-center">Platform User Thresholds (Third Schedule)</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-serif font-bold text-primary-900">2 Crore</div>
                  <div className="text-sm text-neutral-600 font-serif">E-commerce entities</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-primary-900">50 Lakh</div>
                  <div className="text-sm text-neutral-600 font-serif">Online gaming intermediaries</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-primary-900">2 Crore</div>
                  <div className="text-sm text-neutral-600 font-serif">Social media intermediaries</div>
                </div>
              </div>
              <p className="text-base text-neutral-600 font-serif text-center mt-6">
                Platforms exceeding these user thresholds must erase personal data after 3 years of inactivity
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Seven Schedules */}
      <Section background="gray" id="schedules">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Detailed Requirements</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">The Seven Schedules</h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              The DPDP Rules 2025 include seven schedules containing detailed requirements, conditions, and operational parameters.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-neutral-300 shadow-md overflow-hidden">
              <div className="h-2 bg-accent-600"></div>
              <div className="divide-y divide-neutral-200">
                {schedules.map((schedule, index) => (
                  <div key={schedule.number} className="p-6 flex gap-6 items-start hover:bg-neutral-50 transition-colors">
                    <div className="text-4xl font-serif text-neutral-200 leading-none w-12 shrink-0">{index + 1}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs uppercase tracking-wider text-accent-700 font-semibold">{schedule.number} Schedule</span>
                        <span className="text-neutral-400">•</span>
                        <span className="text-sm font-semibold text-neutral-900">{schedule.subject}</span>
                      </div>
                      <p className="text-base text-neutral-600 font-serif">{schedule.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Official Sources */}
      <Section background="white" id="sources">
        <Container size="narrow">
          <div className="bg-white border-4 border-primary-950 p-10 shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-primary-900 bg-primary-50 flex items-center justify-center mx-auto mb-6">
                <ExternalLink className="w-8 h-8 text-primary-900" strokeWidth={1.5} />
              </div>

              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Authoritative References</div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>

              <h2 className="text-3xl font-serif font-semibold text-neutral-950 mb-4">Official Sources</h2>

              <p className="text-neutral-700 leading-relaxed font-serif mb-8">
                For authoritative text of the DPDP Rules 2025, always refer to the official Gazette of India notification. The rules were published
                under notification number G.S.R. 846(E) dated November 13, 2025.
              </p>

              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-center gap-3 p-3 border border-neutral-300 bg-neutral-50">
                  <FileText className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
                  <span className="text-sm font-serif text-neutral-700">Gazette of India: G.S.R. 846(E)</span>
                </div>
                <div className="flex items-center gap-3 p-3 border border-neutral-300 bg-neutral-50">
                  <Globe className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
                  <span className="text-sm font-serif text-neutral-700">MeitY Digital India Portal</span>
                </div>
                <div className="flex items-center gap-3 p-3 border border-neutral-300 bg-neutral-50">
                  <Gavel className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
                  <span className="text-sm font-serif text-neutral-700">Data Protection Board (upon establishment)</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section background="gray" id="faq">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Common Questions</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border-2 border-neutral-300 shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">{faq.question}</h3>
                  <p className="text-lg text-neutral-600 font-serif leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Related Resources */}
      <Section background="white" id="next-steps">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Continue Learning</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">Next Steps</h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-serif">
              Now that you understand what the DPDP Rules require, explore our implementation resources to begin your compliance journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a
              href="/resources/guides/dpdp-implementation-roadmap/"
              className="group bg-white border-2 border-neutral-300 p-6 hover:border-primary-600 transition-all duration-300"
            >
              <div className="w-12 h-12 border-2 border-primary-600 bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                <FileText className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2">Implementation Roadmap</h3>
              <p className="text-base text-neutral-600 font-serif mb-4">Step-by-step compliance guide with priority matrix and checklists</p>
              <div className="flex items-center text-primary-700 text-sm font-semibold">
                Read Guide <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </a>

            <a
              href="/programs-and-initiatives/dpdp-training/"
              className="group bg-white border-2 border-neutral-300 p-6 hover:border-primary-600 transition-all duration-300"
            >
              <div className="w-12 h-12 border-2 border-primary-600 bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                <Users className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2">DPDP Training Programme</h3>
              <p className="text-base text-neutral-600 font-serif mb-4">Build organizational capacity with certified training courses</p>
              <div className="flex items-center text-primary-700 text-sm font-semibold">
                View Programme <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </a>

            <a
              href="/programs-and-initiatives/compliance-advisory/"
              className="group bg-white border-2 border-neutral-300 p-6 hover:border-primary-600 transition-all duration-300"
            >
              <div className="w-12 h-12 border-2 border-primary-600 bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                <Shield className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2">Compliance Advisory</h3>
              <p className="text-base text-neutral-600 font-serif mb-4">Expert guidance tailored to your organizational context</p>
              <div className="flex items-center text-primary-700 text-sm font-semibold">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </a>
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
                <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">Expert Guidance</div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">Need Help Interpreting the Rules?</h2>

              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Our team of legal and compliance experts can help you understand how the DPDP Rules 2025 apply to your specific organizational
                context.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact/" variant="secondary" size="lg">
                  Contact Our Team
                </Button>
                <Button
                  href="/resources/guides/dpdp-implementation-roadmap/"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-950 transition-colors font-semibold"
                >
                  View Implementation Guide
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
