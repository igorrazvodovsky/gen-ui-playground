---
type: concept
tags: [specification, component-mapping, architecture, data-model]
sources: ["sources/kumbang-variability-ontology"]
created: 2026-03-05
---
A system can be described from two distinct perspectives that must stay linked: **features** (what the user sees and cares about — capabilities, behaviours, characteristics) and **components** (what the system is built from — modules, services, libraries). Features and components don't map one-to-one. A single feature may require multiple components; a single component may serve multiple features. Implementation constraints bridge the two: "if feature X is selected, components Y and Z must be present."

## Context

Kumbang unifies two previously separate modelling traditions. Feature modelling (FODA and successors) describes variability from the user's perspective: a car has Transmission (Manual or Automatic) and optionally Air Conditioning. Architecture modelling (Koala, xADL) describes variability from the builder's perspective: the system has a Software component containing SensorSW and optionally PreCrashSW. Both are needed because they serve different stakeholders: features are the sales/user view; components are the engineering view.

The bridge between them is implementation constraints. In Kumbang's running example, the feature type ParkingAssistance has the constraint `present($.software.parkingSW)` — meaning that if parking assistance is selected as a feature, the parkingSW software component must exist in the architecture. This is a formal cross-view dependency.

Most modelling approaches pick one view and ignore the other. Feature models don't say how features are implemented. Architecture models don't say what user-visible capabilities components provide. Kumbang's contribution is insisting both views exist and are formally linked.

## Connections

- **Informs** [[task-interface-duality]] — JELLY's task-interface duality is a generative-UI version of the same split. Tasks are what the user wants to accomplish (features); the interface is how the system presents tools for accomplishing them (components). The mapping between them is the generation step.
- **Extends** [[model hierarchy]] — Seffah & Gaffar's model hierarchy has domain models (roughly features) and presentation models (roughly components), with task and dialog models mediating. Kumbang's duality maps to the top and bottom of this hierarchy, with implementation constraints as the connecting tissue.
- **Relates to** [[abstract-concrete-separation]] — features are more abstract (user-facing, platform-independent); components are more concrete (implementation-specific). But this isn't the same split — Varv's abstract/concrete separation is about *modality* (semantic action vs. input binding), while feature/component duality is about *perspective* (user vs. builder).
- **Constrains** [[concept-as-composition-unit]] — Varv's concepts blend features and components into a single unit (a concept has both behaviour semantics and view bindings). This is convenient but hides the duality. When you need to ask "what components implement this feature?" or "what features does this component serve?", the blended representation makes it harder.
- **Supports** [[configuration-model-as-design-space]] — the dual-view structure means the configuration space has two projections. The user navigates feature space (I want parking assistance); the system simultaneously navigates component space (include parkingSW, connect to sensorSW). Constraints ensure the projections stay consistent.
- **Relates to** [[ontology-driven UI generation]] — OADAPT's ontology network separates domain knowledge (what exists) from UI component knowledge (UISCO taxonomy) from adaptation rules (how to map between them). This is a three-way version of the duality: domain features, UI components, and bridging rules.

## Practical implementations

- **Feature flags + microservices** — feature flags represent user-visible capabilities; microservices represent components. A feature flag system like LaunchDarkly manages which features are active; the deployment system manages which services are running. The link: enabling a feature may require deploying additional services.
- **App store capabilities + frameworks** — iOS capabilities (push notifications, HealthKit, Maps) are features; frameworks (UserNotifications, HealthKit.framework, MapKit) are components. The Info.plist declares which capabilities the app uses; Xcode links the required frameworks.
- **Figma components + React components** — design components in Figma represent visual features (what the user sees); React components represent implementation (how it's built). They often don't map one-to-one: a Figma "Card" might be implemented as three React components; a React "useAuth" hook serves multiple Figma screens.
- **User stories + code modules** — in agile: user stories describe features from the user's perspective; code modules describe the implementation. A story may touch multiple modules; a module may serve multiple stories. The traceability matrix is the implementation constraint.

## Relevance to project

For the generative UI pipeline, this duality suggests the intermediate representation needs two faces:

1. **Feature face** — what the user asked for, in terms they understand. "I want to track tasks with priorities and deadlines, filter by status, and see a calendar view." These are features.
2. **Component face** — what the system will build from its component catalog. "TaskList component bound to tasks array, FilterBar with status enum, CalendarView bound to deadline field." These are components.

The LLM's job spans both: understand the user's feature requests, then map them to component specifications. Currently the pipeline tries to do this in one step (prompt → UI spec). Kumbang suggests making it two explicit steps with a bridging layer:

```
User features → Feature model (what varies, what's required)
Feature model → Component spec (via mapping rules + constraints)
```

This makes the system more inspectable — the user can see and modify their feature model ("actually, I don't need the calendar view") without needing to understand the component layer. The constraint system ensures that removing a feature properly removes its dependent components.

It also clarifies where LLM reasoning is needed (understanding user features, inferring variation points) versus where deterministic rules suffice (mapping features to components via constraints).

## Open threads

- How fine-grained should features be? Kumbang's features are coarse (ParkingAssistance, PreCrash). JELLY's task-driven data model is finer-grained (individual entity attributes). The right granularity for generative UI probably sits between them.
- Can the feature→component mapping be learned rather than hand-authored? If you have enough examples of "user wanted X, system built Y", an LLM could infer the mapping rules.
- Does this duality matter for simple UIs? A single-purpose form probably doesn't need separate feature and component views. The duality becomes important when the UI is complex enough that features cross-cut components — dashboards, multi-view interfaces, workflows.
- How does feature evolution (user changes their mind) propagate to the component layer? Kumbang's configurator handles this by re-checking constraints. The generative UI pipeline would need something analogous — change a feature, re-validate the component spec, regenerate affected sections.
