"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DataProvider,
  ActionProvider,
  VisibilityProvider,
  ValidationProvider,
  useData,
  useUIStream,
  Renderer,
} from "@json-render/react";
import { usePathname, useRouter } from "next/navigation";
import { getByPath, type UITree } from "@json-render/core";
import { Button } from "@/components/ui/button";
import { ObjectView } from "@/components/object-view";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart,
  Bell,
  BriefcaseBusiness,
  PanelRight,
  ChevronsUpDown,
  Clock,
  FileText,
  HelpCircle,
  Info,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Plus,
  Search,
  Settings,
  Tag,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { componentRegistry } from "@/components/ui";
import { getObjectDefinition } from "@/lib/object-definitions";
import {
  DEFAULT_SYSTEM_VIEW,
  SYSTEM_VIEWS,
  type SystemView,
} from "@/lib/system-views";
import { TASKS } from "@/lib/tasks";

type StoredTree = UITree;
type RecentBase = {
  id: string;
  createdAt: number;
  updatedAt: number;
};
type RecentItem = RecentBase & {
  prompt: string;
  tree: StoredTree;
};
type RecentObjectItem = RecentBase & {
  objectType: string;
  objectId: string;
};
type SystemViewEntry = SystemView;
type RegenerationTarget = {
  id: string;
};
type StoredView = {
  id: string;
  prompt: string;
  tree: StoredTree;
  createdAt: number;
  updatedAt: number;
};
type ObjectRoute = {
  type: string;
  id: string;
};
type RouteSelection =
  | { kind: "root" }
  | { kind: "view"; id: string }
  | { kind: "object"; objectType: string; objectId: string };

const buildViewRoute = (id: string) => `/views/${encodeURIComponent(id)}`;
const buildObjectRoute = (type: string, id: string) =>
  `/objects/${encodeURIComponent(type)}/${encodeURIComponent(id)}`;
const buildObjectRecentId = (type: string, id: string) =>
  `object:${type}:${id}`;

const getRecency = (item: RecentBase) => item.updatedAt ?? item.createdAt;

const mergeRecents = <T extends RecentBase>(items: T[], incoming: T[]) => {
  const map = new Map<string, T>();
  items.forEach((item) => map.set(item.id, item));
  incoming.forEach((item) => {
    const existing = map.get(item.id);
    if (!existing || getRecency(item) >= getRecency(existing)) {
      map.set(item.id, item);
    }
  });
  return Array.from(map.values()).sort((a, b) => getRecency(b) - getRecency(a));
};

const mergeSystemViews = (
  items: SystemViewEntry[],
  incoming: StoredView[],
) => {
  if (incoming.length === 0) return items;
  const map = new Map<string, StoredView>();
  incoming.forEach((view) => {
    const existing = map.get(view.id);
    if (!existing || view.updatedAt >= existing.updatedAt) {
      map.set(view.id, view);
    }
  });
  return items.map((view) => {
    const updated = map.get(view.id);
    if (!updated) return view;
    return { ...view, prompt: updated.prompt, tree: updated.tree };
  });
};

const parsePathname = (pathname: string): RouteSelection => {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { kind: "root" };
  if (parts[0] === "views" && parts.length === 2 && parts[1]) {
    return { kind: "view", id: decodeURIComponent(parts[1]) };
  }
  if (parts[0] === "objects" && parts[1] && parts[2]) {
    return {
      kind: "object",
      objectType: decodeURIComponent(parts[1]),
      objectId: decodeURIComponent(parts[2]),
    };
  }
  return { kind: "root" };
};

const resolveObjectTarget = (
  params: Record<string, unknown> | undefined,
): ObjectRoute | null => {
  const type =
    typeof params?.type === "string"
      ? params.type
      : typeof params?.objectType === "string"
        ? params.objectType
        : null;
  const id =
    typeof params?.id === "string"
      ? params.id
      : typeof params?.objectId === "string"
        ? params.objectId
        : null;
  if (!type || !id) return null;
  return { type, id };
};

