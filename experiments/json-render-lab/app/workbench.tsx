"use client";

import { validateSpec } from "@json-render/core";
import {
  ActionProvider,
  Renderer,
  StateProvider,
  VisibilityProvider,
} from "@json-render/react";
import { useState } from "react";
import { registry } from "@/lib/registry";
import { scenarios, workbenchSpec } from "@/lib/scenarios";

const validation = validateSpec(workbenchSpec);

export function Workbench() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0].id);
  const activeScenario =
    scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0];

  return (
    <main className="workbench-shell">
      <section className="hero">
        <span className="hero-kicker">human-agent-ui / experiment 01</span>
        <h1 className="hero-title">json-render as the first concrete slice</h1>
        <p className="hero-copy">
          This lab fixes the first implementation boundary: a reusable UI spec rendered
          against domain-shaped state without hiding the unanswered research questions
          behind live model generation.
        </p>
        <div className="hero-grid">
          <article className="panel">
            <span className="panel-label">Why this exists</span>
            <h2 className="panel-title">Renderer baseline before generation logic</h2>
            <p className="lede">
              The research calls out <code>json-render</code> as the current step in the
              pipeline. This experiment makes that choice runnable, inspectable, and easy
              for both humans and agents to reason about.
            </p>
          </article>
          <article className="panel">
            <span className="panel-label">Current question</span>
            <h2 className="panel-title">{activeScenario.researchQuestion}</h2>
            <p className="lede">{activeScenario.description}</p>
          </article>
        </div>
      </section>

      <section className="workbench-grid">
        <aside className="stack stack-md">
          <article className="panel stack stack-sm">
            <span className="panel-label">Scenario fixtures</span>
            <div className="scenario-switcher">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  className={`scenario-button ${
                    scenario.id === activeScenario.id ? "scenario-button-active" : ""
                  }`}
                  onClick={() => setActiveScenarioId(scenario.id)}
                  type="button"
                >
                  <span className="scenario-button-title">{scenario.title}</span>
                  <span className="scenario-button-copy">{scenario.summary}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="panel stack stack-sm">
            <span className="panel-label">Spec health</span>
            <div className="validation-badge">
              {validation.valid ? "spec validates structurally" : "spec has validation issues"}
            </div>
            <p className="small-note">
              The spec is hand-authored on purpose. It isolates the renderer boundary and
              keeps failure modes inspectable.
            </p>
          </article>

          <article className="panel stack stack-sm">
            <span className="panel-label">State fixture</span>
            <p className="code-note">
              Same spec, different domain task states. This is the minimum baseline before
              trying regeneration or write-back.
            </p>
            <pre className="code-block">
              <code>{JSON.stringify(activeScenario.state, null, 2)}</code>
            </pre>
          </article>

          <article className="panel stack stack-sm">
            <span className="panel-label">Current spec</span>
            <pre className="code-block">
              <code>{JSON.stringify(workbenchSpec, null, 2)}</code>
            </pre>
          </article>
        </aside>

        <section className="render-panel">
          <article className="panel stack stack-sm">
            <span className="panel-label">Rendered UI</span>
            <p className="small-note">
              This is the <code>UI specification -&gt; rendered UI</code> segment only. The
              task model, mapping rules, and model evolution layers still need separate
              experiments.
            </p>
          </article>

          <StateProvider
            key={activeScenario.id}
            initialState={activeScenario.state}
          >
            <ActionProvider handlers={{}}>
              <VisibilityProvider>
                <Renderer registry={registry} spec={workbenchSpec} />
              </VisibilityProvider>
            </ActionProvider>
          </StateProvider>
        </section>
      </section>
    </main>
  );
}
