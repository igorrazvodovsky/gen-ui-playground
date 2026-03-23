---
title: "Concept-Centric Software Development: An Experience Report"
authors: [Peter Wilczynski, Taylor Gregoire-Wright, Daniel Jackson]
year: 2023
venue: "arXiv:2304.14975v3"
type: literature
status: processed
---

## Core idea

Experience report on deploying concept-centric development at Palantir at scale. Built a concept inventory (~150 concepts, ~250 users) integrated into Palantir's Foundry platform ontology. Key finding: the formal concept structure from Jackson's book was too heavyweight for organisational use — Palantir stripped it to name + description, enriching through links to external resources. Most valuable contributions: concept as a trackable entity in the organisational graph, concept entropy as a diagnostic for product complexity, concept clusters for cross-cutting ownership, concept aliases for vocabulary mapping.

## Key concepts

- Concept entropy (duplication/confusion between concepts accumulating like physical entropy — same name different meaning, or same meaning different name)
- Concept inventory (centralised searchable repository of concepts linked to teams, features, applications, bug reports)
- Concept clusters (thematic groupings — "Knowledge Management", "Security" — enabling cross-application ownership)
- Concept aliases (multiple names mapping to canonical concept, supporting gradual vocabulary adoption)
- Concept sketches (hand-drawn visual representations of concepts and their relationships)
- Concept dynamics (statics = what concepts exist; dynamics = how they're invented, refined, and evolved)
- Skeuomorphic concept invention (new concepts that mirror familiar physical artefacts)
- Dialectical concept invention (new concepts synthesising two prior opposing concepts)

## Technical approach

Augmented Palantir's Foundry ontology with a concept object type. Concepts linked to existing entities: features, applications, teams, employees, bug reports, platform components. Concept clusters assigned to product managers for ownership. ~150 concepts, ~250 regular users. Concept entity type became connected to all of Palantir's internal data (planning docs, tickets, design mocks). Bootstrapping solved by authors entering first ~100 concepts themselves. Collective action problem (getting others to contribute) addressed by aligning PM ownership to clusters and building browser extensions.

## Extracted concepts

- `concept-entropy.md` (new)
- `concept-as-knowledge-artefact.md` (new — concepts as organisational vocabulary, not runtime constructs)
- Updates to `concept-catalog.md` — Palantir's inventory is a production-scale catalog with different design choices (lightweight, linked to ontology)
- Updates to `concept-as-composition-unit.md` — Palantir evidence that formal specification is too heavy for practical use; name + description + links suffice for communication
