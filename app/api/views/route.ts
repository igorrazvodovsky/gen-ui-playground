import { NextResponse } from "next/server";
import { SYSTEM_VIEW_SEEDS } from "@/lib/system-views";
import { createView, ensureSeedViews, listViews } from "@/lib/view-store";

export const runtime = "nodejs";

export async function GET(req: Request) {
  await ensureSeedViews(SYSTEM_VIEW_SEEDS);
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number.parseInt(limitParam, 10) : null;
  const views = await listViews();
  const result =
    typeof limit === "number" && !Number.isNaN(limit) && limit > 0
      ? views.slice(0, limit)
      : views;
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  await ensureSeedViews(SYSTEM_VIEW_SEEDS);
  const body = await req.json();
  const prompt = typeof body?.prompt === "string" ? body.prompt : null;
  const tree = body?.tree;

  if (!prompt || !tree) {
    return NextResponse.json(
      { error: "prompt and tree are required" },
      { status: 400 },
    );
  }

  const view = await createView({ prompt, tree });
  return NextResponse.json(view);
}
