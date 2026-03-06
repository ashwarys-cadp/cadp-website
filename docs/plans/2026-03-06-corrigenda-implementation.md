# Corrigenda Support Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add corrigenda tracking and display to the official texts reader so corrections to acts/rules are transparent to readers.

**Architecture:** Add `corrigenda[]` and `amendments[]` fields to the local JSON data model. New `AmendmentsContent` side panel mode follows the existing pattern (resources, case law). A document-level banner shows between preamble and Chapter I. A separate LLM reference doc (`docs/guides/applying-corrigendum.md`) guides future sessions through safe corrigendum application.

**Tech Stack:** TypeScript, React, Next.js (static export), Tailwind CSS v4, Lucide icons

---

### Task 1: Update TypeScript types

**Files:**
- Modify: `apps/web/data/official-texts/types.ts:3-15` (LegalDocument), `:24-31` (Section), `:33-39` (Schedule), `:87-91` (PanelMode)

**Step 1: Add Corrigendum and SectionAmendment interfaces**

After the existing `TocItem` interface (line 110), add:

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

**Step 2: Add fields to existing interfaces**

Add `corrigenda: Corrigendum[]` to `LegalDocument` (after `definitions`):

```typescript
export interface LegalDocument {
  // ... existing fields ...
  definitions: TermDefinition[];
  corrigenda: Corrigendum[];
}
```

Add `amendments?: SectionAmendment[]` to both `Section` and `Schedule`:

```typescript
export interface Section {
  // ... existing fields ...
  tags: string[];
  amendments?: SectionAmendment[];
}

export interface Schedule {
  // ... existing fields ...
  tags: string[];
  amendments?: SectionAmendment[];
}
```

**Step 3: Add amendments variant to PanelMode union**

```typescript
export type PanelMode =
  | { type: "definition"; term: TermDefinition }
  | { type: "annotation"; annotation: Annotation }
  | { type: "resources"; sectionId: string; resources: SectionResource[] }
  | { type: "caselaw"; sectionId: string; cases: CaseReference[] }
  | { type: "amendments"; sectionId: string; amendments: SectionAmendment[]; corrigenda: Corrigendum[] };
```

**Step 4: Commit**

```bash
git add apps/web/data/official-texts/types.ts
git commit -m "feat(official-texts): add Corrigendum and SectionAmendment types"
```

---

### Task 2: Add empty corrigenda to JSON data files

**Files:**
- Modify: `apps/web/data/official-texts/dpdp-act-2023.json`
- Modify: `apps/web/data/official-texts/dpdp-rules-2025.json`

**Step 1: Add corrigenda array to both JSON files**

In each file, add `"corrigenda": []` as the last top-level field (after `"definitions"`):

```json
{
  "id": "dpdp-act-2023",
  "title": "...",
  ...
  "definitions": [ ... ],
  "corrigenda": []
}
```

Do the same for `dpdp-rules-2025.json`.

**Step 2: Commit**

```bash
git add apps/web/data/official-texts/dpdp-act-2023.json apps/web/data/official-texts/dpdp-rules-2025.json
git commit -m "feat(official-texts): add empty corrigenda arrays to data files"
```

---

### Task 3: Create AmendmentsContent side panel component

**Files:**
- Create: `apps/web/app/(site)/resources/official-texts/components/sidepanel/AmendmentsContent.tsx`

**Step 1: Create the component**

Follow the exact same structure as `CaseLawContent.tsx` and `ResourcesContent.tsx`. Reference those files for styling patterns.

