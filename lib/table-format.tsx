import type { ReactNode } from "react";

type TableFormat = "text" | "currency" | "date" | "badge" | null | undefined;

type TableFormatOptions = {
  currency?: Intl.NumberFormatOptions;
};

export function formatTableCell(
  value: unknown,
  format?: TableFormat,
  options?: TableFormatOptions,
): ReactNode {
  if (value === null || value === undefined) return "-";
  if (format === "currency" && typeof value === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      ...options?.currency,
    }).format(value);
  }
  if (format === "date" && typeof value === "string") {
    return new Date(value).toLocaleDateString();
  }
  if (format === "badge") {
    return (
      <span className="inline-flex items-center rounded-full border border-transparent bg-muted/70 px-2.5 py-1 text-xs font-medium text-foreground">
        {String(value)}
      </span>
    );
  }
  return String(value);
}
