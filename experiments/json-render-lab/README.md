# json-render-lab

First runnable experiment for the repository.

## Question

Can one reusable `json-render` spec project several domain-task states clearly enough to justify building the rest of the pipeline on top of it?

## Scope

- hand-authored spec
- hand-authored state fixtures
- no model generation
- no persistence
- no backend integration

## Run

```bash
npm install
npm run dev:json-render
```

## What to inspect

- Does the same spec read well across multiple task states?
- Is the state/spec view legible enough for agents to reason about?
- What parts of the UI obviously need stronger component semantics or two-way binding next?

