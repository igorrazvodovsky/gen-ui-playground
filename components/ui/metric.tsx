"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { useData } from "@json-render/react";
import { getByPath } from "@json-render/core";

import { cn } from "@/lib/utils";

const trendClasses: Record<string, string> = {
  up: "text-emerald-600",
  down: "text-red-600",
  neutral: "text-muted-foreground",
};

export function Metric({ element }: ComponentRenderProps) {
  const { label, valuePath, format, trend, trendValue } = element.props as {
    label: string;
    valuePath: string;
    format?: string | null;
    trend?: string | null;
    trendValue?: string | null;
  };

  const { data } = useData();
  const rawValue = getByPath(data, valuePath);

  let displayValue = String(rawValue ?? "-");
  if (format === "currency" && typeof rawValue === "number") {
    displayValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(rawValue);
  } else if (format === "percent" && typeof rawValue === "number") {
    displayValue = new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
    }).format(rawValue);
  } else if (format === "number" && typeof rawValue === "number") {
    displayValue = new Intl.NumberFormat("en-US").format(rawValue);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-3xl font-semibold text-foreground">
        {displayValue}
      </span>
      {(trend || trendValue) && (
        <span
          className={cn(
            "text-sm",
            trendClasses[trend || "neutral"] ?? trendClasses.neutral,
          )}
        >
          {trend === "up" ? "+" : trend === "down" ? "-" : ""}
          {trendValue}
        </span>
      )}
    </div>
  );
}