const INITIAL_DATA = {
  analytics: {
    revenue: 125000,
    growth: 0.15,
    customers: 1234,
    orders: 567,
    salesByRegion: [
      { label: "US", value: 45000 },
      { label: "EU", value: 35000 },
      { label: "Asia", value: 28000 },
      { label: "Other", value: 17000 },
    ],
    recentTransactions: [
      {
        id: "TXN001",
        customer: "Acme Corp",
        amount: 1500,
        status: "completed",
        date: "2024-01-15",
      },
      {
        id: "TXN002",
        customer: "Globex Inc",
        amount: 2300,
        status: "pending",
        date: "2024-01-14",
      },
      {
        id: "TXN003",
        customer: "Initech",
        amount: 890,
        status: "completed",
        date: "2024-01-13",
      },
      {
        id: "TXN004",
        customer: "Umbrella Co",
        amount: 4200,
        status: "completed",
        date: "2024-01-12",
      },
    ],
  },
  form: {
    dateRange: "",
    region: "",
    accountsSearch: "",
  },
  dashboard: {
    metrics: {
      totalRevenue: 1250,
      newCustomers: 1234,
      activeAccounts: 45678,
      growthRate: 0.045,
    },
    visitors: [
      { label: "Apr 2", value: 120 },
      { label: "Apr 7", value: 180 },
      { label: "Apr 12", value: 140 },
      { label: "Apr 17", value: 220 },
      { label: "Apr 22", value: 160 },
      { label: "Apr 27", value: 240 },
      { label: "May 2", value: 210 },
      { label: "May 7", value: 260 },
      { label: "May 12", value: 190 },
      { label: "May 17", value: 280 },
      { label: "May 22", value: 230 },
      { label: "May 27", value: 300 },
    ],
    sections: [
      {
        title: "Cover page",
        type: "Cover page",
        status: "In Progress",
        target: 18,
        limit: 5,
        reviewer: "Eddie Lake",
      },
      {
        title: "Table of contents",
        type: "Table of contents",
        status: "Done",
        target: 29,
        limit: 24,
        reviewer: "Eddie Lake",
      },
      {
        title: "Executive summary",
        type: "Narrative",
        status: "Done",
        target: 10,
        limit: 13,
        reviewer: "Eddie Lake",
      },
      {
        title: "Technical approach",
        type: "Narrative",
        status: "Done",
        target: 27,
        limit: 23,
        reviewer: "Jamik Tashpulatov",
      },
      {
        title: "Design",
        type: "Narrative",
        status: "In Progress",
        target: 2,
        limit: 16,
        reviewer: "Jamik Tashpulatov",
      },
    ],
  },
  accounts: {
    summary: {
      total: 24,
      active: 18,
      atRisk: 3,
      renewalsThisQuarter: 6,
    },
    list: [
      {
        id: "acme-corp",
        name: "Acme Corp",
        owner: "Jamie Fox",
        segment: "Enterprise",
        status: "Active",
        health: "Healthy",
        arr: 125000,
        renewalDate: "2025-06-15",
      },
      {
        id: "globex",
        name: "Globex",
        owner: "Priya Shah",
        segment: "Enterprise",
        status: "At Risk",
        health: "Watch",
        arr: 98000,
        renewalDate: "2025-05-02",
      },
      {
        id: "umbrella-co",
        name: "Umbrella Co",
        owner: "Liam Carter",
        segment: "Mid-Market",
        status: "Active",
        health: "Healthy",
        arr: 47000,
        renewalDate: "2025-08-19",
      },
      {
        id: "initech",
        name: "Initech",
        owner: "Sofia Ramirez",
        segment: "Mid-Market",
        status: "Churn Risk",
        health: "Critical",
        arr: 32000,
        renewalDate: "2025-04-05",
      },
      {
        id: "soylent",
        name: "Soylent",
        owner: "Marcus Lee",
        segment: "Enterprise",
        status: "Active",
        health: "Healthy",
        arr: 156000,
        renewalDate: "2025-11-30",
      },
      {
        id: "stark-industries",
        name: "Stark Industries",
        owner: "Nina Patel",
        segment: "Strategic",
        status: "Active",
        health: "Healthy",
        arr: 210000,
        renewalDate: "2025-09-12",
      },
      {
        id: "wayne-enterprises",
        name: "Wayne Enterprises",
        owner: "Evan Reed",
        segment: "Strategic",
        status: "At Risk",
        health: "Watch",
        arr: 189000,
        renewalDate: "2025-07-03",
      },
      {
        id: "hooli",
        name: "Hooli",
        owner: "Sara Bennett",
        segment: "Mid-Market",
        status: "Active",
        health: "Healthy",
        arr: 54000,
        renewalDate: "2025-10-21",
      },
    ],
  },
  settings: {
    profile: {
      name: "Alex Johnson",
      email: "alex.johnson@acme.com",
      title: "Product Lead",
      team: "Growth",
    },
    preferences: {
      timezone: "America/Los_Angeles",
      language: "en-US",
      dateFormat: "MMM d, yyyy",
      weekStart: "Monday",
      digest: "Weekly",
      quarterStart: "2025-01-01",
    },
    sessions: [
      {
        device: "MacBook Pro 16\"",
        location: "San Francisco, CA",
        lastActive: "2025-02-06",
        status: "Current",
      },
      {
        device: "iPhone 15 Pro",
        location: "San Jose, CA",
        lastActive: "2025-02-04",
        status: "Active",
      },
      {
        device: "Chrome on Windows",
        location: "New York, NY",
        lastActive: "2025-01-29",
        status: "Expired",
      },
    ],
  },
  tasks: {
    items: TASKS,
  },
};

const WORKSPACES = ["Acme Corp", "Personal", "Team Project"];

const PROMPT_SUGGESTIONS = [
  { label: "Revenue dashboard with metrics and chart", icon: BarChart },
  { label: "Recent transactions table", icon: FileText },
  { label: "Customer count with trend", icon: Users },
];

const LEGACY_SYSTEM_VIEW_PREFIX = "system-";
const RECENT_REORDER_DELAY_MS = 400;
const RECENT_OBJECT_STORAGE_KEY = "recent-object-views";

const SYSTEM_VIEW_ICONS = {
  "dashboard": LayoutDashboard,
  "tasks": ListTodo,
  "accounts": BriefcaseBusiness,
  "settings": Settings,
};

const OBJECT_TYPE_ICONS = {
  "tasks": ListTodo,
  "accounts": BriefcaseBusiness,
};

