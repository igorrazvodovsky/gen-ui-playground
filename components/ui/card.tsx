"use client";

import { type ComponentRenderProps } from "@json-render/react";

import { cn } from "@/lib/utils";

export function Card({ element, children }: ComponentRenderProps) {
  const { title, description, padding } = element.props as {
    title?: string | null;
    description?: string | null;
    padding?: string | null;
  };

  const paddingClasses: Record<string, string> = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div className="rounded-md border border-border bg-card text-card-foreground">
      {(title || description) && (
        <div className="border-b border-border px-5 py-4">
          {title && (
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div
        className={cn(
          paddingClasses[padding || ""] ?? paddingClasses.md,
        )}
      >
        {children}
      </div>
    </div>
  );
}
