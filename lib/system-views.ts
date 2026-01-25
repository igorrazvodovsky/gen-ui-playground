import type { UITree } from "@json-render/core";

import { type ObjectType } from "./object-definitions";
import {
  OBJECT_TYPE_METADATA,
  type ObjectTableView,
  type ObjectTypeMetadata,
} from "./object-type-metadata";

export type SystemView = {
  id: string;
  label: string;
  prompt: string;
  tree: UITree;
};

const dashboardTree: UITree = {
  root: "dashboard",
  elements: {
    "dashboard": {
      key: "dashboard",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "lg",
      },
      children: [
        "dashboard-metrics",
        "dashboard-visitors",
        "dashboard-documents",
      ],
    },
    "dashboard-metrics": {
      key: "dashboard-metrics",
      type: "Grid",
      props: {
        columns: 4,
        gap: "md",
      },
      children: [
        "metric-card-revenue",
        "metric-card-customers",
        "metric-card-accounts",
        "metric-card-growth",
      ],
    },
    "metric-card-revenue": {
      key: "metric-card-revenue",
      type: "Card",
      props: {
        padding: "md",
      },
      children: ["metric-stack-revenue"],
    },
    "metric-stack-revenue": {
      key: "metric-stack-revenue",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "sm",
      },
      children: ["metric-revenue", "metric-revenue-note"],
    },
    "metric-revenue": {
      key: "metric-revenue",
      type: "Metric",
      props: {
        label: "Total Revenue",
        valuePath: "/dashboard/metrics/totalRevenue",
        format: "currency",
        trend: "up",
        trendValue: "12.5%",
      },
    },
    "metric-revenue-note": {
      key: "metric-revenue-note",
      type: "Text",
      props: {
        content: "Trending up this month",
        variant: "caption",
        color: "muted",
      },
    },
    "metric-card-customers": {
      key: "metric-card-customers",
      type: "Card",
      props: {
        padding: "md",
      },
      children: ["metric-stack-customers"],
    },
    "metric-stack-customers": {
      key: "metric-stack-customers",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "sm",
      },
      children: ["metric-customers", "metric-customers-note"],
    },
    "metric-customers": {
      key: "metric-customers",
      type: "Metric",
      props: {
        label: "New Customers",
        valuePath: "/dashboard/metrics/newCustomers",
        format: "number",
        trend: "down",
        trendValue: "20%",
      },
    },
    "metric-customers-note": {
      key: "metric-customers-note",
      type: "Text",
      props: {
        content: "Down 20% this period",
        variant: "caption",
        color: "muted",
      },
    },
    "metric-card-accounts": {
      key: "metric-card-accounts",
      type: "Card",
      props: {
        padding: "md",
      },
      children: ["metric-stack-accounts"],
    },
    "metric-stack-accounts": {
      key: "metric-stack-accounts",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "sm",
      },
      children: ["metric-accounts", "metric-accounts-note"],
    },
    "metric-accounts": {
      key: "metric-accounts",
      type: "Metric",
      props: {
        label: "Active Accounts",
        valuePath: "/dashboard/metrics/activeAccounts",
        format: "number",
        trend: "up",
        trendValue: "12.5%",
      },
    },
    "metric-accounts-note": {
      key: "metric-accounts-note",
      type: "Text",
      props: {
        content: "Strong user retention",
        variant: "caption",
        color: "muted",
      },
    },
    "metric-card-growth": {
      key: "metric-card-growth",
      type: "Card",
      props: {
        padding: "md",
      },
      children: ["metric-stack-growth"],
    },
    "metric-stack-growth": {
      key: "metric-stack-growth",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "sm",
      },
      children: ["metric-growth", "metric-growth-note"],
    },
    "metric-growth": {
      key: "metric-growth",
      type: "Metric",
      props: {
        label: "Growth Rate",
        valuePath: "/dashboard/metrics/growthRate",
        format: "percent",
        trend: "up",
        trendValue: "4.5%",
      },
    },
    "metric-growth-note": {
      key: "metric-growth-note",
      type: "Text",
      props: {
        content: "Steady performance increase",
        variant: "caption",
        color: "muted",
      },
    },
    "dashboard-visitors": {
      key: "dashboard-visitors",
      type: "Card",
      props: {
        title: "Total Visitors",
        description: "Total for the last 3 months",
        padding: "lg",
      },
      children: ["visitors-stack"],
    },
    "visitors-stack": {
      key: "visitors-stack",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "md",
      },
      children: ["visitors-filters", "visitors-chart"],
    },
    "visitors-filters": {
      key: "visitors-filters",
      type: "Stack",
      props: {
        direction: "horizontal",
        gap: "sm",
        justify: "end",
      },
      children: ["filter-3m", "filter-30d", "filter-7d"],
    },
    "filter-3m": {
      key: "filter-3m",
      type: "Button",
      props: {
        label: "Last 3 months",
        action: "apply_filter",
        variant: "outline",
        size: "sm",
      },
    },
    "filter-30d": {
      key: "filter-30d",
      type: "Button",
      props: {
        label: "Last 30 days",
        action: "apply_filter",
        variant: "ghost",
        size: "sm",
      },
    },
    "filter-7d": {
      key: "filter-7d",
      type: "Button",
      props: {
        label: "Last 7 days",
        action: "apply_filter",
        variant: "ghost",
        size: "sm",
      },
    },
    "visitors-chart": {
      key: "visitors-chart",
      type: "Chart",
      props: {
        type: "area",
        dataPath: "/dashboard/visitors",
        height: 240,
      },
    },
    "dashboard-documents": {
      key: "dashboard-documents",
      type: "Card",
      props: {
        title: "Outline",
        description: "Focus document overview",
        padding: "lg",
      },
      children: ["documents-toolbar", "documents-table"],
    },
    "documents-toolbar": {
      key: "documents-toolbar",
      type: "Stack",
      props: {
        direction: "horizontal",
        gap: "md",
        align: "center",
        justify: "between",
      },
      children: ["documents-tabs", "documents-actions"],
    },
    "documents-tabs": {
      key: "documents-tabs",
      type: "Tabs",
      props: {
        defaultValue: "outline",
        items: [
          {
            value: "outline",
            label: "Outline",
            action: "view_details",
            params: { tab: "Outline" },
          },
          {
            value: "performance",
            label: "Past Performance",
            action: "view_details",
            params: { tab: "Past Performance" },
          },
          {
            value: "personnel",
            label: "Key Personnel",
            action: "view_details",
            params: { tab: "Key Personnel" },
          },
          {
            value: "focus",
            label: "Focus Documents",
            action: "view_details",
            params: { tab: "Focus Documents" },
          },
        ],
      },
    },
    "documents-actions": {
      key: "documents-actions",
      type: "Stack",
      props: {
        direction: "horizontal",
        gap: "sm",
      },
      children: ["customize-columns", "add-section"],
    },
    "customize-columns": {
      key: "customize-columns",
      type: "Button",
      props: {
        label: "Columns",
        action: "view_details",
        variant: "outline",
        size: "sm",
      },
    },
    "add-section": {
      key: "add-section",
      type: "Button",
      props: {
        label: "Add",
        action: "view_details",
        variant: "outline",
        size: "sm",
      },
    },
    "documents-table": {
      key: "documents-table",
      type: "Table",
      props: {
        dataPath: "/dashboard/sections",
        columns: [
          { key: "title", label: "Header" },
          { key: "type", label: "Section Type" },
          { key: "status", label: "Status", format: "badge" },
          { key: "target", label: "Target" },
          { key: "limit", label: "Limit" },
          { key: "reviewer", label: "Reviewer" },
        ],
      },
    },
  },
};

