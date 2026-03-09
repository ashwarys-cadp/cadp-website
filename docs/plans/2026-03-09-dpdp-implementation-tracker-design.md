# DPDP Implementation Tracker — Design Document

**Date:** 2026-03-09
**SEO target keyword:** "dpdp act india implementation status 2026"

## Overview

A pillar guide page that tracks every delegated/prescribed obligation in the DPDP Act 2023 and DPDP Rules 2025 — what the government is required to put in place (notifications, rules, bodies, appointments) and whether it has been done. The definitive reference for DPDP implementation status.

## Route & Page Type

- **Route:** `/resources/guides/dpdp-implementation-tracker`
- **Type:** Static pillar guide (hardcoded component + JSON data file)
- **Pattern:** Same as `dpdp-rules-2025` guide

## Data File

**Location:** `/data/official-texts/implementation-tracker.json`

Sits alongside existing legal text JSONs. Separate type definitions in `/data/official-texts/implementation-tracker-types.ts`.

### Schema

```typescript
interface ImplementationTracker {
  lastUpdated: string;               // ISO date, e.g. "2026-03-09"
  categories: TrackerCategory[];
}

interface TrackerCategory {
  id: string;                        // e.g. "board-setup"
  name: string;                      // e.g. "Data Protection Board Setup"
  status: "complete" | "partial" | "pending";
  items: TrackerItem[];
}

interface TrackerItem {
  id: string;
  requirement: string;               // What needs to be done
  source: {
    document: string;                // Official texts document ID, e.g. "dpdp-act-2023"
    sectionId: string;               // e.g. "section-18"
    label: string;                   // e.g. "Section 18(1)"
  };
  responsibleBody: string;           // "Central Government" | "Data Protection Board"
  status: "notified" | "pending";
  implementation?: {                 // Present only when status is "notified"
    instrument: string;              // e.g. "G.S.R. 844(E)"
    date: string;                    // ISO date
    description: string;             // Brief description
    documentId?: string;             // Optional, links to official texts reader
  };
}
```

### Statuses

- **Item level:** "Notified" (government has issued the instrument) or "Pending" (not yet done). Binary — no "in progress".
- **Category level:** Derived from items. "Complete" (all notified), "Partial" (some notified), "Pending" (none notified).

### Categories (~8)

1. Board Setup (establishment, headquarters, appointments, committees)
2. Consent Management (Consent Manager registration, obligations)
3. Data Fiduciary Obligations (breach notification, data retention, DPO, notices)
4. Significant Data Fiduciary (designation, DPIA, audit, data localization)
5. Children's Data Protection (verifiable consent, exemptions, safe processing)
6. Cross-border Transfer (country restrictions, transfer requirements)
7. Exemptions & Research (startup exemptions, research standards, legitimate uses)
8. Rights of Data Principals (access, correction, erasure, grievance, nomination, appeals)

## Page Layout

Top to bottom:

### 1. Hero + Breadcrumbs
- Breadcrumbs: Home > Resources > Guides > DPDP Implementation Tracker
- Title, last-updated date
- 2-3 sentence narrative summary of current implementation state (manually written, updated when major changes happen)

### 2. Category Overview Strip
- Horizontal row of category cards/badges
- Each shows: category name + status (Complete / Partial / Pending)
- Color coded for scannability
- Clickable — scrolls to the detailed section

### 3. Detailed Sections (one per category)
- Category heading with status badge
- Table of items within the category
- Each item row shows:
  - Requirement description
  - Source reference — linked to official texts reader (`/resources/official-texts/{document}#{sectionId}`)
  - Responsible body
  - Status badge (Notified / Pending)
  - If notified: instrument name + date, linked to the notification in official texts (`/resources/official-texts/{documentId}`) when available

### 4. Methodology Note
- Brief paragraph explaining scope (all delegated obligations from the Act and Rules) and maintenance approach

### 5. Newsletter CTA
- Reuse existing `Newsletter` component

## Components

All existing — no new UI primitives needed:
- `Section`, `Container`, `Breadcrumbs`, `Button`, `Badge` from `components/ui/`
- `ArticleJsonLd` from `components/seo/`
- `Newsletter` from `components/sections/`

## Linking Strategy

### Links from this page
- Source references → official texts reader (Act/Rules sections)
- Implementation instruments → official texts reader (notifications)
- DPDP Rules 2025 guide
- Implementation roadmap guide
- Relevant programme pages (compliance advisory, training)

### Links to this page
- Resources hub (`/resources/`) — add a featured card
- Guides listing page
- DPDP Rules 2025 guide — cross-reference
- Official texts landing page — companion resource link

### Sitemap
- Add to `public/sitemap.xml`

## SEO

- **Title:** "DPDP Act Implementation Status 2026 — Complete Tracker | CADP"
- **Meta description:** Targeting "dpdp act india implementation status 2026"
- **Structured data:** `ArticleJsonLd` with datePublished, dateModified (from lastUpdated), author as CADP
- **Breadcrumbs:** Structured data via `Breadcrumbs` component

## Data Source

~40 items extracted from:
- **DPDP Act 2023:** All "as may be prescribed", "notify", "establish", "constitute", "appoint" delegations (~30 items across Sections 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 23, 24, 28, 29, 40, 42, 43)
- **DPDP Rules 2025:** Additional delegations in Rules 4, 10, 13, 15, 17, 21, 23 and Schedules 1-7

## Maintenance

Update `implementation-tracker.json` when:
- A new notification/order is issued by the government
- A new official text is added to the site (add `documentId` link)
- Update `lastUpdated` field and narrative summary accordingly
