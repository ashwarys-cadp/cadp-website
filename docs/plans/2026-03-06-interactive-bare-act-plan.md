# Interactive Bare Act & Rules — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive legal reference tool at `/resources/official-texts/` with verbatim DPDP Act 2023 and Rules 2025, full-text search, term definitions, annotations, curated resources, and case law — all statically exported.

**Architecture:** Structured JSON data files for legislative text + Sanity CMS for editorial overlays (annotations, resources, cases). Client-side FlexSearch for search. React client component boundary (`DocumentReader`) wraps the interactive three-column layout. Side panel uses a discriminated union for extensible modes.

**Tech Stack:** Next.js 16 (App Router, static export), Tailwind CSS v4, FlexSearch, Sanity v3, TypeScript, Lucide icons.

**Design Doc:** `docs/plans/2026-03-06-interactive-bare-act-design.md`

**Source Text:** `docs/DPDP Act 2023.md` (682 lines), `docs/DPDP Rules 2025.md` (548 lines)

---

## Task 1: TypeScript Interfaces & Data Types

**Files:**
- Create: `apps/web/data/official-texts/types.ts`

**Step 1: Create the types file**

```typescript
// apps/web/data/official-texts/types.ts

export interface LegalDocument {
  id: string;
  title: string;
  shortTitle: string;
  type: "act" | "rules" | "notification";
  gazetteNumber: string;
  dateEnacted: string;
  dateEffective: string;
  preamble?: string;
  chapters: Chapter[];
  schedules: Schedule[];
  definitions: TermDefinition[];
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  sections: Section[];
}

export interface Section {
  id: string;
  number: string;
  title: string;
  text: string;
  effectiveDate?: string;
  tags: string[];
}

export interface Schedule {
  id: string;
  number: string;
  title: string;
  text: string;
  tags: string[];
}

export interface TermDefinition {
  term: string;
  legalDefinition: string;
  plainLanguage?: string;
  sourceSection: string;
  relatedSections: string[];
}

// --- Sanity CMS types (fetched at build time) ---

export interface Annotation {
  _id: string;
  term: string;
  explanation: string;
  category: "concept" | "procedure" | "threshold" | "reference";
  documentId: string;
  targetSection: string | null;
}

export interface SectionResource {
  _id: string;
  title: string;
  description: string;
  url: string;
  type: "cadp-article" | "cadp-guide" | "external";
  documentId: string;
  targetSection: string | null;
  targetChapter: string | null;
}

export interface CaseReference {
  _id: string;
  caseName: string;
  citation: string;
  court: string;
  dateDecided: string;
  summary: string;
  url: string;
  documentId: string;
  targetSection: string | null;
  targetChapter: string | null;
}

// --- Side Panel discriminated union ---

export type PanelMode =
  | { type: "definition"; term: TermDefinition }
  | { type: "annotation"; annotation: Annotation }
  | { type: "resources"; sectionId: string; resources: SectionResource[] }
  | { type: "caselaw"; sectionId: string; cases: CaseReference[] };

// --- Merged term for detection ---

export interface MergedTerm {
  term: string;
  kind: "definition" | "annotation";
  data: TermDefinition | Annotation;
  targetSection: string | null;
}

// --- TOC item ---

export interface TocItem {
  id: string;
  number: string;
  title: string;
  level: "chapter" | "section" | "schedule";
  children?: TocItem[];
}
```

**Step 2: Verify the file compiles**

Run: `cd apps/web && npx tsc --noEmit data/official-texts/types.ts 2>&1 | head -20`

Expected: No errors (or only errors from missing project references, which is fine — the types themselves should be clean).

**Step 3: Commit**

```bash
git add apps/web/data/official-texts/types.ts
git commit -m "feat(official-texts): add TypeScript interfaces for legal document data"
```

---

## Task 2: Structure DPDP Act 2023 into JSON

**Files:**
- Create: `apps/web/data/official-texts/dpdp-act-2023.json`

**Reference:** Read `docs/DPDP Act 2023.md` for the full source text.

**Step 1: Create the JSON file**

Parse the Markdown source text into the `LegalDocument` structure. Key guidelines:

- The Act has **7 chapters** and **1 schedule** (the penalty schedule).
- Each section's `text` field contains the verbatim text as HTML. Convert Markdown formatting:
  - Sub-clauses like `(a)`, `(b)` become `<ol type="a"><li>...</li></ol>`
  - Sub-sub-clauses like `(i)`, `(ii)` become nested `<ol type="i"><li>...</li></ol>`
  - Provisos ("Provided that...") become `<p class="proviso">Provided that...</p>`
  - Explanations become `<p class="explanation">Explanation.—...</p>`
- The `id` field for sections is `section-N` (e.g., `section-1`, `section-2`).
- The `id` field for chapters is `chapter-N` (e.g., `chapter-1`).
- Extract all 28 definitions from Section 2 into the `definitions[]` array.
- For each definition, list `relatedSections` — sections where that term is substantively used (not every mention, but key usage). Start with an empty array; these can be populated over time.
- Add meaningful `tags` to each section (e.g., `["consent", "notice"]` for Section 6).
- The preamble is the "An Act to provide for..." text.

The JSON structure:

```json
{
  "id": "dpdp-act-2023",
  "title": "The Digital Personal Data Protection Act, 2023",
  "shortTitle": "DPDP Act 2023",
  "type": "act",
  "gazetteNumber": "Act No. 22 of 2023",
  "dateEnacted": "2023-08-11",
  "dateEffective": "2023-08-11",
  "preamble": "An Act to provide for the processing of digital personal data in a manner that recognises both the right of individuals to protect their personal data and the need to process such personal data for lawful purposes and for matters connected therewith or incidental thereto.",
  "chapters": [
    {
      "id": "chapter-1",
      "number": "I",
      "title": "Preliminary",
      "sections": [
        {
          "id": "section-1",
          "number": "1",
          "title": "Short title and commencement",
          "text": "<p>(<strong>1</strong>) This Act may be called the Digital Personal Data Protection Act, 2023.</p><p>(<strong>2</strong>) It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint and different dates may be appointed for different provisions of this Act and any reference in any such provision to the commencement of this Act shall be construed as a reference to the coming into force of that provision.</p>",
          "tags": ["commencement"]
        }
      ]
    }
  ],
  "schedules": [],
  "definitions": [
    {
      "term": "Appellate Tribunal",
      "legalDefinition": "the Telecom Disputes Settlement and Appellate Tribunal established under section 14 of the Telecom Regulatory Authority of India Act, 1997",
      "sourceSection": "section-2",
      "relatedSections": []
    }
  ]
}
```

Continue this pattern for ALL 44 sections across 7 chapters, the schedule, and all 28 definitions.

**Chapter structure of the Act:**
- Chapter I: Preliminary (Sections 1-2)
- Chapter II: Obligations of Data Fiduciary (Sections 3-10)
- Chapter III: Rights and Duties of Data Principal (Sections 11-16)
- Chapter IV: Special Provisions (Sections 17)
- Chapter V: Data Protection Board of India (Sections 18-28)
- Chapter VI: Penalties and Adjudication (Sections 29-35)
- Chapter VII: Miscellaneous (Sections 36-44)
- Schedule: Penalties table

**Step 2: Validate the JSON**

Run: `cd apps/web && node -e "const d = require('./data/official-texts/dpdp-act-2023.json'); console.log('Chapters:', d.chapters.length, 'Sections:', d.chapters.reduce((a,c) => a + c.sections.length, 0), 'Definitions:', d.definitions.length, 'Schedules:', d.schedules.length)"`

Expected: `Chapters: 7 Sections: 44 Definitions: 28 Schedules: 1`

**Step 3: Commit**

```bash
git add apps/web/data/official-texts/dpdp-act-2023.json
git commit -m "feat(official-texts): add structured DPDP Act 2023 JSON data"
```

---

## Task 3: Structure DPDP Rules 2025 into JSON

**Files:**
- Create: `apps/web/data/official-texts/dpdp-rules-2025.json`

**Reference:** Read `docs/DPDP Rules 2025.md` for the full source text.

**Step 1: Create the JSON file**

Same approach as Task 2 but for the Rules. Key differences:

- The Rules do NOT have chapters — they're flat (Rules 1-23). Use a single chapter with `id: "rules"`, `number: ""`, `title: "Digital Personal Data Protection Rules, 2025"`.
- There are **7 schedules**, each is a `Schedule` object.
- Section IDs are `rule-N` (e.g., `rule-1`, `rule-2`).
- Schedule IDs are `schedule-N` (e.g., `schedule-1`).
- The `preamble` is the gazette notification preamble ("Whereas draft of the Digital Personal Data Protection Rules...").
- Only 4 definitions from Rule 2: "Act", "techno-legal measures", "user account", "verifiable consent".
- Schedule text can be complex (tables in some schedules). For tables, use HTML `<table>` elements.

**Step 2: Validate**

Run: `cd apps/web && node -e "const d = require('./data/official-texts/dpdp-rules-2025.json'); console.log('Rules:', d.chapters[0].sections.length, 'Definitions:', d.definitions.length, 'Schedules:', d.schedules.length)"`

Expected: `Rules: 23 Definitions: 4 Schedules: 7`

**Step 3: Commit**

```bash
git add apps/web/data/official-texts/dpdp-rules-2025.json
git commit -m "feat(official-texts): add structured DPDP Rules 2025 JSON data"
```

---

## Task 4: Sanity Schemas for Annotations, Resources, Case Law

**Files:**
- Create: `apps/studio/schemas/documents/annotation.ts`
- Create: `apps/studio/schemas/documents/sectionResource.ts`
- Create: `apps/studio/schemas/documents/caseReference.ts`
- Modify: `apps/studio/schemas/documents/index.ts`

**Step 1: Create annotation schema**

```typescript
// apps/studio/schemas/documents/annotation.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'annotation',
  title: 'Legal Annotation',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      description: 'The term or phrase to annotate (e.g., "techno-legal measures")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'explanation',
      title: 'Plain Language Explanation',
      type: 'text',
      rows: 4,
      description: 'Plain-language explanation of this term or concept',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Concept', value: 'concept' },
          { title: 'Procedure', value: 'procedure' },
          { title: 'Threshold', value: 'threshold' },
          { title: 'Reference', value: 'reference' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'documentId',
      title: 'Document',
      type: 'string',
      description: 'Which document this applies to (e.g., "dpdp-act-2023")',
      options: {
        list: [
          { title: 'DPDP Act 2023', value: 'dpdp-act-2023' },
          { title: 'DPDP Rules 2025', value: 'dpdp-rules-2025' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetSection',
      title: 'Target Section',
      type: 'string',
      description: 'Scope to a specific section (e.g., "section-5"). Leave empty for global.',
    }),
  ],
  preview: {
    select: {
      title: 'term',
      subtitle: 'documentId',
    },
  },
});
```

**Step 2: Create sectionResource schema**

```typescript
// apps/studio/schemas/documents/sectionResource.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sectionResource',
  title: 'Section Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief context on why this resource is relevant to this section',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'CADP Article', value: 'cadp-article' },
          { title: 'CADP Guide', value: 'cadp-guide' },
          { title: 'External', value: 'external' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'documentId',
      title: 'Document',
      type: 'string',
      options: {
        list: [
          { title: 'DPDP Act 2023', value: 'dpdp-act-2023' },
          { title: 'DPDP Rules 2025', value: 'dpdp-rules-2025' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetSection',
      title: 'Target Section',
      type: 'string',
      description: 'Link to a specific section (e.g., "section-7")',
    }),
    defineField({
      name: 'targetChapter',
      title: 'Target Chapter',
      type: 'string',
      description: 'Link to a whole chapter (e.g., "chapter-2")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'documentId',
    },
  },
});
```

**Step 3: Create caseReference schema**

```typescript
// apps/studio/schemas/documents/caseReference.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'caseReference',
  title: 'Case Reference',
  type: 'document',
  fields: [
    defineField({
      name: 'caseName',
      title: 'Case Name',
      type: 'string',
      description: 'e.g., "Justice K.S. Puttaswamy v. Union of India"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'citation',
      title: 'Citation',
      type: 'string',
      description: 'e.g., "(2017) 10 SCC 1"',
    }),
    defineField({
      name: 'court',
      title: 'Court',
      type: 'string',
      options: {
        list: [
          { title: 'Supreme Court', value: 'Supreme Court' },
          { title: 'High Court', value: 'High Court' },
          { title: 'TDSAT', value: 'TDSAT' },
          { title: 'Data Protection Board', value: 'DPB' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateDecided',
      title: 'Date Decided',
      type: 'date',
    }),
    defineField({
      name: 'summary',
      title: 'Relevance Summary',
      type: 'text',
      rows: 4,
      description: 'Brief explanation of why this case is relevant to this section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Judgment URL',
      type: 'url',
      description: 'Link to the full judgment (SCC Online, Indian Kanoon, etc.)',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'documentId',
      title: 'Document',
      type: 'string',
      options: {
        list: [
          { title: 'DPDP Act 2023', value: 'dpdp-act-2023' },
          { title: 'DPDP Rules 2025', value: 'dpdp-rules-2025' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetSection',
      title: 'Target Section',
      type: 'string',
      description: 'Link to a specific section (e.g., "section-8")',
    }),
    defineField({
      name: 'targetChapter',
      title: 'Target Chapter',
      type: 'string',
      description: 'Link to a whole chapter (e.g., "chapter-3")',
    }),
  ],
  preview: {
    select: {
      title: 'caseName',
      subtitle: 'court',
    },
  },
});
```

**Step 4: Update the schema index**

Read the current `apps/studio/schemas/documents/index.ts` and add the three new imports and exports. The file likely exports an array of schema types. Add `annotation`, `sectionResource`, and `caseReference` to it.

Check the existing pattern in `apps/studio/schemas/documents/index.ts` — it may use `export default [...]` or named exports. Follow whatever pattern exists. The existing schemas are: `post`, `whitePaper`, `service`, `teamMember`, `event`, `siteSettings`, `newsArticle`.

**Step 5: Verify Studio starts**

Run: `cd apps/studio && pnpm dev` — verify no schema errors in the console. Check that the three new document types appear in the Studio.

**Step 6: Commit**

```bash
git add apps/studio/schemas/documents/annotation.ts apps/studio/schemas/documents/sectionResource.ts apps/studio/schemas/documents/caseReference.ts apps/studio/schemas/documents/index.ts
git commit -m "feat(studio): add annotation, sectionResource, and caseReference schemas"
```

---

## Task 5: Sanity Queries & Types Integration

**Files:**
- Modify: `apps/web/lib/sanity/queries.ts` (add new queries at the end)
- Modify: `apps/web/lib/sanity/types.ts` (add new types at the end)
- Modify: `apps/web/lib/sanity/index.ts` (already re-exports everything, no change needed)

**Step 1: Add GROQ queries to `apps/web/lib/sanity/queries.ts`**

Append to the end of the file (after the `siteSettingsQuery`):

```typescript
// Official Texts — Annotations
export const annotationsByDocumentQuery = groq`
  *[_type == "annotation" && documentId == $documentId] {
    _id,
    term,
    explanation,
    category,
    documentId,
    targetSection
  }
`;

export const allAnnotationsQuery = groq`
  *[_type == "annotation"] {
    _id,
    term,
    explanation,
    category,
    documentId,
    targetSection
  }
`;

// Official Texts — Section Resources
export const resourcesByDocumentQuery = groq`
  *[_type == "sectionResource" && documentId == $documentId] {
    _id,
    title,
    description,
    url,
    type,
    documentId,
    targetSection,
    targetChapter
  }
`;

export const allResourcesQuery = groq`
  *[_type == "sectionResource"] {
    _id,
    title,
    description,
    url,
    type,
    documentId,
    targetSection,
    targetChapter
  }
`;

// Official Texts — Case References
export const casesByDocumentQuery = groq`
  *[_type == "caseReference" && documentId == $documentId] | order(dateDecided desc) {
    _id,
    caseName,
    citation,
    court,
    dateDecided,
    summary,
    url,
    documentId,
    targetSection,
    targetChapter
  }
`;

export const allCasesQuery = groq`
  *[_type == "caseReference"] | order(dateDecided desc) {
    _id,
    caseName,
    citation,
    court,
    dateDecided,
    summary,
    url,
    documentId,
    targetSection,
    targetChapter
  }
`;
```

**Step 2: The types are already defined in `apps/web/data/official-texts/types.ts`**

The `Annotation`, `SectionResource`, and `CaseReference` interfaces there already match what Sanity will return. No need to duplicate types in `lib/sanity/types.ts`. The page components will import from `data/official-texts/types.ts`.

**Step 3: Commit**

```bash
git add apps/web/lib/sanity/queries.ts
git commit -m "feat(sanity): add GROQ queries for annotations, resources, and case references"
```

