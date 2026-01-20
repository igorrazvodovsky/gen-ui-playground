"use client";

import { type ComponentRenderProps } from "@json-render/react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabsItem = {
  value: string;
  label: string;
  action?: string | null;
  params?: Record<string, unknown> | null;
};

export function RenderTabs({ element, onAction }: ComponentRenderProps) {
  const { items, defaultValue } = element.props as {
    items: TabsItem[];
    defaultValue?: string | null;
  };

  if (!items || items.length === 0) return null;

  const resolvedDefault = items.some((item) => item.value === defaultValue)
    ? defaultValue
    : items[0]?.value;

  return (
    <Tabs
      defaultValue={resolvedDefault ?? undefined}
      onValueChange={(value) => {
        const selected = items.find((item) => item.value === value);
        if (!selected?.action) return;
        onAction?.({
          name: selected.action,
          params: selected.params ?? undefined,
        });
      }}
    >
      <TabsList>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