```tsx
import { History } from 'lucide-react';
import type { SectionAmendment, Corrigendum } from '@/data/official-texts/types';
import { formatDate } from '@/lib/utils';

export function AmendmentsContent({
  sectionId,
  amendments,
  corrigenda,
}: {
  sectionId: string;
  amendments: SectionAmendment[];
  corrigenda: Corrigendum[];
}) {
  // Sort by corrigendum date descending
  const sorted = [...amendments].sort((a, b) => {
    const dateA = corrigenda.find((c) => c.id === a.corrigendumId)?.date ?? '';
    const dateB = corrigenda.find((c) => c.id === b.corrigendumId)?.date ?? '';
    return dateB.localeCompare(dateA);
  });

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-neutral-600 font-semibold mb-3">
        Corrections Applied
      </div>
      <div className="text-sm text-neutral-500 font-serif mb-6">
        {sectionId
          .replace('section-', 'Section ')
          .replace('rule-', 'Rule ')
          .replace('chapter-', 'Chapter ')
          .replace('schedule-', 'Schedule ')}
      </div>
      <div className="space-y-4">
        {sorted.map((amendment, index) => {
          const corrigendum = corrigenda.find(
            (c) => c.id === amendment.corrigendumId
          );
          return (
            <div
              key={`${amendment.corrigendumId}-${index}`}
              className="border-2 border-neutral-200 p-4 hover:border-neutral-400 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <History className="w-4 h-4 text-neutral-500" strokeWidth={1.5} />
                {corrigendum && (
                  <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold">
                    {corrigendum.gazetteNumber}
                  </span>
                )}
              </div>
              {corrigendum && (
                <div className="text-sm text-neutral-500 font-serif mb-2">
                  {formatDate(corrigendum.date)}
                </div>
              )}
              <p className="text-sm text-neutral-700 font-serif leading-relaxed italic">
                {amendment.summary}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add apps/web/app/(site)/resources/official-texts/components/sidepanel/AmendmentsContent.tsx
git commit -m "feat(official-texts): add AmendmentsContent side panel component"
```

---

### Task 4: Wire amendments into SidePanel

**Files:**
- Modify: `apps/web/app/(site)/resources/official-texts/components/SidePanel.tsx:7-10` (imports), `:25-36` (switch)

**Step 1: Add import**

After the `CaseLawContent` import (line 10), add:

```typescript
import { AmendmentsContent } from './sidepanel/AmendmentsContent';
```

**Step 2: Add case to PanelContent switch**

In the `PanelContent` function's switch statement (after the `caselaw` case, around line 33), add:

```typescript
case 'amendments':
  return (
    <AmendmentsContent
      sectionId={mode.sectionId}
      amendments={mode.amendments}
      corrigenda={mode.corrigenda}
    />
  );
```

**Step 3: Commit**

```bash
git add apps/web/app/(site)/resources/official-texts/components/SidePanel.tsx
git commit -m "feat(official-texts): wire amendments mode into SidePanel"
```

---

### Task 5: Add amendments icon to SectionHeading

**Files:**
- Modify: `apps/web/app/(site)/resources/official-texts/components/SectionHeading.tsx`

**Step 1: Add props**

Add to `SectionHeadingProps` (after `onCasesClick`):

```typescript
amendmentCount: number;
onAmendmentsClick: () => void;
```

Add the new props to the destructured parameters.

**Step 2: Add the amendments button**

After the cases button (after line 69), add:

```tsx
{amendmentCount > 0 && (
  <button
    onClick={onAmendmentsClick}
    className="text-sm font-serif font-semibold text-neutral-500 hover:text-neutral-700 hover:underline transition-colors cursor-pointer"
  >
    [{amendmentCount} Correction{amendmentCount > 1 ? 's' : ''}]
  </button>
)}
```

Also update the separator condition (line 50) to include `amendmentCount`:

```tsx
{(resourceCount > 0 || caseCount > 0 || amendmentCount > 0) && (
  <span className="text-neutral-300 select-none">|</span>
)}
```

**Step 3: Commit**

```bash
git add apps/web/app/(site)/resources/official-texts/components/SectionHeading.tsx
git commit -m "feat(official-texts): add corrections count to SectionHeading"
```

---

### Task 6: Wire amendments into DocumentReader

**Files:**
- Modify: `apps/web/app/(site)/resources/official-texts/components/DocumentReader.tsx`

**Step 1: Add helper function**

After `getCasesForSection` (around line 63), add:

```typescript
function getAmendmentsForSection(sectionId: string): SectionAmendment[] {
  // Find the section or schedule in the document and return its amendments
  for (const chapter of doc.chapters) {
    for (const section of chapter.sections) {
      if (section.id === sectionId) return section.amendments ?? [];
    }
  }
  for (const schedule of doc.schedules) {
    if (schedule.id === sectionId) return schedule.amendments ?? [];
  }
  return [];
}
```

Import `SectionAmendment` from the types file (add to the existing import on line 5):

```typescript
import type {
  LegalDocument,
  Annotation,
  SectionResource,
  CaseReference,
  PanelMode,
  MergedTerm,
  SectionAmendment,
} from '@/data/official-texts/types';
```

