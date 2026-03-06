# Interactive Bare Act & Rules — Design Document

**Date:** 2026-03-06
**Status:** Approved

## Overview

An interactive legal reference tool for the DPDP Act 2023 and DPDP Rules 2025, hosted at `/resources/official-texts/`. Features verbatim legislative text with full-text search, defined term explanations, manually curated resource links, and case law references — all rendered as a static site.

## Goals

1. **Searchable verbatim text** — full-text search scoped to current document by default, with cross-corpus toggle
2. **Term explanations** — formal definitions (from Section 2 / Rule 2) shown alongside optional plain-language explanations for technical terms
3. **Curated cross-links** — manually linked CADP articles, external resources, and case law per section/chapter
4. **Extensible** — side panel architecture supports adding new context modes without structural changes
5. **Shareable** — every section has a hash-based deep link

## Scope

- DPDP Act 2023 (44 sections across 7 chapters + schedule)
- DPDP Rules 2025 (23 rules + 7 schedules)
- Future notifications/amendments as new documents

## Non-Goals

- Annotation/commenting by users
- User accounts or bookmarks
- Print-optimized stylesheet
- Comparison view between draft and final text
- API endpoints (static export only)

---

## Architecture

### Data Layer

**Local JSON files** for legislative text (stable, version-controlled):

```
apps/web/data/official-texts/
  dpdp-act-2023.json
  dpdp-rules-2025.json
  types.ts
```

**Sanity CMS** for editorial content (evolves over time):

- `annotation` — plain-language explanations for terms not in the definitions section
- `sectionResource` — curated links to articles, guides, and external resources
- `caseReference` — linked litigation and case law

### Data Flow

```
Local JSON (verbatim text + formal definitions)
                  +
Sanity CMS (annotations + resources + case law)
                  |
            Build time merge
                  |
        Static pages + search index
```

---

## Data Structures

### Local JSON: LegalDocument

```typescript
interface LegalDocument {
  id: string;                          // "dpdp-act-2023"
  title: string;                       // "The Digital Personal Data Protection Act, 2023"
  shortTitle: string;                  // "DPDP Act 2023"
  type: "act" | "rules" | "notification";
  gazetteNumber: string;               // "Act No. 22 of 2023"
  dateEnacted: string;                 // "2023-08-11"
  dateEffective: string;               // "2023-08-11"
  preamble?: string;

  chapters: Chapter[];
  schedules: Schedule[];
  definitions: TermDefinition[];
}

interface Chapter {
  id: string;                          // "chapter-1"
  number: string;                      // "I"
  title: string;                       // "Preliminary"
  sections: Section[];
}

interface Section {
  id: string;                          // "section-2"
  number: string;                      // "2"
  title: string;                       // "Definitions"
  text: string;                        // Verbatim text as HTML
  effectiveDate?: string;
  tags: string[];
}

interface Schedule {
  id: string;                          // "schedule-1"
  number: string;                      // "First"
  title: string;
  text: string;
  tags: string[];
}

interface TermDefinition {
  term: string;                        // "Data Fiduciary"
  legalDefinition: string;             // Verbatim from Section 2
  plainLanguage?: string;              // Optional plain-language override
  sourceSection: string;               // "section-2"
  relatedSections: string[];           // ["section-5", "section-10"]
}
```

### Sanity CMS: annotation

```typescript
{
  name: 'annotation',
  title: 'Legal Annotation',
  type: 'document',
  fields: [
    { name: 'term', type: 'string' },
    { name: 'explanation', type: 'text' },
    { name: 'category', type: 'string',
      options: { list: ['concept', 'procedure', 'threshold', 'reference'] } },
    { name: 'documentId', type: 'string' },
    { name: 'targetSection', type: 'string' },  // null = global
  ]
}
```

### Sanity CMS: sectionResource

```typescript
{
  name: 'sectionResource',
  title: 'Section Resource',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'url', type: 'url' },
    { name: 'type', type: 'string',
      options: { list: ['cadp-article', 'cadp-guide', 'external'] } },
    { name: 'documentId', type: 'string' },
    { name: 'targetSection', type: 'string' },
    { name: 'targetChapter', type: 'string' },
  ]
}
```

### Sanity CMS: caseReference

```typescript
{
  name: 'caseReference',
  title: 'Case Reference',
  type: 'document',
  fields: [
    { name: 'caseName', type: 'string' },
    { name: 'citation', type: 'string' },
    { name: 'court', type: 'string',
      options: { list: ['Supreme Court', 'High Court', 'TDSAT', 'DPB'] } },
    { name: 'dateDecided', type: 'date' },
    { name: 'summary', type: 'text' },
    { name: 'url', type: 'url' },
    { name: 'documentId', type: 'string' },
    { name: 'targetSection', type: 'string' },
    { name: 'targetChapter', type: 'string' },
  ]
}
```

