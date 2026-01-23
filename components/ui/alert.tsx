"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { useData } from "@json-render/react";
import { getByPath } from "@json-render/core";
import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

const toneClasses: Record<string, string> = {
  info: "border-border bg-card text-foreground",
  success: "border-emerald-500/30 bg-emerald-500/5 text-emerald-700",
  warning: "border-amber-500/30 bg-amber-500/5 text-amber-700",
  error: "border-red-500/30 bg-red-500/5 text-red-700",
};

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

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
        toneClasses[type || "info"],
      )}
    >
      <div className="flex-1">
        <div className="font-semibold text-foreground">{title}</div>
        {resolvedMessage && (
          <div className="mt-1 text-sm text-muted-foreground">
            {resolvedMessage}
          </div>
        )}
      </div>
      {dismissible && (
        <Button
          type="button"
          variant="ghost"
          className="h-7 w-7"
          size="icon"
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