**Step 2: Add handler function**

After `handleCasesClick` (around line 89), add:

```typescript
function handleAmendmentsClick(sectionId: string) {
  const sectionAmendments = getAmendmentsForSection(sectionId);
  setPanelMode({
    type: 'amendments',
    sectionId,
    amendments: sectionAmendments,
    corrigenda: doc.corrigenda,
  });
}
```

**Step 3: Pass props to SectionHeading for chapters**

In the chapter heading `SectionHeading` (around line 142-159), add the new props:

```tsx
<SectionHeading
  id={chapter.id}
  number={chapter.number}
  title={chapter.title}
  level="chapter"
  resourceCount={resources.filter((r) => r.targetChapter === chapter.id).length}
  caseCount={cases.filter((c) => c.targetChapter === chapter.id).length}
  amendmentCount={0}
  onResourcesClick={() => handleResourcesClick(chapter.id, chapter.id)}
  onCasesClick={() => handleCasesClick(chapter.id, chapter.id)}
  onAmendmentsClick={() => {}}
/>
```

Note: Chapters themselves don't have amendments — only sections do. Pass `0` and a no-op.

**Step 4: Pass props to SectionHeading for sections**

In the section `SectionHeading` (around line 180-193), add:

```tsx
amendmentCount={(section.amendments ?? []).length}
onAmendmentsClick={() => handleAmendmentsClick(section.id)}
```

**Step 5: Pass props to SectionHeading for schedules**

In the schedule `SectionHeading` (around line 246-259), add:

```tsx
amendmentCount={(schedule.amendments ?? []).length}
onAmendmentsClick={() => handleAmendmentsClick(schedule.id)}
```

**Step 6: Commit**

```bash
git add apps/web/app/(site)/resources/official-texts/components/DocumentReader.tsx
git commit -m "feat(official-texts): wire amendments into DocumentReader"
```

---

### Task 7: Add corrigenda banner to document page

**Files:**
- Modify: `apps/web/app/(site)/resources/official-texts/[documentId]/page.tsx`

**Step 1: Add the CorrigendaBanner component**

Since this is the only place it's used, define it in the same file. Add above the `OfficialTextPage` component:

```tsx
import { formatDate } from '@/lib/utils';
import type { Corrigendum } from '@/data/official-texts/types';

function CorrigendaBanner({ corrigenda }: { corrigenda: Corrigendum[] }) {
  if (corrigenda.length === 0) return null;

  return (
    <div className="mb-12 border-l-4 border-neutral-300 bg-neutral-50 p-6">
      <div className="text-xs uppercase tracking-[0.2em] text-neutral-600 font-semibold mb-3">
        Corrections Incorporated
      </div>
      <div className="space-y-3">
        {corrigenda.map((c) => (
          <div key={c.id}>
            <div className="text-sm font-serif text-neutral-700">
              <span className="font-semibold">{c.description}</span>
              {' — '}
              {c.gazetteNumber}, {formatDate(c.date)}
            </div>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {c.affectedSections.map((sectionId) => (
                <a
                  key={sectionId}
                  href={`#${sectionId}`}
                  className="text-xs font-serif font-semibold text-primary-700 hover:text-primary-900 hover:underline"
                >
                  {sectionId
                    .replace('section-', 'Section ')
                    .replace('rule-', 'Rule ')
                    .replace('schedule-', 'Schedule ')}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

Note: `formatDate` is already imported on line 7. `Corrigendum` type needs to be added to imports.

**Step 2: Render the banner**

In the `OfficialTextPage` component, place `<CorrigendaBanner>` after the preamble-area `<div>` and before `<DocumentReader>` (between the closing `</div>` of the header block around line 159 and line 162):

```tsx
<CorrigendaBanner corrigenda={doc.corrigenda} />

<DocumentReader
  document={doc}
  ...
```

**Step 3: Commit**

```bash
git add apps/web/app/(site)/resources/official-texts/[documentId]/page.tsx
git commit -m "feat(official-texts): add corrigenda banner to document page"
```

---

### Task 8: Build verification

**Step 1: Run the build**

```bash
cd /Users/ashwary/Documents/Code/cadp && pnpm build
```

Expected: Build succeeds with no TypeScript errors. The official texts pages render correctly.

**Step 2: Visual check (optional)**

