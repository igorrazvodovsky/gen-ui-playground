"use client";

import { type ComponentRenderProps } from "@json-render/react";

import { cn } from "@/lib/utils";

const columnClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const gapClasses: Record<string, string> = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export function Grid({ element, children }: ComponentRenderProps) {
  const { columns, gap } = element.props as {
    columns?: number | null;
    gap?: string | null;
  };

  return (
    <div
      className={cn(
        "grid",
        columnClasses[columns || 2] ?? columnClasses[2],
        gapClasses[gap || "md"] ?? gapClasses.md,
      )}
    >
      {children}
    </div>
  );
}
