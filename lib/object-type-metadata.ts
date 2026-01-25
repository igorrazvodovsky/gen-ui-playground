import {
  Boxes,
  BriefcaseBusiness,
  ClipboardCheck,
  ClipboardList,
  Factory,
  ListTodo,
  Truck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { OBJECT_DEFINITIONS, type ObjectType } from "./object-definitions";

type TableColumn = {
  key: string;
  label: string;
  format?: "text" | "currency" | "date" | "badge" | null;
  sortable?: boolean | null;
  link?: boolean | null;
};

type InitialSort = {
  key: string;
  direction: "asc" | "desc";
};

export type ObjectTableView = {
  kind: "table";
  prompt: string;
  props: {
    columns: TableColumn[];
    enableSelection?: boolean | null;
    searchKey?: string | null;
    initialSort?: InitialSort | null;
    emptyMessage?: string | null;
    filterField?: string | null;
    filterEventName?: string | null;
    hideSearch?: boolean | null;
    linkIdKey?: string | null;
  };
};

export type ObjectListView =
  | ObjectTableView
  | { kind: "custom"; prompt: string }
  | { kind: "hidden" };

export type ObjectTypeMetadata = {
  label: string;
  pluralLabel: string;
  icon: LucideIcon;
  linkBasePath: string;
  listRoute: string;
  dataPath: string;
  listView: ObjectListView;
};

const buildMetadata = (
  type: ObjectType,
  icon: LucideIcon,
  listView: ObjectListView,
): ObjectTypeMetadata => {
  const definition = OBJECT_DEFINITIONS[type];
  return {
    label: definition.label,
    pluralLabel: definition.pluralLabel,
    icon,
    linkBasePath: `/objects/${type}`,
    listRoute: definition.listRoute,
    dataPath: definition.dataPath,
    listView,
  };
};

export const OBJECT_TYPE_METADATA: Record<ObjectType, ObjectTypeMetadata> = {
  accounts: buildMetadata("accounts", BriefcaseBusiness, {
    kind: "custom",
    prompt:
      "Accounts overview with tabs, search, and a sortable table for ARR, status, and renewals.",
  }),
  tasks: buildMetadata("tasks", ListTodo, {
    kind: "custom",
    prompt:
      "Task tracker with filters, column toggles, row actions, and pagination.",
  }),
  facilities: buildMetadata("facilities", Factory, {
    kind: "table",
    prompt: "Facility list with operating status, location, and operators.",
    props: {
      enableSelection: true,
      searchKey: "name",
      initialSort: { key: "name", direction: "asc" },
      emptyMessage: "No facilities found",
      columns: [
        { key: "name", label: "Facility", sortable: true, link: true },
        { key: "type", label: "Type", format: "badge", sortable: true },
        { key: "status", label: "Status", format: "badge", sortable: true },
        { key: "location", label: "Location", sortable: true },
        { key: "operatorAccountId", label: "Operator", sortable: true },
      ],
    },
  }),
  materials: buildMetadata("materials", Boxes, {
    kind: "table",
    prompt: "Materials catalog with recycled content, grades, and suppliers.",
    props: {
      enableSelection: true,
      searchKey: "name",
      initialSort: { key: "name", direction: "asc" },
      emptyMessage: "No materials found",
      columns: [
        { key: "name", label: "Material", sortable: true, link: true },
        { key: "category", label: "Category", format: "badge", sortable: true },
        { key: "grade", label: "Grade", sortable: true },
        { key: "recycledContent", label: "Recycled Content", sortable: true },
        {
          key: "defaultDisposition",
          label: "Disposition",
          format: "badge",
          sortable: true,
        },
        { key: "supplierAccountId", label: "Supplier", sortable: true },
      ],
    },
  }),
  batches: buildMetadata("batches", ClipboardList, {
    kind: "table",
    prompt: "Batch tracker showing disposition, material, and production dates.",
    props: {
      enableSelection: true,
      searchKey: "id",
      initialSort: { key: "productionDate", direction: "desc" },
      emptyMessage: "No batches found",
      columns: [
        { key: "id", label: "Batch", sortable: true, link: true },
        { key: "materialId", label: "Material", sortable: true },
        { key: "quantity", label: "Quantity", sortable: true },
        { key: "disposition", label: "Disposition", format: "badge", sortable: true },
        { key: "facilityId", label: "Facility", sortable: true },
        { key: "productionDate", label: "Produced", format: "date", sortable: true },
      ],
    },
  }),
  shipments: buildMetadata("shipments", Truck, {
    kind: "table",
    prompt: "Shipment overview with ETA, carrier, and disposition status.",
    props: {
      enableSelection: true,
      searchKey: "id",
      initialSort: { key: "eta", direction: "desc" },
      emptyMessage: "No shipments found",
      columns: [
        { key: "id", label: "Shipment", sortable: true, link: true },
        { key: "status", label: "Status", format: "badge", sortable: true },
        { key: "originFacilityId", label: "Origin", sortable: true },
        { key: "destinationFacilityId", label: "Destination", sortable: true },
        { key: "carrier", label: "Carrier", sortable: true },
        { key: "eta", label: "ETA", format: "date", sortable: true },
        { key: "disposition", label: "Disposition", format: "badge", sortable: true },
      ],
    },
  }),
  assets: buildMetadata("assets", Wrench, {
    kind: "table",
    prompt: "Reusable assets and equipment inventory with condition and cycles.",
    props: {
      enableSelection: true,
      searchKey: "id",
      initialSort: { key: "cycles", direction: "desc" },
      emptyMessage: "No assets found",
      columns: [
        { key: "id", label: "Asset", sortable: true, link: true },
        { key: "type", label: "Type", format: "badge", sortable: true },
        { key: "condition", label: "Condition", format: "badge", sortable: true },
        { key: "currentFacilityId", label: "Location", sortable: true },
        { key: "ownerAccountId", label: "Owner", sortable: true },
        { key: "disposition", label: "Disposition", format: "badge", sortable: true },
        { key: "cycles", label: "Cycles", sortable: true },
      ],
    },
  }),
  "epcis-events": buildMetadata("epcis-events", ClipboardCheck, {
    kind: "hidden",
  }),
};
