import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { Container, Section, Button, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generateArticleMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  client,
  urlFor,
  newsBySlugQuery,
  allNewsQuery,
  type NewsArticle,
} from '@/lib/sanity';
import { formatDate, getNewsCategoryLabel } from '@/lib/utils';

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  try {
    return await client.fetch<NewsArticle>(newsBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const fallback = [
    { slug: 'dpdp-rules-2025-draft-released' },
    { slug: 'dpbi-constituted-under-dpdp-act' },
    { slug: 'karnataka-hc-consent-ruling-dpdp' },
    { slug: 'cadp-launches-dpdp-certification' },
  ];
  try {
    const news = await client.fetch<NewsArticle[]>(allNewsQuery);
    if (!news || news.length === 0) return fallback;
    return news.map((item) => ({ slug: item.slug.current }));
  } catch {
    return fallback;
  }
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) {
    return { title: 'News Not Found' };
  }

  return generateArticleMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path: `/news/${article.slug.current}`,
    image: article.featuredImage?.asset
      ? urlFor(article.featuredImage).width(1200).height(630).url()
      : undefined,
    publishedTime: article.publishedAt,
    modifiedTime: article._updatedAt,
    authors: ['CADP Correspondent'],
    keywords: [
      'DPDP',
      getNewsCategoryLabel(article.category),
      ...(article.tags || []),
    ],
  });
}

/** Portable Text — only override links for external target handling. */
const portableTextComponents = {
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children: React.ReactNode;
    }) => {
      const href = value?.href || '#';
      return (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* NewsArticle JSON-LD */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.excerpt,
          url: `https://cadp.in/news/${article.slug.current}/`,
          image: article.featuredImage?.asset
            ? urlFor(article.featuredImage).width(1200).height(630).url()
            : undefined,
          author: {
            '@type': 'Organization',
            name: 'CADP Correspondent',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Centre for Applied Data Protection (CADP)',
            logo: {
              '@type': 'ImageObject',
              url: 'https://cadp.in/logo.png',
            },
          },
          datePublished: article.publishedAt,
          dateModified: article._updatedAt || article.publishedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://cadp.in/news/${article.slug.current}/`,
          },
        }}
      />

      {/* ── Article Header ── */}
      <Section background="white" className="pb-0 md:pb-0">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { name: 'News', href: '/news' },
              {
                name: article.title,
                href: `/news/${article.slug.current}`,
              },
            ]}
          />

          {/* Category label */}
          <div className="mt-10">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-700">
              {getNewsCategoryLabel(article.category)}
            </span>
          </div>

          {/* Gold rule */}
          <div className="mt-4 w-16 h-[3px] bg-accent-600" />

          {/* Headline */}
          <h1 className="mt-6 text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.18] font-bold text-neutral-950 text-balance max-w-3xl">
            {article.title}
          </h1>

          {/* Byline */}
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-neutral-700 font-serif font-semibold">
              CADP Correspondent
            </span>
            <span className="text-neutral-300 select-none">|</span>
            <time
              dateTime={article.publishedAt}
              className="text-neutral-500 font-serif"
            >
              {formatDate(article.publishedAt)}
            </time>
          </div>

          {/* Standfirst / lede */}
          <p className="mt-6 text-lg md:text-xl text-neutral-600 font-serif leading-relaxed max-w-2xl">
            {article.excerpt}
          </p>
        </Container>
      </Section>

      {/* ── Featured Image ── */}
      {article.featuredImage?.asset && (
        <Section background="white" className="pt-10 md:pt-12 pb-0 md:pb-0">
          <Container size="narrow">
            <figure>
              <div className="relative aspect-[16/9] overflow-hidden border border-neutral-200">
                <Image
                  src={urlFor(article.featuredImage)
                    .width(1200)
                    .height(675)
                    .url()}
                  alt={article.featuredImage.alt || article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {article.featuredImage.caption && (
                <figcaption className="mt-3 text-sm text-neutral-500 font-serif italic">
                  {article.featuredImage.caption}
                </figcaption>
              )}
            </figure>
          </Container>
        </Section>
      )}

      {/* ── Article Body ── */}
      <Section background="white" className="pt-10 md:pt-14">
        <Container size="narrow">
          <div className="prose prose-lg drop-cap">
            {article.body ? (
              <PortableText
                value={article.body}
                components={portableTextComponents}
              />
            ) : (
              <p className="text-neutral-600">
                This news article content is coming soon.
              </p>
            )}
          </div>

          {/* ── Tags ── */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-14 pt-6 border-t border-neutral-200">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mr-4">
                Topics
              </span>
              <div className="inline-flex flex-wrap gap-2 mt-1">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* ── Source Attribution ── */}
          {article.sourceUrl && (
            <>
              <div className="ornament-divider" />
              <aside className="border-l-4 border-accent-600 pl-8 py-6 my-2">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-2">
                  Original Source
                </p>
                <p className="text-xl font-heading font-semibold text-neutral-900 mb-5">
                  {article.sourceName || 'External Source'}
                </p>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-950 text-white text-[0.9375rem] font-serif font-semibold border-2 border-primary-950 hover:bg-primary-900 transition-all"
                >
                  Read Full Article
                  <ExternalLink className="w-4 h-4" />
                </a>
              </aside>
            </>
          )}

          {/* ── Back link ── */}
          <div className="mt-16 pt-8 border-t border-neutral-200">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-serif text-primary-700 hover:text-primary-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All News
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section background="white">
        <Container size="narrow">
          <div className="border-4 border-primary-950 bg-primary-950 p-10 md:p-14 shadow-xl relative">
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent-600 opacity-20" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent-600 opacity-20" />

            <div className="text-center relative z-10">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">
                  Get in Touch
                </div>
                <div className="h-px w-24 mx-auto bg-accent-600" />
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">
                Navigating the DPDP Act
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Explore our research, training programmes, and advisory services
                on data protection law and compliance in India.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact/" variant="secondary" size="lg">
                  Get in Touch
                </Button>
                <Button
                  href="/resources/"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-950 transition-colors font-semibold"
                >
                  More Resources
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
