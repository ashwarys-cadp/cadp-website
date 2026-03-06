# Adding a New Official Text (LLM Guide)

This guide is for an LLM (Claude, etc.) given a PDF of an official notification, amendment, or new legislation to process into the CADP official texts system.

---

## Overview

The official texts system renders verbatim legislative text at `/resources/official-texts/[documentId]/`. Each document is a local JSON file that conforms to the `LegalDocument` TypeScript interface. Adding a new document requires:

1. Creating a structured JSON file from the PDF
2. Registering the document ID
3. Adding a sitemap entry

No component or layout code changes are needed — the existing pages render any document that follows the schema.

---

## Step 1: Read the PDF and Understand its Structure

Before writing any JSON, read the full PDF and identify:

- **Document type**: `"act"`, `"rules"`, or `"notification"`
- **Full title**: as it appears in the gazette header
- **Short title**: concise label for UI (e.g., "DPDP Act 2023", "DPDP Rules 2025")
- **Gazette number**: e.g., "Act No. 22 of 2023", "G.S.R. 47(E)"
- **Date enacted / published**: the gazette date
- **Date effective**: when it comes into force (may differ from publication date; use publication date if unclear)
- **Preamble**: the introductory statement before numbered sections (if any)
- **Chapters**: numbered groupings (I, II, III... or 1, 2, 3...)
- **Sections / Rules / Paragraphs**: the numbered provisions within chapters
- **Schedules / Annexures**: appended tables, forms, or lists
- **Definitions section**: usually Section 2 or Rule 2 — terms defined for the document

### Notifications without chapters

Many government notifications don't have chapters — they're a flat list of numbered paragraphs. In this case, use a single chapter with an empty number and a generic title:

```json
{
  "chapters": [
    {
      "id": "chapter-1",
      "number": "",
      "title": "Notification",
      "sections": [ ... ]
    }
  ]
}
```

When `chapter.number` is empty, the UI skips the chapter heading and renders sections directly.

---

## Step 2: Choose a Document ID

The ID must be a URL-safe slug. Convention: `{shortname}-{year}`.

Examples:
- `dpdp-act-2023`
- `dpdp-rules-2025`
- `dpdp-notification-sdf-2025` (for a notification about Significant Data Fiduciaries)
- `dpdp-amendment-2026`

---

## Step 3: Create the JSON File

Create: `apps/web/data/official-texts/{document-id}.json`

### Schema Reference

```typescript
interface LegalDocument {
  id: string;              // Must match filename (without .json)
  title: string;           // Full gazette title
  shortTitle: string;      // Short label for UI
  type: "act" | "rules" | "notification";
  gazetteNumber: string;   // Gazette reference
  dateEnacted: string;     // ISO date: "2025-01-03"
  dateEffective: string;   // ISO date
  preamble?: string;       // Plain text, no HTML
  chapters: Chapter[];
  schedules: Schedule[];
  definitions: TermDefinition[];
  corrigenda: Corrigendum[];   // Always include — use [] if none
}

interface Corrigendum {
  id: string;              // "corrigendum-1", "corrigendum-2", ...
  gazetteNumber: string;   // e.g., "G.S.R. 892(E)"
  date: string;            // ISO date of the corrigendum gazette
  description: string;     // Brief description of the correction
  affectedSections: string[]; // IDs of sections corrected
}

interface Chapter {
  id: string;              // "chapter-1", "chapter-2", ...
  number: string;          // "I", "II", "1", "2", or "" for flat docs
  title: string;           // Chapter title
  sections: Section[];
}

interface Section {
  id: string;              // "section-1", "rule-1", "para-1", etc.
  number: string;          // "1", "2", "3", ...
  title: string;           // Section/rule title
  text: string;            // HTML content (see formatting rules below)
  effectiveDate?: string;  // ISO date, if section has a specific commencement date
  tags: string[];          // Lowercase kebab-case topic tags
}

interface Schedule {
  id: string;              // "schedule-1", "schedule-2", ...
  number: string;          // "1", "2", "I", "II", ...
  title: string;           // Schedule title
  text: string;            // HTML content
  tags: string[];
}

interface TermDefinition {
  term: string;            // The defined term, exactly as it appears
  clause: string;          // Clause letter/number: "a", "b", ..., "za", "1", etc.
  legalDefinition: string; // Full verbatim definition text (plain text, no HTML)
  plainLanguage?: string;  // Optional plain-language explanation
  sourceSection: string;   // ID of the section containing definitions (e.g., "section-2")
  relatedSections: string[]; // IDs of sections where this term appears prominently
}
```

### Section ID Conventions

Use a prefix that matches the document type:

| Document type | Section ID format | Example |
|---|---|---|
| Act | `section-{number}` | `section-7`, `section-44` |
| Rules | `rule-{number}` | `rule-3`, `rule-23` |
| Notification | `para-{number}` | `para-1`, `para-5` |

This prefix matters because the sidebar uses it to determine source document labels and clause references.

### HTML Formatting Rules

Section `text` fields contain HTML. Follow these patterns exactly:

**Paragraphs** — wrap each sub-section in `<p>`:
```html
<p>(<strong>1</strong>) The Data Fiduciary shall...</p>
<p>(<strong>2</strong>) Where personal data...</p>
```

**Ordered lists** — use `<ol>` with `type` attribute:
```html
<ol type="a">
  <li>the purpose of processing;</li>
  <li>the nature of personal data;</li>
</ol>
```

