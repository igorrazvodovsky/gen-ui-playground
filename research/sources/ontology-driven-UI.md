---
title: "Ontology-driven user interface development: Architecture and development proposal"
authors: [Nunes, Farinelli, Felipe]
year: 2024
venue: "ONTOBRAS 2024"
type: literature
status: processed
---
## Core idea

Use OWL ontologies as the primary structural backbone for dynamically generating user interfaces. The system parses an ontology (classes, properties, relationships, cardinalities) and renders a UI that enforces domain semantics — so the interface itself prevents invalid data entry. The ontology isn't just a metadata layer; it's the runtime engine driving form generation, widget selection, and data validation.

## Key concepts

- **[[ontology-driven UI generation]]** — formal ontologies (OWL/RDF) replace simpler data schemas as the domain model driving UI generation. Richer than JSON schemas because they encode semantic relationships, class hierarchies, and formal constraints.
- **[[constraint-driven component selection]]** — ontological cardinalities and data types directly determine UI widget behaviour: `only` → dropdown, `some` → add button, `min 1` → required field, `exactly x` → fixed-count inputs. Deterministic, rule-based mapping from domain constraints to UI elements.
- Ontology reuse (BFO, IAO, OBI) — building domain ontologies on top of foundational ontologies promotes interoperability. ONTAE reuses established ontologies rather than inventing from scratch.
- JSON as intermediate representation — parsed ontology data is sent to the React frontend as JSON containing properties, related classes, subclasses, cardinalities, and data types. Strikingly similar to json-render's spec format.

## Technical approach

**Architecture**: OWL ontology → RDFLib parser (Python) → Flask web server → JSON API → React frontend → dynamic UI.

**Parsing pipeline**:
1. Ontology engineer builds OWL ontology in Protege
2. Flask backend loads OWL file using RDFLib
3. `/get_subclasses` route extracts class hierarchy — user navigates the ontology tree
4. `/get_class_details` route extracts properties, related classes, cardinalities, restrictions, data types for selected class
5. Results sent as JSON to React frontend

**JSON intermediate format** (for a single property):
```json
{
  "property": "http://purl.obolibrary.org/obo/R0_0001025",
  "label": "located in",
  "relatedClass": "academic space",
  "subclasses": [
    {"uri": "...", "label": "laboratory"},
    {"uri": "...", "label": "auditorium"},
    {"uri": "...", "label": "classroom"}
  ],
  "cardinality": "only"
}
```

**Cardinality → UI mapping rules**:
- `only` → dropdown (select one)
- `some` → add button (one or more)
- `min 0` → optional field
- `min 1` → mandatory field
- `max x` → add button capped at x
- `exactly x` → exactly x input fields rendered

**Data persistence**: Currently JSON file (planned: NoSQL — MongoDB/Neo4J). Persistence model maps ontology structure to storage.

**Limitations**: Only implements CREATE (not full CRUD). UX refinement needed. Ontology changes require backend restart.

## Extracted concepts

- [[ontology-driven UI generation]] — new
- [[constraint-driven component selection]] — new
- Updated: [[abstraction-to-concrete mapping]], [[model hierarchy]], [[specification-based rendering]], [[component catalog as schema]], [[structured vs unstructured tension]], [[shared data layer]], [[pattern-driven transformation]]
