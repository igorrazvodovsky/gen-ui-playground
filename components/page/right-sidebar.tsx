"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, FileText, Info, PanelRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

type RightSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activePrompt: string;
  onPromptChange: (value: string) => void;
  onPromptFocus: () => void;
  onPromptBlur: (value: string) => void;
  isPromptEditable: boolean;
  isStreaming: boolean;
  shareStatus: "idle" | "copied" | "error";
  onShareLink: () => void;
};

export function RightSidebar({
  open,
  onOpenChange,
  activePrompt,
  onPromptChange,
  onPromptFocus,
  onPromptBlur,
  isPromptEditable,
  isStreaming,
  shareStatus,
  onShareLink,
}: RightSidebarProps) {
  return (
    <aside
      className={cn(
        "border-l border-border bg-sidebar transition-all duration-300 ease-in-out",
        open ? "w-80" : "w-0",
      )}
    >
      <div className={cn("flex h-full flex-col", !open && "hidden")}>
        <div className="flex items-center justify-between border-sidebar-border px-4 py-3">
          <h2 className="font-semibold text-sidebar-foreground">Details</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
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
              onChange={(event) => onPromptChange(event.target.value)}
              onFocus={onPromptFocus}
              onBlur={(event) => onPromptBlur(event.currentTarget.value)}
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
                onClick={onShareLink}
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
  );
}