---

## Routes

```
/resources/official-texts/                    -- Index page
/resources/official-texts/dpdp-act-2023/      -- DPDP Act interactive page
/resources/official-texts/dpdp-rules-2025/    -- DPDP Rules interactive page
/resources/official-texts/[documentId]/       -- Future documents
```

### Index Page

- Lists all documents as cards: title, type badge (Act/Rules/Notification), date, section count, description
- Cross-corpus search bar at top — results grouped by document with section-level links
- Added to Resources dropdown in header navigation

### Document Page

Three-column layout on desktop:

```
+----------+-------------------------+-----------------+
|          |                         |                 |
|  Sticky  |   Main Content          |  Side Panel     |
|  TOC     |   (verbatim text)       |  (contextual)   |
|  sidebar |                         |                 |
|  ~220px  |   Chapter I             |  Hidden by      |
|          |   Section 1...          |  default.        |
|  Active  |   Section 2...          |  ~320px          |
|  section |   ...                   |                 |
|  highlighted                       |                 |
|          |                         |                 |
+----------+-------------------------+-----------------+
```

Responsive:
- Desktop (>=1280px): Three columns
- Tablet (768-1279px): TOC collapses to top dropdown, side panel overlays
- Mobile (<768px): TOC as drawer, side panel as bottom sheet

---

## Search

### Engine: FlexSearch

Client-side search with pre-built index.

**Build time:** Script reads all document JSON files, extracts section text, builds FlexSearch index, serializes to `public/search/official-texts-index.json`.

**Runtime:** Index lazy-loaded when user focuses search bar.

### UX

- Search bar at top of document page with placeholder "Search this document..."
- Toggle button to switch between document-scoped and cross-corpus search
- Results as overlay dropdown below search bar: section number + title, text snippet with highlighted match, parent document name (cross-corpus mode)
- Keyboard: `/` focuses search, `Escape` clears, arrow keys navigate, `Enter` jumps to section
- 150ms debounce on keystrokes

### Why FlexSearch

- Faster than Fuse.js for larger text corpora
- Supports pre-built serializable indexes
- Tokenized search ("data fiduciary" finds sections with both words)
- Exact matching better suited for legal text than Fuse.js's fuzzy-first approach

---

## Term Detection & Definitions

### Matching

1. Merge `definitions[]` (from local JSON) with `annotations[]` (from Sanity) into a single term list
2. Sort by term length descending (longer terms match first — "Significant Data Fiduciary" before "Data Fiduciary")
3. Match case-insensitively on word boundaries
4. Only the first occurrence per section gets the interactive treatment

### Visual Treatment

| Type | Underline Color | Source |
|------|----------------|--------|
| Formal definition | Dotted `accent-600` | Local JSON `definitions[]` |
| Annotation | Dotted `primary-400` | Sanity `annotation` |

Hover: subtle `accent-50` / `primary-50` background. Cursor: pointer.

### Scoped Annotations

Annotations with a `targetSection` value only match in that specific section. Annotations with null `targetSection` match globally.

---

## Side Panel — Extensible Mode Architecture

The side panel is a single component that renders different content based on a `mode` discriminated union. Adding a new mode requires: (1) adding a variant to the union, (2) creating a content renderer, (3) adding a trigger.

### Panel State

```typescript
type PanelMode =
  | { type: "definition"; term: TermDefinition }
  | { type: "annotation"; annotation: Annotation }
  | { type: "resources"; sectionId: string; resources: SectionResource[] }
  | { type: "caselaw"; sectionId: string; cases: CaseReference[] };

// To add a new mode in the future, extend this union:
// | { type: "amendments"; sectionId: string; amendments: Amendment[] }
// | { type: "commentary"; sectionId: string; notes: ExpertNote[] }
```

### Panel Component Structure

```typescript
// DefinitionPanel.tsx — renamed to SidePanel.tsx
function SidePanel({ mode, onClose }: { mode: PanelMode; onClose: () => void }) {
  return (
    <aside>
      <CloseButton onClick={onClose} />
      {mode.type === "definition" && <DefinitionContent {...mode} />}
      {mode.type === "annotation" && <AnnotationContent {...mode} />}
      {mode.type === "resources" && <ResourcesContent {...mode} />}
      {mode.type === "caselaw" && <CaseLawContent {...mode} />}
    </aside>
  );
}
```

Each content renderer is its own component. Adding a new mode means adding a new content component and a new variant — no changes to the panel shell.

