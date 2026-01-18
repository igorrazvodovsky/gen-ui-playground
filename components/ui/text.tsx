"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Text({ element }: ComponentRenderProps) {
  const { content, variant, color } = element.props as {
    content: string;
    variant?: string | null;
    color?: string | null;
  };
  const colors: Record<string, string> = {
    default: "var(--foreground)",
    muted: "var(--muted-foreground)",
    success: "#22c55e",
    warning: "#eab308",
    danger: "#ef4444",
  };
  const variants: Record<string, React.CSSProperties> = {
    body: { fontSize: 14, lineHeight: 1.6 },
    caption: { fontSize: 12, lineHeight: 1.4 },
    label: { fontSize: 13, fontWeight: 600, textTransform: "uppercase" },
  };

  return (
    <p
      style={{
        margin: 0,
        color: colors[color || "default"],
        ...(variants[variant || "body"] || variants.body),
      }}
    >
      {content}
    </p>
  );
}
