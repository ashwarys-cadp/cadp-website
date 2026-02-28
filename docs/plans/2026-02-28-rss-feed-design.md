# RSS Feed Design

## Summary

Single combined RSS 2.0 feed at `/feed.xml` containing news articles and blog posts, generated at build time.

## Approach

Route Handler (`app/feed.xml/route.ts`) with `force-static`, mirroring the sitemap pattern.

## What's Included

- News articles from `/news/`
- Blog posts from `/resources/articles/`
- Sorted by publishedAt desc, capped at 50 items
- Excerpt-only (title, description, link, date, category)

## Implementation

1. Create `apps/web/app/feed.xml/route.ts` — queries Sanity, builds RSS XML, returns Response
2. Add `<link rel="alternate">` to root layout for feed auto-discovery
3. Empty feed fallback if Sanity unavailable
