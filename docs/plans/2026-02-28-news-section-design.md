# News Section Design

## Overview

Add a news aggregation section to the CADP website. News items are short-form, curated updates about DPDP Act and data protection in India, published by "CADP Correspondent." Most items link to an external source; some (CADP Announcements) are original.

## Decisions

- **Route**: Top-level `/news/` with individual pages at `/news/[slug]`
- **Approach**: Dedicated `newsArticle` Sanity schema (not reusing Post)
- **Byline**: Hardcoded "CADP Correspondent" — no author field in schema
- **Categories**: By content type (Government Orders, Court Decisions, Industry News, Opinion, CADP Announcements)
- **sourceUrl**: Optional — required for external news, omitted for CADP Announcements
- **Pagination**: Client-side (all items loaded at build, paginated in browser)
- **Homepage**: No changes for now
- **Nav change**: Move Events under Programs & Initiatives dropdown

## Sanity Schema: `newsArticle`

| Field | Type | Required | Notes |
|---|---|---|---|
| title | string | Yes | Max 120 chars |
| slug | slug (from title) | Yes | |
| excerpt | text | Yes | 100-200 chars, used in cards and meta |
| body | blockContent | Yes | 2-4 paragraphs, no images. Supports H3, bold, italic, links |
| sourceUrl | url | No | External source link. Required for all categories except CADP Announcements |
| sourceName | string | No | e.g., "LiveLaw", "The Hindu". Required when sourceUrl is present |
| category | string (list) | Yes | Government Orders, Court Decisions, Industry News, Opinion, CADP Announcements |
| tags | array of strings | No | Free-form tags |
| featuredImage | image | No | Optional |
| publishedAt | datetime | Yes | |
| seoTitle | string | No | Page title override |
| seoDescription | text | No | Meta description override |

## Pages

### `/news/` — News Listing

1. **Hero** (gray bg): Breadcrumbs, accent label "News & Updates", H1 "Data Protection News from India", subtitle about CADP Correspondent
2. **Category filter bar**: Horizontal pills — All, Government Orders, Court Decisions, Industry News, Opinion, CADP Announcements. Client-side filtering.
3. **News grid** (white bg): 2-column grid (`md:grid-cols-2`). Cards show category badge, date, title (line-clamp-2), excerpt (line-clamp-2), source name ("via LiveLaw"), "Read More" link
4. **Client-side pagination**: Show ~10 items per page with Load More or page numbers
5. **Newsletter section**

### `/news/[slug]` — Individual News Page

1. **Header** (gray bg): Breadcrumbs (Home > News > Title), category badge, date + "CADP Correspondent", H1, excerpt
2. **Content** (white bg): Optional featured image, body text, source callout box ("Originally reported by [sourceName]" with "Read Full Article" button linking to sourceUrl, opens new tab). Callout omitted for CADP Announcements.
3. **CTA** (primary bg): "Need Help with DPDP Compliance?"

## Navigation

Updated nav structure:

```
Home | About | Programs & Initiatives (dropdown) | Resources (dropdown) | News | Contact
```

Programs & Initiatives dropdown now includes Events:
- DPDP Training
- Compliance Advisory
- Research & Publications
- Events

News is a standalone top-level link (no dropdown).

## SEO

- Listing page: `generatePageMetadata()` with title "Data Protection News from India | CADP"
- Individual pages: Custom metadata with title, excerpt as description, `og:type: article`
- JSON-LD: `NewsArticle` schema on individual pages
- Sitemap: Add `/news/` and individual news URLs
- Canonical: Points to CADP page, not the external source

## Components to Create

- `apps/web/app/(site)/news/page.tsx` — listing page (client component for filtering/pagination)
- `apps/web/app/(site)/news/[slug]/page.tsx` — individual news page
- `apps/web/components/sections/NewsGrid.tsx` — grid with filtering and pagination (client component)
- `apps/studio/schemas/documents/newsArticle.ts` — Sanity schema

## Components to Modify

- `apps/studio/schemas/index.ts` — register newsArticle schema
- `apps/web/lib/sanity/queries.ts` — add news queries
- `apps/web/lib/sanity/types.ts` — add NewsArticle type
- `apps/web/components/layout/Header.tsx` — add News nav item, move Events under Programs
- `apps/web/public/sitemap.xml` — add `/news/`

## Fallback Data

Provide 3-4 hardcoded fallback news items (matching existing patterns) for when Sanity is not configured.