const parseRecentObjectItems = (raw: string | null): RecentObjectItem[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    const items = parsed.flatMap((entry) => {
      if (!entry || typeof entry !== "object") return [];
      const record = entry as Record<string, unknown>;
      if (typeof record.objectType !== "string") return [];
      if (typeof record.objectId !== "string") return [];
      const createdAt =
        typeof record.createdAt === "number" && Number.isFinite(record.createdAt)
          ? record.createdAt
          : now;
      const updatedAt =
        typeof record.updatedAt === "number" && Number.isFinite(record.updatedAt)
          ? record.updatedAt
          : createdAt;
      return [
        {
          id: buildObjectRecentId(record.objectType, record.objectId),
          objectType: record.objectType,
          objectId: record.objectId,
          createdAt,
          updatedAt,
        },
      ];
    });
    return mergeRecents([], items);
  } catch (err) {
    console.warn("Failed to parse recent object views", err);
    return [];
  }
};

const getStoredRecentObjectItems = (): RecentObjectItem[] => {
  if (typeof window === "undefined") return [];
  return parseRecentObjectItems(
    window.localStorage.getItem(RECENT_OBJECT_STORAGE_KEY),
  );
};

function DashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const routeSelection = useMemo(() => parsePathname(pathname), [pathname]);
  const { data } = useData();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [activeWorkspace, setActiveWorkspace] = useState("Acme Corp");
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandMode, setCommandMode] = useState<"new" | "edit">("new");
  const [prompt, setPrompt] = useState("");
  const [systemViews, setSystemViews] = useState<SystemViewEntry[]>(SYSTEM_VIEWS);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [recentObjectItems, setRecentObjectItems] = useState<
    RecentObjectItem[]
  >(getStoredRecentObjectItems);
  const [objectRecentsLoaded, setObjectRecentsLoaded] = useState(
    () => typeof window !== "undefined",
  );
  const [activeViewId, setActiveViewId] = useState<string | null>(
    DEFAULT_SYSTEM_VIEW?.id ?? null,
  );
  const [activeTree, setActiveTree] = useState<StoredTree | null>(
    DEFAULT_SYSTEM_VIEW?.tree ?? null,
  );
  const [activeObject, setActiveObject] = useState<ObjectRoute | null>(null);
  const [persistenceError, setPersistenceError] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const generationIdRef = useRef(0);
  const lastStoredGenerationRef = useRef(0);
  const lastPromptRef = useRef<string | null>(null);
  const regenerationTargetRef = useRef<RegenerationTarget | null>(null);
  const promptEditBaselineRef = useRef<string | null>(null);
  const shareResetRef = useRef<number | null>(null);
  const pendingViewRef = useRef<StoredView | null>(null);
  const hasLoadedViewsRef = useRef(false);
  const systemViewsRef = useRef<SystemViewEntry[]>([]);
  const systemViewIdSetRef = useRef<Set<string>>(
    new Set(SYSTEM_VIEWS.map((view) => view.id)),
  );
  const recentItemsRef = useRef<RecentItem[]>([]);
  const recentUpdateTimersRef = useRef<Map<string, number>>(new Map());
  const { tree, isStreaming, error, send } = useUIStream({
    api: "/api/generate",
    onError: (err) => console.error("Generation error:", err),
  });

  const isEditableTarget = useCallback((target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    const tagName = target.tagName;
    if (target.isContentEditable) return true;
    return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
  }, []);

  const activeSystemView = systemViews.find(
    (view) => view.id === activeViewId,
  );
  const activeRecent = recentItems.find((item) => item.id === activeViewId);
  const activeView = activeSystemView ?? activeRecent ?? null;
  const activeObjectDefinition = useMemo(
    () => (activeObject ? getObjectDefinition(activeObject.type) : null),
    [activeObject],
  );
  const activePrompt = activeView?.prompt ?? "";
  const isObjectView = !!activeObject;
  const isPromptEditable = !isObjectView && !!activeView;
  const currentViewLabel = isObjectView
    ? `${activeObjectDefinition?.label ?? "Object"} · ${activeObject?.id ?? ""}`
    : activeSystemView?.label ??
      activeView?.prompt ??
      (isStreaming ? "Generating..." : "New view");
  const normalizedPrompt = prompt.trim().toLowerCase();
  const suggestionMatches = normalizedPrompt
    ? PROMPT_SUGGESTIONS.filter(({ label }) =>
        label.toLowerCase().includes(normalizedPrompt),
      )
    : PROMPT_SUGGESTIONS;
  const showSuggestions = suggestionMatches.length > 0;
  const normalizeSystemViewId = useCallback((id: string) => {
    if (systemViewIdSetRef.current.has(id)) return id;
    if (!id.startsWith(LEGACY_SYSTEM_VIEW_PREFIX)) return null;
    const candidate = id.slice(LEGACY_SYSTEM_VIEW_PREFIX.length);
    return systemViewIdSetRef.current.has(candidate) ? candidate : null;
  }, []);
  const getObjectRecentLabel = useCallback(
    (objectType: string, objectId: string) => {
      const definition = getObjectDefinition(objectType);
      const label = definition?.label ?? objectType;
      if (!definition) {
        return `${label} · ${objectId}`;
      }
      const items = getByPath(data, definition.dataPath) as
        | Record<string, unknown>[]
        | undefined;
      const match = Array.isArray(items)
        ? items.find(
            (entry) => String(entry[definition.idKey]) === objectId,
          )
        : null;
      const titleValue = match?.[definition.titleKey];
      const title = titleValue ? String(titleValue) : objectId;
      return `${title}`;
    },
    [data],
  );
  const scheduleRecentUpsert = useCallback(
    (item: RecentItem, delayMs: number) => {
      const timers = recentUpdateTimersRef.current;
      const existing = timers.get(item.id);
      if (existing) {
        window.clearTimeout(existing);
      }
      const timerId = window.setTimeout(() => {
        setRecentItems((items) => mergeRecents(items, [item]));
        timers.delete(item.id);
      }, delayMs);
      timers.set(item.id, timerId);
    },
    [],
  );
  const visibleRecentViews = useMemo(
    () => recentItems.filter((item) => !normalizeSystemViewId(item.id)),
    [recentItems, systemViews, normalizeSystemViewId],
  );
  const recentEntries = useMemo(() => {
    const viewEntries = visibleRecentViews.map((item) => ({
      kind: "view" as const,
      item,
    }));
    const objectEntries = recentObjectItems.map((item) => ({
      kind: "object" as const,
      item,
    }));
    return [...viewEntries, ...objectEntries].sort(
      (a, b) => getRecency(b.item) - getRecency(a.item),
    );
  }, [recentObjectItems, visibleRecentViews]);

  const handleShareLink = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("copied");
    } catch (err) {
      console.error("Share link error:", err);
      setShareStatus("error");
    }
    if (shareResetRef.current) {
      window.clearTimeout(shareResetRef.current);
    }
    shareResetRef.current = window.setTimeout(() => {
      setShareStatus("idle");
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (shareResetRef.current) {
        window.clearTimeout(shareResetRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      const timers = recentUpdateTimersRef.current;
      timers.forEach((timerId) => window.clearTimeout(timerId));
      timers.clear();
    };
  }, []);

  useEffect(() => {
    systemViewsRef.current = systemViews;
    systemViewIdSetRef.current = new Set(systemViews.map((view) => view.id));
  }, [systemViews]);

  useEffect(() => {
    recentItemsRef.current = recentItems;
  }, [recentItems]);

  useEffect(() => {
    if (objectRecentsLoaded) return;
    if (typeof window === "undefined") return;
    const storedItems = getStoredRecentObjectItems();
    setRecentObjectItems((items) => mergeRecents(items, storedItems));
    setObjectRecentsLoaded(true);
  }, [objectRecentsLoaded]);

  useEffect(() => {
    if (!objectRecentsLoaded) return;
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        RECENT_OBJECT_STORAGE_KEY,
        JSON.stringify(recentObjectItems),
      );
    } catch (err) {
      console.warn("Failed to store recent object views", err);
    }
  }, [objectRecentsLoaded, recentObjectItems]);

  useEffect(() => {
    if (hasLoadedViewsRef.current) return;
    hasLoadedViewsRef.current = true;

    const loadViews = async () => {
      try {
        const response = await fetch("/api/views", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to load views.");
        }
        const views = (await response.json()) as StoredView[];
        if (!Array.isArray(views)) return;

        const systemUpdates: StoredView[] = [];
        const recentUpdates: RecentItem[] = [];

        views.forEach((view) => {
          const normalizedId = normalizeSystemViewId(view.id);
          if (normalizedId) {
            systemUpdates.push(
              normalizedId === view.id ? view : { ...view, id: normalizedId },
            );
            return;
          }
          recentUpdates.push({
            id: view.id,
            prompt: view.prompt,
            tree: view.tree,
            createdAt: view.createdAt,
            updatedAt: view.updatedAt,
          });
        });

        setSystemViews((items) => mergeSystemViews(items, systemUpdates));
        setRecentItems((items) => mergeRecents(items, recentUpdates));
      } catch (err) {
        console.warn("Failed to load views", err);
      }
    };

    void loadViews();
  }, [normalizeSystemViewId]);

  const openCommandMenu = useCallback(
    (mode: "new" | "edit", initialPrompt?: string) => {
      const resolvedPrompt =
        typeof initialPrompt === "string"
          ? initialPrompt
          : mode === "edit"
            ? activePrompt
            : "";
      setCommandMode(mode);
      setPrompt(resolvedPrompt);
      promptEditBaselineRef.current = mode === "edit" ? resolvedPrompt : null;
      setCommandOpen(true);
    },
    [activePrompt],
  );

  const persistView = useCallback(
    async ({
      id,
      prompt: promptValue,
      tree: treeValue,
    }: {
      id?: string;
      prompt: string;
      tree: StoredTree;
    }) => {
      const payload = JSON.stringify({ prompt: promptValue, tree: treeValue });
      const endpoint = id ? `/api/views/${encodeURIComponent(id)}` : "/api/views";
      let response = await fetch(endpoint, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      if (!response.ok && id && response.status === 404) {
        response = await fetch("/api/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        });
      }

      if (!response.ok) {
        throw new Error("Unable to save the view.");
      }

      return (await response.json()) as StoredView;
    },
    [],
  );

  const fetchViewById = useCallback(async (id: string) => {
    const response = await fetch(`/api/views/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (response.status === 404) return null;
    if (!response.ok) {
      throw new Error("Unable to load the view.");
    }
    return (await response.json()) as StoredView;
  }, []);

  const updateViewPrompt = useCallback((id: string, nextPrompt: string) => {
    setSystemViews((views) =>
      views.map((view) =>
        view.id === id ? { ...view, prompt: nextPrompt } : view,
      ),
    );
    setRecentItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, prompt: nextPrompt } : item,
      ),
    );
  }, []);

  const upsertStoredView = useCallback(
    (view: StoredView, options?: { deferRecent?: boolean }) => {
      const normalizedId = normalizeSystemViewId(view.id);
      if (normalizedId) {
        const normalized =
          normalizedId === view.id ? view : { ...view, id: normalizedId };
        setSystemViews((items) => mergeSystemViews(items, [normalized]));
        return;
      }
      const item: RecentItem = {
        id: view.id,
        prompt: view.prompt,
        tree: view.tree,
        createdAt: view.createdAt,
        updatedAt: view.updatedAt,
      };
      if (options?.deferRecent) {
        scheduleRecentUpsert(item, RECENT_REORDER_DELAY_MS);
        return;
      }
      setRecentItems((items) => mergeRecents(items, [item]));
    },
    [normalizeSystemViewId, scheduleRecentUpsert],
  );

  const handlePromptEdit = useCallback(
    (nextPrompt: string) => {
      if (!activeViewId) return;
      updateViewPrompt(activeViewId, nextPrompt);
    },
    [activeViewId, updateViewPrompt],
  );

  const handlePromptRegenerate = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || isStreaming) return;
      const targetId = activeViewId;
      if (!targetId) return;

      setPersistenceError(null);
      generationIdRef.current += 1;
      lastPromptRef.current = trimmed;
      regenerationTargetRef.current = { id: targetId };
      setActiveTree(null);
      setActiveObject(null);
      setCommandOpen(false);
      setCommandMode("new");
      promptEditBaselineRef.current = null;
      await send(trimmed, { data: INITIAL_DATA });
    },
    [activeViewId, isStreaming, send],
  );

  const handlePromptSubmit = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || isStreaming) return;
      setPersistenceError(null);
      generationIdRef.current += 1;
      lastPromptRef.current = trimmed;
      regenerationTargetRef.current = null;
      setActiveTree(null);
      setActiveViewId(null);
      setActiveObject(null);
      setCommandOpen(false);
      setCommandMode("new");
      promptEditBaselineRef.current = null;
      setPrompt("");
      await send(trimmed, { data: INITIAL_DATA });
    },
    [isStreaming, send],
  );

  const handleCommandSubmit = useCallback(
    (value: string) => {
      if (commandMode === "edit") {
        handlePromptEdit(value);
        const baseline = promptEditBaselineRef.current;
        if (baseline !== null && baseline.trim() === value.trim()) {
          setCommandOpen(false);
          setCommandMode("new");
          promptEditBaselineRef.current = null;
          return;
        }
        void handlePromptRegenerate(value);
        return;
      }
      void handlePromptSubmit(value);
    },
    [commandMode, handlePromptEdit, handlePromptRegenerate, handlePromptSubmit],
  );

  const navigateToView = useCallback(
    (id: string) => {
      router.push(buildViewRoute(id));
    },
    [router],
  );
  const navigateToObject = useCallback(
    (type: string, id: string) => {
      router.push(buildObjectRoute(type, id));
    },
    [router],
  );

  const handleRecentSelect = useCallback((item: RecentItem) => {
    if (activeViewId === item.id) {
      openCommandMenu("edit", item.prompt);
      return;
    }
    navigateToView(item.id);
  }, [activeViewId, navigateToView, openCommandMenu]);
  const handleRecentObjectSelect = useCallback(
    (item: RecentObjectItem) => {
      if (
        activeObject?.type === item.objectType &&
        activeObject?.id === item.objectId
      ) {
        return;
      }
      navigateToObject(item.objectType, item.objectId);
    },
    [activeObject, navigateToObject],
  );

  const handleSystemViewSelect = useCallback((view: SystemViewEntry) => {
    if (activeViewId === view.id) {
      openCommandMenu("edit", view.prompt);
      return;
    }
    navigateToView(view.id);
  }, [activeViewId, navigateToView, openCommandMenu]);

  const handleObjectBack = useCallback(() => {
    if (!activeObject) return;
    const fallback =
      DEFAULT_SYSTEM_VIEW?.id ? buildViewRoute(DEFAULT_SYSTEM_VIEW.id) : "/";
    const targetRoute = activeObjectDefinition?.listRoute ?? fallback;
    router.push(targetRoute);
  }, [activeObject, activeObjectDefinition, router]);

  useEffect(() => {
    if (routeSelection.kind !== "root") return;
    setPersistenceError(null);
    const resolvedView =
      DEFAULT_SYSTEM_VIEW?.id
        ? systemViews.find((view) => view.id === DEFAULT_SYSTEM_VIEW.id) ??
          DEFAULT_SYSTEM_VIEW
        : null;
    setActiveViewId(resolvedView?.id ?? null);
    setActiveObject(null);
    setActiveTree(resolvedView?.tree ?? null);
  }, [routeSelection, systemViews]);

  useEffect(() => {
    if (routeSelection.kind !== "object") return;
    setPersistenceError(null);
    setActiveViewId(null);
    const objectType = routeSelection.objectType;
    const objectId = routeSelection.objectId;
    setActiveObject({ type: objectType, id: objectId });
    setActiveTree(null);
    setRecentObjectItems((items) => {
      const now = Date.now();
      const id = buildObjectRecentId(objectType, objectId);
      const existing = items.find((item) => item.id === id);
      const nextItem: RecentObjectItem = {
        id,
        objectType,
        objectId,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      };
      return mergeRecents(items, [nextItem]);
    });
  }, [routeSelection]);

  useEffect(() => {
    if (routeSelection.kind !== "view") return;
    let cancelled = false;
    setPersistenceError(null);
    setActiveObject(null);
    setActiveViewId(routeSelection.id);

    const pending = pendingViewRef.current;
    if (pending && pending.id === routeSelection.id) {
      pendingViewRef.current = null;
      upsertStoredView(pending);
      setActiveTree(pending.tree);
      return () => {
        cancelled = true;
      };
    }

    const localSystemView = systemViewsRef.current.find(
      (view) => view.id === routeSelection.id,
    );
    const localRecent = recentItemsRef.current.find(
      (item) => item.id === routeSelection.id,
    );
    const localView = localSystemView ?? localRecent ?? null;
    const hasLocalView = !!localView;
    if (localView) {
      setActiveTree(localView.tree);
    }

    const load = async () => {
      try {
        const view = await fetchViewById(routeSelection.id);
        if (cancelled) return;
        if (!view) {
          if (!hasLocalView) {
            setPersistenceError("View not found.");
          }
          return;
        }
        upsertStoredView(view, { deferRecent: true });
        setActiveTree(view.tree);
      } catch (err) {
        if (cancelled) return;
        if (hasLocalView) {
          console.warn("Failed to refresh view", err);
          return;
        }
        const message =
          err instanceof Error
            ? err.message
            : "Unable to load the view.";
        setPersistenceError(message);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [fetchViewById, routeSelection, upsertStoredView]);

  useEffect(() => {
    if (!tree || isStreaming) return;
    if (lastStoredGenerationRef.current === generationIdRef.current) return;
    if (Object.keys(tree.elements).length === 0) return;

    const snapshot = JSON.parse(JSON.stringify(tree)) as StoredTree;
    const regenerationTarget = regenerationTargetRef.current;
    let cancelled = false;

    const storeView = async () => {
      try {
        if (regenerationTarget) {
          const promptValue =
            lastPromptRef.current ?? activePrompt ?? "Generated view";
          const stored = await persistView({
            id: regenerationTarget.id,
            prompt: promptValue,
            tree: snapshot,
          });
          if (cancelled) return;
          pendingViewRef.current = stored;
          upsertStoredView(stored);
          setActiveViewId(stored.id);
          setActiveObject(null);
          setActiveTree(snapshot);
          lastStoredGenerationRef.current = generationIdRef.current;
          regenerationTargetRef.current = null;
          router.replace(buildViewRoute(stored.id));
          return;
        }

        if (!lastPromptRef.current) return;
        const stored = await persistView({
          prompt: lastPromptRef.current,
          tree: snapshot,
        });
        if (cancelled) return;
        pendingViewRef.current = stored;
        upsertStoredView(stored);
        setActiveViewId(stored.id);
        setActiveTree(snapshot);
        setActiveObject(null);
        lastStoredGenerationRef.current = generationIdRef.current;
        router.push(buildViewRoute(stored.id));
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error
            ? err.message
            : "Unable to persist the view.";
        setPersistenceError(message);
      }
    };

    void storeView();

    return () => {
      cancelled = true;
    };
  }, [activePrompt, isStreaming, persistView, router, tree, upsertStoredView]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const isCommand = event.metaKey || event.ctrlKey;
      if (!isCommand) return;

      const key = event.key.toLowerCase();
      if (key === "k") {
        event.preventDefault();
        if (commandOpen) {
          setCommandOpen(false);
          setCommandMode("new");
          promptEditBaselineRef.current = null;
        } else {
          openCommandMenu("new");
        }
        return;
      }

      if (key === "b" && event.shiftKey) {
        if (isEditableTarget(event.target)) return;
        event.preventDefault();
        setRightSidebarOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandOpen, isEditableTarget, openCommandMenu]);

  const displayTree = isObjectView ? null : activeTree ?? tree;
  const hasElements =
    !!displayTree && Object.keys(displayTree.elements).length > 0;
  const isStreamingDisplay = isStreaming && !activeTree && !isObjectView;
  const showEmptyState =
    routeSelection.kind === "root" &&
    !hasElements &&
    !isStreaming &&
    !isObjectView;

  return (
    <div className="flex h-screen bg-background">
      <SidebarProvider open={leftSidebarOpen} onOpenChange={setLeftSidebarOpen}>
        <Sidebar side="left" collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      id="workspace-menu-trigger"
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <span className="text-sm font-semibold">
                          {activeWorkspace.charAt(0)}
                        </span>
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="truncate font-semibold">
                          {activeWorkspace}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
                    align="start"
                  >
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Workspaces
                    </DropdownMenuLabel>
                    {WORKSPACES.map((workspace) => (
                      <DropdownMenuItem
                        key={workspace}
                        onClick={() => setActiveWorkspace(workspace)}
                        className="gap-2 p-2"
                      >
                        <div className="flex size-6 items-center justify-center rounded-sm border">
                          <span className="text-xs font-semibold">
                            {workspace.charAt(0)}
                          </span>
                        </div>
                        {workspace}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 p-2">
                      <div className="flex size-6 items-center justify-center rounded-md border border-dashed">
                        <Plus className="size-4" />
                      </div>
                      <div className="font-medium text-muted-foreground">
                        Add workspace
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {systemViews.map((view) => {
                    const Icon = SYSTEM_VIEW_ICONS[view.id] ?? LayoutDashboard;
                    return (
                      <SidebarMenuItem key={view.id}>
                        <SidebarMenuButton
                          tooltip={view.label}
                          isActive={activeViewId === view.id}
                          onClick={() => handleSystemViewSelect(view)}
                        >
                          <Icon />
                          <span>{view.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Analytics">
                      <BarChart />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {/* <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Team">
                      <Users />
                      <span>Approvals</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem> */}
                  {/* <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Documents">
                      <FileText />
                      <span>Documents</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem> */}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Recent</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {recentEntries.length === 0 ? (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        disabled
                        tooltip="No recent views"
                      >
                        <Clock />
                        <span>No recent views</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    recentEntries.map((entry) => {
                      const isView = entry.kind === "view";
                      const label = isView
                        ? entry.item.prompt
                        : getObjectRecentLabel(
                            entry.item.objectType,
                            entry.item.objectId,
                          );
                      const Icon =
                        entry.kind === "object"
                          ? OBJECT_TYPE_ICONS[entry.item.objectType] ?? Clock
                          : Clock;
                      const isActive = isView
                        ? activeViewId === entry.item.id
                        : activeObject?.type === entry.item.objectType &&
                          activeObject?.id === entry.item.objectId;
                      const handleClick = isView
                        ? () => handleRecentSelect(entry.item)
                        : () => handleRecentObjectSelect(entry.item);
                      return (
                        <SidebarMenuItem key={entry.item.id}>
                          <SidebarMenuButton
                            tooltip={label}
                            isActive={isActive}
                            onClick={handleClick}
                            disabled={isStreaming}
                          >
                            <Icon />
                            <span>{label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      id="user-menu-trigger"
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <User className="size-4" />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="truncate font-semibold">John Doe</span>
                        <span className="truncate text-xs text-muted-foreground">
                          john@example.com
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
                    side="top"
                    align="start"
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                          <User className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            John Doe
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            john@example.com
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Bell className="mr-2 size-4" />
                      Notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="mr-2 size-4" />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 size-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 size-4" />
                      Help
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 size-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-auto">
          <header className="flex items-center justify-between border-border bg-background px-4 py-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>

            <div className="flex flex-1 justify-center px-4">
              <div className="group relative h-9 w-full max-w-md">
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm font-medium text-foreground">
                  <span className="block w-full truncate text-center">
                    {currentViewLabel}
                  </span>
                </div>
                <Button
                  variant="outline"
                  aria-expanded={commandOpen}
                  aria-haspopup="dialog"
                  aria-label="Open command menu"
                  className="absolute inset-0 w-full justify-start gap-2 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                  title="Command menu (⌘K / Ctrl+K)"
                  onClick={() =>
                    openCommandMenu(
                      isPromptEditable ? "edit" : "new",
                      isPromptEditable ? activePrompt : undefined,
                    )
                  }
                >
                  <Search className="size-4" />
                  <span className="sr-only">Command menu</span>
                  <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              </div>
              <CommandDialog
                open={commandOpen}
                onOpenChange={(open) => {
                  setCommandOpen(open);
                  if (!open) {
                    setCommandMode("new");
                    promptEditBaselineRef.current = null;
                  }
                }}
                title={commandMode === "edit" ? "Edit prompt" : "Command menu"}
                description={
                  commandMode === "edit"
                    ? "Update the prompt and press Enter to regenerate."
                    : "Describe what you want..."
                }
                showCloseButton={false}
                commandProps={{ shouldFilter: false }}
              >
                <CommandInput
                  placeholder={
                    commandMode === "edit"
                      ? "Edit the prompt..."
                      : "Describe what you want..."
                  }
                  value={prompt}
                  onValueChange={(value) => {
                    setPrompt(value);
                    if (commandMode === "edit") {
                      handlePromptEdit(value);
                    }
                  }}
                  disabled={isStreaming}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      event.stopPropagation();
                      handleCommandSubmit(prompt);
                    }
                  }}
                />
                <CommandList>
                  {/* {!showSuggestions && normalizedPrompt.length > 0 ? (
                    <CommandEmpty>
                      No suggestions. Press Enter to generate.
                    </CommandEmpty>
                  ) : null} */}
                  {showSuggestions ? (
                    <CommandGroup heading="Suggestions">
                      {suggestionMatches.map(({ label, icon: Icon }) => (
                        <CommandItem
                          key={label}
                          value={label}
                          onSelect={() => handleCommandSubmit(label)}
                          disabled={isStreaming}
                        >
                          <Icon className="mr-2 size-4" />
                          <span>{label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ) : null}
                </CommandList>
              </CommandDialog>
            </div>

            <div className="flex items-center gap-2">
              {!rightSidebarOpen && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setRightSidebarOpen(true)}
                      className="h-8 w-8"
                    >
                      <PanelRight className="h-4 w-4" />
                      <span className="sr-only">Expand sidebar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="end">
                    Expand details (⌘⇧B / Ctrl+Shift+B)
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </header>

          <main className="flex-1 p-3">
            <div className="mx-auto max-w-6xl space-y-6">

              <div className="p-3">
                {error && (
                  <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                    {error.message}
                  </div>
                )}
                {persistenceError && (
                  <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                    {persistenceError}
                  </div>
                )}
                <div className="min-h-[220px]">
                  {isObjectView ? (
                    activeObject ? (
                      <ObjectView
                        objectType={activeObject.type}
                        objectId={activeObject.id}
                        onBack={handleObjectBack}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Loading object view...
                      </p>
                    )
                  ) : showEmptyState ? (
                    <p className="text-sm text-muted-foreground">
                      Enter a prompt to generate a widget.
                    </p>
                  ) : displayTree ? (
                    <Renderer
                      tree={displayTree}
                      registry={componentRegistry}
                      loading={isStreamingDisplay}
                    />
                  ) : null}
                </div>
                {hasElements && !isObjectView && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-muted-foreground">
                      View JSON
                    </summary>
                    <pre className="mt-2 max-h-96 overflow-auto rounded-md border border-border bg-background p-3 text-xs text-muted-foreground">
                      {JSON.stringify(displayTree, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>

      <aside
        className={cn(
          "border-l border-border bg-sidebar transition-all duration-300 ease-in-out",
          rightSidebarOpen ? "w-80" : "w-0",
        )}
      >
        <div className={cn("flex h-full flex-col", !rightSidebarOpen && "hidden")}>
          <div className="flex items-center justify-between border-sidebar-border px-4 py-3">
            <h2 className="font-semibold text-sidebar-foreground">Details</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setRightSidebarOpen(false)}
                  className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <PanelRight className="h-4 w-4" />
                  <span className="sr-only">Collapse details</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" align="center">
                Collapse details (⌘⇧B / Ctrl+Shift+B)
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex-1 space-y-6 overflow-auto p-4">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sidebar-foreground">
                <Info className="h-4 w-4" />
                Metadata
              </h3>
              <div className="space-y-2 rounded-lg bg-sidebar-accent p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-sidebar-foreground">
                    Active
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium text-sidebar-foreground">
                    Oct 28, 2025
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Modified</span>
                  <span className="font-medium text-sidebar-foreground">
                    2 hours ago
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sidebar-foreground">
                <FileText className="h-4 w-4" />
                Prompt
              </h3>
                <textarea
                  id="view-prompt"
                  value={activePrompt}
                  onChange={(event) => handlePromptEdit(event.target.value)}
                  onFocus={() => {
                    promptEditBaselineRef.current = activePrompt;
                  }}
                  onBlur={(event) => {
                    const baseline = promptEditBaselineRef.current;
                    promptEditBaselineRef.current = null;
                    if (baseline !== null && baseline !== event.currentTarget.value) {
                      handlePromptRegenerate(event.currentTarget.value);
                    }
                  }}
                  placeholder={
                    isPromptEditable
                      ? "Describe this view..."
                      : "Select a view to edit its prompt."
                  }
                  disabled={!isPromptEditable || isStreaming}
                  rows={4}
                  className="min-h-[96px] w-full resize-none rounded-md border border-sidebar-border bg-background px-3 py-2 text-sm text-sidebar-foreground placeholder:text-muted-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring/60 disabled:cursor-not-allowed disabled:opacity-60"
                />
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sidebar-foreground">
                <Tag className="h-4 w-4" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                >
                  Export Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                  onClick={handleShareLink}
                >
                  {shareStatus === "copied"
                    ? "Link copied"
                    : shareStatus === "error"
                      ? "Copy failed"
                      : "Share Link"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                >
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent text-destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sidebar-foreground">
                <Clock className="h-4 w-4" />
                Recent History
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-sidebar-accent p-3">
                  <p className="text-sm font-medium text-sidebar-foreground">
                    Page updated
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="rounded-lg bg-sidebar-accent p-3">
                  <p className="text-sm font-medium text-sidebar-foreground">
                    Settings changed
                  </p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
                <div className="rounded-lg bg-sidebar-accent p-3">
                  <p className="text-sm font-medium text-sidebar-foreground">
                    New user added
                  </p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function DashboardPage() {
  const router = useRouter();
  const actionHandlers = useMemo(
    () => ({
      export_report: () => alert("Exporting report..."),
      refresh_data: () => alert("Refreshing data..."),
      view_details: (params?: Record<string, unknown>) => {
        const target = resolveObjectTarget(params);
        if (target) {
          router.push(buildObjectRoute(target.type, target.id));
          return;
        }
        alert(`Details: ${JSON.stringify(params ?? {})}`);
      },
      apply_filter: () => alert("Applying filters..."),
      filter_accounts: (params?: Record<string, unknown>) => {
        const status = typeof params?.status === "string" ? params.status : "all";
        window.dispatchEvent(
          new CustomEvent("accounts-filter", { detail: { status } }),
        );
      },
      open_object: (params?: Record<string, unknown>) => {
        const target = resolveObjectTarget(params);
        if (!target) {
          console.warn("open_object called without a valid target", params);
          return;
        }
        router.push(buildObjectRoute(target.type, target.id));
      },
    }),
    [router],
  );

  return (
    <DataProvider initialData={INITIAL_DATA}>
      <ValidationProvider>
        <VisibilityProvider>
          <ActionProvider handlers={actionHandlers}>
            <DashboardContent />
          </ActionProvider>
        </VisibilityProvider>
      </ValidationProvider>
    </DataProvider>
  );
}

export default DashboardPage;
