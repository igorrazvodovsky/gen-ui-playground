---
title: "NeuroSync: Intent-Aware Code-Based Problem Solving via Direct LLM Understanding Modification"
authors: [Wenshuo Zhang, Leixian Shen, Shuchang Xu, Jindu Wang, Jian Zhao, Huamin Qu, Lin-Ping Yuan]
year: 2025
venue: "UIST '25"
type: literature
status: processed
---
## Core idea

LLMs form an internal "understanding" of a user's task — the coding subtasks, their dependencies, and their mapping to user intent — but this understanding is invisible. NeuroSync externalises it as an editable graph *before* code generation, letting non-programmer users inspect, correct, and confirm the LLM's task decomposition. The authors call this paradigm **direct intent–task matching**: instead of iterating through prompt → code → disappointment → re-prompt cycles, users engage directly with the LLM's inferred task structure.

## Key concepts

- **[[bidirectional-ambiguity]]** — the root cause of human-LLM misalignment. User-to-LLM: nonlinear, hierarchical intent gets flattened into linear prompts, losing structure. LLM-to-User: generated code embeds nonlinear task logic that non-programmers can't parse. Both directions suffer from format mismatch.
- **[[externalised-LLM-understanding]]** — the LLM's inferred task structure (subtasks + dependencies + data flow) is extracted and rendered as a manipulable graph. Users edit the graph; the corrected understanding feeds back to the LLM for aligned code generation.
- **[[intent-aware-simplification]]** — as the task graph grows complex across dialogue rounds, an algorithm dynamically simplifies it by collapsing branches irrelevant to the user's current intent focus, keeping only intent-mapped nodes fully visible.
- **Triples** — the unified data structure: {Intent Tree, Understanding Graph, Mapping}. The intent tree is a hierarchy of user goals; the understanding graph is the LLM's task decomposition; the mapping links intent nodes to graph nodes.
- **Knowledge distillation** — a fine-tuned small language model (SLM) extracts triples directly from prompts in a single pass, bypassing the expensive two-stage (code generation → triple extraction) pipeline. Trained on synthetic data from a four-agent simulation system.

## Technical approach

**Architecture**: Three-panel interface — (A) LLM conversation panel, (B) understanding graph manipulation panel (full task graph, editable), (C) intent-task mapping panel (simplified graph + intent tree).

**Triple extraction pipeline**:
1. *Teacher path*: conversational LLM generates intermediate code → extraction LLM produces triples from code + prompt + prior triples. High accuracy, slow (two LLM calls).
2. *Student path*: fine-tuned SLM (LoRA adapter on Qwen/LLaMA) generates triples directly from prompt + prior triples. Faster (single pass), aligned to teacher via MSE loss on output tokens.
3. *Training data*: multi-agent simulation — Intent Tree Constructor → Domain User Simulator → Code Generator → Execution Analyser — generates realistic multi-round prompt histories without needing real user data.

**Graph simplification**: Two-stage algorithm:
1. *Intent tracking*: NFA-based automaton tracks intent changes across dialogue rounds, updating the intent tree and synchronising it with the understanding graph.
2. *Simplification*: recursive topological reduction — nodes mapped to current intent nodes are preserved in full; sub-branches with no intent-mapped nodes collapse into supernodes; edges are reconstructed through the collapsed mapping.

**Editing modalities**: Graph-level modification (NL instruction in a "modify block" → LLM restructures the graph) and node-level modification (direct add/delete/rename/relink of individual nodes).

**Evaluation**:
- Distilled SLMs achieve >90% ROUGE/BLEU similarity to the two-stage extractor across Qwen 1.5B/7B and LLaMA 8B.
- 13–44× faster inference than the two-stage pipeline (depending on hardware).
- User study (N=12, domain experts with limited coding): task completion 50% faster (13.9 vs 23.8 min), 66% fewer LLM calls (1.3 vs 3.9), significantly better usability, lower cognitive load (NASA-TLX), and higher intent-code alignment across all metrics (p < .01).

## Extracted concepts

- [[bidirectional-ambiguity]] — created
- [[externalised-LLM-understanding]] — created
- [[intent-aware-simplification]] — created
- [[intent-decomposition]] — updated (connections)
- [[semantic-intermediate-layer]] — updated (connections)
- [[gentle slope]] — updated (connections)
- [[parallel-state-display]] — updated (connections)
