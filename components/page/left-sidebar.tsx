"use client";

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
  SidebarRail,
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
  BarChart,
  Bell,
  ChevronsUpDown,
  Clock,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  User,
} from "lucide-react";
import {
  OBJECT_TYPE_ICONS,
  SYSTEM_VIEW_ICONS,
  WORKSPACES,
} from "@/components/page/constants";
import { isObjectType } from "@/lib/object-definitions";
import type {
  ObjectRoute,
  RecentEntry,
  RecentItem,
  RecentObjectItem,
  SystemViewEntry,
} from "./types";

type LeftSidebarProps = {
  activeWorkspace: string;
  onWorkspaceChange: (workspace: string) => void;
  systemViews: SystemViewEntry[];
  activeViewId: string | null;
  recentEntries: RecentEntry[];
  getObjectRecentLabel: (objectType: string, objectId: string) => string;
  onSystemViewSelect: (view: SystemViewEntry) => void;
  onRecentSelect: (item: RecentItem) => void;
  onRecentObjectSelect: (item: RecentObjectItem) => void;
  activeObject: ObjectRoute | null;
  isStreaming: boolean;
};

export function LeftSidebar({
  activeWorkspace,
  onWorkspaceChange,
  systemViews,
  activeViewId,
  recentEntries,
  getObjectRecentLabel,
  onSystemViewSelect,
  onRecentSelect,
  onRecentObjectSelect,
  activeObject,
  isStreaming,
}: LeftSidebarProps) {
  return (
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
                    onClick={() => onWorkspaceChange(workspace)}
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
                      onClick={() => onSystemViewSelect(view)}
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
                  <SidebarMenuButton disabled tooltip="No recent views">
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
                    entry.kind === "object" && isObjectType(entry.item.objectType)
                      ? OBJECT_TYPE_ICONS[entry.item.objectType] ?? Clock
                      : Clock;
                  const isActive = isView
                    ? activeViewId === entry.item.id
                    : activeObject?.type === entry.item.objectType &&
                      activeObject?.id === entry.item.objectId;
                  const handleClick = isView
                    ? () => onRecentSelect(entry.item)
                    : () => onRecentObjectSelect(entry.item);
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
                      <span className="truncate font-semibold">John Doe</span>
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
  );
}
