"use client";

import { useMemo } from "react";
import { getByPath } from "@json-render/core";
import { useData } from "@json-render/react";
import { Button } from "@/components/ui/button";
import { formatTableCell } from "@/lib/table-format";
import { getObjectDefinition, type ObjectField } from "@/lib/object-definitions";

const EMPTY_LABEL = "-";

type ObjectViewProps = {
  objectType: string;
  objectId: string;
  onBack?: () => void;
};

type ObjectRecord = Record<string, unknown>;

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
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <dl className="mt-4 space-y-3">
        {fields.map((field) => (
          <div
            key={field.key}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <dt className="text-muted-foreground">{field.label}</dt>
            <dd className="text-right font-medium text-foreground">
              {formatTableCell(item[field.key], field.format)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ObjectView({ objectType, objectId, onBack }: ObjectViewProps) {
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
        {onBack && (
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={onBack}
          >
            Back to dashboard
          </Button>
        )}
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
        {onBack && (
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={onBack}
          >
            Back to {definition.pluralLabel}
          </Button>
        )}
      </div>
    );
  }

  const title =
    (item[definition.titleKey] ? String(item[definition.titleKey]) : null) ??
    objectId;
  const metaFields = definition.meta ?? [];
  const badges = definition.badges ?? [];
  const summary = definition.summary ?? [];
  const details = definition.details ?? [];

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
          {metaFields.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              {metaFields.map((field) => (
                <div key={field.key} className="flex items-center gap-1.5">
                  <span>{field.label}:</span>
                  <span className="font-medium text-foreground">
                    {formatTableCell(item[field.key], field.format) ?? EMPTY_LABEL}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {badges.map((field) => (
            <div key={field.key} className="text-sm">
              {formatTableCell(item[field.key], field.format) ?? EMPTY_LABEL}
            </div>
          ))}
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack}>
              Back to {definition.pluralLabel}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <FieldList title="Overview" fields={summary} item={item} />
        <FieldList title="Details" fields={details} item={item} />
      </div>
    </div>
  );
}
