"use client";

import { getByPath } from "@json-render/core";
import { type ComponentRenderProps, useData } from "@json-render/react";

import { DataTable } from "@/components/tasks/data-table";
import { columns } from "@/components/tasks/columns";
import { type Task } from "@/lib/tasks";

export function TasksTable({ element }: ComponentRenderProps) {
  const { data } = useData();
  const { dataPath } = element.props as { dataPath?: string | null };
  const resolvedPath = dataPath ?? "/tasks/items";
  const tasks = getByPath(data, resolvedPath) as Task[] | undefined;

  return (
    <div className="flex h-full flex-1 flex-col gap-4">
      <DataTable data={Array.isArray(tasks) ? tasks : []} columns={columns} />
    </div>
  );
}
