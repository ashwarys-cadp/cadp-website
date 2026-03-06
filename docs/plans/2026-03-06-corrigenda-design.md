# Corrigenda Support for Official Texts — Design Document

**Date:** 2026-03-06
**Status:** Approved

## Overview

When a corrigendum is published to the DPDP Act or Rules, the JSON source files in `data/official-texts/` must be updated to reflect the corrected text. This design adds structured metadata to track what changed and surfaces it in the UI so readers see corrected text by default while being able to inspect the change history.

## Goals

1. **Corrected text by default** — the `text` field always holds the current, corrected version
2. **Transparency** — readers can see that corrections were made, at both document and section level
3. **Auditability** — each correction is recorded with gazette reference, date, and a prose summary
4. **Consistency** — follows the existing side panel pattern (resources, case law) for section-level metadata
5. **Safe authoring** — an LLM reference doc ensures corrigenda are applied with full human oversight

## Non-Goals

- Word-level diff or redline view
- Storing original/previous text snapshots
- Sanity CMS integration for corrigenda (data lives in JSON alongside the legislative text)
- Automated detection of which section a corrigendum targets

---

## Data Model Changes

### `LegalDocument` — new top-level field

```typescript
corrigenda: Array<{
  id: string;                // "corrigendum-2026-03-01"
  gazetteNumber: string;     // "S.O. 1234(E)"
  date: string;              // "2026-03-01"
  description: string;       // "Corrigendum to the DPDP Rules, 2025"
  affectedSections: string[];// ["rule-5", "rule-12", "schedule-3"]
}>
```

### `Section` and `Schedule` — new optional field

```typescript
amendments?: Array<{
  corrigendumId: string;     // references corrigenda[].id
  summary: string;           // Gazette-style: "For 'thirty days', read 'sixty days' in sub-rule (2)"
}>
```

### Types file update (`data/official-texts/types.ts`)

```typescript
export interface Corrigendum {
  id: string;
  gazetteNumber: string;
  date: string;
  description: string;
  affectedSections: string[];
}

export interface SectionAmendment {
  corrigendumId: string;
  summary: string;
}
```

Add `corrigenda: Corrigendum[]` to `LegalDocument`, and `amendments?: SectionAmendment[]` to both `Section` and `Schedule`.

### JSON files

Both `dpdp-act-2023.json` and `dpdp-rules-2025.json` get an empty `"corrigenda": []` array at the top level. Sections and schedules gain no new fields until a corrigendum is actually applied.

---

## UI: Document-Level Banner

A notice block rendered **between the preamble and Chapter I**. Only appears if `corrigenda.length > 0`.

### Content

- Heading: "Corrections Incorporated"
- For each corrigendum: gazette number, date, description
- Below each: clickable list of affected section numbers that scroll to the relevant section

### Visual treatment

- Subtle, not an alert — light `neutral-50` background with `neutral-300` left border
- Small text, `font-serif` to match the document aesthetic
- Collapsed by default if more than 2 corrigenda, with "Show all" toggle

### Placement

After preamble, before Chapter I. It is metadata about the document, not part of the legislative text.

---

## UI: Section-Level Indicators

### Section heading icon

- New icon on section headings alongside existing resources (link) and case law (scale) icons
- Icon: Lucide `History` in `neutral-500`
- Count badge showing number of amendments
- Tooltip: "1 correction applied"
- Only appears on sections that have `amendments` entries

### Side panel mode

New variant added to the `PanelMode` discriminated union:

```typescript
| { type: "amendments"; sectionId: string; amendments: SectionAmendment[]; corrigenda: Corrigendum[] }
```

### Side panel content (`AmendmentsContent.tsx`)

- Section reference at top (e.g., "Rule 5 — Registration")
- For each amendment:
  - Corrigendum badge: gazette number + date (looked up from `corrigenda[]` via `corrigendumId`)
  - Summary text in serif italic (mirrors how corrigenda read in the Gazette)
- Sorted by date descending (most recent first)

Follows the same pattern as `ResourcesContent` and `CaseLawContent` — independent content component, triggered by section heading icon, data passed through props.

---

## File Changes

### New files

```
app/(site)/resources/official-texts/components/sidepanel/AmendmentsContent.tsx
docs/guides/applying-corrigendum.md
```

### Modified files

```
data/official-texts/types.ts              — add Corrigendum, SectionAmendment interfaces;
                                            add fields to LegalDocument, Section, Schedule
data/official-texts/dpdp-act-2023.json    — add empty corrigenda array
data/official-texts/dpdp-rules-2025.json  — add empty corrigenda array
app/(site)/resources/official-texts/
  [documentId]/page.tsx                   — render corrigenda banner
  components/DocumentReader.tsx           — pass amendments data, add handler
  components/SectionHeading.tsx           — add amendments icon + count prop
  components/SidePanel.tsx                — add amendments case to mode switch
```

### No changes to

- Sanity schemas
- Search index
- Routes
- Other components

---

## LLM Reference Document

A file at `docs/guides/applying-corrigendum.md` that serves as a step-by-step playbook for an LLM session given a corrigendum PDF.

### Key principles

- **The LLM takes absolutely no liberties.** Every single change requires explicit human confirmation before being applied.
- The LLM is a scribe, not a decision-maker. It reads the corrigendum, presents each instruction to the user, and waits for confirmation at every step.

### Process per corrigendum instruction

1. LLM reads the corrigendum PDF and extracts each substitution instruction
2. For each instruction, LLM asks the user: "Which section/clause does this refer to: [quoted instruction]?"
3. User identifies the target section
4. LLM locates the text in the JSON and presents the current text to the user
5. LLM proposes the replacement and shows a before/after diff
6. User confirms the replacement is correct
7. LLM applies the change to `text` and adds the `amendments` entry
8. After all instructions are processed, LLM presents the complete diff for final review
9. User confirms before commit

### What the reference doc contains

1. Purpose and when to use it
2. JSON structure reference with exact field shapes and examples
3. Step-by-step process (as above)
4. Hard rule: never guess the target section, never apply a change without confirmation
5. Conventions: id format (`corrigendum-YYYY-MM-DD`), summary style (use Gazette phrasing), HTML formatting rules
6. Complete before/after example of a hypothetical corrigendum applied to one section
7. Verification checklist
