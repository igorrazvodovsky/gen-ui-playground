---
title: "Bridging Gulfs in UI Generation through Semantic Guidance"
authors: [Seokhyeon Park, Soohyun Lee, Eugene Choi, Hyunwoo Kim, Minkyu Kweon, Yumin Song, Jinwook Seo]
year: 2026
venue: "CHI '26"
type: literature
status: processed
---
## Core idea

Current text-to-UI systems suffer from Norman's gulfs of execution (users can't articulate design intent) and evaluation (users can't interpret what the AI did), and these compound through iteration into "semantic drift." The fix: insert an explicit, structured semantic layer between user intent and generated output — a four-level hierarchy (Product → Design System → Feature → Component) that makes intent inspectable and manipulation scoped.

## Key concepts

- [[hierarchical-design-semantics]] — the four-level framework (Product, Design System, Feature, Component) with vertical (between-level) and horizontal (within-level) relationships
- [[semantic-intermediate-layer]] — explicit structured representation sitting between user intent and AI output, serving as bridge for both execution (specifying) and evaluation (interpreting)
- [[semantic-drift]] — the amplification problem where iteration degrades rather than improves coherence, because evaluation uncertainty feeds back into execution uncertainty
- [[augmented-semantics]] — bidirectional analysis: extracting what the AI actually implemented from the generated UI and comparing to what was specified
- [[scoped-semantic-editing]] — targeted refinement via explicit semantic diffs rather than conversation history, bounding changes to prevent drift

## Technical approach

**Thematic analysis of prompting guidelines.** Collected 907 guide fragments (601 guidelines, 306 example prompts) from six leading UI generation services (v0, Google Stitch, Figma Make, Wizard, Lovable, Relume). Iterative coding by three researchers surfaced a four-level semantic hierarchy.

**System architecture.** Web app (Next.js) implementing a three-phase workflow:

1. **Generate** — users specify semantics via collapsible panels (one per framework level) or free-form text parsed by GPT-5 into structured slots. Semantics compiled to markdown, sent to v0-1.5-md for React component generation.
2. **Analyse** — GPT-5 examines generated code + screenshot to extract "augmented semantics" — what the AI actually implemented, including inferred/added elements not in the original specification. Displayed alongside input semantics with blue highlights for additions.
3. **Refine** — semantic diffs (what changed between iterations) are explicitly passed to the generation model alongside previous code as structural constraint. This enables scoped, targeted regeneration rather than full re-interpretation from conversation history.

**Relationship analysis.** Semantic attributes rendered as a dependency graph with three edge types: Values Match Well, Values Conflict, Needs Value. Clicking any node shows upstream (what influenced it) and downstream (what it influences) relationships with explanations.

**Dual-persistence strategy.** Both semantic state and generated code are preserved across iterations — semantics are the single source of intent, code is the structural constraint for regeneration.

**Evaluation.** Within-subjects study, 14 UI/UX practitioners (8 designers, 3 developers, 3 PMs). Compared semantic system vs. baseline chat interface (both using v0-1.5-md). Statistically significant improvements across all dimensions (p < .05, large effect sizes). Largest effects on Think Through (M: 3.93 → 6.14), Output Interpretability (M: 3.86 → 5.93), and Transparency (M: 3.79 → 5.64).

## Extracted concepts

- [[hierarchical-design-semantics]] — new
- [[semantic-intermediate-layer]] — new
- [[semantic-drift]] — new
- [[augmented-semantics]] — new
- [[scoped-semantic-editing]] — new
- Updated: [[structured vs unstructured tension]], [[model hierarchy]], [[gentle slope]], [[in-place toolchain]], [[pattern-driven transformation]]
