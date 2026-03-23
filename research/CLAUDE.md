# Generative UI research vault

Read `project.md` for full project context. This is a Zettelkasten-based research vault for a generative UI project.

## Vault structure

```
/
├── CLAUDE.md               ← you are here
├── project.md             ← project goals, pipeline, research approach
├── reading-order.md       ← paper sequence (19 papers, 6 layers)
├── solution tree.md          ← opportunity solution tree (opportunities, solutions, experiments)
├── synthesis.md           ← living synthesis document
├── templates/paper.md      ← template for literature notes
├── templates/concept.md    ← template for concept notes
├── concepts/               ← atomic idea notes (Zettelkasten)
└── sources/                ← PDFs, literature notes, images
```

## Three note types

1. **Literature notes** (`sources/*.md`) — per-paper. Factual summary: core idea, key concepts, technical approach. Link out to concept notes. These are receipts.
2. **Concept notes** (`concepts/*.md`) — atomic, one idea per note. Stated in own words. The primary unit of knowledge. Links to source papers and related concepts.
3. **Synthesis** (`synthesis.md`) — curated trail through concept notes. Updated after each paper.

## Workflow: processing a paper

When asked to process/analyse/read a paper:

### Step 1 — Orient
- Read `synthesis.md` to understand current state of understanding
- Check `concepts/` to see what concept notes already exist (for linking)
- Check `reading-order.md` to see where this paper sits in the sequence

### Step 2 — Read and create literature note
- Read the paper (PDF or existing markdown in `sources/`)
- Create or update a literature note in `sources/` using `templates/paper.md`
- Keep it factual and slim — interpretation goes in concept notes

### Step 3 — Extract concept notes
- Identify atomic ideas worth capturing
- For each, create a note in `concepts/` using `templates/concept.md`
- **Naming**: use lowercase-kebab-case descriptive names (e.g. `task-driven-data-model.md`, `specification-based-ui-generation.md`)
- Link back to the source literature note
- Link to existing concept notes where relationships exist (supports, contradicts, extends, is-part-of, enables)
- If an existing concept note needs updating based on new information, update it and note the additional source

### Step 4 — Update synthesis and milestones
- Update `synthesis.md`:
  - Revise "Current understanding" if the model shifted
  - Add to "Key tensions" if disagreements emerged
  - Update "Gap map" — remove answered questions, add new ones
  - Add entry to "Reading log"
- Update `reading-order.md`: mark the paper's notes as ✅
- Check `solution tree.md`: does the paper inform any opportunity, suggest new solutions, or change experiment priorities? Update if so — add new solutions under existing opportunities, refine experiment designs, or flag new opportunities the paper reveals.

### Step 5 — Report
- Summarise for the user: what was the paper's core contribution, what concept notes were created/updated, what shifted in the synthesis, and what open questions remain

## Concept note guidelines

- One idea per note. If it needs two paragraphs of explanation, it's probably two concepts.
- State the idea in your own words — don't parrot the paper.
- Always include at least one connection to another concept note (or flag it as an orphan to revisit).
- Tag with relevant pipeline stages: `json-render`, `component-mapping`, `specification`, `model-evolution`, `generative-ui`, `user-agency`, `data-model`, `intent`.
- The "Relevance to project" section should be concrete — which part of the pipeline does this inform?

## Style

- UK spelling, sentence case
- Be direct, skip corporate or academic language
- Prioritise insight and connections over completeness
