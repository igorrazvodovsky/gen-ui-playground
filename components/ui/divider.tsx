"use client";

import { type ComponentRenderProps } from "@json-render/react";

import { Separator } from "@/components/ui/separator";

export function Divider({ element }: ComponentRenderProps) {
  const { orientation } = element.props as { orientation?: string | null };
  if (orientation === "vertical") {
    return <Separator orientation="vertical" className="self-stretch" />;
  }
  return <Separator className="my-4" />;
}
