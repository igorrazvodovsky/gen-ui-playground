"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DataProvider,
  ActionProvider,
  VisibilityProvider,
  ValidationProvider,
  useUIStream,
  Renderer,
} from "@json-render/react";
import type { UITree } from "@json-render/core";
import { Button } from "@/components/ui/button";
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
  CommandEmpty,
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
  Calendar,
  ChevronLeft,
  ChevronRight,
  PanelRight,
  ChevronsUpDown,
  Clock,
  FileText,
  HelpCircle,
  Home,
  Inbox,
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
import {
  DEFAULT_SYSTEM_VIEW,
  SYSTEM_VIEWS,
  type SystemView,
} from "@/lib/system-views";
import { TASKS } from "@/lib/tasks";

type StoredTree = UITree;
type RecentItem = {
  id: string;
  prompt: string;
  tree: StoredTree;
  createdAt: number;
};
type SystemViewEntry = SystemView;
type RegenerationTarget = {
  type: "recent" | "system";
  id: string;
};

const MAX_RECENT = 5;

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

const ACTION_HANDLERS = {
  export_report: () => alert("Exporting report..."),
  refresh_data: () => alert("Refreshing data..."),
  view_details: (params: Record<string, unknown>) =>
    alert(`Details: ${JSON.stringify(params)}`),
  apply_filter: () => alert("Applying filters..."),
  filter_accounts: (params: Record<string, unknown>) => {
    const status = typeof params?.status === "string" ? params.status : "all";
    window.dispatchEvent(
      new CustomEvent("accounts-filter", { detail: { status } }),
    );
  },
};

const WORKSPACES = ["Acme Corp", "Personal", "Team Project"];

const PROMPT_SUGGESTIONS = [
  { label: "Revenue dashboard with metrics and chart", icon: BarChart },
  { label: "Recent transactions table", icon: FileText },
  { label: "Customer count with trend", icon: Users },
];

const SYSTEM_VIEW_ICONS = {
  "system-dashboard": LayoutDashboard,
  "system-tasks": ListTodo,
  "system-accounts": BriefcaseBusiness,
  "system-settings": Settings,
};

