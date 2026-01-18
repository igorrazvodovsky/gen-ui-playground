import type { UITree } from "@json-render/core";

export type SystemView = {
  id: string;
  label: string;
  tree: UITree;
};

const dashboardTree: UITree = {
  root: "system-dashboard",
  elements: {
    "system-dashboard": {
      key: "system-dashboard",
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
        variant: "secondary",
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
      type: "Stack",
      props: {
        direction: "horizontal",
        gap: "sm",
      },
      children: [
        "tab-outline",
        "tab-performance",
        "tab-personnel",
        "tab-focus",
      ],
    },
    "tab-outline": {
      key: "tab-outline",
      type: "Button",
      props: {
        label: "Outline",
        action: "view_details",
        variant: "secondary",
        size: "sm",
      },
    },
    "tab-performance": {
      key: "tab-performance",
      type: "Button",
      props: {
        label: "Past Performance",
        action: "view_details",
        variant: "ghost",
        size: "sm",
      },
    },
    "tab-personnel": {
      key: "tab-personnel",
      type: "Button",
      props: {
        label: "Key Personnel",
        action: "view_details",
        variant: "ghost",
        size: "sm",
      },
    },
    "tab-focus": {
      key: "tab-focus",
      type: "Button",
      props: {
        label: "Focus Documents",
        action: "view_details",
        variant: "ghost",
        size: "sm",
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
        label: "Customize Columns",
        action: "view_details",
        variant: "secondary",
        size: "sm",
      },
    },
    "add-section": {
      key: "add-section",
      type: "Button",
      props: {
        label: "Add Section",
        action: "view_details",
        variant: "primary",
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

export const SYSTEM_VIEWS: SystemView[] = [
  {
    id: "system-dashboard",
    label: "Dashboard",
    tree: dashboardTree,
  },
];

export const DEFAULT_SYSTEM_VIEW_ID = "system-dashboard";
export const DEFAULT_SYSTEM_VIEW =
  SYSTEM_VIEWS.find((view) => view.id === DEFAULT_SYSTEM_VIEW_ID) ??
  SYSTEM_VIEWS[0] ??
  null;
