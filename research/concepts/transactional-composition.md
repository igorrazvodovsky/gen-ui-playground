---
type: concept
tags: [specification, component-mapping, generative-ui]
sources: ["sources/deja-vu"]
created: 2026-02-20
---
Independent concepts can be coordinated atomically by wrapping their components in a declarative transaction tag. The runtime handles two-phase commit across concept servers — the app developer just declares which actions should succeed or fail together. Security policies, consistency constraints, and multi-step workflows all emerge from transaction structure rather than being coded procedurally.

## Context

When multiple concepts need to act together (create a post AND initialise its score AND log the creation), there are two traditional approaches: (1) orchestration (a coordinator calls each service in sequence, handling rollback on failure), or (2) choreography (services react to events, eventually converging). Both require procedural logic.

Déjà Vu's `dv.tx` tag is a third approach: declarative coordination. Wrapping components `<dv.tx>` `<scoring.createScore>` `<authentication.authenticate>` `</dv.tx>` means: when the user triggers exec, both actions must succeed atomically. If auth fails, the score isn't created. The gateway implements this via two-phase commit: prepare all → commit all (or abort all).

The security implications are particularly interesting. There's no auth middleware, no role-based access control system. Instead, security is composed: including `authenticate` in a tx means the action requires authentication. Including `authorization.canPerform` means it requires specific permissions. The security model is visible in the template, not hidden in server configuration.

The constraint: every concept component has exactly two actions — `eval` (read, no side effects) and `exec` (mutate). This rigid action model is what makes declarative transactions possible. You can't wrap arbitrary code in a declarative transaction tag; you can wrap eval/exec actions.

## Connections

- **Enables** [[declarative-concept-binding]] — transactions are one of the binding mechanisms (alongside dataflow property bindings). They handle coordination where dataflow handles data passing.
- **Extends** [[UI composition]] — adds a coordination mechanism beyond visual composition and data sharing. Components can be *atomically coordinated* without knowing about each other.
- **Relates to** [[software-as-data-structure]] — transaction scope is declared in the template (data), not coded procedurally. The coordination logic is part of the inspectable specification.
- **Contrasts with** [[accretive-extensibility]] — Varv's accretive model says "just add new definitions, the runtime merges." Déjà Vu's transactions say "explicitly declare which actions go together." Accretive extension is implicit composition; transactions are explicit coordination. Both are needed: implicit for growth, explicit for consistency.
- **Relates to** [[guardrailed generative UI]] — transaction boundaries are a form of guardrail. They constrain what can happen together, preventing invalid partial states. For generated UIs, the LLM could declare transaction scopes as part of the spec, ensuring that generated workflows maintain consistency.

## Practical implementations

- **Database transactions** — `BEGIN` / `COMMIT` / `ROLLBACK` in SQL is the canonical transaction mechanism. Déjà Vu applies the same principle at the application level across independent services.
- **Saga pattern** — distributed systems use sagas (sequence of local transactions with compensating actions) for cross-service coordination. Déjà Vu's two-phase commit is simpler (no compensating actions) but less fault-tolerant.
- **React Suspense boundaries** — not transactional, but similar in spirit: a declarative wrapper that changes the runtime behaviour of enclosed components (loading states instead of atomicity).
- **HTML `<form>` elements** — a `<form>` groups inputs into a single submission. The form tag is a declarative transaction scope for user input.
- **Redux Toolkit's `createAsyncThunk`** — bundles multiple state mutations into a single dispatched action with pending/fulfilled/rejected states. Similar atomic guarantees for state management.

## Relevance to project

For the genUI pipeline, transactional composition addresses a gap the synthesis identified: cross-component coordination. The current model assumes components either share state (Varv/JELLY) or are independent (json-render). Transactions offer a middle ground: components remain independent but can be coordinated declaratively when needed.

Practical scenario: a generated "event planning" UI has separate concepts for scheduling, invitations, and location. When the user finalises an event, all three need to update atomically. Without transactions, a failure in one concept could leave the event in an inconsistent state (scheduled but invitations not sent).

For LLM generation, transaction scope is a natural thing to produce: "these actions should succeed or fail together" is a high-level intent that maps directly to a `tx` wrapper. It doesn't require the LLM to understand distributed systems — just to declare coordination intent.

The eval/exec constraint is worth noting: it limits the interaction model to "load data" and "submit action". This covers most CRUD workflows but struggles with real-time, streaming, or continuous interaction patterns. For the genUI pipeline, this constraint might be too rigid — but the principle (constrain the action model to enable declarative coordination) is sound.

## Open threads

- Does the genUI pipeline need transaction semantics? If the backend is a single data model (JELLY-style), transactions are database-level, not concept-level. Transactions matter most when concepts have independent backends.
- How do transactions interact with [[accretive-extensibility]]? Can you add new concepts to an existing transaction scope via overlay? This seems hard — the transaction boundary is structural, not additive.
- What's the right action model for generated UIs? Eval/exec is clean but limiting. CRUD (create, read, update, delete) is more expressive. Varv's arbitrary named actions are most flexible but hardest to coordinate.
