"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { useData, useFieldValidation } from "@json-render/react";
import { getByPath } from "@json-render/core";
import { useMemo } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function TextField({ element }: ComponentRenderProps) {
  const { label, valuePath, placeholder, type, checks, validateOn } =
    element.props as {
      label?: string | null;
      valuePath: string;
      placeholder?: string | null;
      type?: string | null;
      checks?:
        | Array<{
            fn: string;
            message: string;
            args?: Record<string, unknown> | null;
          }>
        | null;
      validateOn?: string | null;
    };

  const { data, set } = useData();
  const value = getByPath(data, valuePath) as string | undefined;
  const validationConfig = useMemo(
    () => ({
      checks: checks ?? undefined,
      validateOn: (validateOn as "change" | "blur" | "submit") ?? "blur",
    }),
    [checks, validateOn],
  );

  const { errors, validate, touch } = useFieldValidation(
    valuePath,
    validationConfig,
  );
  const hasErrors = errors.length > 0;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <Input
        type={type || "text"}
        value={value ?? ""}
        onChange={(e) => {
          set(valuePath, e.target.value);
          if (validateOn === "change") validate();
        }}
        onBlur={() => {
          touch();
          if (validateOn === "blur" || !validateOn) validate();
        }}
        placeholder={placeholder ?? ""}
        aria-invalid={hasErrors}
        className={cn(
          hasErrors &&
            "border-destructive focus-visible:ring-destructive/20",
        )}
      />
      {errors.map((error, i) => (
        <span key={i} className="text-xs text-destructive">
          {error}
        </span>
      ))}
    </div>
  );
}
