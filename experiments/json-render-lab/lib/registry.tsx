import { defineRegistry } from "@json-render/react";
import type { ReactNode } from "react";
import { catalog } from "@/lib/catalog";

function gapClass(gap: "sm" | "md" | "lg") {
  if (gap === "sm") {
    return "stack stack-sm";
  }

  if (gap === "lg") {
    return "stack stack-lg";
  }

  return "stack stack-md";
}

function toneClass(tone: "neutral" | "accent" | "warning") {
  if (tone === "accent") {
    return "surface-card surface-card-accent";
  }

  if (tone === "warning") {
    return "surface-card surface-card-warning";
  }

  return "surface-card surface-card-neutral";
}

function calloutToneClass(tone: "info" | "warning" | "success") {
  if (tone === "warning") {
    return "callout callout-warning";
  }

  if (tone === "success") {
    return "callout callout-success";
  }

  return "callout callout-info";
}

function renderChildren(children: ReactNode) {
  return children;
}

export const { registry } = defineRegistry(catalog, {
  components: {
    Stack: ({ props, children }) => (
      <div className={gapClass(props.gap)}>{renderChildren(children)}</div>
    ),
    Grid: ({ props, children }) => (
      <div className={`grid ${props.columns === "3" ? "grid-3" : "grid-2"}`}>
        {renderChildren(children)}
      </div>
    ),
    Card: ({ props, children }) => (
      <section className={toneClass(props.tone)}>
        <span className="panel-label">{props.label}</span>
        <h2 className="panel-title">{props.title}</h2>
        <div className="stack stack-sm">{renderChildren(children)}</div>
      </section>
    ),
    TitleBlock: ({ props }) => (
      <div className="title-block">
        <span className="title-block-eyebrow">{props.eyebrow}</span>
        <h2 className="title-block-title">{props.title}</h2>
        <p className="title-block-copy">{props.summary}</p>
        <div className="title-block-status">{props.status}</div>
      </div>
    ),
    Metric: ({ props }) => (
      <section className="surface-card metric-card">
        <span className="metric-label">{props.label}</span>
        <h3 className="metric-value">{props.value}</h3>
        <p className="metric-hint">{props.hint}</p>
      </section>
    ),
    FieldList: ({ props }) => (
      <div className="field-list">
        {props.items.map((item) => (
          <div className="field-row" key={item.label}>
            <span className="field-label">{item.label}</span>
            <p className="field-value">{item.value}</p>
          </div>
        ))}
      </div>
    ),
    Callout: ({ props }) => (
      <section className={calloutToneClass(props.tone)}>
        <h3 className="callout-title">{props.title}</h3>
        <p className="callout-body">{props.body}</p>
      </section>
    ),
    BulletList: ({ props }) => (
      <div className="stack stack-sm">
        <ol className="bullet-list">
          {props.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p className="small-note">{props.note}</p>
      </div>
    ),
  },
});