const tasksTree: UITree = {
  root: "tasks",
  elements: {
    "tasks": {
      key: "tasks",
      type: "TasksTable",
      props: {
        dataPath: "/tasks/items",
      },
    },
  },
};

const accountsTree: UITree = {
  root: "accounts",
  elements: {
    "accounts": {
      key: "accounts",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "lg",
      },
      children: ["accounts-toolbar", "accounts-table"],
    },
    "accounts-toolbar": {
      key: "accounts-toolbar",
      type: "Stack",
      props: {
        direction: "horizontal",
        gap: "md",
        align: "center",
        justify: "between",
      },
      children: ["accounts-tabs-and-search", "accounts-actions"],
    },
    "accounts-tabs-and-search": {
      key: "accounts-tabs-and-search",
      type: "Stack",
      props: {
        direction: "horizontal",
        gap: "md",
        align: "center",
        justify: "start",
      },
      children: ["accounts-tabs", "accounts-search"],
    },
    "accounts-search": {
      key: "accounts-search",
      type: "Stack",
      props: {
        direction: "horizontal",
        gap: "sm",
        align: "center",
        justify: "start",
      },
      children: ["accounts-search-input"],
    },
    "accounts-search-input": {
      key: "accounts-search-input",
      type: "TextField",
      props: {
        label: null,
        valuePath: "/form/accountsSearch",
        placeholder: "Search accounts",
      },
    },
    "accounts-tabs": {
      key: "accounts-tabs",
      type: "Tabs",
      props: {
        defaultValue: "all",
        items: [
          {
            value: "all",
            label: "All accounts",
            action: "filter_accounts",
            params: { status: "all" },
          },
          {
            value: "active",
            label: "Active",
            action: "filter_accounts",
            params: { status: "Active" },
          },
          {
            value: "risk",
            label: "At risk",
            action: "filter_accounts",
            params: { status: ["At Risk", "Churn Risk"] },
          },
        ],
      },
    },
    "accounts-actions": {
      key: "accounts-actions",
      type: "Stack",
      props: {
        direction: "horizontal",
        gap: "sm",
      },
      children: ["accounts-refresh"],
    },
    "accounts-refresh": {
      key: "accounts-add",
      type: "Button",
      props: {
        label: "Add account",
        action: "add_account",
        variant: "outline",
        size: "sm",
      },
    },
    "accounts-table": {
      key: "accounts-table",
      type: "DataTable",
      props: {
        dataPath: "/accounts/list",
        enableSelection: true,
        filterField: "status",
        filterEventName: "accounts-filter",
        hideSearch: true,
        linkBasePath: "/objects/accounts",
        searchPath: "/form/accountsSearch",
        initialSort: {
          key: "arr",
          direction: "desc",
        },
        searchKey: "name",
        emptyMessage: "No accounts found",
        columns: [
          { key: "name", label: "Account", sortable: true, link: true },
          { key: "owner", label: "Owner", sortable: true },
          { key: "segment", label: "Segment", sortable: true },
          { key: "status", label: "Status", format: "badge", sortable: true },
          { key: "arr", label: "ARR", format: "currency", sortable: true },
          { key: "renewalDate", label: "Renewal", format: "date", sortable: true },
          { key: "health", label: "Health", format: "badge", sortable: true },
        ],
      },
    },
  },
};

