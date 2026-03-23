---
type: concept
tags:
  - mapping
  - ontology
  - rules
  - component-selection
sources:
  - sources/ontology-driven-UI
  - sources/ontology-specification
  - sources/real-time-context-aware-IUI
created: 2026-02-08
---
Domain constraints (cardinalities, data types, class hierarchies) deterministically select which UI components to render and how they behave. No AI inference, no pattern matching — pure rule application. `only` cardinality → dropdown. `some` → add button. `min 1` → required field. `exactly 3` → three input slots. The mapping is mechanical: read the constraint, emit the component.

## Context

This is the ontology-driven counterpart to the pattern-based [[abstraction-to-concrete mapping]] from Seffah & Gaffar. Where patterns encode *design knowledge* ("for a search task, use a form + results list"), constraint-driven selection encodes *structural knowledge* ("for a property with cardinality `only` over a class with three subclasses, use a dropdown with three options").

The Nunes et al. paper implements these rules:

| Constraint | UI behaviour |
|---|---|
| `only` | Dropdown — select exactly one option |
| `some` | Add button — create one or more instances |
| `min 0` | Optional field |
| `min 1` | Required/mandatory field |
| `max x` | Add button capped at x entries |
| `exactly x` | Render exactly x input fields |
| Subclasses exist | Dropdown populated with subclass labels |
| Data property type `xsd:string` | Text input (with `xsd:maxLength` constraint) |
| Data property type `xsd:date` | Date input |

These rules are simple but powerful — they guarantee that the generated UI structurally matches the domain model. A user *cannot* enter data that violates ontological constraints, because the UI physically prevents it.

Compare this to the "Unambiguous Format" pattern from Seffah & Gaffar, which does the same thing at a smaller scale: String → text field, Date → three dropdowns, Boolean → checkbox. The ontology-driven approach generalises this from data types to the full range of ontological constraints.

The OADAPT specification paper (Freitas & Barcellos, 2025) provides a formal **UI component taxonomy** (UISCO) that classifies the target space of these mappings. The taxonomy has five top-level categories, each with subtypes:

| Category | Components |
|---|---|
| **Media** | Video, Image, Icon, Text |
| **Layout** | Table, Navbar, Breadcrumb, Pagination, Tab, Stepper, Carousel |
| **Alert** | Tooltip, Modal Dialog |
| **Form** | Text, Password, Dropdown, Checkbox, Radio Button, Datepicker, Button (Toggle, Submit, Menu, Icon, Expand/Collapse) |
| **Status Indicator** | Progress Bar, Progress Spinner, Badge |

This taxonomy was derived ontologically (from formal analysis of what UI components *are*) but converges almost exactly with how practical component libraries organise themselves — compare to Radix's categories (Form, Layout, Display, Feedback, Navigation) or MUI's (Inputs, Data Display, Feedback, Surfaces, Navigation, Layout). The convergence suggests that the categorisation reflects genuine structure in the UI domain rather than being an artefact of either approach.

## Connections

- **Specific form of** [[abstraction-to-concrete mapping]] — rule-based rather than pattern-based. More deterministic, less flexible.
- **Requires** [[ontology-driven UI generation]] — constraints come from parsed ontology
- **Reads from** [[domain-data-model]] — the domain data model's types, cardinalities, and semantic annotations are the input these rules operate on. Richer models enable more deterministic selection
- **Complementary to** [[pattern-driven transformation]] — patterns handle *task-level* mapping (what UI structure for "search"?), constraints handle *property-level* mapping (what component for this field?). Both are needed: patterns for macro structure, constraints for micro structure.
- **Produces inputs for** [[specification-based rendering]] — constraint-driven rules output component specs (type + props) that can feed into json-render.
- **Relates to** [[guardrailed generative UI]] — constraint-driven selection is inherently guardrailed. The ontology defines the constraint space; the rules map within it. No hallucinated components, no invalid combinations.
- **Strengthens** [[component catalog as schema]] — the catalog's prop schemas are the *target* of constraint mapping. If the catalog has a `Dropdown` with `options: string[]`, the constraint rule knows to populate it with subclass labels.
- **Extended by** [[context-driven adaptation]] — domain constraints select *which* component; user-context constraints select *which variant* or apply modifications (high contrast, larger targets, simplified layout). OADAPT's adaptation rules are a second layer of constraint-driven selection, parameterised by user profile rather than data model.
- **Pre-filtered by** [[operator-type-triad]] — before constraint rules run on data types and cardinalities, the operator type already narrows the component class. Action → no component (or status indicator); Interaction → input/selection controls; Manual → instructional display. Constraints refine within the class that the operator type selects
- **Extended to joint selection + layout by** [[optimisation-based-ui-adaptation]] — Stefanidi et al. (2022) extend constraint-driven selection from "which widget for this field?" to "which of these N candidate components should be displayed, at what level of detail, and in which position?" The constraints expand from data-type rules to include collision avoidance, cognitive load caps ([[cognitive-load-bounded-display]]), and context-dependent scoring. The single-field → single-component mapping becomes a many-candidates → optimal-subset selection.

## Practical implementations

