"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Stack({ element, children }: ComponentRenderProps) {
  const { direction, gap, align, justify } = element.props as {
    direction?: string | null;
    gap?: string | null;
    align?: string | null;
    justify?: string | null;
  };
  const gaps: Record<string, string> = {
    none: "0",
    sm: "8px",
    md: "16px",
    lg: "24px",
  };
  const alignments: Record<string, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
  };
  const justifications: Record<string, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        gap: gaps[gap || "md"],
        alignItems: alignments[align || "stretch"],
        justifyContent: justifications[justify || "start"],
      }}
    >
      {children}
    </div>
  );
}
