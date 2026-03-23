---
type: concept
tags: [generative-ui, model-evolution, intent]
sources: [sources/how-notations-evolve.md]
created: 2026-03-12
---
Current AI systems excel at **translating** informal ideas into existing formal representations (natural language → code, sketch → polished design, prompt → structured output) but do little to support the **creation** of genuinely new formalisms. Using the paper's "square of formality" framework: AI moves us *horizontally* (informal → existing formal notation) but not *vertically* (informal → novel formal notation). The risk: by making translation effortless, LLMs may actually *impede* the creation and proliferation of new notations, locking us into the representational vocabulary that happened to be in the training data.

## Context

Zhang et al. (2025) close with this observation, noting that developers increasingly choose programming languages based on how well LLMs understand them rather than the language's intrinsic qualities. The homogenising pressure is real — LLMs amplify established notations and starve novel ones of the community attention needed for Stage 2 dispersion. The paper asks: how might we co-create a new notation *with* a machine, then communicate through it?

## Connections

- Directly challenges the premise of [[pattern-driven transformation]] — if the pipeline only selects from existing patterns, it's doing horizontal translation; true malleability requires the user (or system) to invent new patterns when existing ones don't fit
- Extends [[structured vs unstructured tension]] — the tension isn't just about bridging NL to structure, but about whether the target structure should always be pre-existing or can be co-evolved
- Relates to [[emergent workflow]] — workflows that arise at use-time from the user's specific context are a form of vertical creation, not just horizontal translation
- Supports [[graduated-ambiguity-tolerance]] — tolerating ambiguity in user input may be a precondition for supporting the emergence of new formalisms (forcing precision too early locks the user into existing categories)
- Tension with [[knowledge-graph-grounded-generation]] — grounding in existing knowledge structures inherently favours translation over creation; the knowledge graph codifies the current notation

## Practical implementations

Few systems support genuine notation creation. Spreadsheets come closest — users can define novel data structures, formulas, and visual formats without programming. Notion's databases allow user-defined schemas. Obsidian's plugin ecosystem lets users extend the notation (Markdown) with custom syntax. Bret Victor's DynamicLand prototyped a physical computing environment designed for ad-hoc notation creation. None of these are AI-assisted.

## Relevance to project

This is a philosophical constraint on the pipeline design, not a specific technical requirement. But it has concrete implications:

**The pipeline should not assume its output notation is final.** If the generated UI uses a table for a data structure that would be better represented by a novel visualisation the pattern library doesn't contain, the system should recognise the limitation rather than force-fitting existing components. The [[configuration-model-as-design-space]] helps here — if the configuration space has no valid point for the user's need, that gap should be surfaceable.

**User modifications as notation invention.** When users modify a generated UI in ways that break the existing component vocabulary — creating hybrid views, combining patterns in novel ways, repurposing components for unintended uses — they may be doing notation invention. The system should treat these as potential new patterns to learn from, not as errors to revert. This connects to [[usage-as-annotation]]: user modifications as implicit training signal for the pattern library, not just for content preferences.

**The "vertical" aspiration.** The long-term vision for the pipeline isn't just "generate UIs from prompts" (horizontal translation) but "co-evolve representational systems with users" (vertical creation). This is aspirational, but it means the architecture should leave room for it — don't hard-code assumptions that the component catalog is fixed or that patterns are immutable.

## Open threads

- What would it look like for the pipeline to support "vertical" creation? Could the LLM propose novel component compositions that aren't in the pattern library, using linking metaphors from distant domains?
- The paper suggests notation evolution is fundamentally *social* — new notations succeed through community adoption, not individual invention. For generated UIs, is there a mechanism for user-created patterns to propagate to other users?
- The homogenisation risk applies to the pipeline directly: if the LLM always generates similar UI patterns, it suppresses the diversity of representational approaches. Is there a way to inject productive variation?
