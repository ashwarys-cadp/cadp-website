# DPDP Implementation Tracker — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a pillar guide page that tracks every delegated obligation in the DPDP Act 2023 and Rules 2025 and whether it has been notified.

**Architecture:** Static JSON data file → TypeScript types → React page component. Follows the existing `dpdp-rules-2025` guide pattern (hardcoded page with structured data). Internal deep links to official texts reader.

**Tech Stack:** Next.js (App Router, static export), Tailwind CSS v4, TypeScript, lucide-react icons.

---

### Task 1: Create type definitions

**Files:**
- Create: `apps/web/data/official-texts/implementation-tracker-types.ts`

**Step 1: Create the types file**

```typescript
// apps/web/data/official-texts/implementation-tracker-types.ts

export interface ImplementationSource {
  document: string;    // official-texts document ID, e.g. "dpdp-act-2023"
  sectionId: string;   // e.g. "section-18"
  label: string;       // e.g. "Section 18(1)"
}

export interface ImplementationDetail {
  instrument: string;  // e.g. "G.S.R. 844(E)"
  date: string;        // ISO date
  description: string;
  documentId?: string; // links to /resources/official-texts/{documentId}
}

export interface TrackerItem {
  id: string;
  requirement: string;
  source: ImplementationSource;
  responsibleBody: string;
  status: "notified" | "pending";
  implementation?: ImplementationDetail;
}

export type CategoryStatus = "complete" | "partial" | "pending";

export interface TrackerCategory {
  id: string;
  name: string;
  status: CategoryStatus;
  items: TrackerItem[];
}

export interface ImplementationTracker {
  lastUpdated: string; // ISO date
  categories: TrackerCategory[];
}
```

**Step 2: Commit**

```bash
git add apps/web/data/official-texts/implementation-tracker-types.ts
git commit -m "feat(tracker): add type definitions for implementation tracker"
```

---

### Task 2: Create the JSON data file

**Files:**
- Create: `apps/web/data/official-texts/implementation-tracker.json`

**Context:** This is the most substantive task. Extract every "as may be prescribed", "notify", "establish", "constitute", "appoint" delegation from the DPDP Act 2023 and DPDP Rules 2025 (both available in `docs/`). Organize into 8 categories. Cross-reference the existing notification JSONs in `apps/web/data/official-texts/` to determine which items are already notified.

**Step 1: Read the source documents**

Read both legal texts thoroughly:
- `docs/DPDP Act 2023.md` — look for all "prescribed", "notify", "establish", "constitute", "appoint" language
- `docs/DPDP Rules 2025.md` — look for additional delegations in Rules and Schedules

Also read the existing notification JSON files to identify what has been notified:
- `apps/web/data/official-texts/dpdp-notification-commencement-2025.json`
- `apps/web/data/official-texts/dpdp-notification-dpb-2025.json`

**Step 2: Create the JSON file**

Create `apps/web/data/official-texts/implementation-tracker.json` with the full data. Structure:

```json
{
  "lastUpdated": "2026-03-09",
  "categories": [
    {
      "id": "board-setup",
      "name": "Data Protection Board Setup",
      "status": "complete",
      "items": [
        {
          "id": "establish-dpb",
          "requirement": "Establish Data Protection Board of India",
          "source": {
            "document": "dpdp-act-2023",
            "sectionId": "section-18",
            "label": "Section 18(1)"
          },
          "responsibleBody": "Central Government",
          "status": "notified",
          "implementation": {
            "instrument": "G.S.R. 844(E)",
            "date": "2025-11-13",
            "description": "Board established via notification in Official Gazette",
            "documentId": "dpdp-notification-dpb-2025"
          }
        }
      ]
    }
  ]
}
```

**Categories to populate (8):**

1. **board-setup** — Section 18(1) establish Board, Section 18(3) headquarters, Section 19(1) number of members, Section 19(2)/Rule 17 appointment manner, Section 20(1)/Rule 18 salary terms, Section 23(1) Board procedures, Section 24/Rule 21 officers/employees, Section 28(1) digital office, Section 28(7)(d) Board powers. Also Rule 17(1-2) Search-cum-Selection Committees.

2. **consent-management** — Section 6(8) Consent Manager obligations, Section 6(9)/Rule 4 registration manner/conditions.

3. **data-fiduciary-obligations** — Section 5(1)(iii)/(2)(iii) complaint manner, Section 8(6) breach notification form, Section 8(8) data retention periods, Section 8(9) DPO contact info, Section 13(2) grievance response period.

4. **significant-data-fiduciary** — Section 10(1) SDF notification, Section 10(2)(c)(i) DPIA matters, Section 10(2)(c)(iii) additional measures, Rule 13(4-5) data localization/committee.

5. **children-data** — Section 9(1) verifiable consent manner, Section 9(4)/Rule 12 exemption classes, Section 9(5) safe processing notification, Rule 10(2)(c) Digital Locker notification.

6. **cross-border-transfer** — Section 16(1) country restrictions, Rule 15 transfer requirements, Rule 13(4) data localization specification.

