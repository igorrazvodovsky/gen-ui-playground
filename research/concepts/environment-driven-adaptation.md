---
type: concept
tags: [adaptation, user-context, specification]
sources: ["sources/ontology-specification", "sources/real-time-context-aware-IUI"]
created: 2026-03-11
---
Adaptation triggered by the **runtime environment** — volatile, system-sensed conditions rather than stable user declarations. Key dimensions: luminosity, connectivity, geolocation, noise level, time of day, input method, display size. These change during a session and trigger real-time adaptation independently of the user profile.

## Context

OADAPT's Context of Use Ontology (ContUsO) models the environment as a separate concern from the user. This matters because environment triggers adaptations regardless of who the user is — low luminosity → dark mode whether you're a novice or expert, sighted or not. The update frequency is fundamentally different from profile data: environment can change second-to-second (luminosity), while profile data (disability, experience level) is stable across sessions.

Input/output equipment is also environment context: keyboard, mouse, webcam, microphone, display, speaker. A user switching from desktop with mouse to mobile with touch triggers structural adaptation (responsive layout) and interaction adaptation (larger touch targets, different navigation patterns).

Stefanidi et al. (IEEE Access 2022) add a dynamic dimension: **cognitive load** as real-time environment. Stress reduces working memory capacity (Miller's 7±2 baseline drops under stress), so the number of displayed elements should decrease. This is a real-time adaptation that persistent user profiles can't capture — it requires sensing (or inferring from task context) the user's current cognitive state. See [[cognitive-load-bounded-display]].

## Connections

- **Part of** [[context-driven adaptation]] — environment adaptation is the volatile, sensed side. The stable, declared side is [[user-profile-adaptation]].
- **Extends** [[optimisation-based-ui-adaptation]] — Stefanidi et al.'s combinatorial optimiser jointly decides what to show, at what detail, and where, subject to constraints including cognitive load caps. Environment signals feed the optimiser's constraint set.
- **Relates to** [[cognitive-load-bounded-display]] — cognitive state is arguably the most important environmental signal, because exceeding working memory capacity doesn't just degrade UX — it actively degrades perception and decision-making.
- **Distinct from** [[inferred-user-model]] — the inferred model is about who the user *is* (demographics, expertise, preferences inferred from behaviour). Environment adaptation is about the *situation* (luminosity, device, connectivity). Different data sources, different update frequencies, different trust levels.

## Practical implementations

- **Responsive design**: Viewport width as context → layout adaptations. The most mainstream form.
- **CSS `prefers-*` media queries**: `prefers-color-scheme` (OS dark mode), `prefers-reduced-motion` (accessibility + environment).
- **Adaptive streaming** (Netflix, YouTube): Bandwidth sensing → video quality adaptation.
- **Auto-brightness**: Ambient light sensor → display brightness. The simplest environment adaptation.
- **Automotive HUDs**: Driving conditions (speed, alerts, navigation state) dynamically determine what information to display and at what priority.

## Relevance to project

Environment context adds a *real-time* input to the adaptation layer that the profile-based rules don't cover. For the genUI pipeline:

```
User profile → rule-based adaptation (stable, session-level)
Environment context → real-time adaptation (volatile, moment-to-moment)
```

Practical mapping of environment signals to adaptation:
- Low luminosity → Dark Mode, higher contrast
- High noise → Caption/visual feedback emphasis
- Mobile device → Touch-optimised layout, larger targets
- Low connectivity → Defer AI-reformulated attributes, cache aggressively
- High cognitive load → Reduce visible element count ([[cognitive-load-bounded-display]])

The challenge is *sensing*: unlike user profiles (which can be declared or imported from OS), environment signals require either browser APIs (viewport, media queries, connectivity API) or inference from interaction patterns (slower responses → possible cognitive load). The pipeline needs a sensor abstraction that feeds environment signals into the adaptation rule engine alongside the user profile.

## Open threads

- ContUsO is modelled in OADAPT's specification but few rules map environment → adaptation beyond the Alex scenario. What are the general rules? The mapping above is a starting sketch.
- How does environment adaptation interact with user profile adaptation? Low luminosity → Dark Mode, but the user has explicitly set Light Mode. Which wins? Priority rules are needed.
- Can environment sensing be standardised? Browser APIs cover viewport and some preferences, but cognitive load and noise level require custom sensing.
- How does the adaptation layer handle rapid environment changes? If luminosity fluctuates, does the UI flicker between modes? Debouncing/hysteresis needed.
