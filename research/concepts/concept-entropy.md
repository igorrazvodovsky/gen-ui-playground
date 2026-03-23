---
type: concept
tags: [model-evolution, generative-ui, specification]
sources: ["sources/concept-centric-development"]
created: 2026-03-13
---

Conceptual entropy is the accumulation of duplication and confusion between concepts in a software system over time. Two forms: concepts that share the same name but have different meanings, and concepts that share the same meaning but have different names. Like physical entropy, conceptual entropy increases naturally as features are added, teams diverge, and terminology drifts. Reducing it requires active effort — concept inventories, canonical naming, cross-team alignment.

Palantir (Wilczynski et al., 2023) coined this term while deploying 250 concept-based products. Their systems had ~2800 backend services across ~1700 repositories supporting ~130 user-facing apps. The complexity was manageable technically but increasingly illegible conceptually — users couldn't form stable mental models because the same functionality appeared under different names in different products. Their remedies: a searchable concept inventory (150 concepts) with concept aliases, sketches, and links to external resources. Formal state machine specifications proved too heavyweight; lightweight names + aliases + links proved practical.

## Context

Conceptual entropy manifests not as bugs but as fragmented user experience and inconsistent terminology. It's a system-level property that emerges from distributed, autonomous development — hard to detect and easy to ignore until the learning curve becomes unsustainable.

## Connections

- **Motivates** [[concept-catalog]] — a concept catalog is the primary tool for fighting conceptual entropy. Canonical names, aliases, and cluster organisation reduce duplication and confusion.
- **Relates to** [[concept-as-behavioural-annotation]] — if concepts are only added when behavioural complexity demands them, the concept space stays small and entropy risk is lower than in systems where everything is a concept.
- **Relates to** [[semantic-drift]] — semantic drift in genUI (user intent diverging from system behaviour) is conceptual entropy at the interaction level.
- **Connects to** [[tools-not-apps]] — Palantir's entropy arose partly because functionality was siloed into apps. Tool-based architecture might reduce entropy by making concepts cross-application.
- **Connects to** [[pattern]] — patterns are named, canonical solutions. Pattern libraries fight entropy at the UI level; concept catalogs fight it at the functionality level.

## Practical implementations

Palantir's concept inventory (name + description + links in Foundry ontology). Design system documentation (canonical component names, deprecation of old variants). API versioning and migration guides. Wikipedia disambiguation pages (same name, different meaning → disambiguation). Shared glossaries and domain ontologies.

## Relevance to project

Conceptual entropy could accumulate in two places: the concept catalog itself (if concepts are added without checking for duplication) and in generated applications (if the LLM uses inconsistent terminology across sessions). The catalog needs alias support (Palantir's finding) so the LLM can recognise that "bookmark", "save for later", and "favourite" might all map to the same concept. The catalog also needs active curation as it grows bottom-up — otherwise it becomes a pile of overlapping entries.

## Open threads

- Can LLMs help detect conceptual entropy? Given a catalog, can an LLM identify overlapping concepts or inconsistent naming?
- Does generative UI reduce or increase entropy compared to traditional development? On one hand, generation from a catalog enforces consistency. On the other, LLM non-determinism could produce different interpretations across sessions.
- How does concept entropy relate to the configuration-model-as-design-space idea? Entropy might manifest as redundant dimensions in the configuration space.
