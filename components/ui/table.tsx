"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { useData } from "@json-render/react";
import { getByPath } from "@json-render/core";

export function Table({ element }: ComponentRenderProps) {
  const { title, dataPath, columns } = element.props as {
    title?: string | null;
    dataPath: string;
    columns: Array<{ key: string; label: string; format?: string | null }>;
  };

  const { data } = useData();
  const tableData = getByPath(data, dataPath) as
    | Array<Record<string, unknown>>
    | undefined;

  if (!tableData || !Array.isArray(tableData) || tableData.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border/70 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        No data
      </div>
    );
  }

  const formatCell = (value: unknown, format?: string | null) => {
    if (value === null || value === undefined) return "-";
    if (format === "currency" && typeof value === "number") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    }
    if (format === "date" && typeof value === "string") {
      return new Date(value).toLocaleDateString();
    }
    if (format === "badge") {
      return (
        <span className="inline-flex items-center rounded-full bg-muted/70 px-2.5 py-1 text-xs font-medium text-foreground">
          {String(value)}
        </span>
      );
    }
    return String(value);
  };

  return (
    <div className="w-full overflow-hidden">
      {title && (
        <div className="mb-3 text-sm font-semibold text-foreground">{title}</div>
      )}
      <div className="w-full overflow-auto rounded-xl border border-border/80 bg-card/80 shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left font-medium"
                  scope="col"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {tableData.map((row, i) => (
              <tr
                key={i}
                className="bg-card transition-colors hover:bg-muted/30"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 align-middle">
                    {formatCell(row[col.key], col.format)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
