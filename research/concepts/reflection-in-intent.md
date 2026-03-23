---
type: concept
tags: [intent, user-agency, generative-ui]
sources: [sources/ai-instruments.md]
created: 2026-02-20
---
The AI surfaces the latent structure of the user's own intent back to them — not as a summary or confirmation, but as a decomposed, manipulable representation. The user sees what the system thinks they meant, broken into visible dimensions they can inspect, correct, and adjust. This makes the user's intent legible *to themselves*, not just to the AI.

## Context

Users routinely underspecify intent. "Make me a task tracker" carries implicit assumptions about complexity, layout, colour, collaboration scope, and dozens of other dimensions the user hasn't articulated — often because they haven't thought about them. Without reflection-in-intent, these implicit decisions are made by the AI invisibly, and the user only discovers mismatches in the output.

Henry Riche et al. implement this through Fragments: the LLM parses a prompt into [type, value] pairs and renders each as a card. The user sees "oh, the system extracted [Mood: Serene] and [Palette: Earth tones] — actually, I wanted something more vibrant." The reflection happens *before or during* generation, not after. This is the input-facing mirror of [[augmented-semantics]], which makes the AI's *output* interpretable.

The distinction from a simple "did you mean...?" confirmation: reflection-in-intent shows *structure* (here are the dimensions of your request) not just content (here's my paraphrase of your request). Structure enables manipulation — you can lock one dimension and vary another. Confirmation is binary; reflection is navigable.

## Connections

- Mirror of [[augmented-semantics]] — augmented semantics extract what the AI *did* and map it to human vocabulary. Reflection-in-intent extracts what the user *said* and maps it to visible dimensions. Together they close the loop: user intent → visible structure → generation → visible analysis → targeted refinement.
- Extends [[intent-decomposition]] — IntentFlow also decomposes intent into visible structure (Goal → Intents → Dimensions). The conceptual principle is the same. IntentFlow's contribution is the specific three-level hierarchy and typed controls; AI-instruments' contribution is reifying the decomposition as persistent, composable interface objects ([[prompt-as-interface-object]]).
- Enables [[scoped-semantic-editing]] — once intent is decomposed into visible dimensions, the user can edit at the dimension level rather than re-prompting the whole thing. This is scoped editing applied to the *input* rather than the *output*.
- Supports [[gentle slope]] — reflection makes intent navigable rather than opaque. Users can start by viewing the reflection (zero effort), then progress to correcting it (low effort), then to manipulating it creatively (higher effort).
- Complements [[semantic-intermediate-layer]] — Park et al.'s semantic layer reflects the *design interpretation* (Product, Design System, Feature, Component). Reflection-in-intent reflects the *task intent* (what does the user want, decomposed into dimensions). Different layers of the same transparency problem.
- Partially addresses [[inferred-user-model]] — some reflected dimensions implicitly surface the system's assumptions about the user (e.g., inferring [Complexity: Simple] reflects an assumption about user expertise).

## Practical implementations

- **IntentFlow** (Kim et al., CHI 2025) — the most developed implementation: three-level decomposition with typed UI controls.
- **Midjourney's `/describe`** — reverse image-to-prompt, a crude form of reflection (shows what the AI sees in an image, not what the user intended, but demonstrates the mirroring principle).
- **GitHub Copilot's inline suggestions** — implicitly reflect the AI's interpretation of code intent, though not decomposed into editable dimensions.
- **Notion AI's "Continue writing" with adjustable tone/length** — nascent reflection: the system surfaces a few dimensions (tone, length) for user control.

## Relevance to project

For the genUI pipeline, reflection-in-intent should happen at the first touchpoint. When a user says "build me a project dashboard," the system should reflect back: here's what I extracted — [Domain: Project management], [Primary action: Track progress], [Data entities: Projects, Tasks, Team members], [Visualisation style: Overview with drill-down], [Complexity: Moderate]. Each dimension becomes an editable control. The user corrects before the system proceeds to pattern selection and spec generation.

This is architecturally distinct from just "confirming the spec." The reflection should happen *before* the pipeline runs, on the raw intent — not on the already-transformed output. It catches misunderstandings at the cheapest point to fix them.

- **Extended by** [[meta-intent-elicitation]] — Gmeiner et al. (CHI '25) identify a step beyond reflection: the system doesn't just mirror what the user said but helps them discover what they *could* say. Tag suggestions, drop-down alternatives, and opposite sliders expand the user's awareness of the decision space. Reflection shows existing intent; meta-intent elicitation generates new intent.
- **Implemented by** [[intent-tag-as-micro-prompt]] tag grounding acts — IntentTagger's "grounding from slide" feature extracts tags from an existing slide's content, style, and sources, presenting implicit creative decisions as discrete editable tags. This is reflection-in-intent applied to *existing content*, not just to a prompt.

- **Validated as scaffolding by** Pareek et al. (CHI '26) — their study found that when multi-agent interfaces surfaced individual agent rationales (V3: "Agents Explain"), participants used them as "raw materials" to build their own reasoning rather than deferring to the system. One participant: "Reading each explanation is useful [...] to build my own reasoning." Another: "Although I'm asking the chatbot my question, I'm not handing [it] the agency and autonomy 100%." This is exactly the scaffolding function reflection-in-intent serves: the visible decomposition isn't there for the user to passively accept, it's there for them to reason *with*. The paper also found that *unexplained* agent outputs (V2: answers without rationales) left users unable to engage — they could see the system's conclusion but not interrogate it. This reinforces that reflection needs to show *structure* (decomposed dimensions), not just *content* (a summary or paraphrase). Structure enables interrogation; content only enables acceptance or rejection.

## Open threads

- How deep should reflection go? IntentFlow extracts 5–10 dimensions for a writing task. A multi-entity UI task could have dozens. Overwhelming the user with too many reflected dimensions defeats the purpose. The ranking/progressive disclosure problem from [[intent-decomposition]] applies here too.
- Can reflection be incremental? Reflect on the most uncertain dimensions first, generate, then reflect on the next layer as context sharpens. This would interleave reflection and generation rather than front-loading it.
