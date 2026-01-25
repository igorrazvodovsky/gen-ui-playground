import { BarChart, FileText, LayoutDashboard, Settings, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { OBJECT_TYPE_METADATA } from "@/lib/object-type-metadata";
import { type ObjectType } from "@/lib/object-definitions";
type PromptSuggestion = {
  label: string;
  icon: LucideIcon;
};

export const WORKSPACES = [
  "Northloop Metals",
  "EcoVia Logistics",
  "GreenPulse Batteries",
];

export const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  { label: "Revenue dashboard with metrics and chart", icon: BarChart },
  { label: "Recent transactions table", icon: FileText },
  { label: "Customer count with trend", icon: Users },
];

export const LEGACY_SYSTEM_VIEW_PREFIX = "system-";
export const RECENT_REORDER_DELAY_MS = 400;
export const RECENT_OBJECT_STORAGE_KEY = "recent-object-views";

const objectTypeIcons = Object.fromEntries(
  (Object.entries(OBJECT_TYPE_METADATA) as [ObjectType, { icon: LucideIcon }][])
    .map(([key, meta]) => [key, meta.icon]),
);

const objectViewIcons = Object.fromEntries(
  (Object.entries(OBJECT_TYPE_METADATA) as [ObjectType, { icon: LucideIcon; listView: { kind: string } }][])
    .filter(([, meta]) => meta.listView.kind !== "hidden")
    .map(([key, meta]) => [key, meta.icon]),
);

export const SYSTEM_VIEW_ICONS: Record<string, LucideIcon> = {
  "dashboard": LayoutDashboard,
  ...objectViewIcons,
  "settings": Settings,
};

export const OBJECT_TYPE_ICONS: Record<ObjectType, LucideIcon> = objectTypeIcons;