7. **exemptions-research** — Section 7(b) legitimate uses prescription, Section 7(b)(ii) database notification, Section 17(2)(b) research standards, Section 17(3) startup exemptions.

8. **rights-of-data-principals** — Section 11(1) access request manner, Section 11(1)(c) additional info, Section 12(3) erasure request manner, Section 14(1) nomination manner, Section 29(2) appeal form/fee, Section 29(8) appeal procedure.

**Important rules for populating:**
- Use `sectionId` values that match the IDs in the official-texts JSON files (e.g., `"section-18"`, `"section-10"`)
- For Rules references, use the `dpdp-rules-2025` document ID and the corresponding section IDs from `dpdp-rules-2025.json`
- Mark items as `"notified"` only if there is a concrete gazette notification you can point to
- The DPDP Rules 2025 themselves (G.S.R. 846(E)) fulfill many "as may be prescribed" delegations — mark those as notified with `documentId: "dpdp-rules-2025"`
- Items requiring separate notifications/orders beyond the Rules remain `"pending"`

**Step 3: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('apps/web/data/official-texts/implementation-tracker.json', 'utf8')); console.log('Valid JSON')"`
Expected: "Valid JSON"

**Step 4: Commit**

```bash
git add apps/web/data/official-texts/implementation-tracker.json
git commit -m "feat(tracker): add implementation tracker data with ~40 obligations"
```

---

### Task 3: Create a data loader utility

**Files:**
- Create: `apps/web/lib/official-texts/tracker.ts`

**Step 1: Create the loader**

```typescript
// apps/web/lib/official-texts/tracker.ts

import type { ImplementationTracker, TrackerCategory } from "@/data/official-texts/implementation-tracker-types";
import trackerData from "@/data/official-texts/implementation-tracker.json";

export function getTrackerData(): ImplementationTracker {
  return trackerData as ImplementationTracker;
}

export function getCategoryStats(categories: TrackerCategory[]) {
  let totalItems = 0;
  let notifiedItems = 0;

  for (const cat of categories) {
    totalItems += cat.items.length;
    notifiedItems += cat.items.filter((i) => i.status === "notified").length;
  }

  return { totalItems, notifiedItems, pendingItems: totalItems - notifiedItems };
}
```

**Step 2: Commit**

```bash
git add apps/web/lib/official-texts/tracker.ts
git commit -m "feat(tracker): add data loader utility"
```

---

### Task 4: Create the tracker page

**Files:**
- Create: `apps/web/app/(site)/resources/guides/dpdp-implementation-tracker/page.tsx`

**Context:** Follow the pattern of `apps/web/app/(site)/resources/guides/dpdp-rules-2025/page.tsx` for styling conventions. Study that file carefully before writing this one. Key conventions:
- Import from `@/components/ui` (Container, Section, Button, Badge)
- Import `Breadcrumbs` from `@/components/seo/Breadcrumbs`
- Import `ArticleJsonLd` from `@/components/seo/JsonLd`
- Import `Newsletter` from `@/components/sections`
- Use `generatePageMetadata()` from `@/lib/seo/metadata` for metadata export
- Use Tailwind classes with the project's design system (font-serif for body text, neutral-950 for headings, accent-700 for labels, etc.)
- Use the decorative patterns (accent underlines, diamond dividers, bordered boxes)

**Step 1: Create the page component**

The page has these sections (top to bottom):

1. **Metadata export** — use `generatePageMetadata()` with:
   - title: "DPDP Act Implementation Status 2026 — Complete Tracker"
   - description: targeting "dpdp act india implementation status 2026"
   - path: "/resources/guides/dpdp-implementation-tracker"
   - keywords: ["dpdp act india implementation status 2026", "dpdp act status", "dpdp implementation", "data protection board india", "dpdp rules implementation"]
   - type: "article"

2. **ArticleJsonLd** — datePublished, dateModified from tracker lastUpdated

3. **Hero section** (Section background="white"):
   - Breadcrumbs: Home > Resources > Guides > DPDP Implementation Tracker
   - Title: "DPDP Act Implementation Status" with subtitle "Complete Tracker"
   - Narrative summary (2-3 sentences): current state of DPDP implementation as of March 2026
   - Last updated date from tracker data

4. **Category overview strip** (Section background="gray"):
   - Grid of category cards (responsive: 2 cols mobile, 4 cols desktop)
   - Each card shows: category name, status badge (color-coded), item counts
   - Badge variants: success for "complete", warning for "partial", default for "pending"
   - Each card is an anchor link scrolling to its detail section (`href="#{category.id}"`)

5. **Detailed sections** (Section background="white"):
   - One subsection per category with `id={category.id}` for anchor links
   - Category heading with status badge
   - Responsive table for items. Columns: Requirement, Source, Responsible Body, Status, Implementation
   - Source column: `<Link>` to `/resources/official-texts/{source.document}#{source.sectionId}`
   - Status column: Badge (success="Notified", default="Pending")
   - Implementation column: if notified, show instrument + date; if documentId present, wrap instrument in `<Link>` to `/resources/official-texts/{documentId}`
   - On mobile, use card layout instead of table (use responsive Tailwind: `hidden md:table` for table, `md:hidden` for cards)

