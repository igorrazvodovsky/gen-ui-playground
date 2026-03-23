---
type: concept
tags: [specification, generative-ui, data-model, model-evolution]
sources: ["sources/kumbang-variability-ontology"]
created: 2026-03-05
---
A product family model defines not a single product but a *space* of valid products. Each variation point — an optional component, an alternative subfeature, an attribute with multiple allowed values — is a dimension in this space. A specific product (a configuration) is a single point. The model's constraints carve away illegal regions, leaving only valid configurations. The design task shifts from "build this product" to "define this space, then navigate to a point in it."

## Context

Kumbang makes this explicit: a KumbangModel defines a set of valid KumbangConfigurations. The configurator tool helps users walk through the space by presenting choices, checking consistency after each one, and propagating deductions (if you pick parking assistance, the parking software component must be present). The user doesn't need to understand the full space — they make local choices and the system enforces global consistency.

This is the product-family version of a problem that appears everywhere in complex systems. A CSS design system defines a space of valid UIs. A Kubernetes manifest defines a space of valid deployments. A generative UI pipeline defines a space of valid interfaces for a given task.

The key insight is that the model is *generative* — it doesn't enumerate products, it defines the rules that produce them. This is exactly what a generative UI specification needs to do: not describe one interface, but describe the space of valid interfaces and let the user (or agent) navigate to the right one.

## Connections

- **Directly instantiates** [[high-dimensional-configuration-space]] — Kumbang's configuration space *is* a high-dimensional configuration space, but with formal constraints that prune invalid regions. The LAUI paper identified the problem (space is too large); Kumbang shows one solution (formal models + constraint solvers).
- **Supports** [[constraint-driven component selection]] — Kumbang's constraint language is a richer version of the ontology-driven selection rules. Beyond simple type→component mappings, it handles cross-cutting constraints ("if feature A is present, component B must be included"), cardinality bounds, and interface compatibility. These are exactly the kinds of rules needed to validate generated UI configurations.
- **Formalises what** [[ontology-driven UI generation]] does informally — ontology-driven generation parses a domain model and deterministically maps it to UI. Kumbang adds the variability dimension: the domain model defines a *family* of UIs, and the user's choices select which member of the family to render.
- **Relates to** [[software-as-data-structure]] — the configuration model is itself a data structure (Kumbang's textual language, or the UML profile). Like Varv's JSON specs, it's inspectable, modifiable, and machine-interpretable. The difference: Varv specs describe one application; Kumbang models describe a family.
- **Enables** [[gentle slope]] — a well-structured configuration space with good tooling lets users make local modifications (swap this component, enable this feature) without needing to understand global implications. The constraint solver handles consistency. This is the gentle slope for product-family variation: change what you want, the system tells you what's incompatible.
- **Extends** [[abstract-concrete-separation]] — a configuration model is abstract (defines what's possible); a configuration is concrete (defines what's actual). The abstract→concrete mapping is instantiation + constraint solving, not just binding.
- **Relates to** [[feature-component-duality]] — the dual-view structure means the configuration space has two projections: feature space (what the user sees) and component space (what the system builds from). Navigating in one projects into the other.

## Practical implementations

- **Kumbang Configurator** — the reference implementation. Reads a Kumbang model, presents variation points as a GUI, checks consistency via WCRL/smodels.
- **SAP variant configuration** — enterprise product configurators for manufacturing. Same principle: model defines valid products, configurator navigates the space.
- **CPQ (Configure, Price, Quote)** — configuration models for complex B2B products. Product rules define the valid configuration space.
- **IKEA kitchen planner** — a constrained configuration space: cabinet types × dimensions × door styles × handle options × worktop materials. The planner enforces compatibility rules (this cabinet requires this plinth, this worktop only fits these widths).
- **Terraform modules** — a module with variables defines a configuration space of infrastructure. `terraform plan` navigates to a specific configuration and validates it.
- **Design system theme tokens** — a theme defines a space: colour palette × typography scale × spacing scale × border radii × shadows. A specific theme configuration picks one point. Most systems don't validate combinations — they could.

## Relevance to project

This reframes the generative UI pipeline's output. Instead of generating a single UI spec (one point), the pipeline could generate a **configuration model** — a space of valid UIs for the user's task — and then provide tools to navigate that space.

The pipeline becomes:

```
User prompt
  → Task analysis (LLM)
    → Configuration model (schema + variation points + constraints)
      → Default configuration (LLM picks sensible defaults)
        → Rendered UI
          ↺ User customisation = navigating the configuration space
            → Constraint checking → updated UI
```

This directly addresses the malleability problem ([[milestones]]): user customisation isn't ad-hoc editing of a fixed spec — it's navigation within a well-defined space with guaranteed consistency. The system can explain *why* a change isn't possible ("if you remove this chart, there's no way to display the time-series data you asked for") because the constraints are explicit.

It also clarifies what the LLM needs to generate. Not just "a data model" but: entities + attributes + variation points (which components are optional, which have alternatives) + constraints (what combinations are valid). The variation points are where malleability lives.

- **Navigated via** [[generation-layer-as-customisation-surface]] — Min et al. (2026) show one way to make configuration space navigation concrete: each generation layer exposes a slice of the configuration dimensions as a partial UI. Rewinding to a layer is equivalent to selecting a dimension to adjust. The layer stack defines a traversal order through the configuration space — the designer chooses which dimensions users encounter first.

## Open threads

- How complex can a useful configuration model be before the user can't navigate it? Kumbang's car periphery example has ~30 types and dozens of constraints — manageable for an engineer, but a lot for an end user. The configurator UI matters enormously.
- Can an LLM generate configuration models from natural language? This is harder than generating a single spec — you need to infer what *should* vary, not just what the user asked for right now.
- How do you represent variation points in a json-render-compatible format? JSON Schema has `oneOf`, `anyOf`, `enum` — these could encode some variation points, but not cross-cutting constraints.
- What's the relationship between a configuration model and a design system? A design system is arguably a configuration model for UI: component types × variants × props = a space of valid UIs. The components' prop types *are* the variation points. The missing piece is cross-cutting constraints (this button variant only works with this card variant).
