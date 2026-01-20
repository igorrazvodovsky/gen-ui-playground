import { NextResponse } from "next/server";
import { SYSTEM_VIEW_SEEDS } from "@/lib/system-views";
import { ensureSeedViews, touchView, updateView } from "@/lib/view-store";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await ensureSeedViews(SYSTEM_VIEW_SEEDS);
  const { id } = await params;
  const view = await touchView(id);
  if (!view) {
    return NextResponse.json({ error: "View not found" }, { status: 404 });
  }
  return NextResponse.json(view);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await ensureSeedViews(SYSTEM_VIEW_SEEDS);
  const { id } = await params;
  const body = await req.json();
  const prompt = typeof body?.prompt === "string" ? body.prompt : undefined;
  const tree = body?.tree;

  const updated = await updateView(id, { prompt, tree });
  if (!updated) {
    return NextResponse.json({ error: "View not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
