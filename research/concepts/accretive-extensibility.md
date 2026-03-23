---
type: concept
tags: [user-agency, generative-ui, model-evolution]
sources: ["sources/varv"]
created: 2026-02-11
---
Software should be modified purely by addition — layering new definitions on top of existing ones — never by editing or replacing existing code. The existing system remains untouched; new behaviour emerges from the composition of old and new. Extension operators (inject, join, omit, pick) provide the composition mechanics, enabling mixin-like reuse without source modification.

## Context

Most software modification requires finding the right place in existing code and editing it. This is fragile (changes can break things), gatekept (you need access to source code and understanding of its structure), and monolithic (every change touches the same artefact). Varv inverts this: the event engine merges all concept definition files at runtime, with later definitions overriding earlier ones. To add an "assignee" field to a todo app, you create a new file with a new concept definition — the original todo files are never touched.

The key insight: if the runtime handles merging, extension becomes safe. You can disable an extension by removing the file. You can version extensions independently. You can share extensions across applications. And critically, you can experiment without fear — the original application is always recoverable.

This is the same principle behind CSS (later rules override earlier ones), database migrations (additive schema changes), and the open/closed principle in OOP — but applied to the entire application, not just one layer.

## Connections

- **Enables** [[gentle slope]] — accretive modification is less intimidating than editing existing code. Users can add a small concept definition file without understanding the whole system. Each addition is a small, reversible step.
- **Implements** [[tools-not-apps]] — tools compose by layering on top of each other, not by merging into a monolith. Each concept definition is a small, focused tool.
- **Enabled by** [[software-as-data-structure]] — accretive extension only works if the runtime can merge declarative definitions. Imperative code doesn't compose this cleanly.
- **Related to** [[pattern composition]] — patterns compose structurally (sub-patterns within patterns); accretive extensibility composes behaviourally (new definitions layered on existing ones). Both enable building complex systems from simpler parts without modification.
- **Relates to** [[concept-as-composition-unit]] — the "concept" is the unit that gets accretively extended. Extension operators act on concepts.
- **Contrasts with** traditional plugin/extension APIs — plugins require the original developer to anticipate extension points and build APIs. Accretive extension doesn't require anticipation; any property, action, or trigger can be overridden.
- **Tension with** [[guardrailed generative UI]] — accretive extension lets users add anything. Guardrails constrain what's valid. For generated UIs, you want accretive extension *within* guardrail boundaries.
- **Validated by** Meridian (Min & Xia, 2025) — end-user customisations in Meridian are spec overlays on the base attribute/view config. The base config is always recoverable. This is accretive extension applied to [[fluid-attributes]] configuration — a concrete production implementation of the principle. See [[fluid-attributes]].

## Practical implementations

- **CSS cascade** — later stylesheets override earlier ones; specificity rules determine merge order
- **Database migrations** — additive schema changes (add column, add table) that layer on top of existing schema
- **Webpack/Vite config merging** — plugin configs merged at build time
- **Git branches** — each branch is an accretive layer; merging combines them
- **Webstrates** — the platform Varv builds on; DOM synchronisation enables additive real-time editing
- **Feature flags** — enable/disable features additively without changing code
- **Firefox/Chrome extensions** — content scripts layer on top of existing web pages (though the extension API is the traditional anticipated-extension-points model)

## Relevance to project

This directly addresses the model evolution question: when a user modifies a generated UI, should the system edit the generated spec or layer a modification on top? Accretive extensibility argues for layering. The original generated spec remains as the base; user customisations are separate overlay files. This has powerful consequences:

1. **Regeneration safety** — if the user changes the prompt and the system regenerates, user customisations can be re-applied on top of the new base (assuming the overlay is compatible).
2. **Undo/versioning** — removing a customisation layer instantly reverts to the previous state.
3. **Sharing** — customisation layers can be shared independently of the base spec.
4. **Inspection** — you can see exactly what the user changed vs. what was generated.

For the pipeline: instead of a single json-render spec, the system could produce a base spec + a stack of overlay specs. The renderer merges them (like Varv's event engine merges concept definitions). User customisations are just another overlay.

## Open threads

- How does accretive extension interact with LLM regeneration? If the user changes the prompt and the LLM produces a new base spec, can overlays survive? This depends on whether overlays reference stable identifiers (concept names, property paths) or positional information (fragile).
- What's the right merge strategy for conflicting overlays? Varv uses "last definition wins" — is that sufficient for UI specs?
- Can the LLM itself produce overlays rather than full specs? ("Add a dark mode" → overlay that modifies theme tokens, not a complete new spec.)
