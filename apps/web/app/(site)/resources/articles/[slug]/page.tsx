import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen, FileText } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { Container, Section, Button, Card, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleJsonLd } from '@/components/seo/JsonLd';
import { generateArticleMetadata } from '@/lib/seo/metadata';
import {
  client,
  urlFor,
  postBySlugQuery,
  allPostsQuery,
  type Post,
} from '@/lib/sanity';
import { formatDate, getCategoryLabel } from '@/lib/utils';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch<Post>(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const fallback = [
    { slug: 'dpdp-act-key-provisions-explained' },
    { slug: 'dpdp-vs-gdpr-comparison' },
    { slug: 'why-dpdp-training-matters-for-your-team' },
  ];
  try {
    const posts = await client.fetch<Post[]>(allPostsQuery);
    if (!posts || posts.length === 0) {
      return fallback;
    }
    return posts.map((post) => ({ slug: post.slug.current }));
  } catch {
    return fallback;
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Article Not Found' };
  }

  return generateArticleMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/resources/articles/${post.slug.current}`,
    image: post.featuredImage
      ? urlFor(post.featuredImage).width(1200).height(630).url()
      : undefined,
    publishedTime: post.publishedAt || new Date().toISOString(),
    modifiedTime: post._updatedAt,
    authors: post.author ? [post.author.name] : undefined,
    keywords: [
      'DPDP',
      post.category ? getCategoryLabel(post.category) : '',
      ...(post.tags || []),
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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`https://cadp.in/resources/articles/${post.slug.current}`}
        imageUrl={
          post.featuredImage
            ? urlFor(post.featuredImage).width(1200).height(630).url()
            : undefined
        }
        authorName={post.author?.name || 'CADP'}
        publishedAt={post.publishedAt || new Date().toISOString()}
        modifiedAt={post._updatedAt}
      />

      {/* Header */}
      <Section background="gray">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Articles', href: '/resources/articles' },
              { name: post.title, href: `/resources/articles/${post.slug.current}` },
            ]}
          />

          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              {post.category && <Badge>{getCategoryLabel(post.category)}</Badge>}
              {post.publishedAt && (
                <span className="text-sm text-neutral-500">
                  {formatDate(post.publishedAt)}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 text-balance">
              {post.title}
            </h1>

            <p className="text-xl text-neutral-600 mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
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
          {post.featuredImage && (
            <div className="relative aspect-video mb-10 rounded-xl overflow-hidden">
              <Image
                src={urlFor(post.featuredImage).width(1200).height(675).url()}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg">
            {post.body ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="text-neutral-600">
                This article content is coming soon. Please check back later.
              </p>
            )}
          </div>
        </Container>
      </Section>

      {/* Parent Guide */}
      {post.parentGuide && (
        <Section background="gray">
          <Container size="narrow">
            <div className="bg-primary-50 rounded-xl p-8">
              <Badge variant="primary" className="mb-4">
                Part of a Larger Guide
              </Badge>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                {post.parentGuide.title}
              </h2>
              <p className="text-neutral-600 mb-6">
                This article is part of our comprehensive guide on this topic.
                Read the full guide for more in-depth coverage.
              </p>
              <Button href={`/resources/guides/${post.parentGuide.slug.current}`}>
                Read the Full Guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <Section background={post.parentGuide ? 'white' : 'gray'}>
          <Container size="narrow">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">
              Related Articles
            </h2>

            <div className="space-y-6">
              {post.relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  href={`/resources/articles/${related.slug.current}`}
                  className="block group"
                >
                  <Card hover className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      {related.category && (
                        <Badge>{getCategoryLabel(related.category)}</Badge>
                      )}
                      {related.publishedAt && (
                        <span className="text-xs text-neutral-500">
                          {formatDate(related.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {related.excerpt}
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
              Need Help with DPDP Compliance?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Our team can help you navigate DPDP Act requirements and build
              your compliance program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
              <Button
                href="/resources"
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