### Current Modes

**Definition** (triggered by clicking a defined term):
- Term name
- Legal definition with source section reference
- Plain-language explanation (if available)
- "Appears in" — clickable list of sections where this term is used

**Annotation** (triggered by clicking an annotated term):
- Term name + category badge
- Plain-language explanation
- "Appears in" — sections where this annotation applies

**Resources** (triggered by clicking the link icon on a section/chapter):
- Section/chapter reference
- List of resources, each showing: type badge (CADP Article / CADP Guide / External), title, description, "Open resource" link

**Case Law** (triggered by clicking the scale icon on a section/chapter):
- Section/chapter reference
- Cases sorted by dateDecided descending, each showing: court badge, case name, citation, date, summary, "View judgment" link

### Section Heading Icons

```
Section 7 — Certain Legitimate Uses          [link-icon 2] [scale-icon 1]
```

- Link icon (Lucide `Link2`) in `accent-600` with count — triggers resources mode
- Scale icon (Lucide `Scale`) in `primary-600` with count — triggers case law mode
- Icons only appear when the section has linked items
- Hover tooltip: "2 related resources" / "1 related case"

### Panel Behavior

- Slides in from right on desktop, overlays content
- Bottom sheet on mobile (half-screen, draggable to expand)
- Clicking a different trigger swaps content without close/reopen animation
- Close via: X button, Escape key, clicking outside
- Only one mode visible at a time

---

## Component Architecture

```
apps/web/
  app/(site)/resources/official-texts/
    page.tsx                              -- Index page
    [documentId]/
      page.tsx                            -- Document page (generateStaticParams)
    components/
      DocumentReader.tsx                  -- Main three-column layout (client component)
      TableOfContents.tsx                 -- Sticky TOC with IntersectionObserver scroll tracking
      SectionRenderer.tsx                 -- Renders section text with term detection
      DefinedTerm.tsx                     -- Clickable term (dotted underline)
      SidePanel.tsx                       -- Extensible side panel shell
      sidepanel/
        DefinitionContent.tsx             -- Definition mode renderer
        AnnotationContent.tsx             -- Annotation mode renderer
        ResourcesContent.tsx              -- Resources mode renderer
        CaseLawContent.tsx                -- Case law mode renderer
      DocumentSearch.tsx                  -- Search bar + cross-corpus toggle
      SearchResults.tsx                   -- Results dropdown with snippets
      SectionHeading.tsx                  -- Section title + resource/case icons
      CopyLinkButton.tsx                  -- Per-section copy-link icon
      MobileToC.tsx                       -- Drawer-based TOC for mobile
      MobilePanel.tsx                     -- Bottom sheet wrapper for mobile

  data/official-texts/
    dpdp-act-2023.json
    dpdp-rules-2025.json
    types.ts                              -- TypeScript interfaces

  lib/official-texts/
    search.ts                             -- FlexSearch index builder + query
    terms.ts                              -- Term matching logic (merge, sort, detect)
    utils.ts                              -- Helpers (generateTocFromDocument, etc.)
```

### Key Implementation Notes

- **`DocumentReader.tsx`** is the single client component boundary. The page loads JSON data + Sanity data at build time and passes everything as props.
- **`SectionRenderer.tsx`** takes raw HTML text + merged term list, runs term detection, outputs React elements with `<DefinedTerm>` components inserted.
- **`TableOfContents.tsx`** uses `IntersectionObserver` to track active section and highlight the corresponding TOC entry.
- **`DocumentSearch.tsx`** lazy-loads the FlexSearch index on focus. Index lives in `public/search/`.
- **Side panel content components** are independent — each receives only the data it needs. New modes are added by creating a new content component and extending the `PanelMode` union.

---

## SEO

- Each document page gets `generatePageMetadata()` with title, description, keywords
- JSON-LD `LegalDocument` or `Legislation` structured data
- Hash-based deep links for every section (e.g., `#section-7`)
- Index page added to `public/sitemap.xml`
- Document pages added to `public/sitemap.xml`

---

## Navigation

- Add "Official Texts" to the Resources dropdown in `Header.tsx`:

```typescript
{
  name: 'Resources',
  children: [
    { name: 'Official Texts', href: '/resources/official-texts' },  // new
    { name: 'Guides', href: '/resources/guides' },
    { name: 'Articles', href: '/resources/articles' },
    { name: 'White Papers', href: '/resources/white-papers' },
  ],
}
```

---

## Source Text

The verbatim text for both documents is available as Markdown in:
- `docs/DPDP Act 2023.md`
- `docs/DPDP Rules 2025.md`

These will be structured into JSON format during implementation.
