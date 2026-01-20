export type ObjectFieldFormat = "text" | "currency" | "date" | "badge";

export type ObjectField = {
  key: string;
  label: string;
  format?: ObjectFieldFormat;
};

export type ObjectDefinition = {
  type: string;
  label: string;
  pluralLabel: string;
  dataPath: string;
  idKey: string;
  titleKey: string;
  listRoute: string;
  meta?: ObjectField[];
  badges?: ObjectField[];
  summary?: ObjectField[];
  details?: ObjectField[];
};

export const OBJECT_DEFINITIONS: Record<string, ObjectDefinition> = {
  accounts: {
    type: "accounts",
    label: "Account",
    pluralLabel: "Accounts",
    dataPath: "/accounts/list",
    idKey: "id",
    titleKey: "name",
    listRoute: "/views/accounts",
    meta: [{ key: "owner", label: "Owner" }],
    badges: [
      { key: "status", label: "Status", format: "badge" },
      { key: "health", label: "Health", format: "badge" },
    ],
    summary: [
      { key: "segment", label: "Segment" },
      { key: "arr", label: "ARR", format: "currency" },
      { key: "renewalDate", label: "Renewal", format: "date" },
    ],
    details: [{ key: "id", label: "Account ID" }],
  },
  tasks: {
    type: "tasks",
    label: "Task",
    pluralLabel: "Tasks",
    dataPath: "/tasks/items",
    idKey: "id",
    titleKey: "title",
    listRoute: "/views/tasks",
    meta: [{ key: "id", label: "Task ID" }],
    badges: [
      { key: "status", label: "Status", format: "badge" },
      { key: "priority", label: "Priority", format: "badge" },
    ],
    summary: [
      { key: "label", label: "Label", format: "badge" },
      { key: "status", label: "Status", format: "badge" },
      { key: "priority", label: "Priority", format: "badge" },
    ],
  },
};

export function getObjectDefinition(type: string): ObjectDefinition | null {
  return OBJECT_DEFINITIONS[type] ?? null;
}
