"use client";

import { Renderer } from "@json-render/react";
import { componentRegistry } from "@/components/ui";
import type { StoredTree } from "./types";

type MainCanvasProps = {
  error: Error | null;
  persistenceError: string | null;
  isObjectView: boolean;
  objectTree: StoredTree | null;
  showEmptyState: boolean;
  displayTree: StoredTree | null;
  isStreamingDisplay: boolean;
  hasElements: boolean;
};

export function MainCanvas({
  error,
  persistenceError,
  isObjectView,
  objectTree,
  showEmptyState,
  displayTree,
  isStreamingDisplay,
  hasElements,
}: MainCanvasProps) {
  return (
    <main className="flex-1 p-3">
      <div className="mx-auto space-y-6">
        <div className="p-3">
          {error && (
            <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              {error.message}
            </div>
          )}
          {persistenceError && (
            <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              {persistenceError}
            </div>
          )}
          <div className="min-h-[220px]">
            {isObjectView && !objectTree ? (
              <p className="text-sm text-muted-foreground">
                Loading object view...
              </p>
            ) : showEmptyState ? (
              <p className="text-sm text-muted-foreground">
                Enter a prompt to generate a widget.
              </p>
            ) : displayTree ? (
              <Renderer
                tree={displayTree}
                registry={componentRegistry}
                loading={isStreamingDisplay}
              />
            ) : null}
          </div>
          {hasElements && !isObjectView && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-muted-foreground">
                View JSON
              </summary>
              <pre className="mt-2 max-h-96 overflow-auto rounded-md border border-border bg-background p-3 text-xs text-muted-foreground">
                {JSON.stringify(displayTree, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </main>
  );
}
