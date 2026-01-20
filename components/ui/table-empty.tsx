"use client";

type TableEmptyProps = {
  message?: string | null;
};

export function TableEmpty({ message }: TableEmptyProps) {
  return (
    <div className="rounded-md border border-dashed border-border/70 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
      {message ?? "No data"}
    </div>
  );
}
