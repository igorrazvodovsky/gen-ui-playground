---
type: concept
tags: [user-agency, generative-ui, intent, model-evolution]
sources: ["[[sources/semantic-commit|Semantic Commit (Vaithilingam et al., UIST 2025)]]"]
created: 2026-03-06
---
Users want to see what will be affected by a change *before* the AI proposes any modifications. The most surprising finding from SemanticCommit: half the participants adopted an "impact analysis first" workflow — clicking "Check for Conflicts" to surface affected items, then resolving conflicts locally, without ever using the global "Make Change" option. They preferred to *foresee* impact over having the AI *generate* solutions. This is the feedforward principle: show the context of what one is planning to communicate before the change is made.

## Context

The dominant pattern in AI-assisted editing is generate-then-verify: the AI makes changes and the user reviews them after the fact. Cursor applies changes across files, then presents diffs. Canvas rewrites the document, then shows what changed. SemanticCommit inverts this by separating two operations that most systems conflate:

1. **Retrieval/detection**: find what existing information is relevant to or potentially conflicted with the new input
2. **Generation/resolution**: propose how to modify the conflicting items

The study found that when given both options (Check for Conflicts vs. Make Change), 6/12 participants *always* started with detection only. They wanted the map of the blast radius before any bombs went off. This preference held even when global changes were available — participants used global changes to get an overview, then immediately switched to local resolution.

The SE literature calls this **impact analysis**: predicting what parts of a system will be affected by a proposed change before carrying it out. Software engineers use it to plan, schedule, and resource changes. Vaithilingam et al. apply the same principle to natural-language knowledge stores: before committing new information, show the user which existing items are potentially affected, at what degree (direct conflict, ambiguous, unrelated).

Critically, the study found **no significant increase in perceived workload** despite the additional review steps. The benefits of control offset the cost of manual review. Participants felt more in control, identified conflicts better, and completed tasks faster with SemanticCommit (4:07 vs. 5:41 for Canvas). More control didn't mean more work — it meant more *directed* work.

## Connections

- **Instantiates** [[cognitive-engagement-for-reliance]] — impact analysis is exactly the "driver analysis" phase Raees et al. describe: users explore what's at stake before committing to action. SemanticCommit provides the first empirical evidence that this kind of pre-decision engagement calibrates reliance without increasing perceived workload.
- **Extends** [[semantic-intermediate-layer]] — Park et al.'s semantic layer shows the AI's interpretation before generation. Impact analysis shows the *consequences* of the user's input before integration. Both are feedforward mechanisms, but at different pipeline stages: semantic layer is pre-generation; impact analysis is pre-modification.
- **Supports** [[interaction-as-intelligence]] — the impact analysis step isn't overhead; it's where the user builds understanding of the knowledge store's structure. Several participants reported discovering conflicts they hadn't anticipated, which led to better decisions. The interaction produced intelligence that pure automation would have missed.
- **Relates to** [[augmented-semantics]] — augmented semantics extract what the AI *did* from generated output (post-hoc analysis). Impact analysis shows what the AI *will affect* before acting (pre-hoc analysis). Both make consequences visible, but at different temporal points. Pre-hoc is more useful because the user can redirect before committing.
- **Connects to** [[adaptive-autonomy]] — the three workflow patterns (impact first, immediate changes, skim false positives) are self-selected autonomy levels. Users naturally calibrate how much AI involvement they want based on the complexity and stakes of the integration task.
- **Supports** [[gentle slope]] — "Check for Conflicts" is a lower-commitment action than "Make Change." It adds a rung to the slope: view impact → review conflicts → resolve locally → apply globally. Each step requires more commitment and grants more control.
- **Tension with** [[alignment-cost-tradeoff]] — impact analysis adds latency and interaction cost. For low-stakes, non-conflicting additions, it's overhead. The paper notes participants found it "overkill" when few conflicts were detected. A smart system would skip impact analysis when the predicted conflict count is low — which requires estimating conflict density before running full detection.

## Practical implementations

- **SemanticCommit** (Vaithilingam et al., UIST '25) — the primary implementation. Check for Conflicts (detection only) vs. Make Change (detection + resolution). KG-based retrieval with three conflict degrees.
- **Git diff/status** — the original impact analysis: `git diff` shows what will change before `git commit` makes it permanent. The analogy to "semantic commit" is deliberate.
- **IDE impact analysis** (Wolf, 2012) — dependency graphs showing which code will be affected by a proposed change. Visual feedback before the developer acts.
- **InkSync** (Laban et al., UIST '24) — shows LLM edits as diffs on a document. Diff-based, not conflict-based, but shares the principle of making changes visible before acceptance.
- **Figma's inspect mode** — shows what properties will change before applying a style update across components.

## Relevance to project

For the generative UI pipeline, impact analysis applies at two points:

1. **Intent specification updates**: when the user modifies a generated UI (e.g., switching from cards to a table), this is an implicit preference update. Before committing it to the persistent [[intent-specification-as-common-ground]], the system should show what existing preferences this contradicts or supersedes. "You previously preferred cards for product listings. This change would override that preference for this data type. Proceed?"

2. **Specification modification**: when the user edits the semantic specification or pattern selection for a generated UI, impact analysis should show what downstream components will be affected. Changing a data model attribute type from "currency" to "percentage" ripples through formatting rules, sort behaviour, and component selection. Showing this cascade *before* regenerating the UI catches unintended side effects.

The "start global, then accelerate local review" finding has a direct UX implication: the pipeline's modification interface should offer both an overview (what's affected?) and local resolution (fix this specific item). Not a modal choice between the two — users naturally flow from overview to local.

The conflict degree classification (direct / ambiguous / non-conflict) maps to the [[graduated-ambiguity-tolerance]] concept: not all conflicts require the same level of user attention. Direct conflicts need resolution; ambiguous ones need review; non-conflicts need nothing. Colour-coding or sorting by degree lets users triage efficiently.

## Open threads

- How does impact analysis compose with [[uncertainty-driven-elicitation]]? When the system is uncertain about whether something is a conflict (ambiguous classification), should it proactively ask the user? Or is the ambiguous-coloured highlight sufficient?
- What's the latency budget? SemanticCommit's KG-based detection adds processing time. For real-time UI generation, impact analysis needs to be fast enough not to break flow. Could a lightweight pre-check (estimated conflict count) gate whether full analysis runs?
- The paper focuses on text-based intent specifications. For UI generation, conflicts are multimodal: a layout preference might conflict with an accessibility rule, a colour choice might conflict with a brand constraint. Semantic conflict detection would need to operate across specification types, not just within a single document.
- Conflict cascades: resolving one conflict can create new ones. The Mars → Venus example showed second-order effects (sandstorms don't exist on Venus). How deep should the cascade analysis go? Is there a practical limit to multi-hop conflict detection?
