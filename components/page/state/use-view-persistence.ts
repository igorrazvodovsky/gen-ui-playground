"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useUIStream } from "@json-render/react";
import { DEFAULT_SYSTEM_VIEW, SYSTEM_VIEWS } from "@/lib/system-views";
import { INITIAL_DATA } from "@/components/page/initial-data";
import {
  LEGACY_SYSTEM_VIEW_PREFIX,
  RECENT_REORDER_DELAY_MS,
} from "@/components/page/constants";
import {
  buildObjectRecentId,
  buildObjectRoute,
  buildViewRoute,
  mergeRecents,
  mergeSystemViews,
} from "@/components/page/utils";
import type {
  ObjectRoute,
  RecentItem,
  RecentObjectItem,
  RegenerationTarget,
  RouteSelection,
  StoredTree,
  StoredView,
  SystemViewEntry,
} from "@/components/page/types";

type UseViewPersistenceArgs = {
  routeSelection: RouteSelection;
  onGenerationStart?: () => void;
  setRecentObjectItems: React.Dispatch<
    React.SetStateAction<RecentObjectItem[]>
  >;
  router: {
    push: (href: string) => void;
    replace: (href: string) => void;
  };
};

type ViewPersistenceState = {
  systemViews: SystemViewEntry[];
  recentItems: RecentItem[];
  activeViewId: string | null;
  activeTree: StoredTree | null;
  activeObject: ObjectRoute | null;
  persistenceError: string | null;
  tree: StoredTree | null;
  isStreaming: boolean;
  error: Error | null;
  activeView: SystemViewEntry | RecentItem | null;
  activeSystemView: SystemViewEntry | null;
  activePrompt: string;
  handlePromptEdit: (nextPrompt: string) => void;
  handlePromptRegenerate: (value: string) => Promise<void>;
  handlePromptSubmit: (value: string) => Promise<void>;
  navigateToView: (id: string) => void;
  navigateToObject: (type: string, id: string) => void;
  normalizeSystemViewId: (id: string) => string | null;
};

export function useViewPersistence({
  routeSelection,
  onGenerationStart,
  setRecentObjectItems,
  router,
}: UseViewPersistenceArgs): ViewPersistenceState {
  const [systemViews, setSystemViews] = useState<SystemViewEntry[]>(SYSTEM_VIEWS);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [activeViewId, setActiveViewId] = useState<string | null>(
    DEFAULT_SYSTEM_VIEW?.id ?? null,
  );
  const [activeTree, setActiveTree] = useState<StoredTree | null>(
    DEFAULT_SYSTEM_VIEW?.tree ?? null,
  );
  const [activeObject, setActiveObject] = useState<ObjectRoute | null>(null);
  const [persistenceError, setPersistenceError] = useState<string | null>(null);
  const generationIdRef = useRef(0);
  const lastStoredGenerationRef = useRef(0);
  const lastPromptRef = useRef<string | null>(null);
  const regenerationTargetRef = useRef<RegenerationTarget | null>(null);
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

  const normalizeSystemViewId = useCallback((id: string) => {
    if (systemViewIdSetRef.current.has(id)) return id;
    if (!id.startsWith(LEGACY_SYSTEM_VIEW_PREFIX)) return null;
    const candidate = id.slice(LEGACY_SYSTEM_VIEW_PREFIX.length);
    return systemViewIdSetRef.current.has(candidate) ? candidate : null;
  }, []);

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

  useEffect(() => {
    const timers = recentUpdateTimersRef.current;
    return () => {
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
      const endpoint = id
        ? `/api/views/${encodeURIComponent(id)}`
        : "/api/views";
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
      onGenerationStart?.();
      await send(trimmed, { data: INITIAL_DATA });
    },
    [activeViewId, isStreaming, onGenerationStart, send],
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
      onGenerationStart?.();
      await send(trimmed, { data: INITIAL_DATA });
    },
    [isStreaming, onGenerationStart, send],
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
  }, [routeSelection, setRecentObjectItems]);

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
          err instanceof Error ? err.message : "Unable to load the view.";
        setPersistenceError(message);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [fetchViewById, routeSelection, upsertStoredView]);

  const { activeView, activeSystemView, activePrompt } = useMemo(() => {
    const activeSystem = systemViews.find((view) => view.id === activeViewId);
    const activeRecent = recentItems.find((item) => item.id === activeViewId);
    const resolvedView = activeSystem ?? activeRecent ?? null;
    return {
      activeView: resolvedView,
      activeSystemView: activeSystem ?? null,
      activePrompt: resolvedView?.prompt ?? "",
    };
  }, [activeViewId, recentItems, systemViews]);

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
          err instanceof Error ? err.message : "Unable to persist the view.";
        setPersistenceError(message);
      }
    };

    void storeView();

    return () => {
      cancelled = true;
    };
  }, [
    activePrompt,
    isStreaming,
    persistView,
    router,
    tree,
    upsertStoredView,
  ]);

  return {
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
  };
}
