## Problem

Current software forces users to cobble together rigid, pre-built applications. Each app has a fixed data model and fixed UI. The user's actual task — which cuts across multiple domains and evolves over time — is never directly represented. Generative UI fix this: the user's task *is* the data model, and the interface is a living projection of it.

## Solution

Build a system that generates user interfaces from structured data, where the UI dynamically evolves with users' changing needs. The end-state is malleable, generative interfaces driven by task-driven data models that users can modify through natural language and direct manipulation.

### The pipeline (target architecture)

```
User prompt
  → Task analysis (LLM)
    → Task-driven data model (schema + dependencies + data)
      → UI specification (mapping rules + state management)
        → Rendered UI (component library)
          ↺ End-user customisation (NL + direct manipulation)
            → Model evolution → UI update
```

### Current step: json-render

Starting with [vercel-labs/json-render](https://github.com/vercel-labs/json-render) — a library that takes JSON and renders it as React components. This covers the **UI specification → Rendered UI** segment of the pipeline.

**What json-render gives you:** a working JSON-to-component renderer.

**What it doesn't give you (yet):**
- How to generate the JSON spec from a user's task description
- What the intermediate representation should look like (schema design)
- How to map data types to appropriate UI components (the mapping rules)
- How the model evolves when the user modifies requirements
- How to feed changes back from UI interaction into the data model

These are the questions the research needs to answer.

## Research approach — Zettelkasten

Three note types, each with a different job:

1. **Literature notes** (`sources/`) — per-paper. Quick reference: what the paper argues, its approach, key terms. Factual, not interpretive. Receipts.
2. **Concept notes** (`concepts/`) — atomic, one idea per note. Stated in own words. Links back to source papers and forward to related concepts. This is where understanding compounds.
3. **Synthesis doc** (`[[synthesis]]`) — curated trail through the concept notes. The evolving model of how generative UI works.

Workflow per paper:
1. Read the paper, create a literature note (slim — core idea, key concepts, technical approach)
2. **Survey existing concepts** — before extracting new concepts, list all existing concept notes and scan for potential connections, overlaps, or conflicts with ideas in the current paper
3. Extract atomic concepts into `concepts/` — one idea per note, linked to source and to other concepts
   - **As you create each new concept**: immediately identify which existing concepts it relates to
   - **Consider splitting/merging/reframing**: Does this new concept overlap with an existing one (merge)? Does an existing concept contain two separate ideas (split)? Does this paper reframe an existing concept (update)?
4. **Create bidirectional links** — update existing concept notes to reference new concepts, not just new→old
   - Add connections in both directions (e.g., if "pattern composition" relates to "UI composition", update both notes)
   - Add new insights from this paper to existing concepts where relevant (update "Relevance to project" or "Context" sections)
5. **Check for practical implementations** — for each concept, ask: "What real-world systems, tools, or frameworks implement this?" Connect theoretical concepts to production systems (e.g., pattern libraries → design systems, reactive programming → frameworks like React/Solid, data models → schema libraries). Add these connections to concept notes.
6. Update `[[synthesis]]` — what shifted, what connected, what's still missing, what practical bridges exist
7. Use gap map to find the next paper when the queue runs dry

**The Zettelkasten method only works if concepts actively link together**. This isn't optional — it's the core mechanism. Isolated notes are just a pile of documents.

## Vault structure

```
/
├── research-project.md     ← this file
├── reading-order.md        ← proposed sequence of 19 papers
├── solution tree.md        ← opportunity solution tree (opportunities, solutions, experiments)
├── synthesis.md            ← living synthesis, curates concept notes
├── templates/paper.md      ← template for literature notes
├── templates/concept.md    ← template for concept notes
├── concepts/               ← atomic idea notes (Zettelkasten)
└── sources/                ← PDFs, literature notes, images
```

## Key files

- [[reading-order]] — proposed sequence of 19 papers across 6 layers
- [[synthesis]] — living synthesis document, updated after each paper
- [[paper]] — template for literature notes
- [[concept]] — template for concept notes
- [[generative-malleable-UI]] — the north star paper (JELLY, CHI 2025)
