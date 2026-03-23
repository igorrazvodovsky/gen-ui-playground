---
title: "Semantic Commit: Helping Users Update Intent Specifications for AI Memory at Scale"
authors: [Priyan Vaithilingam, Munyeong Kim, Frida-Cecilia Acosta-Parenteau, Daniel Lee, Amine Mhedhbi, Elena L. Glassman, Ian Arawjo]
year: 2025
venue: "UIST '25"
type: literature
status: processed
---
## Core idea

Integrating new information into an AI agent's memory (intent specifications — CLAUDE.md files, cursor rules, game design documents) creates semantic conflicts that require human-in-the-loop detection and resolution. The paper introduces SemanticCommit, a mixed-initiative interface inspired by impact analysis in software engineering, and finds that users prefer to **foresee impact before changes are proposed** — separating retrieval/detection from generation/resolution.

## Key concepts

- **[[intent-specification-as-common-ground]]** — human-readable documents that accumulate user intent and ground AI decision-making. Not just config files but evolving representations of common ground. Examples: CLAUDE.md, cursor rules, game design documents.
- **[[impact-analysis-before-generation]]** — the empirical finding that users want to see what *will be affected* before any changes are made. "Check for Conflicts" before "Make Change." Separates retrieval from generation, a principle the authors call feedforward.
- **Semantic conflict detection** — conflicts operate at the meaning level, not syntax. Requires multi-hop reasoning (changing Mars to Venus implies sandstorms need revisiting). Three degrees: direct (red), ambiguous (pink), non-conflict. Based on NLI literature adding "ambiguous" as a fourth category alongside entailment, contradiction, neutral.
- **Knowledge graph-based retrieval** — pre-processing extracts entities from document chunks and links them in a KG. Inference uses PageRank-based relevance ranking (akin to HippoRAG) followed by conflict classification. Achieves 1.6× higher recall than DropAllDocs and 2.2× higher than InkSync, with similar accuracy.
- **Local vs. global resolution** — users start global (overview of all conflicts), then resolve locally (per-item rewrites, edits, deletions). "Start global, then accelerate local review." Three workflow patterns emerged: impact analysis first (6 participants), immediate changes with conflict review (5), skim false positives first (4).
- **Cognitive forcing functions** — requiring explicit user approval when AI detects or changes something, to mitigate over-reliance. SemanticCommit's mandatory review step is an instance.

## Technical approach

Within-subjects study (N=12) comparing SemanticCommit to OpenAI's ChatGPT Canvas as baseline. Two tasks: Mars Game Design Document (design doc type) and Financial Advice AI Agent Memory (user memory type). Each task = 3 sub-tasks (integrating 3 new pieces of information into a 30-item list). 15 minutes per condition.

**Architecture**: React + TypeScript frontend, Flask Python backend. KG-based RAG: pre-processing extracts entities from chunks → links in KG → PageRank-based retrieval → conflict classification (direct/ambiguous/non-conflict) via GPT-4o. Prompt engineering via ChainForge evaluation pipeline.

**Key findings**:
- SemanticCommit users made significantly more edits (5.83 vs. 3.5, p≈0.001) and more *intervened* edits (4 vs. 0.65, p<0.001)
- Task completion faster with SemanticCommit (4:07 vs. 5:41, p<0.004)
- No significant difference in perceived workload (NASA TLX), despite more manual review steps
- 9/12 reported better conflict identification; 9/12 reported greater sense of control
- Trust paradox: widespread scepticism toward AI-generated changes, yet over-reliance still observed (5 participants skipped reviewing parts not flagged as conflicting)

## Extracted concepts

- Created: [[intent-specification-as-common-ground]]
- Created: [[impact-analysis-before-generation]]
- Updated: [[cognitive-engagement-for-reliance]] — SemanticCommit as concrete evidence
- Updated: [[cross-task-user-knowledge]] — intent specifications as the persistent form
- Updated: [[semantic-intermediate-layer]] — extended to long-term memory, not just per-session
- Updated: [[externalised-LLM-understanding]] — accumulated understanding across sessions
