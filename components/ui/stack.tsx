"use client";

import { type ComponentRenderProps } from "@json-render/react";

import { cn } from "@/lib/utils";

const gapClasses: Record<string, string> = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

const alignClasses: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClasses: Record<string, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export function Stack({ element, children }: ComponentRenderProps) {
  const { direction, gap, align, justify } = element.props as {
    direction?: string | null;
    gap?: string | null;
    align?: string | null;
    justify?: string | null;
  };

  return (
    <div
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        gapClasses[gap || "md"] ?? gapClasses.md,
        alignClasses[align || "stretch"] ?? alignClasses.stretch,
        justifyClasses[justify || "start"] ?? justifyClasses.start,
      )}
    >
      {children}
    </div>
  );
}
