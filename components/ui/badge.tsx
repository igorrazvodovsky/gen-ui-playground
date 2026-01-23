"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentRenderProps, useData } from "@json-render/react";
import { getByPath } from "@json-render/core";

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

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-muted/70 text-foreground border-transparent",
        success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        danger: "bg-red-500/10 text-red-600 border-red-500/20",
        error: "bg-red-500/10 text-red-600 border-red-500/20",
        info: "bg-slate-500/10 text-muted-foreground border-slate-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function BadgeBase({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export function Badge({ element }: ComponentRenderProps) {
  const { text, variant } = element.props as {
    text: string | { path: string };
    variant?: string | null;
  };
  const resolvedText = useResolvedValue(text);

  return <BadgeBase variant={variant ?? undefined}>{resolvedText}</BadgeBase>;
}

export { BadgeBase, badgeVariants };
