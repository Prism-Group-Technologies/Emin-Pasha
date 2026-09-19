"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

export type HelpfulVote = "yes" | "no";

export type HelpfulVotes = Record<string, HelpfulVote>;

export const HELPFUL_VOTES_STORAGE_KEY = "emin-faq-helpful:v1";

/**
 * A tiny external store over `localStorage`, read through
 * `useSyncExternalStore` so the server snapshot ("no votes") and the first
 * client render agree, and no effect has to copy storage into state.
 *
 * Storage can be missing or throw (private windows, blocked site data), so
 * every access is guarded; a failed write keeps the vote in memory for the
 * session, which is all a "was this helpful?" button needs. Nothing is sent
 * anywhere — the brief kept this backend-free.
 */
const listeners = new Set<() => void>();
let memoryFallback: string | null = null;

function readStorage(): string {
  try {
    return window.localStorage.getItem(HELPFUL_VOTES_STORAGE_KEY) ?? "{}";
  } catch {
    return "{}";
  }
}

const getSnapshot = () => memoryFallback ?? readStorage();
const getServerSnapshot = () => "{}";

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function writeVotes(votes: HelpfulVotes) {
  const raw = JSON.stringify(votes);
  try {
    window.localStorage.setItem(HELPFUL_VOTES_STORAGE_KEY, raw);
  } catch {
    memoryFallback = raw;
  }
  listeners.forEach((listener) => listener());
}

/** Parses stored votes, dropping anything that is not a known vote value. */
export function parseVotes(raw: string): HelpfulVotes {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => value === "yes" || value === "no"),
    ) as HelpfulVotes;
  } catch {
    return {};
  }
}

/** Per-answer "was this helpful?" votes, remembered in this browser only. */
export function useHelpfulVotes() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const votes = useMemo(() => parseVotes(raw), [raw]);
  const vote = useCallback((id: string, value: HelpfulVote) => {
    writeVotes({ ...parseVotes(getSnapshot()), [id]: value });
  }, []);
  return { votes, vote };
}
