"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { useData } from "@json-render/react";
import { getByPath } from "@json-render/core";
import { useState } from "react";

function useResolvedValue<T>(
  value: T | { path: string } | null | undefined,
): T | undefined {
  const { data } = useData();
  if (value === null || value === undefined) return undefined;
  if (typeof value === "object" && "path" in value) {
    return getByPath(data, value.path) as T | undefined;
  }
  return value as T;
}

export function Alert({ element }: ComponentRenderProps) {
  const { type, title, message, dismissible } = element.props as {
    type: "info" | "success" | "warning" | "error";
    title: string;
    message?: string | { path: string } | null;
    dismissible?: boolean | null;
  };

  const resolvedMessage = useResolvedValue(message);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const colors: Record<string, string> = {
    info: "var(--muted-foreground)",
    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",
  };

  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: "var(--radius)",
        background: "var(--card)",
        border: "1px solid var(--border)",
        fontSize: 14,
        color: colors[type || "info"],
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
        {resolvedMessage && (
          <div style={{ color: "var(--muted-foreground)" }}>{resolvedMessage}</div>
        )}
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={() => setVisible(false)}
          style={{
            border: "none",
            background: "transparent",
            color: "var(--muted-foreground)",
            cursor: "pointer",
            fontSize: 14,
            lineHeight: 1,
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
}