- `type="a"` for (a), (b), (c)...
- `type="i"` for (i), (ii), (iii)...
- No `type` attribute for (1), (2), (3)...

**Nested lists** — embed `<ol>` inside `<li>`:
```html
<ol type="a">
  <li>"gain" means—
    <ol type="i">
      <li>a gain in property; or</li>
      <li>an opportunity to earn;</li>
    </ol>
  </li>
</ol>
```

**Provisos** — use a div with class `proviso`:
```html
<div class="proviso">Provided that the Central Government may...</div>
```

**Explanations** — use a div with class `explanation`:
```html
<div class="explanation">Explanation.— For the purposes of this section...</div>
```

**Tables** — standard HTML table:
```html
<table>
  <thead><tr><th>Column 1</th><th>Column 2</th></tr></thead>
  <tbody><tr><td>Value 1</td><td>Value 2</td></tr></tbody>
</table>
```

### CRITICAL: Text Accuracy

- Copy legislative text **verbatim**. Do not paraphrase, summarize, or reword.
- Preserve every sub-clause, proviso, and explanation exactly as written.
- Maintain the original numbering scheme. Do not renumber.
- If the PDF has OCR errors, flag them with a comment in the JSON but preserve the original text.

---

## Step 4: Register the Document ID

Edit: `apps/web/lib/official-texts/utils.ts`

Add the new ID to the `getDocumentIds()` array:

```typescript
export function getDocumentIds(): string[] {
  return ['dpdp-act-2023', 'dpdp-rules-2025', 'your-new-document-id'];
}
```

This is the only code change needed. The dynamic import in `loadDocument()` will resolve the new JSON file automatically.

### Index page grouping

The index page at `/resources/official-texts/` automatically groups documents into two tables:

- **Legislation** — documents with `type` of `"act"` or `"rules"`
- **Notifications & Orders** — everything else (`"notification"`, etc.)

No code changes are needed — the grouping is driven by the document's `type` field.

---

## Step 5: Add Sitemap Entry

Edit: `apps/web/app/sitemap.ts`

Add a new entry to the `officialTextsPages` array (around line 73):

```typescript
{
  url: `${BASE_URL}/resources/official-texts/your-new-document-id/`,
  lastModified: new Date('2025-01-03'),  // gazette date
  changeFrequency: 'yearly',
  priority: 0.9,
},
```

---

## Step 6: Verify

Run from repo root:

```bash
cd apps/web && pnpm build
```

Check:
- Build succeeds with no TypeScript errors
- The new document page appears in the build output route list
- The index page at `/resources/official-texts/` lists the new document

---

## Handling Specific Document Types

### Amendments

An amendment modifies an existing act or rules. Two approaches:

**A. Standalone amendment document** (preferred for significant amendments):
- Create a new JSON file (e.g., `dpdp-amendment-2026.json`)
- In each section's `text`, include the amendment text verbatim (e.g., "In section 7, for sub-section (2), the following shall be substituted...")
- Tag sections with the section numbers they amend: `["amends-section-7", "amends-section-12"]`

**B. Update the original document** (for minor corrections/errata):
- Edit the existing JSON file directly
- Update the `dateEffective` on affected sections
- Add a note in the preamble about the amendment

### Notifications under the Act

Government notifications (e.g., notifying Significant Data Fiduciaries, appointing effective dates) are typically short. These often have no chapters and few sections:

```json
{
  "id": "dpdp-notification-sdf-2025",
  "title": "Notification Regarding Significant Data Fiduciaries under DPDP Act, 2023",
  "shortTitle": "SDF Notification 2025",
  "type": "notification",
  "gazetteNumber": "S.O. 1234(E)",
  "dateEnacted": "2025-06-15",
  "dateEffective": "2025-06-15",
  "chapters": [
    {
      "id": "chapter-1",
      "number": "",
      "title": "Notification",
      "sections": [
        {
          "id": "para-1",
          "number": "1",
          "title": "Notification of Significant Data Fiduciaries",
          "text": "<p>In exercise of powers conferred by section 10...</p>",
          "tags": ["significant-data-fiduciary", "section-10"]
        }
      ]
    }
  ],
  "schedules": [],
  "definitions": []
}
```

### Documents with Shared Definitions

The DPDP Act's definitions (Section 2) automatically apply to all Rules and Notifications under the Act. The system already handles this — `DocumentReader` merges definitions from **all** loaded documents. If the new document defines additional terms, add them to its `definitions` array. They will appear alongside Act definitions when viewing any document.

If the new document's definitions overlap with existing ones (same term, different meaning), add them anyway — the system uses the definition from the document where the term was matched.

---

## Checklist

Before committing, verify:

- [ ] JSON file created at `apps/web/data/official-texts/{id}.json`
- [ ] `id` field matches the filename
- [ ] `type` is one of `"act"`, `"rules"`, `"notification"`
- [ ] All section text is verbatim from the gazette — no paraphrasing
- [ ] HTML uses correct tags: `<p>`, `<ol type="a">`, `<li>`, `<table>`, `.proviso`, `.explanation`
- [ ] Definitions include `clause` field with the correct letter/number
- [ ] `corrigenda` field is present (use `[]` if no corrections apply)
- [ ] Section IDs use correct prefix (`section-`, `rule-`, `para-`)
- [ ] Document ID added to `getDocumentIds()` in `utils.ts`
- [ ] Sitemap entry added in `sitemap.ts`
- [ ] `pnpm build` succeeds from `apps/web`
