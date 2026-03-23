---
type: concept
tags: [user-agency, generative-ui, specification]
sources: [sources/interactive-ai-alignment]
created: 2026-03-06
---
Achieving full alignment between user and AI before any action is taken would be ideal but is often impractical. The cost of specifying, confirming, and refining every detail upfront can exceed the cost of generating an imperfect result and fixing it. The design challenge isn't maximising alignment — it's enabling *appropriate levels* of alignment at each stage without hindering task progression.

Three temporal modes for alignment: **prospective** (before action — full specification upfront), **in tandem** (specification is provided alongside generation), and **retrospective** (specification emerges after the output, as a summary of what was done). Different stages of a pipeline warrant different modes depending on cost of errors, reversibility, and user expertise.

CoPilot exemplifies the low-cost retrospective approach: generate code inline, let the user accept or dismiss with a keystroke. The cost of a wrong suggestion is near-zero (one Tab press vs. one Esc press), so full prospective alignment would be wasted effort. By contrast, safety-critical or irreversible actions demand prospective alignment — you need to know what the system will do before it does it.

## Context

Previous papers in the vault (IntentFlow, Park et al., NeuroSync) all advocate for intermediate checkpoints — prospective alignment mechanisms. This concept provides the counterweight: not every decision deserves a checkpoint. The art is in knowing which decisions are high-stakes enough to warrant prospective alignment and which can be handled retrospectively.

## Connections

- Tensions with [[semantic-intermediate-layer]] — the semantic layer is a prospective alignment checkpoint. For simple tasks, it may be overhead. The cost-tradeoff principle suggests the semantic layer should be *available* but not *mandatory*
- Tensions with [[intent-decomposition]] — same argument. IntentFlow decomposes intent before generation. For tasks where the user's prompt is already clear, decomposition is wasted interaction cost
- Supports [[graduated-ambiguity-tolerance]] — the tag system lets users specify precisely where they care and leave other dimensions vague. This is alignment-cost-tradeoff in action: invest alignment effort only where it matters
- Relates to [[adaptive-autonomy]] and [[dynamic-cooperation-willingness]] — users want different alignment levels at different task phases. Early phases may warrant prospective alignment; later refinement phases can be more retrospective
- Connects to [[gentle slope]] — the slope should let users *choose* their alignment level. Power users may want full prospective specification; novices may prefer generate-first-refine-later

## Practical implementations

- GitHub CoPilot: retrospective alignment (generate → accept/dismiss)
- Midjourney: retrospective + iterative (generate → review → vary/upscale)
- Google Docs Smart Compose: in-tandem alignment (suggestions appear as you type)
- Traditional form wizards: prospective alignment (fill in all fields before submit)

## Relevance to project

The pipeline's current design leans heavily prospective: prompt → intent decomposition → semantic layer → pattern selection → generation. Each arrow is a potential checkpoint. But the cost-tradeoff principle says some of these checkpoints should be *optional* or *progressive*:

- **Simple tasks** ("show me a to-do list"): skip intent decomposition and semantic review. Go straight to generation. Offer retrospective alignment via in-place editing and scoped modifications.
- **Complex tasks** ("build a CPQ configuration wizard for channel B"): full prospective alignment through intent decomposition, knowledge-grounded validation, and semantic review before generation.
- **The trigger**: task complexity, user expertise, and reversibility determine which mode applies. This could be a decision the system makes (risky — another alignment problem) or a user preference (safer — the user chooses their checkpoint density).

This connects directly to the progressive disclosure solution (S16 in the solution tree): auto-generate a reasonable default, expose the alignment checkpoints on demand.

## Open threads

- How does the system determine when prospective alignment is worth the cost? Heuristics (task complexity estimation)? User preference settings? Or always offer both paths?
- If the system generates first and offers retrospective alignment, the user needs good evaluation alignment to know *what to fix*. Cheap generation shifts the burden from specification to evaluation — are the evaluation mechanisms strong enough?
- There's a feedback loop: if the system consistently gets it right, users will trust it and prefer retrospective alignment. If it frequently fails, users will demand prospective checkpoints. The alignment mode should adapt to the system's empirical success rate.
- **Correctness criteria are not static** — Grunde-McLaughlin et al. (2026) found that users change what "correct" means during task verification. They discover new criteria, refine existing ones, and resolve initial ambiguities as they inspect the output. This means alignment cost calculations can't be based on a fixed correctness definition — the evaluation criteria are themselves part of the alignment problem. For retrospective alignment especially, the system must accommodate *emergent* evaluation, not just checkpoint-based verification against a pre-stated spec.
