"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { useData } from "@json-render/react";
import { getByPath } from "@json-render/core";
import { formatTableCell } from "@/lib/table-format";
import { TableEmpty } from "@/components/ui/table-empty";

export function Table({ element }: ComponentRenderProps) {
  const { title, dataPath, columns } = element.props as {
    title?: string | null;
    dataPath: string;
    columns: Array<{
      key: string;
      label: string;
      format?: "text" | "currency" | "date" | "badge" | null;
    }>;
  };

  const { data } = useData();
  const tableData = getByPath(data, dataPath) as
    | Array<Record<string, unknown>>
    | undefined;

  if (!tableData || !Array.isArray(tableData) || tableData.length === 0) {
    return <TableEmpty message="No data" />;
  }

  return (
    <div className="w-full overflow-hidden">
      {title && (
        <div className="mb-3 text-sm font-semibold text-foreground">{title}</div>
      )}
      <div className="w-full overflow-auto rounded-xl border border-border/80 bg-card/80 shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted-foreground">
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
                    {formatTableCell(row[col.key], col.format)}
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