---

## Task 6: Utility Functions

**Files:**
- Create: `apps/web/lib/official-texts/terms.ts`
- Create: `apps/web/lib/official-texts/utils.ts`

**Step 1: Create term matching logic**

```typescript
// apps/web/lib/official-texts/terms.ts
import type {
  TermDefinition,
  Annotation,
  MergedTerm,
} from '@/data/official-texts/types';

/**
 * Merge definitions and annotations into a single list sorted by term length
 * descending (longer terms match first to avoid partial matches).
 */
export function mergeTerms(
  definitions: TermDefinition[],
  annotations: Annotation[]
): MergedTerm[] {
  const merged: MergedTerm[] = [];

  for (const def of definitions) {
    merged.push({
      term: def.term,
      kind: 'definition',
      data: def,
      targetSection: null, // definitions are always global
    });
  }

  for (const ann of annotations) {
    merged.push({
      term: ann.term,
      kind: 'annotation',
      data: ann,
      targetSection: ann.targetSection,
    });
  }

  // Sort by term length descending — longer matches first
  merged.sort((a, b) => b.term.length - a.term.length);

  return merged;
}

/**
 * Build a regex that matches any of the given terms on word boundaries,
 * case-insensitively. Returns null if no terms.
 */
export function buildTermRegex(terms: MergedTerm[]): RegExp | null {
  if (terms.length === 0) return null;

  const escaped = terms.map((t) =>
    t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  // Use word boundaries and case-insensitive matching
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

/**
 * Find the first MergedTerm that matches a given text string (case-insensitive).
 */
export function findTermByText(
  text: string,
  terms: MergedTerm[]
): MergedTerm | undefined {
  const lower = text.toLowerCase();
  return terms.find((t) => t.term.toLowerCase() === lower);
}
```

**Step 2: Create utility helpers**

```typescript
// apps/web/lib/official-texts/utils.ts
import type { LegalDocument, TocItem } from '@/data/official-texts/types';

/**
 * Generate a table of contents structure from a LegalDocument.
 */
export function generateToc(doc: LegalDocument): TocItem[] {
  const items: TocItem[] = [];

  for (const chapter of doc.chapters) {
    const chapterItem: TocItem = {
      id: chapter.id,
      number: chapter.number,
      title: chapter.title,
      level: 'chapter',
      children: chapter.sections.map((section) => ({
        id: section.id,
        number: section.number,
        title: section.title,
        level: 'section' as const,
      })),
    };
    items.push(chapterItem);
  }

  for (const schedule of doc.schedules) {
    items.push({
      id: schedule.id,
      number: schedule.number,
      title: schedule.title,
      level: 'schedule',
    });
  }

  return items;
}

/**
 * Get all document IDs from local JSON files.
 * Used by generateStaticParams.
 */
export function getDocumentIds(): string[] {
  return ['dpdp-act-2023', 'dpdp-rules-2025'];
}

/**
 * Load a legal document by ID.
 */
export async function loadDocument(
  id: string
): Promise<LegalDocument | null> {
  try {
    // Dynamic import for static export compatibility
    const data = await import(`@/data/official-texts/${id}.json`);
    return data.default as LegalDocument;
  } catch {
    return null;
  }
}

/**
 * Load all legal documents.
 */
export async function loadAllDocuments(): Promise<LegalDocument[]> {
  const ids = getDocumentIds();
  const docs = await Promise.all(ids.map(loadDocument));
  return docs.filter((d): d is LegalDocument => d !== null);
}

/**
 * Count total sections in a document.
 */
export function countSections(doc: LegalDocument): number {
  return doc.chapters.reduce((acc, ch) => acc + ch.sections.length, 0);
}
```

**Step 3: Commit**

```bash
git add apps/web/lib/official-texts/terms.ts apps/web/lib/official-texts/utils.ts
git commit -m "feat(official-texts): add term matching and document utility functions"
```

---

## Task 7: Index Page — `/resources/official-texts/`

**Files:**
- Create: `apps/web/app/(site)/resources/official-texts/page.tsx`
- Modify: `apps/web/components/layout/Header.tsx` (add "Official Texts" to Resources dropdown)

**Step 1: Create the index page**

This is a server component. It loads all documents from local JSON, displays them as cards with the existing site aesthetic (border-2, accent bars, serif fonts, no border-radius).

```typescript
// apps/web/app/(site)/resources/official-texts/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Scale, BookOpen, ArrowRight } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { loadAllDocuments, countSections } from '@/lib/official-texts/utils';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = generatePageMetadata({
  title: 'Official Texts — DPDP Act & Rules',
  description:
    'Read the full text of the Digital Personal Data Protection Act, 2023 and DPDP Rules 2025. Searchable, annotated, with plain-language explanations.',
  path: '/resources/official-texts',
  keywords: [
    'DPDP Act full text',
    'DPDP Rules full text',
    'bare act DPDP',
    'digital personal data protection act text',
  ],
});

const typeIcons = {
  act: Scale,
  rules: BookOpen,
  notification: FileText,
};

const typeLabels = {
  act: 'Act',
  rules: 'Rules',
  notification: 'Notification',
};

export default async function OfficialTextsPage() {
  const documents = await loadAllDocuments();

  return (
    <>
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Official Texts', href: '/resources/official-texts' },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Legal Reference
                </div>
                <div className="h-px w-24 bg-accent-600 mx-auto"></div>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Official Texts
              </h1>

              <p className="text-lg text-neutral-700 leading-relaxed font-serif max-w-2xl mx-auto">
                Full verbatim text of India&apos;s data protection legislation.
                Searchable, with defined term explanations and curated
                cross-references.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {documents.map((doc) => {
              const Icon = typeIcons[doc.type];
              const sectionCount = countSections(doc);
              return (
                <Link
                  key={doc.id}
                  href={`/resources/official-texts/${doc.id}/`}
                  className="group block bg-white border-2 border-neutral-300 hover:border-primary-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <div className="h-2 bg-primary-600 group-hover:bg-primary-800 transition-colors"></div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 border-2 border-primary-900 flex items-center justify-center bg-primary-50 group-hover:bg-primary-900 transition-all">
                        <Icon
                          className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-primary-800 font-semibold bg-primary-50 px-2.5 py-1 border border-primary-200">
                        {typeLabels[doc.type]}
                      </div>
                    </div>

                    <h2 className="text-xl font-serif font-semibold text-neutral-950 mb-3 leading-tight group-hover:text-primary-900 transition-colors">
                      {doc.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600 font-serif mb-4">
                      <span>{doc.gazetteNumber}</span>
                      <span>{formatDate(doc.dateEnacted)}</span>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm mb-6">
                      <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                        {sectionCount} Sections
                      </span>
                      <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                        {doc.schedules.length} Schedules
                      </span>
                      <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                        {doc.definitions.length} Definitions
                      </span>
                    </div>

                    <div className="pt-5 border-t border-neutral-300 flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif">
                        Read Full Text
                      </span>
                      <div className="w-8 h-8 border-2 border-primary-700 group-hover:border-primary-900 group-hover:bg-primary-900 flex items-center justify-center transition-all">
                        <ArrowRight className="w-4 h-4 text-primary-700 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
```

**Step 2: Add "Official Texts" to header navigation**

In `apps/web/components/layout/Header.tsx`, find the `Resources` navigation item (around line 22-30) and add `Official Texts` as the first child:

```typescript
{
  name: 'Resources',
  href: '/resources',
  children: [
    { name: 'Official Texts', href: '/resources/official-texts' },
    { name: 'Guides', href: '/resources/guides' },
    { name: 'Articles', href: '/resources/articles' },
    { name: 'White Papers', href: '/resources/white-papers' },
  ],
},
```

**Step 3: Verify build**

Run: `cd apps/web && pnpm build 2>&1 | tail -20`

Check that `/resources/official-texts` appears in the output pages.

**Step 4: Commit**

```bash
git add apps/web/app/\(site\)/resources/official-texts/page.tsx apps/web/components/layout/Header.tsx
git commit -m "feat(official-texts): add index page and header navigation link"
```

---

## Task 8: Side Panel Shell + Content Components

**Files:**
- Create: `apps/web/app/(site)/resources/official-texts/components/SidePanel.tsx`
- Create: `apps/web/app/(site)/resources/official-texts/components/sidepanel/DefinitionContent.tsx`
- Create: `apps/web/app/(site)/resources/official-texts/components/sidepanel/AnnotationContent.tsx`
- Create: `apps/web/app/(site)/resources/official-texts/components/sidepanel/ResourcesContent.tsx`
- Create: `apps/web/app/(site)/resources/official-texts/components/sidepanel/CaseLawContent.tsx`

