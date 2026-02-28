import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
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
    image: article.featuredImage
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
          className="text-primary-600 hover:underline"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-neutral-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic text-neutral-600 my-6">
        {children}
      </blockquote>
    ),
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
          image: article.featuredImage
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

      {/* Header */}
      <Section background="gray">
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

          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge>{getNewsCategoryLabel(article.category)}</Badge>
              <span className="text-sm text-neutral-500">
                {formatDate(article.publishedAt)}
              </span>
              <span className="text-sm text-neutral-400 font-serif">
                &middot; CADP Correspondent
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 text-balance">
              {article.title}
            </h1>

            <p className="text-xl text-neutral-600 mb-6">{article.excerpt}</p>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section background="white">
        <Container size="narrow">
          {article.featuredImage && (
            <div className="relative aspect-video mb-10 overflow-hidden">
              <Image
                src={urlFor(article.featuredImage).width(1200).height(675).url()}
                alt={article.featuredImage.alt || article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg">
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

          {/* Source Callout Box — only shown when sourceUrl exists */}
          {article.sourceUrl && (
            <div className="mt-12 border-2 border-neutral-300 bg-neutral-50 p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-950 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5 text-accent-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-serif mb-1">
                    Originally reported by
                  </p>
                  <p className="text-lg font-serif font-semibold text-neutral-900 mb-4">
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
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help with DPDP Compliance?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Our team can help you navigate DPDP Act requirements and build
              your compliance program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact/" variant="secondary" size="lg">
                Get in Touch
              </Button>
              <Button
                href="/resources/"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                More Resources
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
