"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Empty({ element, onAction }: ComponentRenderProps) {
  const { title, description, action, actionLabel } = element.props as {
    title: string;
    description?: string | null;
    action?: string | null;
    actionLabel?: string | null;
  };

  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 600 }}>
        {title}
      </h3>
      {description && (
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted-foreground)" }}>
          {description}
        </p>
      )}
      {action && (
        <button
          type="button"
          onClick={() => onAction?.({ name: action })}
          style={{
            marginTop: 12,
            padding: "8px 12px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--foreground)",
            cursor: "pointer",
          }}
        >
          {actionLabel ?? "Take action"}
        </button>
      )}
    </div>
  );
}
