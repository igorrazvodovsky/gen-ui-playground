"use client";

import { useCallback, useState } from "react";
import {
  DataProvider,
  ActionProvider,
  VisibilityProvider,
  useUIStream,
  Renderer,
} from "@json-render/react";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  BarChart,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Clock,
  FileText,
  HelpCircle,
  Home,
  Inbox,
  Info,
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
  },
};

const ACTION_HANDLERS = {
  export_report: () => alert("Exporting report..."),
  refresh_data: () => alert("Refreshing data..."),
  view_details: (params: Record<string, unknown>) =>
    alert(`Details: ${JSON.stringify(params)}`),
  apply_filter: () => alert("Applying filters..."),
};

const WORKSPACES = ["Acme Corp", "Personal", "Team Project"];

const PROMPT_SUGGESTIONS = [
  { label: "Revenue dashboard with metrics and chart", icon: BarChart },
  { label: "Recent transactions table", icon: FileText },
  { label: "Customer count with trend", icon: Users },
];

function DashboardContent() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [activeWorkspace, setActiveWorkspace] = useState("Acme Corp");
  const [commandOpen, setCommandOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { tree, isStreaming, error, send } = useUIStream({
    api: "/api/generate",
    onError: (err) => console.error("Generation error:", err),
  });

  const handlePromptSubmit = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || isStreaming) return;
      setCommandOpen(false);
      setPrompt("");
      await send(trimmed, { data: INITIAL_DATA });
    },
    [isStreaming, send],
  );

  const hasElements = tree && Object.keys(tree.elements).length > 0;

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
                        <span className="truncate text-xs text-muted-foreground">
                          Free Plan
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
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Dashboard">
                      <Home />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Inbox">
                      <Inbox />
                      <span>Inbox</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Calendar">
                      <Calendar />
                      <span>Calendar</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Search">
                      <Search />
                      <span>Search</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Documents">
                      <FileText />
                      <span>Documents</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Analytics">
                      <BarChart />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Team">
                      <Users />
                      <span>Team</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
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

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between border-border bg-background px-4 py-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>

            <div className="flex flex-1 justify-center px-4">
              <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={commandOpen}
                    className="w-full max-w-md justify-start gap-2 text-muted-foreground bg-transparent"
                  >
                    <Search className="size-4" />
                    <span>{prompt || "Describe what you want..."}</span>
                    <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="center">
                  <Command
                    className="rounded-lg border shadow-md"
                    shouldFilter={false}
                  >
                    <CommandInput
                      placeholder="Describe what you want..."
                      value={prompt}
                      onValueChange={setPrompt}
                      disabled={isStreaming}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          event.stopPropagation();
                          handlePromptSubmit(prompt);
                        }
                      }}
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        {PROMPT_SUGGESTIONS.map(({ label, icon: Icon }) => (
                          <CommandItem
                            key={label}
                            value={label}
                            onSelect={() => handlePromptSubmit(label)}
                            disabled={isStreaming}
                          >
                            <Icon className="mr-2 size-4" />
                            <span>{label}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-2">
              {!rightSidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setRightSidebarOpen(true)}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Expand sidebar</span>
                </Button>
              )}
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="mx-auto space-y-6">

              <div className="p-6">
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
                  ) : tree ? (
                    <Renderer
                      tree={tree}
                      registry={componentRegistry}
                      loading={isStreaming}
                    />
                  ) : null}
                </div>
                {hasElements && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-muted-foreground">
                      View JSON
                    </summary>
                    <pre className="mt-2 max-h-96 overflow-auto rounded-md border border-border bg-background p-3 text-xs text-muted-foreground">
                      {JSON.stringify(tree, null, 2)}
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightSidebarOpen(false)}
              className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Collapse details</span>
            </Button>
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
      <VisibilityProvider>
        <ActionProvider handlers={ACTION_HANDLERS}>
          <DashboardContent />
        </ActionProvider>
      </VisibilityProvider>
    </DataProvider>
  );
}
