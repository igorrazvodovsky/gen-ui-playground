"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { useData } from "@json-render/react";
import { getByPath } from "@json-render/core";

import { Input } from "@/components/ui/input";

export function DatePicker({ element }: ComponentRenderProps) {
  const { label, valuePath, placeholder } = element.props as {
    label?: string | null;
    valuePath: string;
    placeholder?: string | null;
  };
  const { data, set } = useData();
  const value = getByPath(data, valuePath) as string | undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <Input
        type="date"
        value={value ?? ""}
        onChange={(e) => set(valuePath, e.target.value)}
        placeholder={placeholder ?? ""}
      />
    </div>
  );
}
