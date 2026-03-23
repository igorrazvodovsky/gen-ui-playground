---
title: "Déjà Vu: A Declarative and Composable Approach for Building Web Applications from Predefined Concepts"
authors: [Santiago Perez De Rosso, Daniel Jackson]
year: 2019
venue: "MIT CSAIL Technical Report"
type: literature
status: processed
---
## Core idea

Web applications can be built by assembling full-stack "concepts" — self-contained, reusable services (frontend + backend + storage) — through a declarative HTML-like template language. Concepts share nothing by default; integration happens via shared identifiers and dataflow bindings declared in the template. Atomic coordination across concepts uses declarative transaction wrappers. No procedural glue code.

## Key concepts

- **[[concept-as-composition-unit]]** — Déjà Vu implements concepts as heavyweight full-stack modules (not just data structures as in Varv). Each concept is an independent service with its own GUI widgets, server, and database.
- **[[declarative-concept-binding]]** — composition happens in the template language via I/O property bindings (`(someOutput)="someInput"`) and shared identifiers. The template IS the app's architecture — no separate wiring layer.
- **[[identity-based-data-integration]]** — concepts don't share data directly. They share identifiers. Each concept maintains its own data; shared IDs create implicit associations across concept boundaries.
- **[[transactional-composition]]** — wrapping concept components in `dv.tx` tags causes their exec actions to run atomically via two-phase commit. Security and consistency emerge from transaction structure.
- **[[concept-catalog]]** — a library of 18 generic concepts (Authentication, Authorization, Comment, Event, Label, Property, Scoring, Task, Transfer, etc.) that cover common web app needs.

## Technical approach

**Architecture**: three layers — (1) concept implementations (self-contained npm packages, each with a GraphQL server + optional Mongo/filesystem backend + Angular frontend widgets), (2) a gateway that routes requests and coordinates transactions across concept servers, (3) an app-level template that declares how concepts compose.

**Concept action model**: every concept component has exactly two actions — `eval` (read data, no side effects) and `exec` (mutate data). This constraint enables transactional guarantees: `eval` runs on load, `exec` runs on user action.

**Binding mechanism**: concept components expose input and output properties. The app template binds outputs of one component to inputs of another using Angular-style syntax: `(conceptA.output)="conceptB.input"`. A platform function (`generateId`) creates shared IDs that flow to multiple concepts, linking their data implicitly.

**Transactions**: `dv.tx` tags wrap multiple concept components. On exec, the gateway runs two-phase commit across all concept servers in the transaction scope. This gives atomicity without concepts knowing about each other. Security is achieved by including an `authenticate` concept in a tx — the transaction only commits if auth succeeds.

**Evaluation**: replicated 12 student web app projects. 8 were built entirely from the 18-concept catalog; remaining 4 needed custom concepts. Average code reduction: apps averaged ~400 lines (mostly template), vs. originals averaging thousands. 5 new generic concepts were extracted from the custom ones.

## Extracted concepts

- Created: [[declarative-concept-binding]], [[identity-based-data-integration]], [[transactional-composition]], [[concept-catalog]]
- Updated: [[concept-as-composition-unit]], [[UI composition]], [[pattern composition]], [[accretive-extensibility]]
