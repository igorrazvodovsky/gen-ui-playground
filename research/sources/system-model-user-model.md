---
title: "The System Model and the User Model: Exploring AI Dashboard Design"
authors: [Fernanda Viégas, Martin Wattenberg]
year: 2023
venue: "arXiv (speculative essay)"
type: literature
status: processed
---
## Core idea

AI systems need parallel visual instrumentation — dashboards — alongside their conversational interfaces, just as cars have speedometers and ovens have thermometers. The two most universally important things to display are the system's model of itself (System Model: is it generating fiction or fact? what's its communicative intent?) and the system's model of the user (User Model: inferred age, gender, expertise, attitude). Showing these in real time lets users calibrate trust and correct misunderstandings.

## Key concepts

- [[parallel-state-display]] — the principle that AI interfaces need non-conversational visual channels showing internal state, running alongside the primary interaction mode
- [[inferred-user-model]] — the AI's implicit, evolving model of the user (demographics, expertise, attitude) should be surfaced, inspectable, and correctable
- **World model hypothesis** — the premise that neural networks develop interpretable internal models of aspects of their world (supported by mechanistic interpretability research on probing, concept neurons, Othello board representations, etc.)
- **System Model** — the network's model of its own state: fiction vs. fact mode, communicative intent, confidence, rule-following behaviour. The paper argues this is a "universal" model worth instrumenting across domains.
- **Anti-anthropomorphism** — effective AI dashboards should use "steampunk" gauges and dials rather than human-like avatars or expressions, to avoid implying more than is justified and to remind users they're interacting with a machine

## Technical approach

This is a speculative essay, not an empirical paper. No implementation, no user study. The argument structure:

1. **Premise**: Neural networks contain interpretable world models (citing probing studies, Othello board representation, concept neurons in vision/NLP). Even partial or imperfect models are useful to surface.
2. **Proposal**: Two "universal" world models — User Model and System Model — should be displayed alongside any dialogue-based AI interface as a parallel dashboard.
3. **Design principles**:
   - Simple, "low-tech" visualisations (gauges, boolean indicators, scalar bars) are likely most effective
   - Imperfect/flickering models are *more* valuable to display, not less — instability helps users calibrate trust (Tesla dashboard analogy: cars flickering between lanes alerts the driver)
   - Anthropomorphic representations should be avoided — they imply more than is warranted
   - Dynamic prioritisation: sudden changes in usually-stable features should trigger surfacing
   - API design: providers should expose internal state data as a parallel stream or embedded markup, not just text output
4. **Feature selection criteria**: "Is it true? Is it necessary? Is it kind?" — accuracy, helpfulness, and the user's desire to see themselves in a mirror are in tension
5. **Adversarial considerations**: dashboard readout could help malicious users "hack" the system faster (speedometer temptation analogy), but positives likely outweigh negatives; information asymmetry favours human safety

The speculative mock-up (Figure 2) shows a sidebar dashboard alongside a chat interface with:
- **System section**: ID Drift (moderate), Attitude (helpful/polite), Fictionality (fiction/fact slider with alert on rapid change), Rule-Following (yes/no)
- **User section**: Attitude (curious, 76% confidence), Education (college, 90%), Age (30-40, 89%), Gender (female, 82%)

## Extracted concepts

- Created: [[parallel-state-display]]
- Created: [[inferred-user-model]]
