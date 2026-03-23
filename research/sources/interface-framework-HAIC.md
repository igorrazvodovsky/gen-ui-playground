---
title: "Interface Framework for Human-AI Collaboration within Intelligent User Interface Ecosystems"
authors: [Shruthi Andru, Shrut Kirti Saksena]
year: 2025
venue: "Adobe Design (preprint)"
type: literature
status: processed
---
## Core idea

Proposes a three-dimensional framework for selecting AI interface patterns ("modalities") based on workflow complexity, AI autonomy, and AI reasoning. Eight modalities — from lightweight (prompt bar, hub) through contextually integrated (contextual, rail) to dedicated (full-screen, split-screen) and dynamic content (canvas, immersive) — are mapped onto these dimensions. The framework gives designers a structured method for choosing which container the AI should inhabit for a given task, rather than defaulting to chat or bolting AI onto existing UI.

## Key concepts

- **Modalities** — interface patterns that manifest the AI's presence. Not UI components but *containers for collaboration*: each embodies decisions about visibility, proactivity, and agentic scope. Eight defined: prompt bar, hub, contextual, rail, full-screen, split-screen, canvas, immersive. See [[modality-as-task-container]].
- **Three evaluation dimensions** — workflow complexity (task demands), AI autonomy (degree of independence), AI reasoning (intelligence required). These form a 3D space; modalities occupy regions within it.
- **Fluid modality transitions** — users should move bidirectionally between modalities as task complexity evolves, via explicit UI controls (not natural language commands). See [[fluid-modality-transitions]].
- **Progressive control** — users retain the ability to intervene and redirect at any autonomy level. High-autonomy modalities still need transparency and user override mechanisms.
- **Risk as a pre-filter** — before dimension assessment, evaluate compliance risk and business impact risk. High-risk tasks require guardrails regardless of which modality is selected.

## Technical approach

- **Research-through-Design** methodology: three co-design workshops with 12 UX designers from Adobe's marketing product teams, followed by semi-structured interviews with 8 marketing practitioners using an interactive prototype (built with Cursor).
- Workshop procedure: (1) modality alignment and brainstorming dimensions, (2) dimension alignment via dot voting and moderated discussion, (3) workflow-to-modality and modality-to-dimension mapping using Jobs-To-Be-Done.
- Evaluation: think-aloud protocol with interactive prototype demonstrating modality transitions across marketing workflows (audience creation, journey management).
- **Modality selection process**: three steps — risk assessment → dimension evaluation (workflow complexity, then AI autonomy, then AI reasoning) → modality mapping via the dimension map.
- **Key findings from evaluation**:
  - Task complexity → modality preference is **linear** (simple tasks → lightweight modalities, complex tasks → dedicated/dynamic modalities).
  - AI reasoning → modality preference is **non-linear** — reasoning requirements flex depending on the modality's context and affordances, not just task complexity.
  - Information density must match modality space — verbose explanations in small modalities (contextual, rail) erode trust.
  - High-complexity modalities (canvas, split-screen) don't necessarily support high autonomy — users want *more* control for complex tasks, not less.
  - UI controls preferred over NL commands for modality switching in the near term.

## Extracted concepts

- [[modality-as-task-container]] — created
- [[fluid-modality-transitions]] — created
- [[adaptive-autonomy]] — updated (progressive control finding)
- [[cognitive-load-bounded-display]] — connection noted (information density ↔ modality space)