- **react-jsonschema-form**: JSON Schema constraints → React form components. `enum` → dropdown, `required` → mandatory field, `minItems`/`maxItems` → array controls. The closest mainstream equivalent.
- **Formik + Yup / React Hook Form + Zod**: Schema validation libraries that *enforce* constraints but don't *select* components (that's left to the developer).
- **Django ModelForm**: Model field types → form components (CharField → TextInput, BooleanField → Checkbox, ForeignKey → Select).
- **Rails form helpers**: Model associations and validations influence form generation.
- **Airtable field types**: Single select, multiple select, linked records — field type determines UI component.
- **Google Forms**: Question type (multiple choice, checkboxes, dropdown, short answer) is manual constraint-driven selection.

## Relevance to project

This concept bridges the gap between "the LLM infers everything" (fragile) and "patterns dictate everything" (rigid). Constraint-driven component selection handles the **leaf-level mapping problem** — once you know the data type and cardinality of a field, the component choice is mechanical.

**Pipeline integration**:
```
User prompt
  → LLM task analysis → identifies entities, attributes, relationships
    → Schema/ontology generation → formal constraints (types, cardinalities)
      → Constraint-driven component selection → leaf-level component specs
        → Pattern-driven transformation → macro UI structure
          → json-render spec (combining pattern structure + component details)
            → Rendered UI
```

The key insight: **split the mapping into two layers**. Patterns handle *what sections of UI to create* (Search panel, Results list, Detail view). Constraints handle *what component to use for each field within those sections* (dropdown for location, date picker for scheduled time, required text for title).

This makes the LLM's job easier — it doesn't need to decide whether a location field should be a dropdown or a text input. The constraint rules handle that. The LLM focuses on higher-level decisions (task structure, section layout, information architecture).

**Default mapping table for json-render** (combining Seffah's "Unambiguous Format" + Nunes's constraint rules):

| Data shape | Constraint | json-render component |
|---|---|---|
| `string` | none | `TextInput` |
| `string` | `enum` | `Select` / `RadioGroup` |
| `string` | `maxLength < 100` | `TextInput` |
| `string` | `maxLength > 100` | `TextArea` |
| `number` / `integer` | none | `NumberInput` |
| `boolean` | none | `Checkbox` / `Toggle` |
| `date` / `datetime` | none | `DatePicker` |
| `array` | `maxItems: 1` | `Select` (single) |
| `array` | `maxItems: n` | `MultiSelect` / `CheckboxGroup` |
| `array` | unbounded | `List` with add button |
| `object` | none | `Card` / `Form` (nested) |
| `ref` to entity | `cardinality: one` | `Select` (populated from entity instances) |
| `ref` to entity | `cardinality: many` | `MultiSelect` / linked records |

This table is buildable *today* and would immediately improve the reliability of LLM-generated UIs by removing low-level component decisions from the LLM's responsibility.

- **Complemented by** [[fluid-attributes]] — constraint-driven selection determines *which component* renders an attribute (string → text input, enum → dropdown). Attribute-level customisation determines *which attributes appear* and *how they're framed* (raw price vs. price-per-night vs. "good deal" badge). The two operate at different levels: constraints handle component choice within a view; attribute customisation handles content choice across views. See [[fluid-attributes]].

- **Interaction-level counterpart**: [[presentation-pattern-taxonomy]] — Just-UI's simple patterns (Filter, Order Criterion, Display Set) are constraint-driven selections at the *interaction* level rather than the field level. A Filter pattern is selected when the entity has searchable attributes; an Order Criterion when it has sortable attributes. This adds a middle layer: field-level constraints select *components*, interaction-level constraints select *interaction capabilities*.

## Open threads

- What happens when constraints are ambiguous? (`string` with no length constraint — text input or text area? Depends on *semantic* context, not just type.)
- Can constraint rules be user-configurable? ("I prefer radio buttons over dropdowns when there are fewer than 5 options")
- How do constraint rules interact with design system conventions? Material UI might prefer `Chip` selectors where Radix prefers `RadioGroup` for the same constraint.
- Should constraint rules be soft defaults (LLM can override with good reason) or hard rules (always apply)?
- Performance: for large ontologies with hundreds of properties, does rule evaluation become a bottleneck?
- UISCO's component taxonomy is deliberately incomplete (marked `{incomplete}` at every level). How does a constraint rule handle a component type that doesn't appear in the taxonomy? This parallels the catalog extensibility question — both the constraint target space and the catalog need to grow together.
- **Kumbang's richer constraint language** (Asikainen et al., 2007) goes beyond simple type→component mappings. It adds cross-cutting constraints (`present($.software.parkingSW)` means "if parking assistance feature is selected, this component must exist"), cardinality-aware part definitions, interface compatibility rules, and implementation constraints linking features to components. See [[configuration-model-as-design-space]] and [[feature-component-duality]]. The Kumbang Constraint Language includes predicates like `cardinality(ref)`, `value(ref, attr)`, `present(ref)`, `instanceOf(ref, T)`, `connectedTo(ref1, ref2)` — a vocabulary for expressing UI configuration rules that goes well beyond what react-jsonschema-form or JSON Schema can handle.
