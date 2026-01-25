"use client";

import { useMemo } from "react";
import Link from "next/link";
import { getByPath } from "@json-render/core";
import { type ComponentRenderProps, useData } from "@json-render/react";

import { buildObjectRoute } from "@/lib/routes";
import { formatTableCell } from "@/lib/table-format";
import { getObjectDefinition, type ObjectField } from "@/lib/object-definitions";

type ObjectRecord = Record<string, unknown>;

const isRenderableId = (value: unknown): value is string | number =>
  typeof value === "string" || typeof value === "number";

function renderLinkedValue(value: unknown, linkType: string) {
  if (value === null || value === undefined) return "-";
  if (Array.isArray(value)) {
    const entries = value.filter(isRenderableId);
    if (entries.length === 0) return "-";
    return (
      <div className="flex flex-wrap justify-end gap-2 text-right">
        {entries.map((entry) => {
          const label = String(entry);
          return (
            <Link
              key={`${linkType}-${label}`}
              href={buildObjectRoute(linkType, label)}
              className="font-medium text-primary hover:underline"
            >
              {label}
            </Link>
          );
        })}
      </div>
    );
  }
  if (!isRenderableId(value)) {
    return formatTableCell(value);
  }
  const label = String(value);
  return (
    <Link
      href={buildObjectRoute(linkType, label)}
      className="font-medium text-primary hover:underline"
    >
      {label}
    </Link>
  );
}

function renderFieldValue(item: ObjectRecord, field: ObjectField) {
  const value = item[field.key];
  if (field.linkType) {
    return renderLinkedValue(value, field.linkType);
  }
  return formatTableCell(value, field.format);
}

function FieldList({
  title,
  fields,
  item,
}: {
  title: string;
  fields: ObjectField[];
  item: ObjectRecord;
}) {
  if (!fields.length) return null;

  return (
    <div className="rounded-md border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <dl className="mt-4 space-y-3">
        {fields.map((field) => (
          <div
            key={field.key}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <dt className="text-muted-foreground">{field.label}</dt>
            <dd className="text-right font-medium text-foreground">
              {renderFieldValue(item, field)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ObjectView({ element }: ComponentRenderProps) {
  const { objectType, objectId } = element.props as {
    objectType: string;
    objectId: string;
  };
  const definition = getObjectDefinition(objectType);
  const { data } = useData();

  const item = useMemo(() => {
    if (!definition) return null;
    const items = getByPath(data, definition.dataPath) as
      | ObjectRecord[]
      | undefined;
    if (!Array.isArray(items)) return null;
    return (
      items.find((entry) => String(entry[definition.idKey]) === objectId) ??
      null
    );
  }, [data, definition, objectId]);

  if (!definition) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          Unknown object type
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn&apos;t find a view for &quot;{objectType}&quot;.
        </p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          {definition.label} not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn&apos;t find {definition.label.toLowerCase()} &quot;{objectId}&quot;.
        </p>
      </div>
    );
  }

  const title =
    (item[definition.titleKey] ? String(item[definition.titleKey]) : null) ??
    objectId;
  const summary = definition.summary ?? [];
  const details = definition.details ?? [];
  const panels = (definition.panels ?? []).filter(
    (panel) => panel.fields.length > 0,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {definition.label}
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground">
            {title}
          </h1>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <FieldList title="Overview" fields={summary} item={item} />
        <FieldList title="Details" fields={details} item={item} />
      </div>
      {panels.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {panels.map((panel) => (
            <FieldList
              key={panel.title}
              title={panel.title}
              fields={panel.fields}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
