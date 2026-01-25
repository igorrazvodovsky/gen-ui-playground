"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
import { PanelRight, Search } from "lucide-react";
import { PROMPT_SUGGESTIONS } from "@/components/page/constants";

type TopBarProps = {
  currentViewLabel: string;
  commandOpen: boolean;
  commandMode: "new" | "edit";
  prompt: string;
  isStreaming: boolean;
  isPromptEditable: boolean;
  activePrompt: string;
  onCommandSubmit: (value: string) => void;
  onCommandOpenChange: (open: boolean) => void;
  onPromptChange: (value: string) => void;
  onPromptEdit: (value: string) => void;
  openCommandMenu: (mode: "new" | "edit", initialPrompt?: string) => void;
  rightSidebarOpen: boolean;
  onRightSidebarOpen: () => void;
};

export function TopBar({
  currentViewLabel,
  commandOpen,
  commandMode,
  prompt,
  isStreaming,
  isPromptEditable,
  activePrompt,
  onCommandSubmit,
  onCommandOpenChange,
  onPromptChange,
  onPromptEdit,
  openCommandMenu,
  rightSidebarOpen,
  onRightSidebarOpen,
}: TopBarProps) {
  const normalizedPrompt = prompt.trim().toLowerCase();
  const suggestionMatches = normalizedPrompt
    ? PROMPT_SUGGESTIONS.filter(({ label }) =>
        label.toLowerCase().includes(normalizedPrompt),
      )
    : PROMPT_SUGGESTIONS;
  const showSuggestions = suggestionMatches.length > 0;

  return (
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
          onOpenChange={onCommandOpenChange}
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
              onPromptChange(value);
              if (commandMode === "edit") {
                onPromptEdit(value);
              }
            }}
            disabled={isStreaming}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                onCommandSubmit(prompt);
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
                    onSelect={() => onCommandSubmit(label)}
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
                onClick={onRightSidebarOpen}
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
  );
}
