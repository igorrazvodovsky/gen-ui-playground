---
title: "A Composite Task Meta-Model as a Reference Model"
authors: [Steve Goschnick, Liz Sonenberg, Sandrine Balbo]
year: 2010
venue: "IFIP TC 13 Symposium on Human-Computer Interaction (HCIS), World Computer Congress"
type: literature
status: processed
---
## Core idea

Extracts meta-models from six major task analysis formalisms (GOMS, GOMSL, TKS, GTA/TWO, Diane+H, CTT), then merges them into a single composite — the Reference Task Meta-model (ReTaMeta). The goal: a superset vocabulary covering all key concepts from the task analysis tradition, usable as a reference model for comparing other meta-models (their target was agent-oriented models, but the vocabulary is domain-independent).

## Key concepts

The ReTaMeta model's entities, drawn from Figure 4:

**Goal/Task pair** — a Goal is a desired state change or enquiry about state; a Task is the activity that satisfies it. One-to-one mapping via `satisfying`. Goals decompose into sub-goals. This dual is important: the goal says *what*, the task says *how*. From CTT/TKS.

**Plan (Enactment)** — a way to achieve a goal via state changes. Plans have SelectionRules (OR, AND, XOR logical operators) and Conditions that constrain them. From GOMS (Enactment) with Diane+H refinements.

**RelatedTask** — the decomposition mechanism. Crucially, allows both tree hierarchies *and* network graphs (a task can have multiple parents). Supports serial and parallel execution via `sibling` attribute (true = parallel, false = sequential) and `elder/younger` ordering. From Diane+H — the most flexible decomposition model examined.

**Object** — domain objects manipulated by tasks. Has `platform` attribute and ontological structure (self-referencing hierarchy). Includes **Right** (from CTT) for access control between agents and objects. Combined from TKS (physical, informational, conceptual objects), GOMSL (Object Store as long-term memory), and CTT (Rights).

**Operator → Action | Interaction | Manual** — the three modes of task execution, refined as subclasses:
- **Action**: system-only, no user involvement (internal computation, API call)
- **Interaction**: user + system together (standard UI widget, dialog)
- **Manual**: user-only, outside the system (physical action like "stand up")
From Diane+H task types and CTT's category attribute.

**Agent → Role → responsible → Task** — who performs tasks. Agent can be person, machine, or (per TKS) animal. Agents play hierarchical Roles; Roles are responsible for task sets. From TKS (introduced Role, Responsibility) and GTA/TWO (formalised Agent-Role-Task).

**Event** — external trigger that fires a task hierarchy via Precondition. From GTA/TWO's Task World Ontology.

**Precondition** — triggers the topmost task. Can involve an Event or a state change in an Object. From Diane+H and GTA.

**LinkCondition** — conditions between sequential tasks (expression that must evaluate true before the next task proceeds). Can represent CTT's temporal operators (concurrent communicating tasks, task independence, suspend-resume). From Diane+H.

**Parameter** — attached to Goal (not Method, unlike GOMSL). Declarative: the goal hierarchy lists parameter names; specific task instances bind values. From GOMSL, repositioned.

**Feedback** — two attributes: `task_purpose` (why this task exists — designer-facing) and `aftermath` (message to user on completion). From Diane+H.

## Technical approach

The method is *conceptual evaluation and comparison* (Milton & Kazmierczak): take a reference meta-model from an independent field, use it to compare meta-models in the target field. Here, task analysis (independent) → agent-oriented paradigm (target).

Construction approach: **union, not intersection**. When concepts overlapped, took the more flexible version. When concepts appeared in only one formalism, included them if they added expressive power. The result is deliberately a superset.

Models examined:
- **GOMS** (Card et al., 1983): Goal, Method, Operator, SelectionRule, Condition. Evaluation-oriented (predicting task time). Limited to pre-learned, error-free tasks.
- **GOMSL** (Kieras): GOMS + Object Store (long-term memory), Tags (working memory), Parameters. Executable — can simulate user performance.
- **TKS** (Johnson et al., 1988): GOMS base + knowledge structures (Object, Role, Responsibility, Similarity). First to model the knowledge people bring to tasks, not just the task steps.
- **GTA/TWO** (van der Veer & van Welie, 1998): Task World Ontology with Event, Task, Goal, Agent, Role, Object. Collaborative-task-focused (CSCW). Added Event as first-class entity.
- **Diane+H** (Tarby & Barthet, 1996): richest notation. Task types (manual/automatic/interactive), LogicalOperator (OR/AND/XOR), RelatedTask (graph structure), LinkCondition, Precondition, Feedback, Data entity. Closest to CTT in expressive power.
- **CTT** (Paternò, 2004): referenced throughout as comparison point. Adds Object, Rights, Platform.

## Extracted concepts

- Updated: [[task-model]] — ReTaMeta provides the unified primitive vocabulary this concept was missing
- Created: [[operator-type-triad]] — Action/Interaction/Manual distinction directly maps to UI generation decisions
- Created: [[task-graph-decomposition]] — tasks form graphs, not just trees; RelatedTask allows multiple parents and parallel/serial execution
- Created: [[goal-task-duality]] — the separation between desired state (Goal) and achieving activity (Task) as first-class entities
