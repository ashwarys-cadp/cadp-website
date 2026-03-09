import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ArrowRight,
  Calendar,
  BookOpen,
  ClipboardList,
  Info,
  Shield,
} from "lucide-react";
import { Container, Section, Badge } from "@/components/ui";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Newsletter } from "@/components/sections/Newsletter";
import { getTrackerData, getCategoryStats } from "@/lib/official-texts/tracker";
import { formatDate } from "@/lib/utils";
import type { CategoryStatus } from "@/data/official-texts/implementation-tracker-types";

export const metadata: Metadata = generatePageMetadata({
  title: "DPDP Act Implementation Status 2026 — Complete Tracker",
  description:
    "Track every obligation the Indian government must fulfil under the DPDP Act 2023 and Rules 2025. Comprehensive status tracker covering Board setup, consent frameworks, cross-border rules, and more.",
  path: "/resources/guides/dpdp-implementation-tracker",
  keywords: [
    "dpdp act india implementation status 2026",
    "dpdp act status",
    "dpdp implementation",
    "data protection board india",
    "dpdp rules implementation",
  ],
  type: "article",
});

const statusBadgeVariant: Record<CategoryStatus, "success" | "warning" | "default"> = {
  complete: "success",
  partial: "warning",
  pending: "default",
};

const statusLabel: Record<CategoryStatus, string> = {
  complete: "Complete",
  partial: "Partial",
  pending: "Pending",
};

