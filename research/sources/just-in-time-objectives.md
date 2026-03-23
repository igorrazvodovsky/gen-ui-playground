---
title: "Just-In-Time Objectives: A General Approach for Specialized AI Interactions"
authors: [Michelle S. Lam, Omar Shaikh, Hallie Xu, Alice Guo, Diyi Yang, Jeffrey Heer, James A. Landay, Michael S. Bernstein]
year: 2026
venue: "CHI 2026"
type: literature
status: processed
---
## Core idea

LLMs default to generic output because their training objectives are fixed well before use-time. JIT objectives flip this: passively observe the user's current context (a screenshot, a document, a browser window), infer their in-the-moment goal as a structured objective (name + description + importance weight), then use that objective to steer both generation and evaluation of downstream LLM output. The result is user-specific, task-specific output without the user having to articulate what they want. Instantiated in Poppins — a browser extension that generates tailored interactive tools and expert feedback on the fly.

## Key concepts

- [[just-in-time-objective-induction]] — inferring user goals from observed context and operationalising them as structured steering objects
- [[generate-then-rank-with-objectives]] — applying induced objectives to both the generation and evaluation sides of an LLM pipeline (gen_objective + eval_objective)
- [[objective-driven-tool-generation]] — using inferred objectives to produce functional interactive tools (not just text responses) tailored to the user's specific task
- [[meta-intent-elicitation]] (existing, updated) — Poppins surfaces goals users hadn't articulated, closely related to the existing concept

## Technical approach

**Architecture (three steps):**
1. **Objective induction** — VLM (Claude Sonnet 3.7) takes user context (screenshot + text) as input. Chain-of-thought prompt reasons about task domain, stage of completion, audience, ideal output, and likely user reaction. Outputs a JSON array of objectives, each with name, 1–2 sentence description, and importance weight (1–10). Highest-weighted objective is selected.
2. **Objective application to generation** (gen_objective) — the induced objective is prepended to the generator's existing prompt as a context snippet. Steers the generator toward objective-aligned candidates. Applied to any generation call: text, tool designs, expert specifications.
3. **Objective application to evaluation** (eval_objective) — the induced objective is added to evaluator prompts (LLM-as-a-judge, best-of-N sampling, critique modules). Produces larger score spreads and objective-aligned selection. GPT-4o mini used for evaluation; Claude Sonnet 4 for code generation.

**Poppins system (two output modes):**
- *Poppins-experts*: objective → expert specification (name, description, background material via web search, methodologies) → output format selection (Feedback, Brainstorm, Line Editor) → rendered expert response. Users can select/edit/add objectives, experts, and output formats.
- *Poppins-tools*: objective → tool design specification (function, implementation approach, interface features, design guidelines) → code generation (Svelte component with LLM helper library) → critique/refinement → rendered interactive tool. Generates functional software, not just text.

**Implementation:** Python Flask backend, Svelte frontend (Vercel), Chrome extension. Three LLMs for different roles. Tool code generated as standalone Svelte components with access to a helper library (getExperts, promptGeneral, etc.).

**Evaluation results:**
- Study 1 (N=14, lab): objectives rated accurate (75%) and useful (75%). JIT-steered outputs preferred over baseline in 71–86% of cases (expertise, tools, feedback).
- Study 2 (N=205, online): similar accuracy (76.6%) and usefulness (79.8%). Win rates 66–70% over baseline.
- Best-of-N with JIT evaluator: 75% win rate at N=100 (Study 1), diminishing returns beyond N=10 in Study 2.
- In-lab sessions (N=17): Poppins-experts significantly higher overall quality than baseline (p < .05). Tools rated relevant and useful by vast majority.

## Extracted concepts

- [[just-in-time-objective-induction]]
- [[generate-then-rank-with-objectives]]
- [[objective-driven-tool-generation]]
- Updated: [[meta-intent-elicitation]]
