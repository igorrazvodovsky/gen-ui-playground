"use client";

import React from "react";
import { type ComponentRenderProps } from "@json-render/react";

export function RenderButton({
  element,
  onAction,
  loading,
}: ComponentRenderProps) {
  const { label, variant, action, disabled, size } = element.props as {
    label: string;
    variant?: string | null;
    size?: string | null;
    action?: { name: string } | string | null;
    disabled?: boolean | null;
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "var(--foreground)",
      color: "var(--background)",
      border: "none",
    },
    secondary: {
      background: "transparent",
      color: "var(--foreground)",
      border: "1px solid var(--border)",
    },
    danger: { background: "#dc2626", color: "#fff", border: "none" },
    ghost: { background: "transparent", color: "var(--muted)", border: "none" },
  };
  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: "6px 12px", fontSize: 12 },
    md: { padding: "8px 16px", fontSize: 14 },
    lg: { padding: "10px 20px", fontSize: 16 },
  };
  const resolvedAction =
    typeof action === "string" ? { name: action } : action;

  return (
    <button
      onClick={() => !disabled && resolvedAction && onAction?.(resolvedAction)}
      disabled={!!disabled || loading}
      style={{
        borderRadius: "var(--radius)",
        fontWeight: 500,
        opacity: disabled ? 0.5 : 1,
        ...sizes[size || "md"],
        ...variants[variant || "primary"],
      }}
    >
      {loading ? "Loading..." : label}
    </button>
  );
}
