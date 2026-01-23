"use client";

import { type ComponentRenderProps } from "@json-render/react";

import { Button } from "@/components/ui/button";

export function Empty({ element, onAction }: ComponentRenderProps) {
  const { title, description, action, actionLabel } = element.props as {
    title: string;
    description?: string | null;
    action?: string | null;
    actionLabel?: string | null;
  };

  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {action && (
        <Button
          type="button"
          variant="outline"
          onClick={() => onAction?.({ name: action })}
        >
          {actionLabel ?? "Take action"}
        </Button>
      )}
    </div>
  );
}
