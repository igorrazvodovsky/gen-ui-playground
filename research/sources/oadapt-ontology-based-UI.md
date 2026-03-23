---
title: "An ontology-based approach to support the development of adaptive interface systems"
authors: [Freitas, Barcellos]
year: 2024
venue: "ONTOBRAS 2024 / WTDO 2024"
type: literature
status: processed
---
## Core idea

Adaptive UI systems — interfaces that reconfigure at runtime based on who's using them — are hard to build because you need structured knowledge about users, UI elements, and adaptation rules. OADAPT proposes using **networked ontologies** (multiple interconnected ontologies) to provide that knowledge at two levels: conceptual (reusable, application-independent) and operational (machine-readable, runtime). The ontologies model users, UIs, adaptations, and their relationships; a reasoning engine applies adaptation rules at runtime.

This is a doctoral proposal overview — it describes the architecture and process but leaves detailed implementation to companion papers. The value is in the architecture and the structured knowledge model, not in the implementation details.

## Key concepts

- **[[context-driven adaptation]]** — UI generation should be driven not just by domain structure and user intent, but also by structured user context (disabilities, preferences, experience level, language). The pipeline is missing this input — "what to build" without "for whom" produces one-size-fits-all UIs.
- **Ontology network (ON)** — not a monolithic ontology but interconnected ontologies, each modelling a different aspect. HCI-ON contains: foundation layer (UFO), core layer (User, Interactive System, Interaction), domain layer (Adaptive Interface, User Profile, User Characterization, UI Types & Elements). These compose and evolve independently.
- **Conceptual vs. operational ontologies** — reference ontologies are application-independent (reusable design knowledge). Operational ontologies are machine-readable runtime artifacts. This maps to the distinction between a pattern library (conceptual) and a catalog + constraint rules (operational).
- **Adaptation rules** — explicit mappings from user context → UI modifications. "Colorblind user → recolor UI." "Low vision → high contrast mode." These sit in a semantic layer separate from the UI code.

## Technical approach

**Architecture (SNOPI)**: Four layers:
1. **UI layer** — interface components, produces standard/adapted UIs
2. **Application layer** — adaptation mechanism, receives user characteristics, sends UI adaptations
3. **Reasoning engine** — applies adaptation rules using operational ontology
4. **Data layer** — stores user characteristics and domain data, structured per reference ontology

Plus a **Semantic layer** containing ontoSNOPI (operational ontology + WCAG axioms) that the reasoning engine queries.

**OADAPT process** (8 steps):
1. Identify system scope and users
2. Elicit system requirements
3. **Select reference ontology** (from ON — pick relevant extract, extend if needed)
4. System analysis (structural/behavioural models informed by ontology)
5. Define system architecture (including ontology's role)
6. **Define UI adaptations** (user characteristics × ontology → adaptation rules)
7. **Develop operational ontology** (translate reference → machine-readable, validate with reasoning)
8. Implement and test

Steps 3, 6, 7 are the ontology-specific additions to a standard dev process.

**Four new ontologies** (added to HCI-ON domain layer):
- **AIO** (Adaptive Interface Ontology) — models adaptive systems, UI customisation
- **UPO** (User Profile Ontology) — models user characteristics: disabilities (vision, auditory, cognitive, physical), experience level, education, language, gender, age, preferences
- **UCO** (User Characterization Ontology) — how user characteristics are identified
- **UIT&EO** (UI Types and Elements Ontology) — models interface component programs

**User Profile Ontology (UPO)** is the most detailed — it includes a full disability taxonomy:
- Vision: blindness, low vision (field of vision, light sensitivity, visual acuity, colour vision [dichromacy, monochromacy, trichromacy], contrast sensitivity)
- Auditory: deafness, hearing loss
- Cognitive: emotional disease, genetic disease
- Physical: (not further subdivided)

Plus experience level (basic/average/high), preferences, education, language, age.

## What this paper does NOT do

- Doesn't provide detailed implementation of adaptation mechanisms (high-level architecture only)
- Doesn't show the actual adaptation rules or how they're expressed
- Doesn't detail the operational ontology (ontoSNOPI)
- Only demonstrates accessibility adaptations (colour, contrast) — not task-level or layout adaptations
- The companion paper (ontology-specification.md, paper #5) may provide the technical detail

## Extracted concepts

- [[context-driven adaptation]] — new
- Updated: [[ontology-driven UI generation]], [[constraint-driven component selection]], [[emergent workflow]], [[LLM-operable interface]]
