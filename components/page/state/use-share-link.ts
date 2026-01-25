"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ShareStatus = "idle" | "copied" | "error";

type ShareLinkState = {
  shareStatus: ShareStatus;
  handleShareLink: () => Promise<void>;
};

export function useShareLink(): ShareLinkState {
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");
  const shareResetRef = useRef<number | null>(null);

  const handleShareLink = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("copied");
    } catch (err) {
      console.error("Share link error:", err);
      setShareStatus("error");
    }
    if (shareResetRef.current) {
      window.clearTimeout(shareResetRef.current);
    }
    shareResetRef.current = window.setTimeout(() => {
      setShareStatus("idle");
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (shareResetRef.current) {
        window.clearTimeout(shareResetRef.current);
      }
    };
  }, []);

  return { shareStatus, handleShareLink };
}
