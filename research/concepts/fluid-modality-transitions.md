---
type: concept
tags: [user-agency, generative-ui, component-mapping, model-evolution]
sources: [sources/interface-framework-HAIC.md]
created: 2026-03-06
---
Users need to move **bidirectionally** between interface modalities as task complexity evolves — from prompt bar to full-screen when a query deepens, back to contextual when they're monitoring, sideways to canvas when they need spatial manipulation. Transitions must be reversible, low-friction, and accessible via explicit UI controls (not just natural language commands). Andru & Saksena (2025) found users consistently stressed that transitions should never be one-way or require workarounds.

The deeper point: a task doesn't have a single complexity level. It has a **complexity trajectory** — starting simple (exploration), growing complex (creation/refinement), then simplifying again (monitoring/review). The interface should follow this trajectory, not lock the user into whichever modality they started with.

## Context

Current AI interfaces typically offer one modality (chat) or, at best, a fixed modality (e.g., Cursor's split-screen). The user can't escalate or de-escalate the interface to match their current needs. This is the macro-level version of the malleability problem: the pipeline aims to make components malleable, but the *container* is rigid.

## Connections

- **Extends** [[gentle slope]] — the gentle slope describes a gradient of user control within a single interface. Fluid transitions add a *lateral* dimension: moving between interface containers, not just deepening control within one. The full slope now includes a modality axis: prompt bar → contextual → rail → split-screen → full-screen → canvas, with bidirectional movement.
- **Extends** [[staged-co-generation]] — DuetUI's six stages (Define → Empathise → Plan → Explore → Refine → Duet) imply different modalities at different stages. Define might use a prompt bar; Explore might use split-screen; Duet might use canvas. Fluid transitions are the mechanism that makes staged co-generation feel smooth rather than jarring.
- **Supports** [[adaptive-autonomy]] — as the user's cooperation willingness shifts ([[dynamic-cooperation-willingness]]), the appropriate modality shifts too. Hands-off phases → lightweight modalities (contextual, rail). Hands-on phases → dedicated modalities (split-screen, canvas).
- **Tension with** [[streaming specification compilation]] — modality transitions imply the pipeline might need to re-render the entire interface in a different container. If transitions are frequent, the transition cost (layout recalculation, state preservation, context handoff) must be near-zero. State must survive transitions.
- **Supports** [[event-driven agent-UI protocol]] — AG-UI's event-driven architecture can support modality transitions if modality is treated as a state dimension. A `MODALITY_CHANGE` event type could trigger re-rendering into a different container while preserving state via snapshots.

## Practical implementations

- **macOS Spotlight → app** — typing a query in Spotlight (prompt bar) and pressing Enter opens the full application (full-screen transition). One-way only.
- **Slack huddles** — text chat (contextual) → audio/video huddle (dedicated) with shared context. Demonstrates state preservation across modality transitions.
- **Adobe's prototype** (this paper) — prompt bar on home page → full-screen for complex prompts → split-screen for segment details → canvas for journey editing → rail for follow-up questions. The most complete demonstration of multi-modality transitions.
- **VS Code** — inline suggestions (contextual) → terminal panel (rail) → full-screen editor (dedicated). Transitions via keyboard shortcuts, not NL.

## Relevance to project

For the pipeline, fluid transitions mean the generated UI can't be a single static rendering — it needs to be **re-hostable** across modalities. The same task model and data model should be renderable as a compact contextual widget, a rail panel, a full-screen view, or a canvas workspace, with state preserved across transitions.

This has architectural implications: the UI specification should be modality-agnostic (describe *what* to show), with a separate modality binding layer (describe *where and how* to show it). This parallels [[abstract-concrete-separation]] — the abstract spec is modality-independent; the concrete binding targets a specific modality's constraints (available space, interaction affordances, information density limits).

The pattern library needs **modality-aware variants**: a search pattern might render as an inline input in contextual mode, a side panel with filters in rail mode, or a full-page with faceted navigation in full-screen mode. Same pattern, different bindings.

## Open threads

- What state needs to be preserved across modality transitions? Conversation history, data model state, user selections, scroll position? What can be safely discarded?
- How should the pipeline signal to the user that a transition is available or recommended? Proactive suggestion ("this task is getting complex — switch to split-screen?") vs. always-visible controls.
- Can modality transitions be animated/continuous rather than discrete switches? A rail that smoothly expands to full-screen, rather than a jarring layout replacement.
- The paper found users prefer UI controls over NL commands for switching. But as voice and gestural interfaces mature, will this preference shift?
