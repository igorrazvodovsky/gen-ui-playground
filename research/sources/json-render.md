---
title: "json-render"
authors: ["Vercel Labs"]
year: 2024
venue: "GitHub repository / documentation site"
type: literature
status: processed
url: "https://json-render.dev/docs"
updated: 2026-03-05
---

## Core idea

json-render is a schema-agnostic framework that bridges AI model outputs with safe, predictable UI rendering. It constrains generative systems to produce validated JSON specifications that map to pre-defined components across multiple platforms (React, Vue, React Native, Remotion, PDF, email, image). The core (`@json-render/core`) is deliberately IR-agnostic — it provides primitives to define catalogs and renderers for *any* JSON structure, not just its own built-in format.

## Key concepts

- **Component catalog**: A registry of allowed components with Zod-validated schemas — defines both the guardrails for what AI can generate and the system prompt via `catalog.prompt()`
- **Specification-based rendering**: UI described as a flat element map (`{root, elements}`) with `{type, props, children}` per element — optimised for AI generation and streaming
- **Schema agnosticism**: Core supports multiple IR formats — built-in flat tree, A2UI (Google), Adaptive Cards (Microsoft), AG-UI (CopilotKit), OpenAPI, and custom schemas
- **Two-way data binding**: `$state` reads state via JSON Pointer paths (RFC 6901); `$bindState` and `$bindItem` provide bidirectional binding — UI inputs write back to state
- **Reactive watchers**: State path changes trigger action chains automatically — enables cascading updates (e.g. country selection → load cities → reset city field)
- **Computed values**: `$template` for string interpolation, `$computed` for registered functions — derived values that update reactively
- **Streaming via JSON Patch**: JSONL-based progressive rendering using RFC 6902 patches — each line adds/replaces/removes at specific paths, enabling scoped updates without full regeneration
- **Guardrailed generation**: Schema validation + component whitelist + action constraints — AI declares intent by name, handlers implement it
- **Form validation**: 14 built-in validators + custom functions, with configurable trigger timing (change/blur/submit)
- **Code export**: `@json-render/codegen` converts specs to standalone framework code (React/Next.js) with zero runtime dependency
- **Generation modes**: "generate" (pure JSONL, no prose) and "chat" (conversational + inline JSONL patches)

## Technical approach

### Architecture (three-step workflow)

1. **Define catalog** — Register allowed components, actions, and functions with Zod schemas:
   ```javascript
   const catalog = defineCatalog({
     components: {
       Button: { props: z.object({ label: z.string(), variant: z.enum(['primary', 'secondary']) }), slots: ['default'] },
       Input: { props: z.object({ placeholder: z.string() }), description: 'Text input field' }
     },
     actions: {
       submit_form: { params: z.object({ formId: z.string() }), description: 'Submit a form' }
     },
     functions: {
       formatCurrency: { description: 'Formats a number as currency' }
     }
   })
   ```

2. **Define registry** — Connect abstract specs to platform implementations with action handlers:
   ```javascript
   const registry = defineRegistry(catalog, {
     components: { Button: MyButtonComponent, Input: MyInputComponent },
     actions: {
       submit_form: async (params, setState, state) => {
         const result = await fetch('/api/submit', { method: 'POST', body: JSON.stringify(params) });
         setState(prev => ({ ...prev, formResult: await result.json() }));
       }
     },
     functions: { formatCurrency: (args) => new Intl.NumberFormat('en-US', { style: 'currency', currency: args.currency }).format(args.value) }
   })
   ```

3. **Render specs** — Renderer processes the spec using the registry:
   ```javascript
   <Renderer spec={spec} registry={registry} />
   ```

### Spec format (flat element tree)

```json
{
  "root": "card-1",
  "elements": {
    "card-1": {
      "type": "Card",
      "props": { "padding": "md" },
      "children": ["heading-1", "input-1"]
    },
    "heading-1": {
      "type": "Text",
      "props": { "content": { "$state": "/user/name" } }
    },
    "input-1": {
      "type": "Input",
      "props": { "value": { "$bindState": "/user/email" }, "placeholder": "Email" }
    }
  }
}
```

The flat structure (elements keyed by ID, children as ID references) is optimised for AI generation and patch-based streaming — any element can be targeted by path without traversing a tree.

### Reactive state system

- **`$state`**: Read-only binding via JSON Pointer (`{ "$state": "/path" }`)
- **`$bindState`**: Two-way binding — component reads *and writes* to state path
- **`$bindItem`**: Two-way binding within `repeat` blocks for array elements
- **`$item`** / **`$index`**: Read current array element / index inside repeats
- **`$template`**: String interpolation with state references (`"Hello, ${/user/name}"`)
- **`$computed`**: Named function calls with mixed expression arguments
- **Watchers**: Declared on elements, fire actions when watched state paths change (reference equality). Enable cascading selects, derived state, cross-field synchronisation
- **Actions**: Named operations with typed params — handlers receive `(params, setState, state)`, can perform async work and mutate state

### Visibility and conditional logic

