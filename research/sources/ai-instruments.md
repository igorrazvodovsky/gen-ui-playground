---
title: "AI-Instruments: Beyond Chat-Based Interactions with Generative AI through Instrumental Interaction"
authors: [Nathalie Henry Riche, Adam Fourney, Adam Lerer, Bongshin Lee, Cathy Pearl, Daniel Brown, David Gmeiner, Emily Reif, Fernanda Viégas, Jina Suh, Martin Wattenberg, Michael Terry, Nathalie Henry Riche, Peter Offenwanger, Romain Romat, Ken Hinckley, Michel Pahud, Bonnie Nardi, Sheelagh Carpendale, John Stasko, Nicolai Marquardt]
year: 2025
venue: "CHI '25"
type: literature
status: processed
---
## Core idea

Extends Beaudouin-Lafon's instrumental interaction model to generative AI. Instead of prompts being text strings typed into a chat, they become **reified graphical objects** — interface elements users can see, manipulate, compose, and reuse. The paper introduces three principles (reify, reflect, ground) and four technology probes (Fragments, Transformative Lenses, Generative Containers, Fillable Brushes) implemented for image generation.

## Key concepts

- [[prompt-as-interface-object]] — the core move: prompts cease to be ephemeral text and become persistent, manipulable first-class interface objects
- [[reflection-in-intent]] — surfacing the latent structure of user intent back to the user through AI decomposition (the input-facing counterpart of [[augmented-semantics]])
- [[grounding-by-example]] — specifying intent through examples ("like this") rather than verbal description; extracts semantic attributes from existing content
- **Scope and degree of abstraction** — two orthogonal dimensions for instrument design: scope defines what portion of content the instrument operates on (region, element, whole canvas); degree of abstraction ranges from high-level ("serene atmosphere") to low-level ("warm orange tint")
- **Meta-instruments** — instruments that operate on other instruments. Generative Containers can take Fragments as input parameters. Palettes organise instrument collections. Enables compositional workflows.

## Technical approach

Four technology probes, all implemented for image generation using Stable Diffusion / DALL-E:

**Fragments.** A prompt is parsed by an LLM into [type, value] attribute pairs (e.g., [Style, Watercolor], [Subject, Castle], [Mood, Serene]). Each pair becomes a card the user can: edit the value directly, lock (persist across regeneration), vary (generate alternatives for one dimension while freezing others), remove, or reorder. Fragments decompose the prompt into a visible, manipulable structure — reflection-in-intent.

**Transformative Lenses.** Spatially-scoped instruments that apply a prompt to a selected region. The user draws a lasso or rectangle on the canvas; the lens applies a transformation ("make it winter", "change to watercolour") to just that region. The key: scope is spatial and user-defined, not semantic. Multiple lenses compose by stacking.

**Generative Containers.** Persistent workspace regions that hold a prompt + generation parameters. When activated, they produce multiple interpretations simultaneously — reflection-in-response (showing the AI's interpretation space, not just one sample). Containers can accept Fragments as parameterised inputs, enabling meta-instrument composition.

**Fillable Brushes.** Grounding instruments. The user fills a brush by painting over an example (an image region they like). The system extracts semantic attributes from that region. The user then paints those attributes onto a different region. Intent is specified by ostension (pointing) rather than description (prompting).

Design space articulated along five axes: activation method (explicit/implicit), scope (element/region/canvas/concept), degree of abstraction (high ↔ low), representation (graphical form the instrument takes), and composability (whether instruments take other instruments as input).

## Evaluation

Workshop with 13 expert participants (HCI researchers, designers, AI practitioners). Qualitative findings:
- Fragments made hidden prompt dimensions visible, but users wanted more control over the decomposition itself
- Lenses enabled spatial precision impossible in chat
- Containers enabled non-linear exploration (branching, comparing alternatives)
- Brushes avoided the articulation problem (users couldn't describe a style verbally but could point at it)
- Meta-instrument composition was valued but challenging to learn

No quantitative user study — this is a design research contribution (technology probes + design space), not an empirical evaluation of a finished system.

## Extracted concepts

- [[prompt-as-interface-object]] (new)
- [[reflection-in-intent]] (new)
- [[grounding-by-example]] (new)
- [[intent-decomposition]] (updated — Fragments as a complementary decomposition mechanism)
- [[gentle slope]] (updated — new rung: direct manipulation of reified intent)
- [[in-place toolchain]] (updated — Lenses, Brushes, Containers as concrete examples)
