├── AGENTS.md
├── pnpm-workspace.yaml          ← "packages/*", "experiments/*"
├── turbo.json                   ← build/test/lint task orchestration
├── packages/
│   ├── core/                    ← types, schemas, validation (like @json-render/core)
│   │   ├── src/
│   │   │   ├── types.ts         ← IR types, spec types, CQ types
│   │   │   ├── schema.ts        ← IR schema definitions (S7 output)
│   │   │   ├── validation.ts    ← CQ coverage checker, spec validator
│   │   │   └── index.ts
│   │   └── package.json
│   ├── patterns/                ← mapping rules, constraints
│   │   ├── src/
│   │   │   ├── rules.ts         ← data type → component mapping
│   │   │   ├── constraints.ts   ← constraint definitions
│   │   │   └── index.ts
│   │   └── package.json
│   ├── generation/              ← IR → spec compilation
│   │   └── package.json
│   ├── verification/             ← augmented semantics, CQ checks
│   │   └── package.json
│   └── renderer/                ← json-render integration + binding
│       └── package.json
├── domain/                      ← NOT a package — shared knowledge artefacts
│   ├── tasks/
│   │   ├── task/
│   │   │   ├── cqs.md           ← competency questions
│   │   │   ├── story.md         ← user story
│   │   │   ├── schema.json      ← IR
│   │   ├── ...
│   └── knowledge/               ← domain knowledge stores
├── experiments/
│   ├── task-model/              ← independent runnable project
│   │   ├── package.json         ← depends on @genui/core via workspace:*
│   │   ├── PLAN.md
│   │   ├── REPORT.md
│   │   └── src/
│   ├── two-way-binding/
│   │   ├── package.json         ← depends on @genui/renderer
│   │   └── src/
│   ├── pattern-library/
│   │   ├── package.json         ← depends on @genui/core + @genui/patterns
│   │   └── src/
│   └── vertical-slice/          ← depends on ALL packages
│       ├── package.json
│       └── src/
└── tests/
    ├── structural/              ← architectural constraint tests
    └── e2e/