const buildTableTree = (type: ObjectType, view: ObjectTableView): UITree => {
  const meta = OBJECT_TYPE_METADATA[type];
  return {
    root: type,
    elements: {
      [type]: {
        key: type,
        type: "DataTable",
        props: {
          dataPath: meta.dataPath,
          linkBasePath: meta.linkBasePath,
          ...view.props,
        },
      },
    },
  };
};

const getCustomPrompt = (meta: ObjectTypeMetadata) =>
  meta.listView.kind === "custom" ? meta.listView.prompt : meta.pluralLabel;

const tableSystemViews = (
  Object.entries(OBJECT_TYPE_METADATA) as [ObjectType, ObjectTypeMetadata][]
).flatMap(([type, meta]) => {
  if (meta.listView.kind !== "table") return [];
  return [
    {
      id: type,
      label: meta.pluralLabel,
      prompt: meta.listView.prompt,
      tree: buildTableTree(type, meta.listView),
    },
  ];
});


const settingsTree: UITree = {
  root: "settings",
  elements: {
    "settings": {
      key: "settings",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "lg",
      },
      children: [
        "settings-header",
        "settings-profile",
        "settings-preferences",
        "settings-sessions",
      ],
    },
    "settings-header": {
      key: "settings-header",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "sm",
      },
    },
    "settings-profile": {
      key: "settings-profile",
      type: "Card",
      props: {
        title: "Profile",
        description: "Contact information shown to your team.",
        padding: "lg",
      },
      children: ["settings-profile-stack"],
    },
    "settings-profile-stack": {
      key: "settings-profile-stack",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "md",
      },
      children: [
        "settings-name",
        "settings-email",
        "settings-role",
        "settings-team",
      ],
    },
    "settings-name": {
      key: "settings-name",
      type: "TextField",
      props: {
        label: "Full name",
        valuePath: "/settings/profile/name",
        placeholder: "Enter your name",
      },
    },
    "settings-email": {
      key: "settings-email",
      type: "TextField",
      props: {
        label: "Email address",
        valuePath: "/settings/profile/email",
        placeholder: "name@company.com",
        type: "email",
      },
    },
    "settings-role": {
      key: "settings-role",
      type: "TextField",
      props: {
        label: "Role",
        valuePath: "/settings/profile/title",
        placeholder: "Role or title",
      },
    },
    "settings-team": {
      key: "settings-team",
      type: "TextField",
      props: {
        label: "Team",
        valuePath: "/settings/profile/team",
        placeholder: "Team or department",
      },
    },
    "settings-preferences": {
      key: "settings-preferences",
      type: "Card",
      props: {
        title: "Preferences",
        description: "Defaults for new content and notifications.",
        padding: "lg",
      },
      children: ["settings-preferences-stack"],
    },
    "settings-preferences-stack": {
      key: "settings-preferences-stack",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "md",
      },
      children: [
        "settings-timezone",
        "settings-language",
        "settings-date-format",
        "settings-week-start",
        "settings-digest",
        "settings-quarter-start",
      ],
    },
    "settings-timezone": {
      key: "settings-timezone",
      type: "Select",
      props: {
        label: "Time zone",
        valuePath: "/settings/preferences/timezone",
        placeholder: "Select time zone",
        options: [
          { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
          { value: "America/New_York", label: "Eastern Time (ET)" },
          { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
          { value: "Asia/Singapore", label: "Singapore Time (SGT)" },
        ],
      },
    },
    "settings-language": {
      key: "settings-language",
      type: "Select",
      props: {
        label: "Language",
        valuePath: "/settings/preferences/language",
        placeholder: "Select language",
        options: [
          { value: "en-US", label: "English (US)" },
          { value: "en-GB", label: "English (UK)" },
          { value: "de-DE", label: "German" },
          { value: "fr-FR", label: "French" },
        ],
      },
    },
    "settings-date-format": {
      key: "settings-date-format",
      type: "Select",
      props: {
        label: "Date format",
        valuePath: "/settings/preferences/dateFormat",
        options: [
          { value: "MMM d, yyyy", label: "Jan 6, 2025" },
          { value: "yyyy-MM-dd", label: "2025-01-06" },
          { value: "dd/MM/yyyy", label: "06/01/2025" },
        ],
      },
    },
    "settings-week-start": {
      key: "settings-week-start",
      type: "Select",
      props: {
        label: "Week starts on",
        valuePath: "/settings/preferences/weekStart",
        options: [
          { value: "Monday", label: "Monday" },
          { value: "Sunday", label: "Sunday" },
        ],
      },
    },
    "settings-digest": {
      key: "settings-digest",
      type: "Select",
      props: {
        label: "Digest frequency",
        valuePath: "/settings/preferences/digest",
        options: [
          { value: "Daily", label: "Daily" },
          { value: "Weekly", label: "Weekly" },
          { value: "Monthly", label: "Monthly" },
          { value: "Off", label: "Off" },
        ],
      },
    },
    "settings-quarter-start": {
      key: "settings-quarter-start",
      type: "DatePicker",
      props: {
        label: "Quarter start",
        valuePath: "/settings/preferences/quarterStart",
        placeholder: "Select date",
      },
    },
    "settings-sessions": {
      key: "settings-sessions",
      type: "Card",
      props: {
        title: "Active sessions",
        description: "Devices recently used to access this workspace.",
        padding: "lg",
      },
      children: ["settings-sessions-stack"],
    },
    "settings-sessions-stack": {
      key: "settings-sessions-stack",
      type: "Stack",
      props: {
        direction: "vertical",
        gap: "sm",
      },
      children: ["settings-sessions-note", "settings-sessions-table"],
    },
    "settings-sessions-note": {
      key: "settings-sessions-note",
      type: "Text",
      props: {
        content:
          "If you see an unfamiliar device, sign out from the account menu.",
        variant: "caption",
        color: "muted",
      },
    },
    "settings-sessions-table": {
      key: "settings-sessions-table",
      type: "Table",
      props: {
        dataPath: "/settings/sessions",
        columns: [
          { key: "device", label: "Device" },
          { key: "location", label: "Location" },
          { key: "lastActive", label: "Last active", format: "date" },
          { key: "status", label: "Status", format: "badge" },
        ],
      },
    },
  },
};

