import {
  BarChart,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  ListTodo,
  Settings,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type PromptSuggestion = {
  label: string;
  icon: LucideIcon;
};

export const WORKSPACES = ["Acme Corp", "Personal", "Team Project"];

export const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  { label: "Revenue dashboard with metrics and chart", icon: BarChart },
  { label: "Recent transactions table", icon: FileText },
  { label: "Customer count with trend", icon: Users },
];

export const LEGACY_SYSTEM_VIEW_PREFIX = "system-";
export const RECENT_REORDER_DELAY_MS = 400;
export const RECENT_OBJECT_STORAGE_KEY = "recent-object-views";

export const SYSTEM_VIEW_ICONS: Record<string, LucideIcon> = {
  "dashboard": LayoutDashboard,
  "tasks": ListTodo,
  "accounts": BriefcaseBusiness,
  "settings": Settings,
};

export const OBJECT_TYPE_ICONS: Record<string, LucideIcon> = {
  "tasks": ListTodo,
  "accounts": BriefcaseBusiness,
};
