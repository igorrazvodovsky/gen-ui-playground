import type { UITree } from "@json-render/core";
import type { SystemView } from "@/lib/system-views";

export type StoredTree = UITree;

export type RecentBase = {
  id: string;
  createdAt: number;
  updatedAt: number;
};

export type RecentItem = RecentBase & {
  prompt: string;
  tree: StoredTree;
};

export type RecentObjectItem = RecentBase & {
  objectType: string;
  objectId: string;
};

export type SystemViewEntry = SystemView;

export type RegenerationTarget = {
  id: string;
};

export type StoredView = {
  id: string;
  prompt: string;
  tree: StoredTree;
  createdAt: number;
  updatedAt: number;
};

export type ObjectRoute = {
  type: string;
  id: string;
};

export type RouteSelection =
  | { kind: "root" }
  | { kind: "view"; id: string }
  | { kind: "object"; objectType: string; objectId: string };

export type RecentEntry =
  | { kind: "view"; item: RecentItem }
  | { kind: "object"; item: RecentObjectItem };
