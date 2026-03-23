---
type: concept
tags: [component-mapping, specification, user-agency]
sources: [sources/how-notations-evolve.md]
created: 2026-03-12
---
Notations originate through two types of conceptual metaphor. A **linking metaphor** builds a new abstraction by analogical transfer from an existing notation — structural properties of the source are projected onto the target domain, generating candidate inferences. A **grounding metaphor** connects the notation to embodied perceptual experience — spatial, gestural, or affordance-based mappings that make the notation feel "natural." Both rely on analogical alignment: the process of finding structural correspondences between source and target. Critically, introducing new metaphors often requires **breaking alignment** with prior ones — old coherence is traded for new expressive power.

## Context

Zhang et al. (2025) trace these two metaphor types (from Lakoff & Núñez's work on mathematical notation) across all their case studies. Linking metaphors explain why notations chain: molecular formulas borrow from algebra, dance notation borrows from music notation, flow charts borrow from electrical schematics. Grounding metaphors explain why some notations "click" immediately (microgesture notation maps finger positions to actual hand shape) while others require training (Feynman diagrams' resemblance to particle tracks is misleading). The paper identifies a productive tension: linking metaphors accelerate adoption but carry baggage from the source (non-alignable differences get dropped); grounding metaphors increase usability but can cause cross-mapping errors when the visual resemblance doesn't match the semantic operation.

## Connections

- Directly relates to [[abstraction-to-concrete mapping]] — choosing a UI component for a data type is choosing a grounding metaphor (calendar picker grounds "date" in spatial/temporal experience) or a linking metaphor (table view links "list of records" to the spreadsheet paradigm)
- Extends [[pattern-driven transformation]] — patterns are essentially codified linking metaphors: "this task structure is like a search-and-filter scenario, so apply the Search pattern." The pattern library is a collection of proven analogical alignments
- Tension with [[semantic-drift]] — breaking metaphorical alignment (necessary for notation evolution) is structurally similar to the drift problem in iterative prompting; both involve loss of coherence from prior context
- Connects to [[grounding-by-example]] (AI-instruments) — pointing at an example as input is a concrete mechanism for establishing a linking metaphor ("make it like *that*")
- Supports [[gentle slope]] — each step on the slope can be understood as engaging a different metaphor type: viewing uses grounding metaphors (the UI "feels like" the task), editing uses linking metaphors (the spec "works like" a programming language)

## Practical implementations

Every design system is a library of grounding metaphors. A toggle switch grounds a boolean in the physical metaphor of a light switch. A slider grounds a continuous value in the metaphor of a physical fader. A dropdown grounds selection-from-options in the metaphor of a physical menu. Component libraries like Material Design explicitly document their metaphorical basis ("Material is the metaphor" — physical paper, ink, surfaces). Skeuomorphism was maximal grounding metaphor use; flat design trades grounding for consistency.

## Relevance to project

**Component mapping layer (O3):** The pattern library should track *which metaphor type* each mapping relies on. A table view for a list of records is a linking metaphor (from spreadsheets). A kanban board for a workflow is a grounding metaphor (spatial position = progress stage). When the LLM selects components, it's implicitly choosing metaphors — making this choice explicit enables better reasoning about whether the metaphor is apt or misleading. The paper's warning about metaphor mismatch (§3.1.6 on Feynman diagrams) maps directly to the risk of choosing a component whose visual affordances don't match the data's actual semantics.

**Model evolution (the ↺ loop):** When a user modifies a generated UI in ways that break the system's original component choices — replacing a table with a canvas, reorganising from list to hierarchy — they may be introducing a new metaphor that requires breaking alignment with the prior one. The system should recognise this as a legitimate notation evolution move, not an error to correct on the next regeneration cycle.

## Open threads

- Can the LLM's component selection be improved by explicitly prompting it with source-target metaphor framing? ("This data is structured like X. Which component metaphor best maps to it?")
- The paper notes that metaphor mismatch is a persistent problem even in mature notations. For generated UIs, how would the system detect that a component's visual metaphor is misleading for the current data?
- The "breaking alignment" pattern is interesting for the customisation loop: users who make radical changes to a generated UI may be signalling that the original metaphor was wrong, not that they want a minor tweak.
