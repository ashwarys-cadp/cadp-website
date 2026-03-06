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