Six comparison operators (`eq`, `neq`, `gt`, `gte`, `lt`, `lte`) plus `not` negation. Implicit AND via arrays, explicit `$or` and `$and` for complex logic. Conditions can reference `$state`, `$item`, `$index`, and compare state-to-state.

### Streaming (JSONL + RFC 6902)

Two generation modes share the same patch mechanics:
- **Generate mode**: Pure JSONL — every line is a JSON Patch operation
- **Chat mode**: Prose first, JSONL patches inline — `pipeJsonRender` separates text from patches

Patch operations: `add`, `remove`, `replace`, `move`, `copy`, `test`. Paths use RFC 6901 JSON Pointer (e.g. `/elements/card-1/props`). This enables **scoped updates** — modify a single element's props without touching the rest of the spec.

### Schema agnosticism and protocol support

`@json-render/core` is deliberately format-neutral. Supported schemas:
- **Built-in**: Flat element tree (`root` + `elements` map)
- **A2UI**: Google's adjacency-list protocol — flat component list with ID references
- **Adaptive Cards**: Microsoft's platform-agnostic card format
- **AG-UI**: CopilotKit's agent-user interaction protocol
- **OpenAPI**: Dynamic form generation from API schemas
- **Custom**: Any JSON structure — define your own catalog and renderer

### Code export

`@json-render/codegen` provides utilities to convert specs to standalone code:
- `traverseSpec`, `collectUsedComponents`, `collectStatePaths`, `collectActions`, `serializeProps`
- Teams build project-specific generators targeting their framework (Next.js, Remix, etc.)
- Exported code has **zero json-render runtime dependency** — components receive data as props

### Package ecosystem

- `@json-render/core`: Schema-agnostic catalog, validation, prompt generation, streaming compiler
- `@json-render/react`: React renderer, hooks (`useUIStream`, `useStateStore`, `useFieldValidation`), providers
- `@json-render/vue`: Vue renderer
- `@json-render/react-native`: React Native renderer
- `@json-render/react-pdf`: PDF renderer
- `@json-render/react-email`: Email renderer
- `@json-render/image`: Image generation renderer
- `@json-render/remotion`: Video timeline renderer
- `@json-render/shadcn`: Pre-built shadcn/ui component registry
- `@json-render/codegen`: Spec-to-code export utilities

## Extracted concepts

Created:
- [[specification-based rendering]] — representing UI as declarative JSON specs vs imperative code
- [[component catalog as schema]] — using catalog as both validation schema and constraint mechanism
- [[guardrailed generative UI]] — safety mechanisms that make AI-generated interfaces production-ready
- [[streaming specification compilation]] — progressive rendering from partial JSON during generation

Concepts that need creation or updating based on docs review (2026-03-05):
- **Reactive spec state** — `$bindState`, watchers, and the action/setState loop create a genuine reactive system within the spec. Extends [[specification-based rendering]] significantly. Relevant to [[json-document-backed-components]].
- **Schema-agnostic rendering core** — the core's ability to support A2UI, Adaptive Cards, AG-UI, and custom formats means it's not locked to one IR. Relevant to [[semantic-intermediate-layer]] and multi-level IR discussions.
- **Spec-to-code export** — converting generated specs to standalone framework code. Relevant to the "generated UIs are disposable" problem — exported code is *not* disposable.
- **Scoped patch updates** — RFC 6902 JSON Patch enables targeting individual elements by path. Relevant to [[streaming specification compilation]] and scoped semantic editing.

## Relevance to project

json-render now covers more of the target pipeline than initially assessed:

**What it provides:**
- Validated JSON-to-component rendering across 8 platforms
- Safety guardrails for production deployment
- Streaming via JSON Patch (scoped updates, not just append)
- **Two-way data binding** — `$bindState` + watchers + actions create a reactive loop within the spec
- **Schema-agnostic core** — can host multiple IR formats, not locked to one
- **Code export** — specs can become standalone code, addressing disposability
- **Form validation** — built-in + custom validators
- **Multiple generation modes** — pure generation vs conversational

**What it still doesn't provide (genuine gaps):**
- **Task analysis → spec generation**: Nothing generates the initial spec from user intent. The upstream pipeline (user prompt → task model → spec) is entirely absent.
- **Task-driven data model**: State is flat key-value, not a structured task model with dependencies and domain semantics. No concept of a task that *evolves*.
- **Model evolution**: No mechanism for the spec/state to restructure when user requirements change — only incremental patches to an existing structure.
- **Mapping rules**: No intelligence about which component types suit which data types. The catalog defines what's *allowed*, not what's *appropriate*.

**Revised gap assessment:**
- Two-way binding: **largely addressed** by `$bindState` + watchers (local reactive loop works; missing persistent task model feedback)
- Scoped editing: **infrastructure exists** via JSON Patch (RFC 6902 targeting specific paths; not a user-facing editing tool)
- Multi-level IR: **partially addressed** by schema agnosticism (can host different formats; no built-in abstraction hierarchy between them)
- Code export: **new capability** addressing disposability concern
- Task→spec generation: **still fully open**
- Model evolution: **still fully open**
