"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { getByPath } from "@json-render/core";
import { type ComponentRenderProps } from "@json-render/react";
import { useData } from "@json-render/react";
import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "./checkbox";
import { formatTableCell } from "@/lib/table-format";
import { TableEmpty } from "@/components/ui/table-empty";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-primitives";

type TableColumn = {
  key: string;
  label: string;
  format?: "text" | "currency" | "date" | "badge" | null;
  sortable?: boolean | null;
};

  type InitialSort = {
  key: string;
  direction: "asc" | "desc";
};

export function DataTable({ element }: ComponentRenderProps) {
  const {
    title,
    dataPath,
    columns,
    enableSelection,
    initialSort,
    searchKey,
    emptyMessage,
    searchPath,
    filterField,
    filterEventName,
    hideSearch,
  } = element.props as {
    title?: string | null;
    dataPath: string;
    columns: TableColumn[];
    enableSelection?: boolean | null;
    initialSort?: InitialSort | null;
    searchKey?: string | null;
    emptyMessage?: string | null;
    searchPath?: string | null;
    filterField?: string | null;
    filterEventName?: string | null;
    hideSearch?: boolean | null;
  };

  const { data } = useData();
  const tableData = getByPath(data, dataPath) as
    | Array<Record<string, unknown>>
    | undefined;

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>(() =>
    initialSort
      ? [{ id: initialSort.key, desc: initialSort.direction === "desc" }]
      : [],
  );
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const externalSearch = searchPath
    ? (getByPath(data, searchPath) as string | null)
    : null;

  const rows = useMemo(
    () => (Array.isArray(tableData) ? tableData : []),
    [tableData],
  );

  useEffect(() => {
    if (!filterEventName) return;
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ status?: string }>).detail;
      const status = detail?.status ?? null;
      setFilterValue(status === "all" ? null : status);
    };
    window.addEventListener(filterEventName, handler as EventListener);
    return () => window.removeEventListener(filterEventName, handler as EventListener);
  }, [filterEventName]);

  const columnDefs = useMemo<ColumnDef<Record<string, unknown>>[]>(() => {
    const defs: ColumnDef<Record<string, unknown>>[] = [];

    if (enableSelection) {
      defs.push({
        id: "__select",
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all rows"
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                  ? "indeterminate"
                  : false
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(Boolean(value))
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
          />
        ),
        enableSorting: false,
        size: 48,
      });
    }

    columns.forEach((col) => {
      defs.push({
        id: col.key,
        accessorKey: col.key,
        header: ({ column }) => {
          const sortable = !!col.sortable;
          const sortDir = column.getIsSorted();
          return (
            <button
              type="button"
              className="flex w-full items-center gap-1 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
              onClick={sortable ? column.getToggleSortingHandler() : undefined}
              aria-label={
                sortable ? `Sort by ${col.label}` : `Column ${col.label}`
              }
            >
              <span>{col.label}</span>
              {sortable && (
                <span className="text-[10px] text-muted-foreground/80">
                  {sortDir === "asc"
                    ? "↑"
                    : sortDir === "desc"
                      ? "↓"
                      : ""}
                </span>
              )}
            </button>
          );
        },
        cell: ({ getValue }) =>
          formatTableCell(getValue(), col.format, {
            currency: { maximumFractionDigits: 0 },
          }),
        enableSorting: !!col.sortable,
      });
    });

    return defs;
  }, [columns, enableSelection]);

  const filteredRows = useMemo(() => {
    if (!filterField || !filterValue) return rows;
    return rows.filter((row) => {
      const value = row[filterField];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase() === filterValue.toLowerCase();
    });
  }, [filterField, filterValue, rows]);

  useEffect(() => {
    if (!searchPath) return;
    if (typeof externalSearch === "string") {
      if (externalSearch !== globalFilter) {
        setGlobalFilter(externalSearch);
      }
      return;
    }
    if (externalSearch === null && globalFilter !== "") {
      setGlobalFilter("");
    }
  }, [externalSearch, globalFilter, searchPath]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredRows,
    columns: columnDefs,
    state: { sorting, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getRowId: (row, index) =>
      typeof row.id === "string" || typeof row.id === "number"
        ? String(row.id)
        : String(index),
    globalFilterFn: (row, _columnId, filterValue) => {
      if (!filterValue) return true;
      const term = String(filterValue).toLowerCase();
      const searchKeys =
        (searchKey ? [searchKey] : columns.map((c) => c.key)) ?? [];
      return searchKeys.some((key) => {
        const value = row.getValue(key);
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(term);
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: !!enableSelection,
  });

  if (!filteredRows || filteredRows.length === 0) {
    return <TableEmpty message={emptyMessage ?? "No data"} />;
  }

  return (
    <div className="w-full space-y-3">
      {!searchPath && !hideSearch && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-8 w-[200px]"
            />
          </div>
        </div>
      )}
      <Table
        containerClassName="w-full overflow-auto rounded-xl border border-border/80 bg-card/80 shadow-sm"
        className="min-w-[720px] border-collapse text-sm"
      >
        <TableHeader className="text-xs uppercase tracking-wide text-muted-foreground">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-auto px-4 py-3 text-left font-medium whitespace-normal"
                  style={{
                    width: header.getSize()
                      ? `${header.getSize()}px`
                      : undefined,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="divide-y divide-border/70">
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() ? "selected" : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="px-4 py-3 align-middle whitespace-normal"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