```bash
cd apps/web && pnpm dev
```

Visit `http://localhost:3000/resources/official-texts/dpdp-act-2023` — page should render normally (no corrigenda banner since `corrigenda` is empty, no amendment icons on any sections).

**Step 3: Commit if any build fixes were needed**

---

### Task 9: Write LLM reference doc for applying corrigenda

**Files:**
- Create: `docs/guides/applying-corrigendum.md`

**Step 1: Write the reference document**

```markdown
# Applying a Corrigendum to Official Texts (LLM Guide)

This guide is for an LLM (Claude, etc.) given a PDF of a corrigendum to apply to the CADP official texts system.

---

## CRITICAL RULES

**You take absolutely no liberties when applying corrigenda. Every single change requires explicit human confirmation before being applied. You are a scribe, not a decision-maker.**

- NEVER guess which section a corrigendum instruction refers to
- NEVER apply a text change without showing the user a before/after and getting confirmation
- NEVER assume a word match is the right one — always ask the user
- NEVER commit changes without a final full-diff review by the user

---

## Overview

A corrigendum is an official correction published in the Gazette of India. It lists substitutions to be made in a previously published act or rules. Corrigenda often reference page and line numbers in the Gazette PDF, which do NOT correspond to section numbers in our JSON files.

Your job is to:
1. Read the corrigendum PDF
2. Extract each substitution instruction
3. Ask the user to identify the target section for EACH instruction
4. Apply the changes with user confirmation at every step
5. Record metadata so the UI can display what was changed

---

## JSON Structure Reference

### Document-level: `corrigenda` array

Located at the top level of each JSON file in `apps/web/data/official-texts/`.

```json
{
  "corrigenda": [
    {
      "id": "corrigendum-2026-03-01",
      "gazetteNumber": "S.O. 1234(E)",
      "date": "2026-03-01",
      "description": "Corrigendum to the DPDP Rules, 2025",
      "affectedSections": ["rule-5", "rule-12"]
    }
  ]
}
```

| Field | Format | Example |
|---|---|---|
| `id` | `corrigendum-YYYY-MM-DD` (add `-2` suffix if multiple on same date) | `corrigendum-2026-03-01` |
| `gazetteNumber` | Exact gazette reference from the corrigendum | `S.O. 1234(E)` |
| `date` | ISO date of publication | `2026-03-01` |
| `description` | Title as it appears in the corrigendum | `Corrigendum to the DPDP Rules, 2025` |
| `affectedSections` | Array of section IDs that were corrected | `["rule-5", "rule-12"]` |

### Section-level: `amendments` array

Added to each affected `Section` or `Schedule` object in the JSON.

```json
{
  "id": "rule-5",
  "number": "5",
  "title": "Registration of Consent Manager",
  "text": "<p>... corrected text ...</p>",
  "tags": ["consent-manager"],
  "amendments": [
    {
      "corrigendumId": "corrigendum-2026-03-01",
      "summary": "For 'thirty days', read 'sixty days' in sub-rule (2)"
    }
  ]
}
```

| Field | Format | Example |
|---|---|---|
| `corrigendumId` | Must match an `id` in the `corrigenda` array | `corrigendum-2026-03-01` |
| `summary` | Use Gazette phrasing exactly (e.g., "For 'X', read 'Y'") | `For 'thirty days', read 'sixty days' in sub-rule (2)` |

---

## Step-by-Step Process

### Step 1: Read the corrigendum PDF

Read the full PDF. Identify:
- The gazette number and date
- Which document it corrects (Act or Rules)
- The list of substitution instructions

### Step 2: Create the corrigendum metadata

Determine the JSON file to edit:
- DPDP Act: `apps/web/data/official-texts/dpdp-act-2023.json`
- DPDP Rules: `apps/web/data/official-texts/dpdp-rules-2025.json`

Tell the user: "I've read the corrigendum. It contains N substitution instructions for [document name]. I'll now ask you about each one. Let me start by adding the corrigendum metadata."

Propose the `corrigenda` entry (WITHOUT `affectedSections` yet — you'll fill this in as you identify sections):

```json
{
  "id": "corrigendum-YYYY-MM-DD",
  "gazetteNumber": "[from the PDF]",
  "date": "YYYY-MM-DD",
  "description": "[from the PDF]",
  "affectedSections": []
}
```

**Wait for user confirmation before adding this to the JSON.**

### Step 3: Process each substitution instruction

For EACH instruction in the corrigendum, follow this exact sequence:

**3a. Present the instruction to the user:**

> Which section/clause does this corrigendum instruction refer to?
>
> "[the exact text of the instruction, e.g., 'in page 24, line 22, for "of this Gazette", read "in the Official Gazette"']"

**3b. Wait for the user to identify the target section.**

The user will respond with something like "Section 7" or "Rule 12, sub-rule (3)".

**3c. Locate the section in the JSON.**

Find the section by its ID (e.g., `section-7` or `rule-12`). Read its current `text` field.

**3d. Find the text to replace.**

Search the section's `text` for the "for X" string from the corrigendum. Present the match to the user:

> Found in [section ID]. Current text contains: "...context before... **of this Gazette** ...context after..."
>
> Proposed change: replace "of this Gazette" with "in the Official Gazette"
>
> Does this look correct?

**3e. Wait for user confirmation.**

**3f. Apply the change:**
- Update the `text` field with the corrected text
- Add an `amendments` entry to the section
- Add the section ID to `affectedSections` in the corrigendum entry

### Step 4: Final review

After processing all instructions, present the complete diff to the user:

> All N substitutions have been applied. Here is the full diff:
>
> [show the complete git diff]
>
> Please review and confirm before I commit.

**Wait for user confirmation before committing.**

### Step 5: Commit

```bash
git add apps/web/data/official-texts/[file].json
git commit -m "fix(official-texts): apply corrigendum [gazette number] to [document name]"
```

---

## HTML Formatting Reminder

When editing the `text` field, preserve all HTML formatting exactly. See `docs/guides/adding-official-text.md` for the full HTML formatting reference. Key patterns:
- Sub-sections: `<p>(<strong>1</strong>) text...</p>`
- Lists: `<ol type="a"><li>...</li></ol>`
- Nested lists: `<ol>` inside `<li>`
- Provisos: `<div class="proviso">...</div>`

**Do not reformat, re-indent, or restructure any HTML that isn't part of the specific substitution.**

---

## Example

### Corrigendum instruction

> In page 29, line 44, for "Department", read "Departments"

### User identifies target

User says: "Rule 8, sub-rule (1)"

### Before (in `rule-8` text field)

```html
<p>(<strong>1</strong>) The relevant Department shall ensure compliance...</p>
```

### After

```html
<p>(<strong>1</strong>) The relevant Departments shall ensure compliance...</p>
```

### Amendment entry added to rule-8

```json
"amendments": [
  {
    "corrigendumId": "corrigendum-2026-03-01",
    "summary": "For 'Department', read 'Departments' in sub-rule (1)"
  }
]
```

---

## Checklist

Before committing, verify:

- [ ] Corrigendum entry added to `corrigenda` array with correct id, gazette number, date
- [ ] `affectedSections` lists ALL sections that were modified
- [ ] Each affected section's `text` has been updated with the corrected text
- [ ] Each affected section has an `amendments` entry with correct `corrigendumId`
- [ ] Summary text uses Gazette phrasing ("For 'X', read 'Y'")
- [ ] No HTML formatting was inadvertently changed
- [ ] The user has confirmed every single change
- [ ] The user has reviewed the complete diff
- [ ] Build succeeds: `cd apps/web && pnpm build`
```

**Step 2: Commit**

```bash
git add docs/guides/applying-corrigendum.md
git commit -m "docs: add LLM reference guide for applying corrigenda"
```

---

### Task 10: Final commit and summary

**Step 1: Run full build one more time**

```bash
cd /Users/ashwary/Documents/Code/cadp && pnpm build
```

Expected: Clean build, no errors.

**Step 2: Verify git log**

```bash
git log --oneline -10
```

Expected commits (newest first):
- `docs: add LLM reference guide for applying corrigenda`
- `feat(official-texts): add corrigenda banner to document page`
- `feat(official-texts): wire amendments into DocumentReader`
- `feat(official-texts): add corrections count to SectionHeading`
- `feat(official-texts): wire amendments mode into SidePanel`
- `feat(official-texts): add AmendmentsContent side panel component`
- `feat(official-texts): add empty corrigenda arrays to data files`
- `feat(official-texts): add Corrigendum and SectionAmendment types`
