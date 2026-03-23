---
title: "Kumbang: A domain ontology for modelling variability in software product families"
authors: [Timo Asikainen, Tomi Männistö, Timo Soininen]
year: 2007
venue: "Advanced Engineering Informatics"
type: literature
status: processed
---
## Core idea

A domain ontology that unifies feature-based and architecture-based variability modelling for software product families. Kumbang models what varies across a family of related products using three type categories — component types (architectural building blocks), feature types (user-visible characteristics), and attribute types (parameterisation) — connected by compositional structure, interfaces, and constraints. A model defines a space of valid configurations; a configuration is one legal product.

## Key concepts

- **Variability as configuration space** — a product family defines a space of valid products. Each variation point (optional part, alternative type, attribute value) adds a dimension. The configurator's job is to help users navigate this space. [[configuration-model-as-design-space]]
- **Dual-view modelling** — features (user-facing, "what it does") and components (architecture-facing, "how it's built") are distinct but linked via implementation constraints. A feature like ParkingAssistance requires specific software components to be present. [[feature-component-duality]]
- **Type–instance separation** — types define what's possible (the model); instances define what's actual (a configuration). This three-layer metalayer/model/instance architecture enables reuse: define a SensorSet type once, instantiate it differently across products. Relates to [[abstract-concrete-separation]]
- **Compositional structure** — types contain other types via part definitions with cardinality and similarity constraints. This is recursive: components contain components, features contain subfeatures. [[pattern composition]]
- **Interfaces and connections** — components expose required/provided interfaces (typed connection points). Connections between interfaces encode how components communicate. Direction (required vs. provided) and groundedness (implements behaviour vs. delegates) add semantic precision.
- **Constraint language** — Boolean conditions over part references, attribute values, cardinalities, and interface connections. Implementation constraints link the feature and component views. Cross-cutting dependencies that can't be expressed through composition alone.

## Technical approach

Kumbang is formalised as a UML 2.0 profile (stereotypes extending the UML metamodel) and given formal semantics via translation to Weight Constraint Rule Language (WCRL), enabling automated reasoning via the smodels inference engine.

The metalayer defines three abstract type categories:
- **ComposableType** → ComponentType, FeatureType (things with compositional structure)
- **InterfaceType** (connection points between components)
- **AttributeType** (parameterisation — enumerated value sets)

Compositional structure is specified through **part definitions**: a part name, a set of possible part types, a cardinality (min..max), and a similarity constraint (same/different/none). This generalises feature modelling's mandatory/optional/alternative subfeatures and architecture modelling's contained components into a single mechanism.

A **Kumbang Configurator** tool reads a model and presents variation points as a GUI, checking consistency after each user choice and propagating deductions. Translation from Kumbang to WCRL takes seconds; constraint solving is competitive with dedicated solvers.

Running example: a car periphery system (CPS) product family from Robert Bosch GmbH — sensors, pre-crash detection, parking assistance — modelled from both feature and component perspectives with implementation constraints linking them.

## Extracted concepts

- [[configuration-model-as-design-space]] — new
- [[feature-component-duality]] — new
- Updated [[constraint-driven component selection]] — added connection to Kumbang's constraint language
- Updated [[high-dimensional-configuration-space]] — added connection to Kumbang's configuration space
