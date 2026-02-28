import { client } from '@/lib/sanity/client';
import { allNewsQuery, allPostsQuery } from '@/lib/sanity/queries';
import { getCategoryLabel, getNewsCategoryLabel } from '@/lib/utils';
import type { NewsArticle, Post } from '@/lib/sanity/types';

export const dynamic = 'force-static';

const BASE_URL = 'https://cadp.in';
const FEED_TITLE = 'CADP – Centre for Applied Data Protection';
const FEED_DESCRIPTION =
  'Updates on data protection law, DPDP Act compliance, and privacy research from CADP at KLE Law College, Bengaluru.';
const MAX_ITEMS = 50;

interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc2822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

function buildItemXml(item: FeedItem): string {
  return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${toRfc2822(item.pubDate)}</pubDate>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <category>${escapeXml(item.category)}</category>
    </item>`;
}

export async function GET() {
  const [newsArticles, posts] = await Promise.all([
    client.fetch<NewsArticle[]>(allNewsQuery).catch(() => [] as NewsArticle[]),
    client.fetch<Post[]>(allPostsQuery).catch(() => [] as Post[]),
  ]);

  const newsItems: FeedItem[] = newsArticles.map((article) => ({
    title: article.title || '(Untitled)',
    link: `${BASE_URL}/news/${article.slug.current}/`,
    description: article.excerpt || '',
    pubDate: article.publishedAt,
    category: getNewsCategoryLabel(article.category),
  }));

  const postItems: FeedItem[] = posts
    .filter((post) => post.publishedAt)
    .map((post) => ({
      title: post.title || '(Untitled)',
      link: `${BASE_URL}/resources/articles/${post.slug.current}/`,
      description: post.excerpt || '',
      pubDate: post.publishedAt!,
      category: post.category ? getCategoryLabel(post.category) : 'Article',
    }));

  const allItems = [...newsItems, ...postItems]
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, MAX_ITEMS);

  const lastBuildDate = allItems.length > 0 ? toRfc2822(allItems[0].pubDate) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-in</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${allItems.map(buildItemXml).join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
