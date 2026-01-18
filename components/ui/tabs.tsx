"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type ComponentRenderProps } from "@json-render/react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

type TabItem = {
  value: string;
  label: string;
  action?: string | null;
  params?: Record<string, unknown> | null;
};

export function Tabs({ element, onAction }: ComponentRenderProps) {
  const { items, defaultValue } = element.props as {
    items: TabItem[];
    defaultValue?: string | null;
  };

  const initial = useMemo(
    () => defaultValue ?? items[0]?.value ?? "",
    [defaultValue, items],
  );
  const [value, setValue] = useState(initial);

  const handleChange = (next: string) => {
    setValue(next);
    const tab = items.find((item) => item.value === next);
    if (tab?.action) {
      onAction?.({
        name: tab.action,
        params: tab.params ?? { value: next },
      });
    }
  };

  return (
    <TabsPrimitive.Root
      value={value}
      onValueChange={handleChange}
      className="w-full"
    >
      <TabsPrimitive.List className="inline-flex h-10 items-center justify-start gap-1 rounded-md border border-border/70 bg-muted/30 p-1">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              "data-[state=active]:bg-background data-[state=active]:text-foreground",
              "data-[state=inactive]:text-muted-foreground hover:bg-muted/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
