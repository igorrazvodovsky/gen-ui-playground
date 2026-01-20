"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/tasks/badge";
import { labels, priorities, statuses } from "@/components/tasks/data";
import { type Task } from "@/lib/tasks";
import { DataTableColumnHeader } from "@/components/tasks/data-table-column-header";
import { DataTableRowActions } from "@/components/tasks/data-table-row-actions";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => {
      const rawId = row.getValue("id");
      if (!rawId) {
        return <div className="w-[80px]">-</div>;
      }
      const id = String(rawId);
      const href = `/objects/tasks/${encodeURIComponent(id)}`;
      return (
        <div className="w-[80px]">
          <Link href={href} className="font-medium text-primary hover:underline">
            {id}
          </Link>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((item) => item.value === row.original.label);

      return (
        <div className="flex gap-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (item) => item.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[110px] items-center gap-2">
          {status.icon && <status.icon className="size-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (item) => item.value === row.getValue("priority"),
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center gap-2">
          {priority.icon && (
            <priority.icon className="size-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
