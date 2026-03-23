---
type: concept
tags: [generative-ui, specification, model-evolution]
sources: [sources/llm-driven-accessible-interface]
created: 2026-02-24
---
Automatic verification checkpoints after LLM-driven adaptation, testing whether the generated output meets the standards that triggered the adaptation in the first place. Jerry et al. implement three: **readability scoring** (Flesch-Kincaid ≤ 6th grade for plain language adaptations), **semantic fidelity** (NLI entailment score ≥ 0.85 — the simplified text must still mean what the original said), and **factual consistency** (medical facts preserved, no hallucinated dosages or contraindications). Failures trigger regeneration with adjusted prompts, or escalation to human review.

## Context

The pipeline already has guardrails for UI generation ([[guardrailed generative UI]]: schema validation, component whitelisting, action constraints). But those guard the *structural* output — is the JSON valid? Is the component in the catalog? Quality gates guard the *content* output — is the simplified text actually simpler? Does it still mean the same thing? Is it factually correct?

This matters because content adaptation failures are subtly dangerous. A structural error (invalid JSON) is obvious and crashes the renderer. A content error (simplified text that changes the medical meaning) looks correct and causes real harm. The quality gates catch the subtle failures.

## Connections

- **Extends** [[guardrailed generative UI]] — adds content-level verification alongside structural-level guardrails. Together they form a comprehensive quality assurance layer: schema validation (structural), component whitelisting (structural), action constraints (behavioural), readability/fidelity/consistency (content).
- **Depends on** [[normative-grounded-adaptation]] — the normative references define what "correct" means for each quality gate. Readability threshold comes from ISO 24495-1; fidelity requirement comes from the principle that adaptation must not change meaning.
- **Depends on** [[content-structure-adaptation-split]] — quality gates apply specifically to the content adaptation path. Structural adaptations are verified by different means (deterministic compliance checking, contrast ratio computation).
- **Related to** [[sufficiency-criteria]] — both address the question "how do you know the output is good enough?" Sufficiency criteria are graduated quality thresholds for spec generation; quality gates are pass/fail checks for content adaptation. Different mechanisms for different pipeline stages, but the same underlying concern: LLM output needs verification.
- **Related to** [[ai-attribute-reformulation]] — Meridian's per-attribute AI reformulation faces the same quality problem. A reformulated "value score" that misrepresents the data is a content error. Meridian doesn't address verification; Jerry et al.'s quality gates could apply.

## Practical implementations

- **Flesch-Kincaid readability** — widely implemented (textstat Python library, readable.com API). Simple, well-understood metric. Limitation: doesn't capture conceptual complexity, only sentence/word length.
- **NLI-based semantic fidelity** — using models like DeBERTa-v3 for natural language inference. Check that the simplified text entails (and is entailed by) the original. This catches meaning drift.
- **Factual consistency** — harder. Jerry et al. mention it but don't detail the implementation. Medical fact-checking likely requires domain-specific verification (checking extracted entities against source). For non-medical domains, SelfCheckGPT or similar approaches provide a general mechanism.
- **Retry-with-feedback loops** — common in LLM pipelines (LangChain's retry logic, DSPy's optimisers). Quality gate failure → regeneration with the failure reason injected as additional prompt context.

## Relevance to project

Informs **two pipeline stages**:

1. **Adaptation rules** — after content adaptations are generated, quality gates verify them before rendering. This is a post-LLM, pre-render verification step.
2. **AI attribute reformulation** (LLM touchpoint 2) — per-item attribute reformulation at data time faces the same content quality problem. The quality gate mechanism (verify, retry, escalate) applies directly.

More broadly, quality gates address an open question in the pipeline: "how do you validate LLM output beyond schema validation?" Schema validation catches structural errors. Quality gates catch semantic errors. Together they cover the two failure modes of generated content: wrong shape and wrong meaning.

For intent-to-structure generation ([[milestones#O4c — Generated output can't be validated for semantic correctness|O4c]]): generated specs need both structural validation (schema) and semantic validation (do the chosen components make sense for the task?). The semantic validation is harder — Jerry et al.'s NLI-based approach suggests one direction: check that the generated UI's implied functionality entails the user's stated intent. This concept directly informs solution S20 (adaptation quality gates) in the OST.

## Open threads

- What are the right quality gates for UI *specification* (not just content)? Schema validation is necessary but not sufficient. Could you check that a generated spec "entails" the user's intent, analogous to NLI-based semantic fidelity?
- How expensive are quality gates? NLI inference is non-trivial (a separate model call). For per-item attribute reformulation, running quality gates on every reformulated value might be prohibitively expensive. Sampling strategies (check 10%, flag outliers) might be necessary.
- Human-in-the-loop escalation: Jerry et al. mention it as a fallback, but don't design the escalation UX. For the generative UI pipeline, escalation might mean showing the user a "low confidence" indicator on adapted content and letting them review — connecting to [[parallel-state-display]].
- **Quality gates as trust signals**: Pareek et al. (CHI '26) found that a dedicated critic agent (their V4 variant) boosted perceived trustworthiness specifically because it showed "the system is checking itself." Participants described it as making the system "not deceptive" and "self-aware about AI limitations." The parallel to quality gates is direct: if the pipeline runs verification checks (readability scoring, semantic fidelity, schema validation) and *surfaces the fact that it ran them* — even without showing full details — this signals self-checking behaviour that builds trust. The paper also found a tension: some participants experienced the critic as cognitively burdensome ("lot of information to digest") and a few found that exposing limitations reduced confidence. This suggests quality gate results should be surfaced as brief pass/flag indicators, not full verification reports, unless the user expands them. A "verified" badge with expandable detail is closer to the right pattern than a mandatory verification report.
