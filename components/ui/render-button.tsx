"use client";

import { type ComponentRenderProps } from "@json-render/react";

import { Button } from "@/components/ui/button";

export function RenderButton({
  element,
  onAction,
  loading,
}: ComponentRenderProps) {
  const { label, variant, action, disabled, size } = element.props as {
    label: string;
    variant?: string | null;
    size?: string | null;
    action?: { name: string; params?: Record<string, unknown> } | string | null;
    disabled?: boolean | null;
  };

  const variantMap: Record<string, "default" | "secondary" | "outline" | "ghost" | "destructive"> = {
    primary: "default",
    secondary: "secondary",
    outline: "outline",
    danger: "destructive",
    ghost: "ghost",
  };
  const sizeMap: Record<string, "sm" | "default" | "lg"> = {
    sm: "sm",
    md: "default",
    lg: "lg",
  };
  const resolvedVariant = variantMap[variant || "primary"] ?? "default";
  const resolvedSize = sizeMap[size || "md"] ?? "default";
  const resolvedAction =
    typeof action === "string" ? { name: action } : action;

  return (
    <Button
      type="button"
      variant={resolvedVariant}
      size={resolvedSize}
      onClick={() => !disabled && resolvedAction && onAction?.(resolvedAction)}
      disabled={!!disabled || loading}
    >
      {loading ? "Loading..." : label}
    </Button>
  );
}
