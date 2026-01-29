import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User, BookOpen } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { Container, Section, Button, Card, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleJsonLd } from '@/components/seo/JsonLd';
import { generateArticleMetadata } from '@/lib/seo/metadata';
import {
  client,
  urlFor,
  guideBySlugQuery,
  allGuidesQuery,
  type Guide,
} from '@/lib/sanity';
import { formatDate, getCategoryLabel } from '@/lib/utils';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

async function getGuide(slug: string): Promise<Guide | null> {
  try {
    return await client.fetch<Guide>(guideBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const guides = await client.fetch<Guide[]>(allGuidesQuery);
    return guides.map((guide) => ({ slug: guide.slug.current }));
  } catch {
    return [
      { slug: 'complete-guide-dpdp-act-compliance' },
      { slug: 'dpdp-training-for-organisations' },
      { slug: 'dpdp-compliance-advisory-what-to-expect' },
    ];
  }
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  return generateArticleMetadata({
    title: guide.seoTitle || guide.title,
    description: guide.seoDescription || guide.excerpt,
    path: `/resources/guides/${guide.slug.current}`,
    image: guide.featuredImage
      ? urlFor(guide.featuredImage).width(1200).height(630).url()
      : undefined,
    publishedTime: guide.publishedAt || new Date().toISOString(),
    modifiedTime: guide._updatedAt,
    authors: guide.author ? [guide.author.name] : undefined,
    keywords: [
      'DPDP guide',
      guide.category ? getCategoryLabel(guide.category) : '',
      'data protection',
    ],
  });
}

// Portable Text components
const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          width={800}
          height={450}
          className="rounded-lg"
        />
        {value.caption && (
          <figcaption className="text-sm text-neutral-500 mt-2 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    callout: ({ value }: { value: { type: string; content: string } }) => {
      const styles: Record<string, string> = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        tip: 'bg-green-50 border-green-200 text-green-800',
        important: 'bg-red-50 border-red-200 text-red-800',
      };
      return (
        <div className={`p-4 rounded-lg border my-6 ${styles[value.type] || styles.info}`}>
          {value.content}
        </div>
      );
    },
  },
  marks: {
    link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => {
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
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-neutral-900 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic text-neutral-600 my-6">
        {children}
      </blockquote>
    ),
  },
};

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <ArticleJsonLd
        title={guide.title}
        description={guide.excerpt}
        url={`https://cadp.in/resources/guides/${guide.slug.current}`}
        imageUrl={
          guide.featuredImage
            ? urlFor(guide.featuredImage).width(1200).height(630).url()
            : undefined
        }
        authorName={guide.author?.name || 'CADP'}
        publishedAt={guide.publishedAt || new Date().toISOString()}
        modifiedAt={guide._updatedAt}
      />

      {/* Header */}
      <Section background="gray">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Guides', href: '/resources/guides' },
              { name: guide.title, href: `/resources/guides/${guide.slug.current}` },
            ]}
          />

          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="primary">Guide</Badge>
              {guide.category && (
                <span className="text-sm text-neutral-500">
                  {getCategoryLabel(guide.category)}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 text-balance">
              {guide.title}
            </h1>

            <p className="text-xl text-neutral-600 mb-6">{guide.excerpt}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
              {guide.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{guide.author.name}</span>
                </div>
              )}
              {guide.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(guide.publishedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section background="white">
        <Container size="narrow">
          {guide.featuredImage && (
            <div className="relative aspect-video mb-10 rounded-xl overflow-hidden">
              <Image
                src={urlFor(guide.featuredImage).width(1200).height(675).url()}
                alt={guide.featuredImage.alt || guide.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg">
            {guide.body ? (
              <PortableText value={guide.body} components={portableTextComponents} />
            ) : (
              <p className="text-neutral-600">
                This guide content is coming soon. Please check back later.
              </p>
            )}
          </div>
        </Container>
      </Section>

      {/* Related Content */}
      {(guide.relatedArticles?.length || guide.relatedGuides?.length) && (
        <Section background="gray">
          <Container size="narrow">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">
              Related Resources
            </h2>

            <div className="space-y-6">
              {guide.relatedGuides?.map((related) => (
                <Link
                  key={related._id}
                  href={`/resources/guides/${related.slug.current}`}
                  className="block group"
                >
                  <Card hover className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <Badge variant="primary" className="mb-2">
                          Guide
                        </Badge>
                        <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-neutral-600 mt-1">
                          {related.excerpt}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}

              {guide.relatedArticles?.map((post) => (
                <Link
                  key={post._id}
                  href={`/resources/articles/${post.slug.current}`}
                  className="block group"
                >
                  <Card hover className="p-5">
                    <Badge className="mb-2">Article</Badge>
                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {post.excerpt}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section background="primary">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help with Compliance?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Our team can help you implement these strategies and achieve DPDP
              compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
              <Button
                href="/programs-and-initiatives"
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
