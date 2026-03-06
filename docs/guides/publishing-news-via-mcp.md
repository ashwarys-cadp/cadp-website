# Publishing a News Article via Sanity MCP

## Project Details

- **Project ID**: `k540fk8h`
- **Dataset**: `production`
- **Workspace**: `cadp-studio`
- **Document type**: `newsArticle`

## Workflow

### 1. Fetch the source article

```
WebFetch url=<user-provided-link>
prompt="Extract: headline, key facts, dates, quotes, and implications for Indian data protection / DPDP compliance."
```

### 2. Create the document

Use `create_documents_from_markdown` with type `newsArticle`. Structure the markdown as:

```markdown
# Headline (max 120 chars)

Paragraph 1 — what happened, key facts.

Paragraph 2 — legal/regulatory context, relevant DPDP provisions.

Paragraph 3 — CADP commentary: what this means for organisations, recommended actions.
```

The tool auto-generates: `slug`, `excerpt`, `seoTitle`, `seoDescription`, `tags`, and `body` (portable text blocks).

### 3. Patch required fields

The create tool does **not** reliably set `publishedAt`, `sourceUrl`, `sourceName`, or `category`. Patch them immediately:

```
patch_document_from_json
  workspaceName: "cadp-studio"
  documentId: "drafts.<id>"
  set:
    - path: "publishedAt"  value: "<ISO datetime>"
    - path: "sourceUrl"    value: "<original article URL>"
    - path: "sourceName"   value: "<e.g. LiveLaw, The Hindu>"
    - path: "category"     value: "<one of the values below>"
```

**Category values**: `government-orders` | `court-decisions` | `industry-news` | `opinion` | `cadp-announcements`

### 4. Publish

```
publish_documents ids: ["<document-id-without-drafts-prefix>"]
```

### 5. Confirm to user

Report: title, slug, category, source, and published status.

## Writing Style

The body text is CADP editorial commentary, not a regurgitation of the source. Write in plain, direct prose. Medium-length declarative sentences. Short paragraphs, one idea each. Concrete facts first, then context, then implications.

### Hard Rules

- **No em dashes.** Use commas, semicolons, or separate sentences.
- **No "It's not about X, it's about Y."** Take actual positions.
- **No rule-of-three lists.** Don't group in threes with alliteration.
- **No corporate-speak.** No "leverage," "holistic," "robust framework," "navigate the landscape," "unpack."
- **No cliche metaphors.** No "tapestry," "landscape," "double-edged sword," "in today's fast-paced world," "at the heart of."
- **No false comprehensiveness.** Weight some angles more. Have a point of view.
- **No purple prose.** No overwrought adjectives or dramatic metaphors.
- **No passive voice as default.** "The Court held," not "it was held by the Court."
- **No synonym stacking.** Don't write "clear, evident, and obvious." Pick one.
- **No throat-clearing.** No "It is important to note that..." Just say it.
- **No bullet-point thinking in prose.** Weave into sentences.

### Tone

- Measured conviction. Firm but open to complexity.
- Treat the reader as a thinking professional, not a novice.
- Use precise hedging when needed: "I would argue," "probably." Not "perhaps," "arguably."
- Define legal/technical terms on first use; don't assume shared understanding.
- Use "So" to summarize or pivot. Use "Let us" to invite the reader along.

## Schema Quick Reference

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | string | Yes | Max 120 chars |
| slug | slug | Yes | Auto-generated from title |
| excerpt | text | Yes | 80-200 chars |
| body | portable text | Yes | 2-4 paragraphs, supports bold/italic/links/h3 |
| category | string enum | Yes | See values above |
| publishedAt | datetime | Yes | ISO 8601 |
| sourceUrl | url | No | Original article link (omit for CADP announcements) |
| sourceName | string | No | Publication name |
| tags | string[] | No | Auto-generated, can override |
| featuredImage | image | No | Most articles skip this |
| seoTitle | string | No | Max 70 chars |
| seoDescription | text | No | Max 170 chars |
