---
title: "Networked Ontologies for Adaptive User Interface Systems — Ontology Specification"
authors: [Alexandre Adler Cunha de Freitas, Monalessa Perini Barcellos]
year: 2025
venue: "Federal University of Espírito Santo (UFES) / NEMO"
type: literature
status: processed
---
## Core idea

Technical companion to the OADAPT doctoral proposal. Provides the full formal specification for four interconnected ontologies that together model everything an adaptive UI system needs to know: the usage context (environment), the user (profile, disabilities, capabilities), the UI itself (component taxonomy), and the adaptation system (customisation types, rules, recommendations). Developed using SABiO methodology, grounded in UFO foundational ontology, integrated into the HCI-ON ontology network.

## Key concepts

**Four ontologies:**

1. **ContUsO** (Context of Use Ontology) — Models the *environment* where interaction happens. Key dimensions: luminosity, connectivity, geographic geolocation, noisiness, time of day. Also captures input/output equipment present at the context (keyboard, mouse, webcam, microphone, display, speaker). The context is the *situation* in which a human-computer interaction occurs — it's not just user traits but the physical/temporal setting.

2. **UPO** (User Profile Ontology) — Two types of profile elements:
   - *Measurable*: age, education level, experience level (values on a scale)
   - *Nominal*: gender, language, disability (qualitative categories)

   Disability taxonomy is the most detailed part: vision (blindness, low vision [reduced vision, light sensitivity, visual acuity, contrast sensitivity], colour deficiency [dichromacy, monochromacy, trichromacy]), auditory (complete/partial hearing loss), neurological (MS, Parkinson's, CVA), cognitive (intellectual disability, emotional disease, ADHD, dyslexia), physical (quadriplegia, RSI, amputation).

3. **UISCO** (UI Software Components Ontology) — Formal taxonomy of UI components:
   - **Media**: Video, Image, Icon, Text
   - **Layout**: Table, Navbar, Breadcrumb, Pagination, Tab, Stepper, Carousel
   - **Alert**: Tooltip, Modal Dialog
   - **Form**: Text Component, Password Component, Dropdown, Checkbox, Radio Button, Datepicker, Button (Toggle, Submit, Menu, Icon, Expand/Collapse)
   - **Status Indicator**: Progress Bar, Progress Spinner, Badge

4. **AUISO** (Adaptive UI System Ontology) — Defines 14 *UI Customisation Types* (modes) and the rules that trigger them. Introduces the **User Interface Customisation Recommendation** as an intermediate entity between user profile and actual UI change.

**14 UI customisation modes:**
Dark Mode, Light Mode, Contrast Mode, Font Mode, Readable Interface Mode, Voice Command Mode, Gesture Navigation Mode, Screen Reader Mode, Caption Transcript Mode, Basic Experience Mode, Average Experience Mode, High Experience Mode, Mobile Mode, Desktop Mode.

**30 adaptation rules (R1–R30)** in first-order logic:
- R1–R3: Auditory disabilities → Caption Transcript Mode, Readable Interface Mode
- R4–R14: Vision disabilities → Screen Reader, Font, Contrast, Readable, Voice Command modes (with subtypes: blindness, low vision, colour deficiency each getting specific mode combinations)
- R15–R18: Neurological disabilities → Voice Command, Gesture Navigation modes
- R19–R23: Cognitive disabilities → Readable Interface, Font, Basic Experience modes
- R24–R27: Physical disabilities → Voice Command, Gesture Navigation modes
- R28–R30: Mutual exclusion constraints (Desktop ⊕ Mobile, Light ⊕ Dark, exactly one experience mode)

## Technical approach

**Methodology**: SABiO (Systematic Approach for Building Ontologies). Each ontology defined through competency questions → conceptual model → verification (CQ answering) → validation (instantiation with Alex scenario).

**Grounding**: All ontologies grounded in UFO (Unified Foundational Ontology). Uses UFO's type theory — notably *powertypes* (types whose instances are also types, e.g., "Vision Disability Type" whose instances like "Blindness Type" classify specific instances of blindness). Modelled in UML with a dotted-arrow convention for powertype relationships.

**Reuse**: Extensive reuse from HCI-ON network (HCIO core ontology for User, Interactive Computer System, User Interface, Human-Computer Interaction) and SEON (Software Engineering Ontology Network for SysSwO system/software concepts).

**Adaptation architecture**: User characteristics + Context of Use → Customisation Recommendations (rule-derived) → Customisation Types → Customisation Instances applied to Adaptive User Interface. The recommendation entity decouples the triggering conditions from the applied changes. Rules are WCAG-derived.

**Validation**: Each ontology instantiated against "Alex's case" — a 40-year-old male user with light sensitivity, RSI, and intellectual disability, using a social network system at home at night with low luminosity.

## Extracted concepts

Updated (not new):
- [[context-driven adaptation]] — added: concrete rule library (R1–R30), environment context model (ContUsO), adaptation modes as intermediate abstraction, mutual exclusion constraints
- [[constraint-driven component selection]] — added: UISCO component taxonomy as formal classification of what components exist
- [[component catalog as schema]] — added: UISCO validates that ontological component classification converges with practical catalog categories
- [[ontology-driven UI generation]] — added: full four-ontology specification with detailed coverage