**Step 1: Create the SidePanel shell**

This is the extensible container. It handles the slide-in/out animation, close behavior (X, Escape, click outside), and delegates content rendering to mode-specific components.

```typescript
// apps/web/app/(site)/resources/official-texts/components/SidePanel.tsx
'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PanelMode } from '@/data/official-texts/types';
import { DefinitionContent } from './sidepanel/DefinitionContent';
import { AnnotationContent } from './sidepanel/AnnotationContent';
import { ResourcesContent } from './sidepanel/ResourcesContent';
import { CaseLawContent } from './sidepanel/CaseLawContent';

interface SidePanelProps {
  mode: PanelMode | null;
  onClose: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

function PanelContent({
  mode,
  onNavigateToSection,
}: {
  mode: PanelMode;
  onNavigateToSection: (sectionId: string) => void;
}) {
  switch (mode.type) {
    case 'definition':
      return (
        <DefinitionContent
          term={mode.term}
          onNavigateToSection={onNavigateToSection}
        />
      );
    case 'annotation':
      return <AnnotationContent annotation={mode.annotation} />;
    case 'resources':
      return (
        <ResourcesContent
          sectionId={mode.sectionId}
          resources={mode.resources}
        />
      );
    case 'caselaw':
      return (
        <CaseLawContent sectionId={mode.sectionId} cases={mode.cases} />
      );
    default:
      return null;
  }
}

export function SidePanel({ mode, onClose, onNavigateToSection }: SidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (mode) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [mode, onClose]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (mode) {
      // Delay to avoid closing immediately from the trigger click
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [mode, onClose]);

  return (
    <div
      ref={panelRef}
      className={cn(
        'fixed top-0 right-0 h-full w-full sm:w-[360px] bg-white border-l-2 border-neutral-300 shadow-xl z-40',
        'transform transition-transform duration-300 ease-in-out',
        'overflow-y-auto',
        mode ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {mode && (
        <>
          <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-end z-10">
            <button
              onClick={onClose}
              className="w-8 h-8 border-2 border-neutral-300 hover:border-neutral-500 flex items-center justify-center transition-colors"
              aria-label="Close panel"
            >
              <X className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
          <div className="px-6 py-6">
            <PanelContent mode={mode} onNavigateToSection={onNavigateToSection} />
          </div>
        </>
      )}
    </div>
  );
}
```

**Step 2: Create DefinitionContent**

```typescript
// apps/web/app/(site)/resources/official-texts/components/sidepanel/DefinitionContent.tsx
import type { TermDefinition } from '@/data/official-texts/types';

interface DefinitionContentProps {
  term: TermDefinition;
  onNavigateToSection: (sectionId: string) => void;
}

export function DefinitionContent({
  term,
  onNavigateToSection,
}: DefinitionContentProps) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-accent-700 font-semibold mb-3">
        Defined Term
      </div>
      <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-6">
        {term.term}
      </h3>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-2">
          Legal Definition
        </div>
        <blockquote className="text-neutral-700 font-serif leading-relaxed border-l-2 border-accent-600 pl-4 italic">
          &ldquo;{term.legalDefinition}&rdquo;
        </blockquote>
        <div className="text-sm text-neutral-500 font-serif mt-2">
          &mdash; {term.sourceSection.replace('section-', 'Section ').replace('rule-', 'Rule ')}
        </div>
      </div>

      {term.plainLanguage && (
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-2">
            Plain Language
          </div>
          <p className="text-neutral-700 font-serif leading-relaxed">
            {term.plainLanguage}
          </p>
        </div>
      )}

      {term.relatedSections.length > 0 && (
        <div>
          <div className="h-px bg-neutral-200 my-6"></div>
          <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-3">
            Appears in
          </div>
          <ul className="space-y-1">
            {term.relatedSections.map((sectionId) => (
              <li key={sectionId}>
                <button
                  onClick={() => onNavigateToSection(sectionId)}
                  className="text-primary-700 hover:text-primary-900 font-serif text-sm hover:underline transition-colors"
                >
                  {sectionId.replace('section-', 'Section ').replace('rule-', 'Rule ')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

**Step 3: Create AnnotationContent**

```typescript
// apps/web/app/(site)/resources/official-texts/components/sidepanel/AnnotationContent.tsx
import type { Annotation } from '@/data/official-texts/types';

interface AnnotationContentProps {
  annotation: Annotation;
}

const categoryLabels: Record<string, string> = {
  concept: 'Concept',
  procedure: 'Procedure',
  threshold: 'Threshold',
  reference: 'Reference',
};

export function AnnotationContent({ annotation }: AnnotationContentProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-xs uppercase tracking-[0.2em] text-primary-600 font-semibold">
          Annotation
        </div>
        <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-600 font-semibold bg-neutral-100 px-2 py-0.5 border border-neutral-300">
          {categoryLabels[annotation.category] || annotation.category}
        </span>
      </div>
      <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-6">
        {annotation.term}
      </h3>

      <div>
        <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-2">
          Explanation
        </div>
        <p className="text-neutral-700 font-serif leading-relaxed">
          {annotation.explanation}
        </p>
      </div>
    </div>
  );
}
```

**Step 4: Create ResourcesContent**

```typescript
// apps/web/app/(site)/resources/official-texts/components/sidepanel/ResourcesContent.tsx
import { FileText, BookOpen, ExternalLink } from 'lucide-react';
import type { SectionResource } from '@/data/official-texts/types';

interface ResourcesContentProps {
  sectionId: string;
  resources: SectionResource[];
}

const typeIcons = {
  'cadp-article': FileText,
  'cadp-guide': BookOpen,
  external: ExternalLink,
};

const typeLabels = {
  'cadp-article': 'CADP Article',
  'cadp-guide': 'CADP Guide',
  external: 'External',
};

