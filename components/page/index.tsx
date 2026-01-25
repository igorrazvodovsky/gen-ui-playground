"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ActionProvider,
  DataProvider,
  ValidationProvider,
  VisibilityProvider,
  useData,
} from "@json-render/react";
import { getByPath } from "@json-render/core";
import { usePathname, useRouter } from "next/navigation";
import { getObjectDefinition } from "@/lib/object-definitions";
import { INITIAL_DATA } from "./initial-data";
import { Layout } from "./layout";
import { useCommandMenu } from "./state/use-command-menu";
import { useKeyboardShortcuts } from "./state/use-keyboard-shortcuts";
import { useRecentObjects } from "./state/use-recent-objects";
import { useShareLink } from "./state/use-share-link";
import { useViewPersistence } from "./state/use-view-persistence";
import {
  buildObjectRoute,
  getRecency,
  parsePathname,
  resolveObjectTarget,
} from "./utils";
import type {
  RecentEntry,
  RecentItem,
  RecentObjectItem,
  StoredTree,
  SystemViewEntry,
} from "./types";

function Content() {
  const router = useRouter();
  const pathname = usePathname();
  const routeSelection = useMemo(() => parsePathname(pathname), [pathname]);
  const { data } = useData();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [activeWorkspace, setActiveWorkspace] = useState("Acme Corp");

  const commandMenu = useCommandMenu();
  const {
    commandOpen,
    commandMode,
    prompt,
    setPrompt,
    openCommandMenu,
    handleCommandOpenChange,
    resetCommandMenu,
    setPromptBaseline,
    getPromptBaseline,
  } = commandMenu;
  const { shareStatus, handleShareLink } = useShareLink();
  const { recentObjectItems, setRecentObjectItems } = useRecentObjects();

  const {
    systemViews,
    recentItems,
    activeViewId,
    activeTree,
    activeObject,
    persistenceError,
    tree,
    isStreaming,
    error,
    activeView,
    activeSystemView,
    activePrompt,
    handlePromptEdit,
    handlePromptRegenerate,
    handlePromptSubmit,
    navigateToView,
    navigateToObject,
    normalizeSystemViewId,
  } = useViewPersistence({
    routeSelection,
    onGenerationStart: resetCommandMenu,
    setRecentObjectItems,
    router,
  });

  const activeObjectDefinition = useMemo(
    () => (activeObject ? getObjectDefinition(activeObject.type) : null),
    [activeObject],
  );
  const isObjectView = routeSelection.kind === "object";
  const isPromptEditable = !isObjectView && !!activeView;
  const currentViewLabel = isObjectView
    ? `${activeObjectDefinition?.label ?? "Object"} · ${activeObject?.id ?? ""}`
    : activeSystemView?.label ??
      activeView?.prompt ??
      (isStreaming ? "Generating..." : "New view");

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
        ? items.find((entry) => String(entry[definition.idKey]) === objectId)
        : null;
      const titleValue = match?.[definition.titleKey];
      const title = titleValue ? String(titleValue) : objectId;
      return `${title}`;
    },
    [data],
  );

  const visibleRecentViews = useMemo(
    () => recentItems.filter((item) => !normalizeSystemViewId(item.id)),
    [recentItems, normalizeSystemViewId],
  );

  const recentEntries = useMemo<RecentEntry[]>(() => {
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

  const handleRecentSelect = useCallback(
    (item: RecentItem) => {
      if (activeViewId === item.id) {
        openCommandMenu("edit", item.prompt);
        return;
      }
      navigateToView(item.id);
    },
    [activeViewId, navigateToView, openCommandMenu],
  );

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

  const handleSystemViewSelect = useCallback(
    (view: SystemViewEntry) => {
      if (activeViewId === view.id) {
        openCommandMenu("edit", view.prompt);
        return;
      }
      navigateToView(view.id);
    },
    [activeViewId, navigateToView, openCommandMenu],
  );

  const handleCommandSubmit = useCallback(
    (value: string) => {
      if (commandMode === "edit") {
        handlePromptEdit(value);
        const baseline = getPromptBaseline();
        if (baseline !== null && baseline.trim() === value.trim()) {
          resetCommandMenu();
          return;
        }
        void handlePromptRegenerate(value);
        return;
      }
      const trimmed = value.trim();
      if (!trimmed || isStreaming) return;
      void handlePromptSubmit(value);
      setPrompt("");
    },
    [
      commandMode,
      getPromptBaseline,
      resetCommandMenu,
      setPrompt,
      handlePromptEdit,
      handlePromptRegenerate,
      handlePromptSubmit,
      isStreaming,
    ],
  );

  const handlePromptFocus = useCallback(() => {
    setPromptBaseline(activePrompt);
  }, [activePrompt, setPromptBaseline]);

  const handlePromptBlur = useCallback(
    (value: string) => {
      const baseline = getPromptBaseline();
      setPromptBaseline(null);
      if (baseline !== null && baseline !== value) {
        void handlePromptRegenerate(value);
      }
    },
    [getPromptBaseline, handlePromptRegenerate, setPromptBaseline],
  );

  const handleRightSidebarOpen = useCallback(() => {
    setRightSidebarOpen(true);
  }, []);

  const toggleRightSidebar = useCallback(() => {
    setRightSidebarOpen((open) => !open);
  }, []);

  useKeyboardShortcuts({
    commandOpen,
    openCommandMenu,
    resetCommandMenu,
    toggleRightSidebar,
  });

  const objectTree = useMemo<StoredTree | null>(() => {
    if (!activeObject) return null;
    return {
      root: "object-view",
      elements: {
        "object-view": {
          key: "object-view",
          type: "ObjectView",
          props: {
            objectType: activeObject.type,
            objectId: activeObject.id,
          },
        },
      },
    };
  }, [activeObject]);
  const displayTree = objectTree ?? (isObjectView ? null : activeTree ?? tree);
  const hasElements =
    !!displayTree && Object.keys(displayTree.elements).length > 0;
  const isStreamingDisplay = isStreaming && !activeTree && !objectTree;
  const showEmptyState =
    routeSelection.kind === "root" &&
    !hasElements &&
    !isStreaming &&
    !isObjectView;

  return (
    <Layout
      leftSidebarOpen={leftSidebarOpen}
      onLeftSidebarOpenChange={setLeftSidebarOpen}
      leftSidebarProps={{
        activeWorkspace,
        onWorkspaceChange: setActiveWorkspace,
        systemViews,
        activeViewId,
        recentEntries,
        getObjectRecentLabel,
        onSystemViewSelect: handleSystemViewSelect,
        onRecentSelect: handleRecentSelect,
        onRecentObjectSelect: handleRecentObjectSelect,
        activeObject,
        isStreaming,
      }}
      topBarProps={{
        currentViewLabel,
        commandOpen,
        commandMode,
        prompt,
        isStreaming,
        isPromptEditable,
        activePrompt,
        onCommandSubmit: handleCommandSubmit,
        onCommandOpenChange: handleCommandOpenChange,
        onPromptChange: setPrompt,
        onPromptEdit: handlePromptEdit,
        openCommandMenu,
        rightSidebarOpen,
        onRightSidebarOpen: handleRightSidebarOpen,
      }}
      mainCanvasProps={{
        error,
        persistenceError,
        isObjectView,
        objectTree,
        showEmptyState,
        displayTree,
        isStreamingDisplay,
        hasElements,
      }}
      rightSidebarProps={{
        open: rightSidebarOpen,
        onOpenChange: setRightSidebarOpen,
        activePrompt,
        onPromptChange: handlePromptEdit,
        onPromptFocus: handlePromptFocus,
        onPromptBlur: handlePromptBlur,
        isPromptEditable,
        isStreaming,
        shareStatus,
        onShareLink: handleShareLink,
      }}
    />
  );
}

export function Page() {
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
            <Content />
          </ActionProvider>
        </VisibilityProvider>
      </ValidationProvider>
    </DataProvider>
  );
}

export default Page;
