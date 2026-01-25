"use client";

import { useCallback, useSyncExternalStore } from "react";
import { RECENT_OBJECT_STORAGE_KEY } from "@/components/page/constants";
import { parseRecentObjectItems } from "@/components/page/utils";
import type { RecentObjectItem } from "@/components/page/types";

type SetRecentObjects = (
  next:
    | RecentObjectItem[]
    | ((prev: RecentObjectItem[]) => RecentObjectItem[]),
) => void;

type RecentObjectsState = {
  recentObjectItems: RecentObjectItem[];
  setRecentObjectItems: SetRecentObjects;
};

const RECENT_OBJECT_EVENT = "recent-object-views:change";
const EMPTY_RECENT_OBJECTS: RecentObjectItem[] = [];

const readRecentObjectItems = (): RecentObjectItem[] => {
  if (typeof window === "undefined") return EMPTY_RECENT_OBJECTS;
  return parseRecentObjectItems(
    window.localStorage.getItem(RECENT_OBJECT_STORAGE_KEY),
  );
};

let cachedRecentObjects: RecentObjectItem[] =
  typeof window === "undefined" ? EMPTY_RECENT_OBJECTS : readRecentObjectItems();

const subscribeToRecents = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }
  const handleStoreChange = (event: Event) => {
    if (event.type === "storage") {
      cachedRecentObjects = readRecentObjectItems();
    }
    callback();
  };
  window.addEventListener(RECENT_OBJECT_EVENT, handleStoreChange);
  window.addEventListener("storage", handleStoreChange);
  return () => {
    window.removeEventListener(RECENT_OBJECT_EVENT, handleStoreChange);
    window.removeEventListener("storage", handleStoreChange);
  };
};

export function useRecentObjects(): RecentObjectsState {
  const recentObjectItems = useSyncExternalStore(
    subscribeToRecents,
    () => cachedRecentObjects,
    () => EMPTY_RECENT_OBJECTS,
  );

  const setRecentObjectItems = useCallback<SetRecentObjects>((next) => {
    if (typeof window === "undefined") return;
    try {
      const current = cachedRecentObjects;
      const resolved = typeof next === "function" ? next(current) : next;
      cachedRecentObjects = resolved;
      window.localStorage.setItem(
        RECENT_OBJECT_STORAGE_KEY,
        JSON.stringify(resolved),
      );
      window.dispatchEvent(new Event(RECENT_OBJECT_EVENT));
    } catch (err) {
      console.warn("Failed to store recent object views", err);
    }
  }, []);

  return { recentObjectItems, setRecentObjectItems };
}
