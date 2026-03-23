---
title: "Understanding and Supporting Malleable Overview+Detail Interfaces"
authors: [Min, Chen, Cao, Xia]
year: 2025
venue: "CHI 2025"
type: literature
status: processed
companion: "[[sources/meridian-overview-detail]]"
---
## Core idea

Overview+detail is the most common multi-view pattern in information interfaces (found in 83% of surveyed applications). This paper defines a design space for making these interfaces *malleable* — customisable by end users — across three dimensions: content (which attributes appear), composition (how views relate to each other), and layout (spatial arrangement). The central mechanism is **fluid attributes**: data attributes treated as first-class, user-manipulable entities that can be added, removed, reformatted, and AI-reformulated across both overview and detail views.

## Key concepts

- [[fluid-attributes]] — attributes as first-class entities with formatters, derivations, and AI reformulation. The unit of customisation.
- [[overview-detail-pattern]] — the specific multi-view pattern being made malleable. Three customisation dimensions: content, composition, layout.
- [[fluid-attributes]] — the insight that malleability should operate at the attribute level, not just view or component level.
- [[ai-attribute-reformulation]] — using LLMs to transform raw data attributes into task-appropriate presentations (e.g. raw price history → "good deal" badge).

## Technical approach

**Formative study**: Analysed 83 information-seeking applications across 8 categories (shopping, travel, real estate, jobs, food, entertainment, education, health). Found overview+detail in 83%, with remarkably consistent attribute usage: a small subset of attributes (title, image, rating, price) dominates overview cards while detail views show everything.

**Design space** (three dimensions):

1. **Content customisation** — adding/removing attributes, changing attribute format (text ↔ badge ↔ chart ↔ icon), AI-driven reformulation (raw data → user-meaningful summary)
2. **Composition customisation** — which attributes appear in overview vs. detail, cross-view attribute migration (promote detail attribute to overview card), attribute synchronisation between views
3. **Layout customisation** — spatial arrangement of overview items and detail panels, attribute ordering within views

**Design probes**: 12 participants used Wizard-of-Oz prototypes across shopping (Airbnb-like) and hotel booking scenarios. Key findings:

- Users strongly wanted to add attributes to overview cards that weren't there by default (distance to landmarks, specific amenity checks)
- AI reformulation was valued for synthesising multiple raw attributes into decision-relevant summaries ("walkability score" from distance + transit + neighbourhood data)
- Users frequently wanted to *remove* default attributes they didn't care about (freeing space for ones they did)
- Cross-view coordination mattered: promoting a detail attribute to the overview card was a common desire
- Layout preferences varied significantly between participants — no single layout fits all

**Attribute taxonomy** from the survey:

| Category | Examples | Frequency in overview |
|---|---|---|
| Core identity | Title, image, category | Very high |
| Quantitative | Price, rating, distance | High |
| Qualitative | Description, reviews | Low (usually detail-only) |
| Derived/computed | "Value score", "match %" | Rare but highly desired |

## Extracted concepts

- [[fluid-attributes]]
- [[overview-detail-pattern]]
- [[fluid-attributes]]
- [[ai-attribute-reformulation]]
