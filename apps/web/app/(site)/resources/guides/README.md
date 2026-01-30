# Guides Directory

This directory contains static guide pages. Guides are **not** managed through Sanity CMS.

## How to Add a New Guide

### 1. Create a New Directory

Create a new directory with your guide's slug (URL-friendly name):

```
/resources/guides/
├── page.tsx
├── dpdp-implementation-roadmap/
│   └── page.tsx
└── your-new-guide-slug/        ← Create this
    └── page.tsx                ← Create this
```

**Example:** For a guide titled "Complete Guide to DPDP Compliance", create:

```
complete-guide-dpdp-compliance/
└── page.tsx
```

### 2. Create the Guide Page

Copy the structure from an existing guide (e.g., `dpdp-implementation-roadmap/page.tsx`) and customize:

```tsx
import { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Your Guide Title",
  description: "Your guide description for SEO (150-160 characters)",
  path: "/resources/guides/your-new-guide-slug",
  keywords: ["keyword1", "keyword2", "keyword3"],
});

export default function YourGuidePage() {
  return (
    <>
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Resources", href: "/resources" },
              { name: "Guides", href: "/resources/guides" },
              { name: "Your Guide Title", href: "/resources/guides/your-new-guide-slug" },
            ]}
          />

          {/* Your guide content here */}
          <div className="mt-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6">Your Guide Title</h1>
            {/* Add your content sections */}
          </div>
        </Container>
      </Section>
    </>
  );
}
```

### 3. Update the Guides Listing Page

Add your guide to the `guides` array in `/resources/guides/page.tsx`:

```tsx
const guides = [
  {
    id: "1",
    title: "DPDP Implementation Roadmap",
    slug: "dpdp-implementation-roadmap",
    excerpt: "Comprehensive implementation roadmap...",
    category: "Implementation",
    publishedAt: "2025-01-30",
  },
  {
    id: "2", // ← Increment the ID
    title: "Your Guide Title",
    slug: "your-new-guide-slug", // ← Must match directory name
    excerpt: "Brief description (150-200 characters) shown on listing page",
    category: "Compliance", // or 'Implementation', 'Training', etc.
    publishedAt: "2025-02-01", // ← Today's date
  },
];
```

### 4. Update Featured Guides Component

If you want your guide to appear on the homepage, update the `staticGuides` array in `/components/sections/FeaturedGuides.tsx`:

```tsx
const staticGuides = [
  {
    _id: "1",
    title: "DPDP Implementation Roadmap",
    slug: "dpdp-implementation-roadmap",
    excerpt: "...",
    category: "Implementation",
  },
  {
    _id: "2", // ← Increment the ID
    title: "Your Guide Title",
    slug: "your-new-guide-slug", // ← Must match directory name
    excerpt: "Brief description shown on homepage",
    category: "Compliance",
  },
];
```

**Note:** Only the first 3 guides in this array will appear on the homepage.

### 5. Update the Sitemap (Optional but Recommended)

Add your guide to `/public/sitemap.xml` for SEO:

```xml
<url>
  <loc>https://cadp.in/resources/guides/your-new-guide-slug</loc>
  <lastmod>2025-02-01</lastmod>
  <priority>0.8</priority>
</url>
```
