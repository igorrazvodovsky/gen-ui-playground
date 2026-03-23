# Software Landscape

This file describes the specific software solutions present in the ReCiPSS material.

The purpose is not to treat them as the target architecture. It is to make the incumbent landscape explicit so it can be compared against agent-native alternatives.

## Reading rule

When a ReCiPSS document describes a concrete system, ask two questions:

1. What domain responsibility is this system carrying?
2. Is that system boundary intrinsic to the domain, or just an artefact of the historical stack?

This file captures both.

## Named systems in the ReCiPSS sources

### ReCiPSS Web Store

Observed role:

- customer-facing contract and product selection surface
- registration, login, product listing, product detail, cart, checkout, address and shipping

Implementation hints in sources:

- built on SAP Hybris
- e-commerce storefront model

Domain responsibility underneath:

- contract setup
- product and service option selection
- eligibility and delivery capture

Likely contingent choices:

- treating contract formation primarily as an e-commerce checkout flow
- using a separate web store rather than a task-driven service configuration surface

Primary evidence:

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`

### ReCiPSS Backend Server

Observed role:

- central service logic for contracts, linkage, usage ingest, cost calculation, and integration

Implementation hints in sources:

- ASP.Net Core
- SQL Server
- Docker containers
- REST interface

Explicit operations described:

- create contract
- link or unlink appliance
- retrieve appliance configuration
- add or pull usage
- calculate charged costs for a period

Domain responsibility underneath:

- keep authoritative service state
- bind contract to appliance and site
- attribute usage to the correct billing target
- aggregate charges

Likely contingent choices:

- single central backend module rather than an evented or model-first orchestration layer
- REST endpoints reflecting system integration boundaries of the time

Primary evidence:

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`

### JUConnect / appliance cloud platform

Observed role:

- connectivity layer between washing machines and backend systems
- storage of sensor and status data
- remote monitoring, firmware support, fault detection

Domain responsibility underneath:

- appliance telemetry
- remote status and control
- cloud-side device history

Likely contingent choices:

- separate vendor platform as the canonical cloud for appliance communication
- platform-specific data flow and control constraints

Primary evidence:

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`

### ConnectLife API and applications

Observed role:

- secure facade for applications
- web and mobile access to machine and service features

Functions described:

- room discovery
- booking if the room is reservable
- QR-based appliance connection
- remote monitoring
- service access

Domain responsibility underneath:

- user-facing operational interaction with connected assets
- lightweight situational control and visibility

Likely contingent choices:

- a separate consumer application family alongside other system modules
- exposing the service through app silos rather than generated task surfaces

Primary evidence:

- `d5.3-white-goods-demonstrator-documentation.pdf`
- `d6.6-lessons-learned-service-based-offering-of-washing-machines.pdf`

### SAP / SAP PI / Hybris / SAG

Observed role:

- enterprise backbone for CRM, commerce, master data, service operations, logistics, and payment flows

Functions described:

- user profiles and enterprise integration
- delivery and service order management
- billing and payment processing
- service network operations

Domain responsibility underneath:

- enterprise coordination with existing corporate systems
- integration with logistics, accounting, and service operations

Likely contingent choices:

- preserving the incumbent corporate stack and fitting the circular model into it
- distributing responsibility across legacy enterprise tools rather than reshaping it around the task model

Primary evidence:

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`
- `d6.6-lessons-learned-service-based-offering-of-washing-machines.pdf`

### AR service-instruction demonstrator

Observed role:

- maintenance, service, and training support using visual AR instructions based on product and process data

Domain responsibility underneath:

- help technicians and operators carry out service actions on the correct configuration of the asset

Likely contingent choices:

- dedicated AR pipeline with heavyweight CAD conversion and separate downstream publishing
- manual preparation steps because of toolchain and data-format constraints

Primary evidence:

- `d5.3-white-goods-demonstrator-documentation.pdf`

## Landscape summary

The incumbent software shape is recognisably pre-LLM:

- separate product, service, IoT, and enterprise applications
- explicit integration middleware
- role-specific apps and interfaces
- fixed forms and fixed flows
- backend-owned business logic

That software shape solved a real domain problem, but it is not itself the domain.

## Domain responsibility map

| Domain responsibility | ReCiPSS software carrier |
| --- | --- |
| Contract formation | Web Store, Hybris, backend server |
| Asset-telemetry ingestion | JUConnect, ConnectLife API, backend server |
| Usage attribution and billing | Backend server, SAP |
| Service operations | SAG, service apps, backend server |
| Customer interaction | Web Store, web app, mobile app |
| Asset lifecycle recovery | logistics systems, warehouse processes, SAP/SAG coordination |

## Research interpretation

This file should be read together with:

- [invariants.md](./invariants.md): what must survive even if the systems above disappear
- [opportunity-deltas.md](./opportunity-deltas.md): where the research tree suggests we should deliberately diverge from this incumbent shape
- [solution tree.md](../../research/solution%20tree.md): especially the warning that operating existing systems and generative UI are different branches

## Main caution

Do not let named products in the ReCiPSS stack become accidental design primitives.

Example:

- "Web store" is not a domain primitive.
- "Contract preparation with availability checks and service choices" is.

