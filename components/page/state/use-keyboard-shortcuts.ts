"use client";

import { useEffect } from "react";

type CommandMode = "new" | "edit";

type KeyboardShortcutsOptions = {
  commandOpen: boolean;
  openCommandMenu: (mode: CommandMode, initialPrompt?: string) => void;
  resetCommandMenu: () => void;
  toggleRightSidebar: () => void;
};

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  const tagName = target.tagName;
  if (target.isContentEditable) return true;
  return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
};

export function useKeyboardShortcuts({
  commandOpen,
  openCommandMenu,
  resetCommandMenu,
  toggleRightSidebar,
}: KeyboardShortcutsOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const isCommand = event.metaKey || event.ctrlKey;
      if (!isCommand) return;

      const key = event.key.toLowerCase();
      if (key === "k") {
        event.preventDefault();
        if (commandOpen) {
          resetCommandMenu();
        } else {
          openCommandMenu("new");
        }
        return;
      }

      if (key === "b" && event.shiftKey) {
        if (isEditableTarget(event.target)) return;
        event.preventDefault();
        toggleRightSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandOpen, openCommandMenu, resetCommandMenu, toggleRightSidebar]);
}
