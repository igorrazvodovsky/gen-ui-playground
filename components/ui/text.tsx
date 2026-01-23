"use client";

import { type ComponentRenderProps } from "@json-render/react";

import { cn } from "@/lib/utils";

const colorClasses: Record<string, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  success: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-red-600",
};

const variantClasses: Record<string, string> = {
  body: "text-sm leading-relaxed",
  caption: "text-xs leading-snug",
  label: "text-xs font-semibold uppercase tracking-wide",
};

export function Text({ element }: ComponentRenderProps) {
  const { content, variant, color } = element.props as {
    content: string;
    variant?: string | null;
    color?: string | null;
  };

  return (
    <p
      className={cn(
        "m-0",
        variantClasses[variant || "body"],
        colorClasses[color || "default"],
      )}
    >
      {content}
    </p>
  );
}
