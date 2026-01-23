"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { useData } from "@json-render/react";
import { getByPath } from "@json-render/core";

import { cn } from "@/lib/utils";

export function Select({ element }: ComponentRenderProps) {
  const { label, valuePath, options, placeholder } = element.props as {
    label?: string | null;
    valuePath: string;
    options: Array<{ value: string; label: string }>;
    placeholder?: string | null;
  };

  const { data, set } = useData();
  const value = getByPath(data, valuePath) as string | undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <select
        value={value ?? ""}
        onChange={(e) => set(valuePath, e.target.value)}
        className={cn(
          "border-input bg-background text-foreground flex h-9 w-full rounded-md border px-3 text-sm shadow-xs",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
