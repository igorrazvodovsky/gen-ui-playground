export type TableColumn = {
  key: string;
  label: string;
  format?: "text" | "currency" | "date" | "badge" | null;
  sortable?: boolean | null;
  link?: boolean | null;
};

export type InitialSort = {
  key: string;
  direction: "asc" | "desc";
};
