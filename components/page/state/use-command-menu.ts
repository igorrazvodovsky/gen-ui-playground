"use client";

import { useCallback, useRef, useState } from "react";

type CommandMode = "new" | "edit";

type CommandMenuState = {
  commandOpen: boolean;
  commandMode: CommandMode;
  prompt: string;
  setPrompt: (value: string) => void;
  openCommandMenu: (mode: CommandMode, initialPrompt?: string) => void;
  handleCommandOpenChange: (open: boolean) => void;
  resetCommandMenu: () => void;
  setPromptBaseline: (value: string | null) => void;
  getPromptBaseline: () => string | null;
};

export function useCommandMenu(): CommandMenuState {
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandMode, setCommandMode] = useState<CommandMode>("new");
  const [prompt, setPromptState] = useState("");
  const promptEditBaselineRef = useRef<string | null>(null);

  const setPrompt = useCallback((value: string) => {
    setPromptState(value);
  }, []);

  const openCommandMenu = useCallback(
    (mode: CommandMode, initialPrompt?: string) => {
      const resolvedPrompt =
        typeof initialPrompt === "string" ? initialPrompt : "";
      setCommandMode(mode);
      setPromptState(resolvedPrompt);
      promptEditBaselineRef.current = mode === "edit" ? resolvedPrompt : null;
      setCommandOpen(true);
    },
    [],
  );

  const handleCommandOpenChange = useCallback((open: boolean) => {
    setCommandOpen(open);
    if (!open) {
      setCommandMode("new");
      promptEditBaselineRef.current = null;
    }
  }, []);

  const resetCommandMenu = useCallback(() => {
    setCommandOpen(false);
    setCommandMode("new");
    promptEditBaselineRef.current = null;
  }, []);

  const setPromptBaseline = useCallback((value: string | null) => {
    promptEditBaselineRef.current = value;
  }, []);

  const getPromptBaseline = useCallback(
    () => promptEditBaselineRef.current,
    [],
  );

  return {
    commandOpen,
    commandMode,
    prompt,
    setPrompt,
    openCommandMenu,
    handleCommandOpenChange,
    resetCommandMenu,
    setPromptBaseline,
    getPromptBaseline,
  };
}