export const SYSTEM_VIEWS: SystemView[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    prompt:
      "Executive dashboard with revenue metrics, visitor trend chart, and document outline table.",
    tree: dashboardTree,
  },
  {
    id: "tasks",
    label: OBJECT_TYPE_METADATA.tasks.pluralLabel,
    prompt: getCustomPrompt(OBJECT_TYPE_METADATA.tasks),
    tree: tasksTree,
  },
  {
    id: "accounts",
    label: OBJECT_TYPE_METADATA.accounts.pluralLabel,
    prompt: getCustomPrompt(OBJECT_TYPE_METADATA.accounts),
    tree: accountsTree,
  },
  ...tableSystemViews,
  {
    id: "settings",
    label: "Settings",
    prompt:
      "Workspace settings with profile fields, preferences, and active sessions.",
    tree: settingsTree,
  },
];

export const SYSTEM_VIEW_SEEDS = SYSTEM_VIEWS.map(({ id, prompt, tree }) => ({
  id,
  prompt,
  tree,
}));

export const SYSTEM_VIEW_IDS = SYSTEM_VIEWS.map((view) => view.id);

export const DEFAULT_SYSTEM_VIEW_ID = "tasks";
export const DEFAULT_SYSTEM_VIEW =
  SYSTEM_VIEWS.find((view) => view.id === DEFAULT_SYSTEM_VIEW_ID) ??
  SYSTEM_VIEWS[0] ??
  null;