export function ResourcesContent({
  sectionId,
  resources,
}: ResourcesContentProps) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-accent-700 font-semibold mb-3">
        Related Resources
      </div>
      <div className="text-sm text-neutral-500 font-serif mb-6">
        {sectionId.replace('section-', 'Section ').replace('rule-', 'Rule ').replace('chapter-', 'Chapter ')}
      </div>

      <div className="space-y-4">
        {resources.map((resource) => {
          const Icon = typeIcons[resource.type];
          return (
            <div
              key={resource._id}
              className="border-2 border-neutral-200 p-4 hover:border-accent-600 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-neutral-500" strokeWidth={1.5} />
                <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold">
                  {typeLabels[resource.type]}
                </span>
              </div>
              <h4 className="font-serif font-semibold text-neutral-950 mb-1">
                {resource.title}
              </h4>
              {resource.description && (
                <p className="text-sm text-neutral-600 font-serif leading-relaxed mb-3">
                  {resource.description}
                </p>
              )}
              <a
                href={resource.url}
                target={resource.type === 'external' ? '_blank' : undefined}
                rel={resource.type === 'external' ? 'noopener noreferrer' : undefined}
                className="text-sm text-primary-700 hover:text-primary-900 font-semibold font-serif inline-flex items-center gap-1"
              >
                Open resource
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 5: Create CaseLawContent**

```typescript
// apps/web/app/(site)/resources/official-texts/components/sidepanel/CaseLawContent.tsx
import { Scale, ExternalLink } from 'lucide-react';
import type { CaseReference } from '@/data/official-texts/types';
import { formatDate } from '@/lib/utils';

interface CaseLawContentProps {
  sectionId: string;
  cases: CaseReference[];
}

export function CaseLawContent({ sectionId, cases }: CaseLawContentProps) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-primary-600 font-semibold mb-3">
        Case Law
      </div>
      <div className="text-sm text-neutral-500 font-serif mb-6">
        {sectionId.replace('section-', 'Section ').replace('rule-', 'Rule ').replace('chapter-', 'Chapter ')}
      </div>

      <div className="space-y-4">
        {cases.map((caseRef) => (
          <div
            key={caseRef._id}
            className="border-2 border-neutral-200 p-4 hover:border-primary-600 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-primary-600" strokeWidth={1.5} />
              <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-primary-600 font-semibold">
                {caseRef.court}
              </span>
            </div>
            <h4 className="font-serif font-semibold text-neutral-950 mb-1 italic">
              {caseRef.caseName}
            </h4>
            {caseRef.citation && (
              <div className="text-sm text-neutral-500 font-serif mb-1">
                {caseRef.citation}
              </div>
            )}
            {caseRef.dateDecided && (
              <div className="text-sm text-neutral-500 font-serif mb-3">
                {formatDate(caseRef.dateDecided)}
              </div>
            )}
            <p className="text-sm text-neutral-600 font-serif leading-relaxed mb-3">
              {caseRef.summary}
            </p>
            {caseRef.url && (
              <a
                href={caseRef.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-700 hover:text-primary-900 font-semibold font-serif inline-flex items-center gap-1"
              >
                View judgment
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 6: Commit**

```bash
git add apps/web/app/\(site\)/resources/official-texts/components/
git commit -m "feat(official-texts): add extensible SidePanel with definition, annotation, resources, and case law modes"
```

---

## Task 9: Table of Contents Component

**Files:**
- Create: `apps/web/app/(site)/resources/official-texts/components/TableOfContents.tsx`

**Step 1: Create the TOC component**

Uses `IntersectionObserver` to track which section is in the viewport. Highlights active section. Supports collapsible chapters.

```typescript
// apps/web/app/(site)/resources/official-texts/components/TableOfContents.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TocItem } from '@/data/official-texts/types';

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    () => new Set(items.map((i) => i.id))
  );

  useEffect(() => {
    const sectionElements: Element[] = [];
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) sectionElements.push(el);
      if (item.children) {
        for (const child of item.children) {
          const childEl = document.getElementById(child.id);
          if (childEl) sectionElements.push(childEl);
        }
      }
    }

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    for (const el of sectionElements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  function toggleChapter(chapterId: string) {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL hash without triggering scroll
      history.replaceState(null, '', `#${id}`);
    }
  }

  return (
    <nav className="text-sm" aria-label="Table of contents">
      <div className="text-xs uppercase tracking-[0.2em] text-accent-700 font-semibold mb-4">
        Contents
      </div>
      <ul className="space-y-1">
        {items.map((item) => {
          const isExpanded = expandedChapters.has(item.id);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <li key={item.id}>
              <div className="flex items-center">
                {hasChildren && (
                  <button
                    onClick={() => toggleChapter(item.id)}
                    className="w-5 h-5 flex items-center justify-center mr-1 text-neutral-400 hover:text-neutral-700"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform',
                        !isExpanded && '-rotate-90'
                      )}
                    />
                  </button>
                )}
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    'text-left py-1.5 font-serif transition-colors flex-1 truncate',
                    item.level === 'chapter'
                      ? 'font-semibold text-neutral-800'
                      : 'text-neutral-600',
                    activeId === item.id && 'text-primary-700 font-semibold',
                    !hasChildren && 'ml-6'
                  )}
                  title={
                    item.number
                      ? `${item.level === 'schedule' ? 'Schedule' : item.level === 'chapter' ? 'Chapter' : ''} ${item.number}: ${item.title}`
                      : item.title
                  }
                >
                  {item.number && (
                    <span className="text-neutral-400 mr-1.5">
                      {item.level === 'schedule'
                        ? `Sch ${item.number}`
                        : item.level === 'chapter'
                          ? `Ch ${item.number}`
                          : `${item.number}.`}
                    </span>
                  )}
                  {item.title}
                </button>
              </div>

              {hasChildren && isExpanded && (
                <ul className="ml-6 space-y-0.5 mt-0.5">
                  {item.children!.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => scrollToSection(child.id)}
                        className={cn(
                          'text-left py-1 font-serif text-neutral-500 hover:text-neutral-800 transition-colors truncate w-full',
                          activeId === child.id &&
                            'text-primary-700 font-semibold'
                        )}
                        title={`${child.number}. ${child.title}`}
                      >
                        <span className="text-neutral-400 mr-1.5">
                          {child.number}.
                        </span>
                        {child.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

**Step 2: Commit**

```bash
git add apps/web/app/\(site\)/resources/official-texts/components/TableOfContents.tsx
git commit -m "feat(official-texts): add sticky table of contents with scroll tracking"
```

---

## Task 10: Section Heading, Defined Term, Copy Link Components

**Files:**
- Create: `apps/web/app/(site)/resources/official-texts/components/SectionHeading.tsx`
- Create: `apps/web/app/(site)/resources/official-texts/components/DefinedTerm.tsx`
- Create: `apps/web/app/(site)/resources/official-texts/components/CopyLinkButton.tsx`

**Step 1: Create SectionHeading**

Renders a section title with optional resource/case count icons.

```typescript
// apps/web/app/(site)/resources/official-texts/components/SectionHeading.tsx
'use client';

import { Link2, Scale } from 'lucide-react';
import { CopyLinkButton } from './CopyLinkButton';

interface SectionHeadingProps {
  id: string;
  number: string;
  title: string;
  level: 'chapter' | 'section' | 'schedule';
  resourceCount: number;
  caseCount: number;
  onResourcesClick: () => void;
  onCasesClick: () => void;
}

export function SectionHeading({
  id,
  number,
  title,
  level,
  resourceCount,
  caseCount,
  onResourcesClick,
  onCasesClick,
}: SectionHeadingProps) {
  const isChapter = level === 'chapter';
  const isSchedule = level === 'schedule';
  const Tag = isChapter ? 'h2' : 'h3';
  const prefix = isChapter
    ? `Chapter ${number}`
    : isSchedule
      ? `${number} Schedule`
      : `Section ${number}`;

  return (
    <div id={id} className="group flex items-start gap-3 scroll-mt-24">
      <Tag
        className={
          isChapter
            ? 'text-2xl md:text-3xl font-serif font-bold text-neutral-950'
            : 'text-lg md:text-xl font-serif font-semibold text-neutral-900'
        }
      >
        <span className="text-primary-700">{prefix}.</span> {title}
      </Tag>

      <div className="flex items-center gap-1.5 mt-1 shrink-0">
        <CopyLinkButton sectionId={id} />

        {resourceCount > 0 && (
          <button
            onClick={onResourcesClick}
            className="flex items-center gap-1 px-2 py-1 text-accent-700 hover:text-accent-900 hover:bg-accent-50 transition-colors"
            title={`${resourceCount} related resource${resourceCount > 1 ? 's' : ''}`}
          >
            <Link2 className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="text-xs font-semibold">{resourceCount}</span>
          </button>
        )}

        {caseCount > 0 && (
          <button
            onClick={onCasesClick}
            className="flex items-center gap-1 px-2 py-1 text-primary-600 hover:text-primary-800 hover:bg-primary-50 transition-colors"
            title={`${caseCount} related case${caseCount > 1 ? 's' : ''}`}
          >
            <Scale className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="text-xs font-semibold">{caseCount}</span>
          </button>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Create DefinedTerm**

```typescript
// apps/web/app/(site)/resources/official-texts/components/DefinedTerm.tsx
'use client';

import { cn } from '@/lib/utils';

interface DefinedTermProps {
  children: React.ReactNode;
  kind: 'definition' | 'annotation';
  onClick: () => void;
}

export function DefinedTerm({ children, kind, onClick }: DefinedTermProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'cursor-pointer border-b border-dotted transition-colors',
        kind === 'definition'
          ? 'border-accent-600 hover:bg-accent-50'
          : 'border-primary-400 hover:bg-primary-50'
      )}
    >
      {children}
    </button>
  );
}
```

**Step 3: Create CopyLinkButton**

```typescript
// apps/web/app/(site)/resources/official-texts/components/CopyLinkButton.tsx
'use client';

import { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';

interface CopyLinkButtonProps {
  sectionId: string;
}

export function CopyLinkButton({ sectionId }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-neutral-700 transition-all"
      title="Copy link to section"
      aria-label="Copy link to section"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-600" />
      ) : (
        <LinkIcon className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
```

**Step 4: Commit**

```bash
git add apps/web/app/\(site\)/resources/official-texts/components/SectionHeading.tsx apps/web/app/\(site\)/resources/official-texts/components/DefinedTerm.tsx apps/web/app/\(site\)/resources/official-texts/components/CopyLinkButton.tsx
git commit -m "feat(official-texts): add SectionHeading, DefinedTerm, and CopyLinkButton components"
```

---

## Task 11: Section Renderer with Term Detection

**Files:**
- Create: `apps/web/app/(site)/resources/official-texts/components/SectionRenderer.tsx`

**Step 1: Create the section renderer**

This component takes section HTML text and a list of merged terms, finds the first occurrence of each term, and replaces it with a `<DefinedTerm>` component. Uses `dangerouslySetInnerHTML` for the base text, then overlays term detection via text node walking.

Due to the complexity of mixing HTML and React components for term detection, use a two-pass approach:
1. Render the section HTML as-is using `dangerouslySetInnerHTML`
2. After mount, use a `useEffect` to walk text nodes in the DOM and wrap matched terms with interactive spans

```typescript
// apps/web/app/(site)/resources/official-texts/components/SectionRenderer.tsx
'use client';

import { useRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import type { MergedTerm } from '@/data/official-texts/types';
import { buildTermRegex, findTermByText } from '@/lib/official-texts/terms';

interface SectionRendererProps {
  html: string;
  sectionId: string;
  terms: MergedTerm[];
  onTermClick: (term: MergedTerm) => void;
}

export function SectionRenderer({
  html,
  sectionId,
  terms,
  onTermClick,
}: SectionRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const matchedTermsRef = useRef<Set<string>>(new Set());

  const processTextNode = useCallback(
    (node: Text, regex: RegExp) => {
      const text = node.textContent;
      if (!text) return;

      const parts: (string | { match: string; term: MergedTerm })[] = [];
      let lastIndex = 0;

      // Reset regex
      regex.lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        const matchedText = match[0];
        const term = findTermByText(matchedText, terms);
        if (!term) continue;

        // Only first occurrence per section
        const termKey = term.term.toLowerCase();
        if (matchedTermsRef.current.has(termKey)) continue;

        // If scoped and not matching this section, skip
        if (term.targetSection && term.targetSection !== sectionId) continue;

        matchedTermsRef.current.add(termKey);

        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }
        parts.push({ match: matchedText, term });
        lastIndex = regex.lastIndex;
      }

      if (parts.length === 0) return;
      if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
      }

      const fragment = document.createDocumentFragment();
      for (const part of parts) {
        if (typeof part === 'string') {
          fragment.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.textContent = part.match;
          span.className =
            part.term.kind === 'definition'
              ? 'cursor-pointer border-b border-dotted border-accent-600 hover:bg-accent-50 transition-colors'
              : 'cursor-pointer border-b border-dotted border-primary-400 hover:bg-primary-50 transition-colors';
          span.addEventListener('click', () => onTermClick(part.term));
          fragment.appendChild(span);
        }
      }

      node.parentNode?.replaceChild(fragment, node);
    },
    [terms, sectionId, onTermClick]
  );

  useEffect(() => {
    if (!containerRef.current || terms.length === 0) return;

    const regex = buildTermRegex(terms);
    if (!regex) return;

    matchedTermsRef.current = new Set();

    // Walk all text nodes
    const walker = document.createTreeWalker(
      containerRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      textNodes.push(node);
    }

    for (const textNode of textNodes) {
      processTextNode(textNode, new RegExp(regex.source, regex.flags));
    }
  }, [html, terms, processTextNode]);

  return (
    <div
      ref={containerRef}
      className="prose-legal font-serif text-neutral-800 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

**Step 2: Add `.prose-legal` styles to `apps/web/app/globals.css`**

Append these styles after the existing custom prose classes. These style the HTML elements inside the verbatim legal text:

```css
/* Legal text prose styles */
.prose-legal p {
  @apply mb-4;
}

.prose-legal ol {
  @apply ml-6 mb-4 space-y-2;
}

.prose-legal ol[type="a"] {
  list-style-type: lower-alpha;
}

.prose-legal ol[type="i"] {
  list-style-type: lower-roman;
}

.prose-legal li {
  @apply pl-1;
}

.prose-legal .proviso {
  @apply ml-6 italic text-neutral-700 border-l-2 border-neutral-300 pl-4 mb-4;
}

.prose-legal .explanation {
  @apply ml-6 text-neutral-600 border-l-2 border-accent-300 pl-4 mb-4;
}

.prose-legal table {
  @apply w-full border-collapse border-2 border-neutral-300 mb-4;
}

.prose-legal th {
  @apply text-left py-2 px-3 bg-neutral-100 border border-neutral-300 font-semibold text-sm;
}

.prose-legal td {
  @apply py-2 px-3 border border-neutral-300 text-sm;
}
```

**Step 3: Commit**

```bash
git add apps/web/app/\(site\)/resources/official-texts/components/SectionRenderer.tsx apps/web/app/globals.css
git commit -m "feat(official-texts): add SectionRenderer with term detection and legal prose styles"
```

---

## Task 12: Search — Install FlexSearch & Build Search Component

**Files:**
- Create: `apps/web/lib/official-texts/search.ts`
- Create: `apps/web/app/(site)/resources/official-texts/components/DocumentSearch.tsx`

**Step 1: Install FlexSearch**

Run: `cd apps/web && pnpm add flexsearch`
Run: `cd apps/web && pnpm add -D @types/flexsearch` (if types exist, otherwise skip)

**Step 2: Create search utilities**

```typescript
// apps/web/lib/official-texts/search.ts
import type { LegalDocument } from '@/data/official-texts/types';

export interface SearchResult {
  documentId: string;
  documentTitle: string;
  sectionId: string;
  sectionNumber: string;
  sectionTitle: string;
  snippet: string;
}

/**
 * Strip HTML tags from text for indexing and snippet generation.
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Build a flat list of searchable entries from documents.
 */
export function buildSearchEntries(docs: LegalDocument[]) {
  const entries: {
    documentId: string;
    documentTitle: string;
    sectionId: string;
    sectionNumber: string;
    sectionTitle: string;
    plainText: string;
  }[] = [];

  for (const doc of docs) {
    for (const chapter of doc.chapters) {
      for (const section of chapter.sections) {
        entries.push({
          documentId: doc.id,
          documentTitle: doc.shortTitle,
          sectionId: section.id,
          sectionNumber: section.number,
          sectionTitle: section.title,
          plainText: stripHtml(section.text),
        });
      }
    }
    for (const schedule of doc.schedules) {
      entries.push({
        documentId: doc.id,
        documentTitle: doc.shortTitle,
        sectionId: schedule.id,
        sectionNumber: schedule.number,
        sectionTitle: schedule.title,
        plainText: stripHtml(schedule.text),
      });
    }
  }

  return entries;
}

/**
 * Simple client-side search using string matching.
 * This avoids FlexSearch's complex serialization issues.
 * For ~70 sections of legal text, simple matching is fast enough.
 */
export function searchEntries(
  entries: ReturnType<typeof buildSearchEntries>,
  query: string,
  scopeDocumentId?: string
): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/).filter(Boolean);

  const results: SearchResult[] = [];

  for (const entry of entries) {
    if (scopeDocumentId && entry.documentId !== scopeDocumentId) continue;

    const lowerText = entry.plainText.toLowerCase();
    const lowerTitle = entry.sectionTitle.toLowerCase();

    // All words must appear in either title or text
    const matches = words.every(
      (word) => lowerText.includes(word) || lowerTitle.includes(word)
    );

    if (!matches) continue;

    // Generate snippet around first match
    const firstWordIndex = lowerText.indexOf(words[0]);
    const snippetStart = Math.max(0, firstWordIndex - 60);
    const snippetEnd = Math.min(entry.plainText.length, firstWordIndex + 120);
    const snippet =
      (snippetStart > 0 ? '...' : '') +
      entry.plainText.slice(snippetStart, snippetEnd) +
      (snippetEnd < entry.plainText.length ? '...' : '');

    results.push({
      documentId: entry.documentId,
      documentTitle: entry.documentTitle,
      sectionId: entry.sectionId,
      sectionNumber: entry.sectionNumber,
      sectionTitle: entry.sectionTitle,
      snippet,
    });
  }

  return results;
}
```

Note: We're using simple string matching instead of FlexSearch. With only ~70 sections total, this is fast enough and avoids FlexSearch's serialization complexity. If the corpus grows significantly with future notifications, FlexSearch can replace this later.

**Step 3: Create the search component**

```typescript
// apps/web/app/(site)/resources/official-texts/components/DocumentSearch.tsx
'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LegalDocument } from '@/data/official-texts/types';
import {
  buildSearchEntries,
  searchEntries,
  type SearchResult,
} from '@/lib/official-texts/search';

interface DocumentSearchProps {
  currentDocument: LegalDocument;
  allDocuments: LegalDocument[];
  onNavigateToSection: (sectionId: string) => void;
}

export function DocumentSearch({
  currentDocument,
  allDocuments,
  onNavigateToSection,
}: DocumentSearchProps) {
  const [query, setQuery] = useState('');
  const [isCrossCorpus, setIsCrossCorpus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const entries = useMemo(
    () => buildSearchEntries(isCrossCorpus ? allDocuments : [currentDocument]),
    [isCrossCorpus, allDocuments, currentDocument]
  );

  const results = useMemo(
    () =>
      searchEntries(
        entries,
        query,
        isCrossCorpus ? undefined : currentDocument.id
      ),
    [entries, query, isCrossCorpus, currentDocument.id]
  );

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        e.target !== inputRef.current
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(result: SearchResult) {
    onNavigateToSection(result.sectionId);
    setIsOpen(false);
    setQuery('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  }

  // Highlight matching text in snippet
  function highlightSnippet(snippet: string) {
    if (!query.trim()) return snippet;
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const regex = new RegExp(
      `(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'gi'
    );
    return snippet.replace(regex, '<mark class="bg-accent-200 px-0.5">$1</mark>');
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => query && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search this document..."
            className="w-full pl-10 pr-8 py-2.5 border-2 border-neutral-300 bg-white font-serif text-sm focus:border-primary-600 focus:outline-none transition-colors"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsCrossCorpus((v) => !v)}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2.5 border-2 text-sm font-semibold font-serif transition-colors shrink-0',
            isCrossCorpus
              ? 'border-primary-600 bg-primary-50 text-primary-700'
              : 'border-neutral-300 text-neutral-500 hover:border-neutral-400'
          )}
          title={isCrossCorpus ? 'Searching all documents' : 'Search all documents'}
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">All</span>
        </button>
      </div>

      {/* Results dropdown */}
      {isOpen && query && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-neutral-300 shadow-lg z-30 max-h-[400px] overflow-y-auto"
        >
          {results.slice(0, 20).map((result, index) => (
            <button
              key={`${result.documentId}-${result.sectionId}`}
              onClick={() => handleSelect(result)}
              className={cn(
                'w-full text-left px-4 py-3 border-b border-neutral-100 hover:bg-neutral-50 transition-colors',
                index === selectedIndex && 'bg-primary-50'
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-primary-700 font-serif">
                  {result.sectionId.includes('section')
                    ? `Section ${result.sectionNumber}`
                    : result.sectionId.includes('rule')
                      ? `Rule ${result.sectionNumber}`
                      : `Schedule ${result.sectionNumber}`}
                </span>
                <span className="text-sm text-neutral-500 font-serif">
                  {result.sectionTitle}
                </span>
                {isCrossCorpus && (
                  <span className="ml-auto text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                    {result.documentTitle}
                  </span>
                )}
              </div>
              <p
                className="text-sm text-neutral-600 font-serif line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: highlightSnippet(result.snippet),
                }}
              />
            </button>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-neutral-300 shadow-lg z-30 p-6 text-center">
          <p className="text-neutral-500 font-serif text-sm">
            No results found for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
```

**Step 4: Commit**

```bash
git add apps/web/lib/official-texts/search.ts apps/web/app/\(site\)/resources/official-texts/components/DocumentSearch.tsx
git commit -m "feat(official-texts): add search utilities and DocumentSearch component"
```

---

## Task 13: DocumentReader — Main Layout Component

**Files:**
- Create: `apps/web/app/(site)/resources/official-texts/components/DocumentReader.tsx`

**Step 1: Create the main layout component**

This is the single client component boundary that orchestrates the three-column layout: TOC, content, and side panel.

```typescript
// apps/web/app/(site)/resources/official-texts/components/DocumentReader.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import type {
  LegalDocument,
  Annotation,
  SectionResource,
  CaseReference,
  PanelMode,
  MergedTerm,
} from '@/data/official-texts/types';
import { mergeTerms } from '@/lib/official-texts/terms';
import { generateToc } from '@/lib/official-texts/utils';
import { TableOfContents } from './TableOfContents';
import { SidePanel } from './SidePanel';
import { SectionHeading } from './SectionHeading';
import { SectionRenderer } from './SectionRenderer';
import { DocumentSearch } from './DocumentSearch';

interface DocumentReaderProps {
  document: LegalDocument;
  allDocuments: LegalDocument[];
  annotations: Annotation[];
  resources: SectionResource[];
  cases: CaseReference[];
}

export function DocumentReader({
  document: doc,
  allDocuments,
  annotations,
  resources,
  cases,
}: DocumentReaderProps) {
  const [panelMode, setPanelMode] = useState<PanelMode | null>(null);

  const toc = generateToc(doc);
  const mergedTerms = mergeTerms(doc.definitions, annotations);

  // Scroll to hash on mount
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, []);

  function getResourcesForSection(sectionId: string, chapterId?: string): SectionResource[] {
    return resources.filter(
      (r) => r.targetSection === sectionId || r.targetChapter === chapterId
    );
  }

  function getCasesForSection(sectionId: string, chapterId?: string): CaseReference[] {
    return cases.filter(
      (c) => c.targetSection === sectionId || c.targetChapter === chapterId
    );
  }

  const handleTermClick = useCallback(
    (term: MergedTerm) => {
      if (term.kind === 'definition') {
        setPanelMode({
          type: 'definition',
          term: term.data as LegalDocument['definitions'][0],
        });
      } else {
        setPanelMode({
          type: 'annotation',
          annotation: term.data as Annotation,
        });
      }
    },
    []
  );

  function handleResourcesClick(sectionId: string, chapterId?: string) {
    const sectionResources = getResourcesForSection(sectionId, chapterId);
    setPanelMode({ type: 'resources', sectionId, resources: sectionResources });
  }

  function handleCasesClick(sectionId: string, chapterId?: string) {
    const sectionCases = getCasesForSection(sectionId, chapterId);
    setPanelMode({ type: 'caselaw', sectionId, cases: sectionCases });
  }

  function handleNavigateToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${sectionId}`);
    }
  }

  return (
    <div className="flex gap-0 xl:gap-8 relative">
      {/* Left: Sticky TOC */}
      <aside className="hidden xl:block w-[220px] shrink-0">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
          <TableOfContents items={toc} />
        </div>
      </aside>

      {/* Center: Main content */}
      <main className="flex-1 min-w-0">
        {/* Search */}
        <div className="mb-10">
          <DocumentSearch
            currentDocument={doc}
            allDocuments={allDocuments}
            onNavigateToSection={handleNavigateToSection}
          />
        </div>

        {/* Preamble */}
        {doc.preamble && (
          <div className="mb-12 p-6 border-2 border-neutral-200 bg-neutral-50">
            <div className="text-xs uppercase tracking-[0.2em] text-accent-700 font-semibold mb-3">
              Preamble
            </div>
            <p className="font-serif text-neutral-700 leading-relaxed italic">
              {doc.preamble}
            </p>
          </div>
        )}

        {/* Chapters & Sections */}
        {doc.chapters.map((chapter) => (
          <div key={chapter.id} className="mb-16">
            {/* Chapter heading */}
            {chapter.number && (
              <div className="mb-8">
                <SectionHeading
                  id={chapter.id}
                  number={chapter.number}
                  title={chapter.title}
                  level="chapter"
                  resourceCount={
                    resources.filter((r) => r.targetChapter === chapter.id).length
                  }
                  caseCount={
                    cases.filter((c) => c.targetChapter === chapter.id).length
                  }
                  onResourcesClick={() =>
                    handleResourcesClick(chapter.id, chapter.id)
                  }
                  onCasesClick={() =>
                    handleCasesClick(chapter.id, chapter.id)
                  }
                />
              </div>
            )}

            {/* Sections */}
            {chapter.sections.map((section) => {
              const sectionResources = getResourcesForSection(
                section.id,
                chapter.id
              );
              const sectionCases = getCasesForSection(
                section.id,
                chapter.id
              );

              return (
                <div
                  key={section.id}
                  className="mb-10 pb-10 border-b border-neutral-200 last:border-b-0"
                >
                  <div className="mb-4">
                    <SectionHeading
                      id={section.id}
                      number={section.number}
                      title={section.title}
                      level="section"
                      resourceCount={sectionResources.length}
                      caseCount={sectionCases.length}
                      onResourcesClick={() =>
                        handleResourcesClick(section.id, chapter.id)
                      }
                      onCasesClick={() =>
                        handleCasesClick(section.id, chapter.id)
                      }
                    />
                  </div>
                  <SectionRenderer
                    html={section.text}
                    sectionId={section.id}
                    terms={mergedTerms}
                    onTermClick={handleTermClick}
                  />
                </div>
              );
            })}
          </div>
        ))}

        {/* Schedules */}
        {doc.schedules.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Appendices
                </div>
                <div className="h-px w-24 bg-accent-600 mx-auto"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-950">
                Schedules
              </h2>
            </div>

            {doc.schedules.map((schedule) => {
              const scheduleResources = resources.filter(
                (r) => r.targetSection === schedule.id
              );
              const scheduleCases = cases.filter(
                (c) => c.targetSection === schedule.id
              );

              return (
                <div
                  key={schedule.id}
                  className="mb-10 pb-10 border-b border-neutral-200 last:border-b-0"
                >
                  <div className="mb-4">
                    <SectionHeading
                      id={schedule.id}
                      number={schedule.number}
                      title={schedule.title}
                      level="schedule"
                      resourceCount={scheduleResources.length}
                      caseCount={scheduleCases.length}
                      onResourcesClick={() =>
                        handleResourcesClick(schedule.id)
                      }
                      onCasesClick={() =>
                        handleCasesClick(schedule.id)
                      }
                    />
                  </div>
                  <SectionRenderer
                    html={schedule.text}
                    sectionId={schedule.id}
                    terms={mergedTerms}
                    onTermClick={handleTermClick}
                  />
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Right: Side Panel */}
      <SidePanel
        mode={panelMode}
        onClose={() => setPanelMode(null)}
        onNavigateToSection={handleNavigateToSection}
      />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add apps/web/app/\(site\)/resources/official-texts/components/DocumentReader.tsx
git commit -m "feat(official-texts): add DocumentReader main layout component"
```

---

## Task 14: Document Page — `/resources/official-texts/[documentId]/`

**Files:**
- Create: `apps/web/app/(site)/resources/official-texts/[documentId]/page.tsx`

**Step 1: Create the document page**

This is a server component that loads data at build time and passes it to the client `DocumentReader`.

```typescript
// apps/web/app/(site)/resources/official-texts/[documentId]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  loadDocument,
  loadAllDocuments,
  getDocumentIds,
  countSections,
} from '@/lib/official-texts/utils';
import {
  client,
  annotationsByDocumentQuery,
  resourcesByDocumentQuery,
  casesByDocumentQuery,
} from '@/lib/sanity';
import type {
  Annotation,
  SectionResource,
  CaseReference,
} from '@/data/official-texts/types';
import { DocumentReader } from '../components/DocumentReader';

interface PageProps {
  params: Promise<{ documentId: string }>;
}

export async function generateStaticParams() {
  return getDocumentIds().map((id) => ({ documentId: id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { documentId } = await params;
  const doc = await loadDocument(documentId);
  if (!doc) return {};

  return generatePageMetadata({
    title: `${doc.shortTitle} — Full Text`,
    description: `Read the full text of ${doc.title}. Searchable, with defined term explanations, curated resources, and case law references.`,
    path: `/resources/official-texts/${documentId}`,
    keywords: [
      doc.shortTitle,
      'full text',
      'bare act',
      'DPDP',
      'data protection India',
    ],
  });
}

async function fetchSanityData(documentId: string) {
  try {
    const [annotations, resources, cases] = await Promise.all([
      client.fetch<Annotation[]>(annotationsByDocumentQuery, { documentId }),
      client.fetch<SectionResource[]>(resourcesByDocumentQuery, { documentId }),
      client.fetch<CaseReference[]>(casesByDocumentQuery, { documentId }),
    ]);
    return {
      annotations: annotations || [],
      resources: resources || [],
      cases: cases || [],
    };
  } catch {
    return { annotations: [], resources: [], cases: [] };
  }
}

export default async function OfficialTextPage({ params }: PageProps) {
  const { documentId } = await params;
  const doc = await loadDocument(documentId);
  if (!doc) notFound();

  const allDocuments = await loadAllDocuments();
  const { annotations, resources, cases } = await fetchSanityData(documentId);

  return (
    <>
      <Section background="white">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Official Texts', href: '/resources/official-texts' },
              {
                name: doc.shortTitle,
                href: `/resources/official-texts/${doc.id}`,
              },
            ]}
          />

          <div className="mt-8 mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Official Text
                </div>
                <div className="h-px w-24 bg-accent-600 mx-auto"></div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-950 mb-4 leading-tight">
                {doc.title}
              </h1>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600 font-serif mb-4">
                <span>{doc.gazetteNumber}</span>
                <span>Enacted: {doc.dateEnacted}</span>
              </div>

              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                  {countSections(doc)} Sections
                </span>
                <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                  {doc.schedules.length} Schedules
                </span>
                <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold">
                  {doc.definitions.length} Defined Terms
                </span>
              </div>
            </div>
          </div>

          <DocumentReader
            document={doc}
            allDocuments={allDocuments}
            annotations={annotations}
            resources={resources}
            cases={cases}
          />
        </Container>
      </Section>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add apps/web/app/\(site\)/resources/official-texts/\[documentId\]/page.tsx
git commit -m "feat(official-texts): add document page with static generation"
```

---

## Task 15: SEO — Sitemap & JSON-LD

**Files:**
- Modify: `apps/web/public/sitemap.xml` (add new URLs)
- Modify: `apps/web/components/seo/JsonLd.tsx` (add LegislationJsonLd if desired — optional)

**Step 1: Update sitemap**

Add these URLs to `apps/web/public/sitemap.xml` (inside the `<urlset>`):

```xml
<url>
  <loc>https://cadp.in/resources/official-texts/</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://cadp.in/resources/official-texts/dpdp-act-2023/</loc>
  <changefreq>yearly</changefreq>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://cadp.in/resources/official-texts/dpdp-rules-2025/</loc>
  <changefreq>yearly</changefreq>
  <priority>0.9</priority>
</url>
```

**Step 2: Commit**

```bash
git add apps/web/public/sitemap.xml
git commit -m "feat(seo): add official texts pages to sitemap"
```

---

## Task 16: Build Verification & Polish

**Step 1: Run full build**

Run: `cd apps/web && pnpm build 2>&1 | tail -40`

Expected: Build succeeds. Pages `/resources/official-texts/`, `/resources/official-texts/dpdp-act-2023/`, and `/resources/official-texts/dpdp-rules-2025/` appear in the output.

**Step 2: Fix any build errors**

Address TypeScript errors, missing imports, or static generation issues. Common things to check:
- `import` paths for JSON files may need `assert { type: 'json' }` or the dynamic import pattern in `loadDocument`
- Ensure `generateStaticParams` returns the correct format
- Check that Sanity queries don't error when no documents exist yet (fallback to empty arrays)

**Step 3: Test locally**

Run: `cd apps/web && pnpm dev`

Navigate to:
- `http://localhost:3000/resources/official-texts/` — verify index page loads with both document cards
- `http://localhost:3000/resources/official-texts/dpdp-act-2023/` — verify Act page loads with TOC, sections, search
- `http://localhost:3000/resources/official-texts/dpdp-rules-2025/` — verify Rules page loads
- Test search with queries like "Data Fiduciary", "consent", "breach notification"
- Click a defined term — verify side panel opens with definition
- Test hash navigation: `http://localhost:3000/resources/official-texts/dpdp-act-2023/#section-7`
- Test copy link button
- Test keyboard: `/` focuses search, `Escape` closes

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix(official-texts): address build and integration issues"
```

---

## Task Dependency Order

```
Task 1  (types)
  |
  ├── Task 2  (Act JSON)      ── independent
  ├── Task 3  (Rules JSON)    ── independent
  └── Task 4  (Sanity schemas) ── independent
        |
        Task 5  (Sanity queries)
  |
  Task 6  (utilities)
  |
  Task 7  (index page + nav)
  |
  ├── Task 8  (side panel)       ── independent
  ├── Task 9  (TOC)              ── independent
  └── Task 10 (heading/term/copy) ── independent
  |
  Task 11 (section renderer)     ── depends on 8, 10
  Task 12 (search)               ── independent of 8-11
  |
  Task 13 (DocumentReader)       ── depends on 8, 9, 10, 11, 12
  Task 14 (document page)        ── depends on 13
  Task 15 (SEO)                  ── independent
  Task 16 (build verification)   ── depends on all
```

**Parallelizable groups:**
- After Task 1: Tasks 2, 3, 4 can run in parallel
- After Task 6: Tasks 7, 8, 9, 10, 12 can run in parallel
- Tasks 15 can run anytime
