import { describe, expect, it } from "vitest";
import {
  buildObjectRecentId,
  buildObjectRoute,
  buildViewRoute,
  mergeRecents,
  parsePathname,
  resolveObjectTarget,
} from "../utils";

describe("route helpers", () => {
  it("builds view routes with encoding", () => {
    expect(buildViewRoute("view id")).toBe("/views/view%20id");
  });

  it("builds object routes with encoding", () => {
    expect(buildObjectRoute("account type", "acme/1")).toBe(
      "/objects/account%20type/acme%2F1",
    );
  });

  it("builds object recent ids", () => {
    expect(buildObjectRecentId("accounts", "acme")).toBe("object:accounts:acme");
  });
});

describe("parsePathname", () => {
  it("parses root paths", () => {
    expect(parsePathname("/")).toEqual({ kind: "root" });
    expect(parsePathname("")).toEqual({ kind: "root" });
  });

  it("parses view paths", () => {
    expect(parsePathname("/views/saved%20view")).toEqual({
      kind: "view",
      id: "saved view",
    });
  });

  it("parses object paths", () => {
    expect(parsePathname("/objects/accounts/acme%20corp")).toEqual({
      kind: "object",
      objectType: "accounts",
      objectId: "acme corp",
    });
  });

  it("falls back to root on unknown paths", () => {
    expect(parsePathname("/foo/bar")).toEqual({ kind: "root" });
  });
});

describe("mergeRecents", () => {
  it("prefers newer entries and sorts by recency", () => {
    const base = { id: "a", createdAt: 1, updatedAt: 1 };
    const incoming = { id: "a", createdAt: 1, updatedAt: 5 };
    const other = { id: "b", createdAt: 2, updatedAt: 2 };

    const merged = mergeRecents([base], [incoming, other]);

    expect(merged).toHaveLength(2);
    expect(merged[0]?.id).toBe("a");
    expect(merged[0]?.updatedAt).toBe(5);
  });
});

describe("resolveObjectTarget", () => {
  it("supports type/id params", () => {
    expect(resolveObjectTarget({ type: "tasks", id: "123" })).toEqual({
      type: "tasks",
      id: "123",
    });
  });

  it("supports objectType/objectId params", () => {
    expect(
      resolveObjectTarget({ objectType: "accounts", objectId: "acme" }),
    ).toEqual({
      type: "accounts",
      id: "acme",
    });
  });

  it("returns null for invalid params", () => {
    expect(resolveObjectTarget(undefined)).toBeNull();
    expect(resolveObjectTarget({})).toBeNull();
  });
});
