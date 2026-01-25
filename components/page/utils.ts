import type {
  ObjectRoute,
  RecentBase,
  RecentObjectItem,
  RouteSelection,
  StoredView,
  SystemViewEntry,
} from "./types";

export const buildViewRoute = (id: string) =>
  `/views/${encodeURIComponent(id)}`;

export const buildObjectRoute = (type: string, id: string) =>
  `/objects/${encodeURIComponent(type)}/${encodeURIComponent(id)}`;

export const buildObjectRecentId = (type: string, id: string) =>
  `object:${type}:${id}`;

export const getRecency = (item: RecentBase) =>
  item.updatedAt ?? item.createdAt;

export const mergeRecents = <T extends RecentBase>(
  items: T[],
  incoming: T[],
) => {
  const map = new Map<string, T>();
  items.forEach((item) => map.set(item.id, item));
  incoming.forEach((item) => {
    const existing = map.get(item.id);
    if (!existing || getRecency(item) >= getRecency(existing)) {
      map.set(item.id, item);
    }
  });
  return Array.from(map.values()).sort(
    (a, b) => getRecency(b) - getRecency(a),
  );
};

export const mergeSystemViews = (
  items: SystemViewEntry[],
  incoming: StoredView[],
) => {
  if (incoming.length === 0) return items;
  const map = new Map<string, StoredView>();
  incoming.forEach((view) => {
    const existing = map.get(view.id);
    if (!existing || view.updatedAt >= existing.updatedAt) {
      map.set(view.id, view);
    }
  });
  return items.map((view) => {
    const updated = map.get(view.id);
    if (!updated) return view;
    return { ...view, prompt: updated.prompt, tree: updated.tree };
  });
};

export const parsePathname = (pathname: string): RouteSelection => {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { kind: "root" };
  if (parts[0] === "views" && parts.length === 2 && parts[1]) {
    return { kind: "view", id: decodeURIComponent(parts[1]) };
  }
  if (parts[0] === "objects" && parts[1] && parts[2]) {
    return {
      kind: "object",
      objectType: decodeURIComponent(parts[1]),
      objectId: decodeURIComponent(parts[2]),
    };
  }
  return { kind: "root" };
};

export const resolveObjectTarget = (
  params: Record<string, unknown> | undefined,
): ObjectRoute | null => {
  const type =
    typeof params?.type === "string"
      ? params.type
      : typeof params?.objectType === "string"
        ? params.objectType
        : null;
  const id =
    typeof params?.id === "string"
      ? params.id
      : typeof params?.objectId === "string"
        ? params.objectId
        : null;
  if (!type || !id) return null;
  return { type, id };
};

export const parseRecentObjectItems = (raw: string | null): RecentObjectItem[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    const items = parsed.flatMap((entry) => {
      if (!entry || typeof entry !== "object") return [];
      const record = entry as Record<string, unknown>;
      if (typeof record.objectType !== "string") return [];
      if (typeof record.objectId !== "string") return [];
      const createdAt =
        typeof record.createdAt === "number" && Number.isFinite(record.createdAt)
          ? record.createdAt
          : now;
      const updatedAt =
        typeof record.updatedAt === "number" && Number.isFinite(record.updatedAt)
          ? record.updatedAt
          : createdAt;
      return [
        {
          id: buildObjectRecentId(record.objectType, record.objectId),
          objectType: record.objectType,
          objectId: record.objectId,
          createdAt,
          updatedAt,
        },
      ];
    });
    return mergeRecents([], items);
  } catch (err) {
    console.warn("Failed to parse recent object views", err);
    return [];
  }
};