export default function DPDPImplementationTrackerPage() {
  const tracker = getTrackerData();
  const stats = getCategoryStats(tracker.categories);

  return (
    <>
      <ArticleJsonLd
        title="DPDP Act Implementation Status 2026 — Complete Tracker"
        description="Track every obligation the Indian government must fulfil under the DPDP Act 2023 and Rules 2025. Comprehensive status tracker covering Board setup, consent frameworks, cross-border rules, and more."
        url="https://cadp.in/resources/guides/dpdp-implementation-tracker"
        authorName="Centre for Applied Data Protection (CADP)"
        publishedAt="2026-03-09"
        modifiedAt={tracker.lastUpdated}
      />

      {/* Hero Section */}
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Resources", href: "/resources" },
              { name: "Guides", href: "/resources/guides" },
              { name: "Implementation Tracker", href: "/resources/guides/dpdp-implementation-tracker" },
            ]}
          />

          <div className="mt-8 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Comprehensive Guide</div>
                <div className="h-px w-24 bg-accent-600 mx-auto"></div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-950 mb-6 leading-tight">
                DPDP Act Implementation Status
                <br />
                <span className="italic text-primary-900">Complete Tracker</span>
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 my-8">
                <div className="h-px w-16 bg-accent-600"></div>
                <div className="w-2 h-2 rotate-45 bg-accent-600"></div>
                <div className="h-px w-16 bg-accent-600"></div>
              </div>

              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-serif max-w-3xl mx-auto mb-8">
                As of March 2026, the DPDP Act 2023 is in force and the Data Protection Board of India has been established. The DPDP Rules 2025,
                notified on November 13, 2025, operationalise the bulk of the Act&apos;s delegated provisions. Several key areas — including cross-border
                transfer restrictions, Significant Data Fiduciary designations, and data localisation requirements — remain pending separate government
                notification.
              </p>

              {/* Key stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { label: `${stats.totalItems} Obligations`, icon: ClipboardList },
                  { label: `${stats.notifiedItems} Notified`, icon: FileText },
                  { label: `${stats.pendingItems} Pending`, icon: Calendar },
                  { label: `${tracker.categories.length} Categories`, icon: BookOpen },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 text-primary-900">
                    <stat.icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-sm font-semibold">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="text-sm text-neutral-500 font-serif">
                Last updated: {formatDate(tracker.lastUpdated)}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Category Overview Strip */}
      <Section background="gray" id="overview">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Overview</div>
              <div className="h-px w-20 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">Implementation Status by Category</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {tracker.categories.map((category) => {
              const notified = category.items.filter((i) => i.status === "notified").length;
              const total = category.items.length;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="bg-white border-2 border-neutral-300 shadow-md p-6 hover:border-primary-600 transition-all duration-300"
                >
                  <h3 className="text-base font-serif font-semibold text-neutral-950 mb-3">{category.name}</h3>
                  <div className="mb-3">
                    <Badge variant={statusBadgeVariant[category.status]}>{statusLabel[category.status]}</Badge>
                  </div>
                  <div className="text-sm text-neutral-600 font-serif">
                    {notified} of {total} notified
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Detailed Sections */}
      <Section background="white" id="detailed-tracker">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Detailed Tracker</div>
              <div className="h-px w-20 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">Obligation-by-Obligation Status</h2>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {tracker.categories.map((category) => (
              <div key={category.id} id={category.id}>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <h3 className="text-2xl font-serif font-semibold text-neutral-950">{category.name}</h3>
                  <Badge variant={statusBadgeVariant[category.status]}>{statusLabel[category.status]}</Badge>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="border-b-2 border-neutral-300">
                        <th className="text-left py-3 px-4 font-semibold text-neutral-950">Obligation</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-950">Source</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-950">Responsible Body</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-950">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-950">Implementation</th>
                      </tr>
                    </thead>
                    <tbody className="font-serif">
                      {category.items.map((item) => (
                        <tr key={item.id} className="border-b border-neutral-200">
                          <td className="py-3 px-4 text-neutral-700">{item.requirement}</td>
                          <td className="py-3 px-4 text-neutral-600">
                            <Link
                              href={`/resources/official-texts/${item.source.document}#${item.source.sectionId}`}
                              className="text-primary-700 hover:text-primary-900"
                            >
                              {item.source.label}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-neutral-600">{item.responsibleBody}</td>
                          <td className="py-3 px-4">
                            <Badge variant={item.status === "notified" ? "success" : "default"}>
                              {item.status === "notified" ? "Notified" : "Pending"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-neutral-600">
                            {item.implementation ? (
                              <>
                                {item.implementation.documentId ? (
                                  <Link
                                    href={`/resources/official-texts/${item.implementation.documentId}`}
                                    className="text-primary-700 hover:text-primary-900"
                                  >
                                    {item.implementation.instrument}
                                  </Link>
                                ) : (
                                  <span>{item.implementation.instrument}</span>
                                )}
                                <span className="text-neutral-400 ml-1">({formatDate(item.implementation.date)})</span>
                              </>
                            ) : (
                              <span className="text-neutral-400">&mdash;</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile card layout */}
                <div className="md:hidden space-y-4">
                  {category.items.map((item) => (
                    <div key={item.id} className="bg-white border-2 border-neutral-300 shadow-md p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="text-base font-serif font-semibold text-neutral-950 leading-snug">{item.requirement}</h4>
                        <Badge variant={item.status === "notified" ? "success" : "default"} className="shrink-0">
                          {item.status === "notified" ? "Notified" : "Pending"}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm font-serif">
                        <div className="flex gap-2">
                          <span className="text-neutral-500 shrink-0">Source:</span>
                          <Link
                            href={`/resources/official-texts/${item.source.document}#${item.source.sectionId}`}
                            className="text-primary-700 hover:text-primary-900"
                          >
                            {item.source.label}
                          </Link>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-neutral-500 shrink-0">Body:</span>
                          <span className="text-neutral-600">{item.responsibleBody}</span>
                        </div>
                        {item.implementation && (
                          <div className="flex gap-2">
                            <span className="text-neutral-500 shrink-0">Via:</span>
                            <span className="text-neutral-600">
                              {item.implementation.documentId ? (
                                <Link
                                  href={`/resources/official-texts/${item.implementation.documentId}`}
                                  className="text-primary-700 hover:text-primary-900"
                                >
                                  {item.implementation.instrument}
                                </Link>
                              ) : (
                                item.implementation.instrument
                              )}
                              <span className="text-neutral-400 ml-1">({formatDate(item.implementation.date)})</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Methodology Note */}
      <Section background="gray" id="methodology">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-neutral-300 p-8 md:p-10 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-neutral-300 bg-neutral-50 flex items-center justify-center shrink-0">
                  <Info className="w-6 h-6 text-neutral-700" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-semibold text-neutral-950 mb-4">Methodology</h2>
                  <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                    This tracker covers all delegated obligations from the Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025
                    that require separate government notification or action before they take effect. It is updated each time a new Gazette
                    notification is published. For the full text of the legislation and notifications referenced here, see our{" "}
                    <Link href="/resources/official-texts" className="text-primary-700 hover:text-primary-900">
                      official texts section
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Resources */}
      <Section background="white" id="related">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Continue Learning</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-6">Related Resources</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link
              href="/resources/guides/dpdp-rules-2025/"
              className="group bg-white border-2 border-neutral-300 p-6 hover:border-primary-600 transition-all duration-300"
            >
              <div className="w-12 h-12 border-2 border-primary-600 bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                <BookOpen className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2">DPDP Rules 2025 Guide</h3>
              <p className="text-base text-neutral-600 font-serif mb-4">Complete breakdown of all 23 rules, schedules, and compliance timelines</p>
              <div className="flex items-center text-primary-700 text-sm font-semibold">
                Read Guide <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
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
            </Link>

            <Link
              href="/resources/official-texts/"
              className="group bg-white border-2 border-neutral-300 p-6 hover:border-primary-600 transition-all duration-300"
            >
              <div className="w-12 h-12 border-2 border-primary-600 bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                <ClipboardList className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2">Official Texts</h3>
              <p className="text-base text-neutral-600 font-serif mb-4">Full text of the DPDP Act, Rules, and all Gazette notifications</p>
              <div className="flex items-center text-primary-700 text-sm font-semibold">
                Browse Texts <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/programs-and-initiatives/compliance-advisory/"
              className="group bg-white border-2 border-neutral-300 p-6 hover:border-primary-600 transition-all duration-300"
            >
              <div className="w-12 h-12 border-2 border-primary-600 bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                <Shield className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2">Compliance Advisory</h3>
              <p className="text-base text-neutral-600 font-serif mb-4">Expert guidance on navigating DPDP compliance for your organisation</p>
              <div className="flex items-center text-primary-700 text-sm font-semibold">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