function DashboardContent() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [activeWorkspace, setActiveWorkspace] = useState("Acme Corp");
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandMode, setCommandMode] = useState<"new" | "edit">("new");
  const [prompt, setPrompt] = useState("");
  const [systemViews, setSystemViews] = useState<SystemViewEntry[]>(SYSTEM_VIEWS);
  const [activeSystemViewId, setActiveSystemViewId] = useState<string | null>(
    DEFAULT_SYSTEM_VIEW?.id ?? null,
  );
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [activeRecentId, setActiveRecentId] = useState<string | null>(null);
  const [activeTree, setActiveTree] = useState<StoredTree | null>(
    DEFAULT_SYSTEM_VIEW?.tree ?? null,
  );
  const generationIdRef = useRef(0);
  const lastStoredGenerationRef = useRef(0);
  const lastPromptRef = useRef<string | null>(null);
  const regenerationTargetRef = useRef<RegenerationTarget | null>(null);
  const promptEditBaselineRef = useRef<string | null>(null);
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
    (view) => view.id === activeSystemViewId,
  );
  const activeRecent = recentItems.find((item) => item.id === activeRecentId);
  const activePrompt = activeSystemView?.prompt ?? activeRecent?.prompt ?? "";
  const isPromptEditable = !!activeSystemView || !!activeRecent;
  const currentViewLabel =
    activeSystemView?.label ??
    activeRecent?.prompt ??
    (isStreaming ? "Generating..." : "New view");
  const normalizedPrompt = prompt.trim().toLowerCase();
  const suggestionMatches = normalizedPrompt
    ? PROMPT_SUGGESTIONS.filter(({ label }) =>
        label.toLowerCase().includes(normalizedPrompt),
      )
    : PROMPT_SUGGESTIONS;
  const showSuggestions = suggestionMatches.length > 0;

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

  const updateRecentPrompt = useCallback((id: string, nextPrompt: string) => {
    setRecentItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, prompt: nextPrompt } : item,
      ),
    );
  }, []);

  const updateSystemPrompt = useCallback((id: string, nextPrompt: string) => {
    setSystemViews((views) =>
      views.map((view) =>
        view.id === id ? { ...view, prompt: nextPrompt } : view,
      ),
    );
  }, []);

  const handlePromptEdit = useCallback(
    (nextPrompt: string) => {
      if (activeRecentId) {
        updateRecentPrompt(activeRecentId, nextPrompt);
        return;
      }
      if (activeSystemViewId) {
        updateSystemPrompt(activeSystemViewId, nextPrompt);
      }
    },
    [activeRecentId, activeSystemViewId, updateRecentPrompt, updateSystemPrompt],
  );

  const handlePromptRegenerate = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || isStreaming) return;
      const targetId = activeRecentId ?? activeSystemViewId;
      if (!targetId) return;

      generationIdRef.current += 1;
      lastPromptRef.current = trimmed;
      regenerationTargetRef.current = activeRecentId
        ? { type: "recent", id: activeRecentId }
        : { type: "system", id: targetId };
      setActiveTree(null);
      setCommandOpen(false);
      setCommandMode("new");
      promptEditBaselineRef.current = null;
      await send(trimmed, { data: INITIAL_DATA });
    },
    [activeRecentId, activeSystemViewId, isStreaming, send],
  );

  const handlePromptSubmit = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || isStreaming) return;
      generationIdRef.current += 1;
      lastPromptRef.current = trimmed;
      regenerationTargetRef.current = null;
      setActiveTree(null);
      setActiveRecentId(null);
      setActiveSystemViewId(null);
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

  const handleRecentSelect = useCallback((item: RecentItem) => {
    if (activeRecentId === item.id) {
      openCommandMenu("edit", item.prompt);
      return;
    }
    setActiveTree(item.tree);
    setActiveRecentId(item.id);
    setActiveSystemViewId(null);
  }, [activeRecentId, openCommandMenu]);

  const handleSystemViewSelect = useCallback((view: SystemViewEntry) => {
    if (activeSystemViewId === view.id) {
      openCommandMenu("edit", view.prompt);
      return;
    }
    setActiveTree(view.tree);
    setActiveRecentId(null);
    setActiveSystemViewId(view.id);
  }, [activeSystemViewId, openCommandMenu]);

  useEffect(() => {
    if (!tree || isStreaming) return;
    if (lastStoredGenerationRef.current === generationIdRef.current) return;
    if (Object.keys(tree.elements).length === 0) return;

    const snapshot = JSON.parse(JSON.stringify(tree)) as StoredTree;
    const regenerationTarget = regenerationTargetRef.current;
    if (regenerationTarget) {
      if (regenerationTarget.type === "recent") {
        setRecentItems((items) =>
          items.map((item) =>
            item.id === regenerationTarget.id
              ? { ...item, tree: snapshot }
              : item,
          ),
        );
        setActiveRecentId(regenerationTarget.id);
        setActiveSystemViewId(null);
      } else {
        setSystemViews((views) =>
          views.map((view) =>
            view.id === regenerationTarget.id ? { ...view, tree: snapshot } : view,
          ),
        );
        setActiveSystemViewId(regenerationTarget.id);
        setActiveRecentId(null);
      }
      setActiveTree(snapshot);
      lastStoredGenerationRef.current = generationIdRef.current;
      regenerationTargetRef.current = null;
      return;
    }

    if (!lastPromptRef.current) return;
    const id = `generation-${generationIdRef.current}`;
    const item: RecentItem = {
      id,
      prompt: lastPromptRef.current,
      tree: snapshot,
      createdAt: Date.now(),
    };

    setRecentItems((items) => {
      const next = [item, ...items.filter((existing) => existing.id !== id)];
      return next.slice(0, MAX_RECENT);
    });
    setActiveRecentId(id);
    setActiveTree(snapshot);
    setActiveSystemViewId(null);
    lastStoredGenerationRef.current = generationIdRef.current;
  }, [isStreaming, tree]);

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

  const displayTree = activeTree ?? tree;
  const hasElements =
    !!displayTree && Object.keys(displayTree.elements).length > 0;
  const isStreamingDisplay = isStreaming && !activeTree;

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
                          isActive={activeSystemViewId === view.id}
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
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Team">
                      <Users />
                      <span>Approvals</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Documents">
                      <FileText />
                      <span>Documents</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Recent</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {recentItems.length === 0 ? (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        disabled
                        tooltip="No recent generations"
                      >
                        <Clock />
                        <span>No recent generations</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    recentItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          tooltip={item.prompt}
                          isActive={activeRecentId === item.id}
                          onClick={() => handleRecentSelect(item)}
                          disabled={isStreaming}
                        >
                          <Clock />
                          <span>{item.prompt}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
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
                  onClick={() => openCommandMenu("edit", activePrompt)}
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
                <div className="min-h-[220px]">
                  {!hasElements && !isStreaming ? (
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
                {hasElements && (
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
                >
                  Share Link
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

export default function DashboardPage() {
  return (
    <DataProvider initialData={INITIAL_DATA}>
      <ValidationProvider>
        <VisibilityProvider>
          <ActionProvider handlers={ACTION_HANDLERS}>
            <DashboardContent />
          </ActionProvider>
        </VisibilityProvider>
      </ValidationProvider>
    </DataProvider>
  );
}