6. **Methodology note** (Section background="gray"):
   - Brief paragraph: what the tracker covers, how it's maintained, link to official texts section

7. **Related resources** (Section background="white"):
   - Links to: DPDP Rules 2025 guide, Implementation Roadmap, Official Texts
   - Links to relevant programme pages (compliance advisory)

8. **Newsletter CTA** — `<Newsletter />`

**Key styling details (match existing guide pattern):**
- Section labels: `text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold` with `h-px w-20 bg-accent-600` underline
- Headings: `font-serif text-neutral-950`
- Body text: `text-neutral-700 leading-relaxed font-serif`
- Tables: `border-b-2 border-neutral-300` for header, `border-b border-neutral-200` for rows
- Cards/boxes: `bg-white border-2 border-neutral-300 shadow-md`
- Links: use Next.js `Link` component, styled with `text-primary-700 hover:text-primary-900`

**Step 2: Verify the page builds**

Run from `apps/web/`: `pnpm build`
Expected: Build succeeds with the new route included in static output.

**Step 3: Commit**

```bash
git add apps/web/app/\(site\)/resources/guides/dpdp-implementation-tracker/page.tsx
git commit -m "feat(tracker): add implementation tracker page"
```

---

### Task 5: Add tracker to guides listing and resources hub

**Files:**
- Modify: `apps/web/app/(site)/resources/guides/page.tsx` — add tracker to the `guides` array
- Modify: `apps/web/app/(site)/resources/page.tsx` — add tracker to the `staticGuides` array

**Step 1: Add to guides listing**

In `apps/web/app/(site)/resources/guides/page.tsx`, add to the `guides` array (around line 18):

```typescript
{
  id: '3',
  title: 'DPDP Act Implementation Tracker',
  slug: 'dpdp-implementation-tracker',
  excerpt:
    'Track every obligation the government must fulfil under the DPDP Act 2023 and Rules 2025 — Board setup, consent frameworks, cross-border rules, and more. Updated as new notifications are issued.',
  category: 'Tracking',
  publishedAt: '2026-03-09',
},
```

**Step 2: Add to resources hub**

In `apps/web/app/(site)/resources/page.tsx`, add to the `staticGuides` array (around line 40):

```typescript
{
  _id: '3',
  title: 'DPDP Act Implementation Tracker',
  slug: { current: 'dpdp-implementation-tracker' },
  excerpt: 'Track every obligation the government must fulfil under the DPDP Act 2023 and Rules 2025. Updated as new notifications are issued.',
  category: 'Tracking',
},
```

**Step 3: Verify the pages render**

Run from `apps/web/`: `pnpm build`
Expected: Build succeeds. Both listing pages include the new tracker card.

**Step 4: Commit**

```bash
git add apps/web/app/\(site\)/resources/guides/page.tsx apps/web/app/\(site\)/resources/page.tsx
git commit -m "feat(tracker): add tracker to guides listing and resources hub"
```

---

### Task 6: Add internal links from existing pages

**Files:**
- Modify: `apps/web/app/(site)/resources/guides/dpdp-rules-2025/page.tsx` — add cross-link to the tracker
- Modify: `apps/web/app/(site)/resources/official-texts/page.tsx` — add companion link to tracker

**Step 1: Read both files to find appropriate insertion points**

Read the full content of both files to identify where a cross-link fits naturally (e.g., in a "Related Resources" section, or at the end of the page before the CTA).

**Step 2: Add cross-link in DPDP Rules 2025 guide**

Find an appropriate spot (likely near bottom, in a related resources or CTA section) and add a link card pointing to `/resources/guides/dpdp-implementation-tracker` with brief description.

**Step 3: Add companion link in official texts landing page**

Add a callout or link card on the official texts page pointing to the tracker as a companion resource.

**Step 4: Verify build**

Run from `apps/web/`: `pnpm build`
Expected: Build succeeds.

**Step 5: Commit**

```bash
git add apps/web/app/\(site\)/resources/guides/dpdp-rules-2025/page.tsx apps/web/app/\(site\)/resources/official-texts/page.tsx
git commit -m "feat(tracker): add internal cross-links from existing pages"
```

---

### Task 7: Final verification and build

**Files:** None new.

**Step 1: Full build**

Run from project root: `pnpm build`
Expected: Build succeeds with no errors.

**Step 2: Visual check**

Run from `apps/web/`: `pnpm dev`
Visit these pages and verify they render correctly:
- `http://localhost:3000/resources/guides/dpdp-implementation-tracker`
- `http://localhost:3000/resources/guides`
- `http://localhost:3000/resources`

Check:
- Breadcrumbs render correctly
- Category overview cards are clickable and scroll to sections
- Deep links to official texts work (clicking a section reference navigates to the document reader)
- Implementation instrument links work where `documentId` is present
- Mobile responsiveness (cards instead of table on narrow viewport)
- Badge colors match status (green=notified/complete, amber=partial, gray=pending)

**Step 3: Commit if any fixes were needed**

```bash
git add -A
git commit -m "fix(tracker): post-review adjustments"
```
