# CADP - Centre for Applied Data Protection

## Project Overview

Static website for the Centre for Applied Data Protection (CADP) at KLE Law College, Bengaluru. The site provides information about DPDP Act compliance training, advisory services, and research publications.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Static Export)
- **CMS**: Sanity v3 (headless CMS)
- **Styling**: Tailwind CSS v4
- **Forms**: Web3Forms (serverless form handling)
- **Deployment**: Vercel
- **Language**: TypeScript

## Project Structure

```
cadp/
├── apps/
│   ├── web/                    # Next.js website
│   │   ├── app/
│   │   │   ├── (site)/         # Public pages (home, about, services, etc.)
│   │   │   ├── layout.tsx      # Root layout with Header/Footer
│   │   │   └── globals.css     # Tailwind v4 theme & styles
│   │   ├── components/
│   │   │   ├── ui/             # Reusable UI (Button, Card, Input, etc.)
│   │   │   ├── sections/       # Page sections (Hero, Newsletter, etc.)
│   │   │   ├── seo/            # JSON-LD, Breadcrumbs
│   │   │   └── layout/         # Header, Footer
│   │   ├── lib/
│   │   │   ├── sanity/         # Sanity client, queries, types
│   │   │   ├── seo/            # Metadata utilities
│   │   │   └── utils/          # Helper functions (cn, formatDate, etc.)
│   │   └── public/             # Static assets, sitemap.xml, robots.txt
│   │
│   └── studio/                 # Sanity Studio
│       └── schemas/            # Content schemas
│
├── package.json                # Workspace root (pnpm)
└── turbo.json                  # Turborepo config
```

## Commands

```bash
# Development
pnpm dev                        # Start Next.js dev server
pnpm --filter @cadp/studio dev  # Start Sanity Studio

# Build
pnpm build                      # Build all workspaces
pnpm --filter @cadp/web build   # Build website only

# From apps/web directory
pnpm dev                        # Dev server on localhost:3000
pnpm build                      # Production build (static export)
```

## Environment Variables

Create `.env.local` in `apps/web/`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key
```

## Key Conventions

### Styling
- Uses Tailwind CSS v4 with `@theme` for custom properties
- Brand colors: `primary-*` (blue), `accent-*` (gold), `neutral-*`
- Custom `.prose` classes for article content (no typography plugin)
- Use `cn()` utility from `lib/utils` for conditional classes

### Components
- UI components are in `components/ui/` - always use these
- Section components are in `components/sections/` - for page layouts
- Use `Container` with `size="narrow"` or `size="wide"` for content width
- Use `Section` with `background="white"`, `"gray"`, or `"primary"`

### Sanity
- Client configured in `lib/sanity/client.ts`
- All queries in `lib/sanity/queries.ts`
- Types in `lib/sanity/types.ts`
- Use `urlFor()` helper for images
- Fallback data is provided for when CMS is not configured

### SEO
- Use `generatePageMetadata()` for page metadata
- Use `generateArticleMetadata()` for blog/guide pages
- JSON-LD components in `components/seo/JsonLd.tsx`
- Static sitemap in `public/sitemap.xml`

### Forms
- Contact and newsletter use Web3Forms (client-side)
- Access key from `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
- Honeypot field for spam protection

## Content Types (Sanity Schemas)

- **guide**: Pillar content (1500+ words), highest SEO priority
- **post**: Blog articles, linked to parent guides
- **whitePaper**: Downloadable PDFs with abstracts
- **service**: Service pages (training, advisory, research)
- **event**: Upcoming/past events
- **teamMember**: Staff and advisory board
- **siteSettings**: Global site configuration

## Adding New Pages

1. Create page in `app/(site)/your-page/page.tsx`
2. Export metadata using `generatePageMetadata()`
3. Use `Section` and `Container` for layout
4. Add `Breadcrumbs` component for navigation
5. Update `public/sitemap.xml`

## Static Export Notes

- Site uses `output: 'export'` for full static generation
- No API routes - forms use Web3Forms directly
- Images use `unoptimized: true` (handled by CDN)
- Dynamic routes need `generateStaticParams()`

## Deployment

1. Connect repo to Vercel
2. Set environment variables in Vercel dashboard
3. Build command: `pnpm build`
4. Output directory: `apps/web/out`

## SEO Strategy

The site follows a topical authority strategy with 3 content clusters:
1. **DPDP Compliance** - Primary cluster
2. **Data Protection Training** - Service-focused
3. **Compliance Advisory** - Service-focused

Each cluster has:
- Pillar guide (in `/resources/guides/`)
- Supporting articles (in `/resources/articles/`)
- Service page with CTA

Internal linking: Pillars link to 8-12 related pieces, articles link to 5-8.
