import { randomUUID } from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import Database from "better-sqlite3";
import type { UITree } from "@json-render/core";

export type StoredView = {
  id: string;
  prompt: string;
  tree: UITree;
  createdAt: number;
  updatedAt: number;
};

export type SeedView = {
  id: string;
  prompt: string;
  tree: UITree;
};

type DbRow = {
  id: string;
  prompt: string;
  tree: string;
  created_at: number;
  updated_at: number;
};

const DB_PATH =
  process.env.GENERATED_VIEWS_DB_PATH ??
  path.join(os.homedir(), ".genui-dashboard", "views.sqlite");

type DbInstance = InstanceType<typeof Database>;
const globalForDb = globalThis as typeof globalThis & {
  __viewsDb?: DbInstance;
};

function initDb(): DbInstance {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS views (
      id TEXT PRIMARY KEY,
      prompt TEXT NOT NULL,
      tree TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);
  return db;
}

function getDb(): DbInstance {
  if (!globalForDb.__viewsDb) {
    globalForDb.__viewsDb = initDb();
  }
  return globalForDb.__viewsDb;
}

function mapRow(row: DbRow): StoredView {
  return {
    id: row.id,
    prompt: row.prompt,
    tree: JSON.parse(row.tree) as UITree,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createView(input: {
  prompt: string;
  tree: UITree;
}): Promise<StoredView> {
  const db = getDb();
  const now = Date.now();
  const id = randomUUID();
  const treeJson = JSON.stringify(input.tree);
  db.prepare(
    `INSERT INTO views (id, prompt, tree, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(id, input.prompt, treeJson, now, now);
  return {
    id,
    prompt: input.prompt,
    tree: input.tree,
    createdAt: now,
    updatedAt: now,
  };
}

export async function ensureSeedViews(views: SeedView[]): Promise<void> {
  if (views.length === 0) return;
  const db = getDb();
  const now = Date.now();
  const insert = db.prepare(
    `INSERT OR IGNORE INTO views (id, prompt, tree, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`,
  );
  const insertMany = db.transaction((seedViews: SeedView[]) => {
    seedViews.forEach((view) => {
      insert.run(view.id, view.prompt, JSON.stringify(view.tree), now, now);
    });
  });
  insertMany(views);
}

export async function updateView(
  id: string,
  input: { prompt?: string; tree?: UITree },
): Promise<StoredView | null> {
  const db = getDb();
  const now = Date.now();
  const treeJson =
    input.tree !== undefined ? JSON.stringify(input.tree) : null;
  const result = db
    .prepare(
      `UPDATE views
       SET prompt = COALESCE(?, prompt),
           tree = COALESCE(?, tree),
           updated_at = ?
       WHERE id = ?`,
    )
    .run(input.prompt ?? null, treeJson, now, id);
  if (result.changes === 0) return null;
  return getView(id);
}

export async function getView(id: string): Promise<StoredView | null> {
  const db = getDb();
  const row = db
    .prepare<unknown[], DbRow>(
      `SELECT id, prompt, tree, created_at, updated_at
       FROM views
       WHERE id = ?`,
    )
    .get(id);
  if (!row) return null;
  return mapRow(row);
}

export async function touchView(id: string): Promise<StoredView | null> {
  const db = getDb();
  const now = Date.now();
  const result = db
    .prepare(`UPDATE views SET updated_at = ? WHERE id = ?`)
    .run(now, id);
  if (result.changes === 0) return null;
  return getView(id);
}

export async function listViews(): Promise<StoredView[]> {
  const db = getDb();
  const rows = db
    .prepare<unknown[], DbRow>(
      `SELECT id, prompt, tree, created_at, updated_at
       FROM views
       ORDER BY updated_at DESC`,
    )
    .all();
  return rows.map(mapRow);
}
