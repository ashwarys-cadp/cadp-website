import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Download, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Container, Section, Button, Card, Badge } from "@/components/ui";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { client, urlFor, whitePaperBySlugQuery, allWhitePapersQuery, type WhitePaper } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";

interface WhitePaperPageProps {
  params: Promise<{ slug: string }>;
}

async function getWhitePaper(slug: string): Promise<WhitePaper | null> {
  try {
    return await client.fetch<WhitePaper>(whitePaperBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const fallback = [{ slug: "dpdp-implementation-roadmap" }, { slug: "dpdp-act-analysis-commentary" }];
  try {
    const papers = await client.fetch<WhitePaper[]>(allWhitePapersQuery);
    if (!papers || papers.length === 0) {
      return fallback;
    }
    return papers.map((paper) => ({ slug: paper.slug.current }));
  } catch {
    return fallback;
  }
}

export async function generateMetadata({ params }: WhitePaperPageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = await getWhitePaper(slug);

  if (!paper) {
    return { title: "White Paper Not Found" };
  }

  return generatePageMetadata({
    title: paper.seoTitle || paper.title,
    description: paper.seoDescription || paper.abstract,
    path: `/resources/white-papers/${paper.slug.current}`,
    image: paper.featuredImage ? urlFor(paper.featuredImage).width(1200).height(630).url() : undefined,
    keywords: ["DPDP white paper", ...(paper.topics || [])],
  });
}

export default async function WhitePaperPage({ params }: WhitePaperPageProps) {
  const { slug } = await params;
  const paper = await getWhitePaper(slug);

  if (!paper) {
    notFound();
  }

  const downloadUrl = paper.pdfFile?.asset?.url || "#";

  return (
    <>
      {/* Header */}
      <Section background="gray">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { name: "Resources", href: "/resources" },
              { name: "White Papers", href: "/resources/white-papers" },
              { name: paper.title, href: `/resources/white-papers/${paper.slug.current}` },
            ]}
          />

          <div className="mt-8">
            <Badge variant="primary" className="mb-4">
              White Paper
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 text-balance">{paper.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 mb-6">
              {paper.authors && paper.authors.length > 0 && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{paper.authors.map((a) => a.name).join(", ")}</span>
                </div>
              )}
              {paper.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(paper.publishedAt)}</span>
                </div>
              )}
            </div>

            {paper.topics && paper.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {paper.topics.map((topic) => (
                  <Badge key={topic}>{topic}</Badge>
                ))}
              </div>
            )}

            <Button href={downloadUrl} size="lg" className="inline-flex">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </Container>
      </Section>

      {/* Abstract */}
      <Section background="white">
        <Container size="narrow">
          {paper.featuredImage && (
            <div className="relative aspect-2/1 mb-10 rounded-xl overflow-hidden">
              <Image
                src={urlFor(paper.featuredImage).width(1200).height(600).url()}
                alt={paper.featuredImage.alt || paper.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Abstract</h2>
          <div className="prose prose-lg">
            <p className="text-neutral-600 leading-relaxed">{paper.abstract}</p>
          </div>

          <div className="mt-10 p-6 bg-primary-50 rounded-xl">
            <h3 className="font-semibold text-neutral-900 mb-3">Download the Full Paper</h3>
            <p className="text-neutral-600 mb-4">Get the complete analysis with detailed findings, methodology, and recommendations.</p>
            <Button href={downloadUrl}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </Container>
      </Section>

      {/* Related Guide */}
      {paper.relatedGuide && (
        <Section background="gray">
          <Container size="narrow">
            <div className="bg-white rounded-xl p-8 border border-neutral-200">
              <Badge variant="primary" className="mb-4">
                Related Guide
              </Badge>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">{paper.relatedGuide.title}</h2>
              <p className="text-neutral-600 mb-6">For a practical guide on implementing these findings, check out our comprehensive guide.</p>
              <Button href={`/resources/guides/${paper.relatedGuide.slug.current}`}>
                Read the Guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section background="primary">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Want to Discuss This Research?</h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">Our team can help you understand how these findings apply to your organisation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact/" variant="secondary" size="lg">
                Get in Touch
              </Button>
              <Button href="/resources/white-papers/" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                More White Papers
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
