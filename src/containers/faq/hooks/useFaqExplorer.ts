"use client";

import { useCallback, useMemo, useState } from "react";

import {
  type FaqTopicFilter,
  describeResults,
  filterFaqs,
  topicOptions,
} from "@/containers/faq/faqSearch";
import { useFaqDeepLink } from "@/containers/faq/hooks/useFaqDeepLink";
import type { FaqEntry } from "@/containers/faq/types";

/**
 * Keeps the open answer shareable without adding a history entry per click.
 * Passing the existing `history.state` through preserves the App Router's
 * own bookkeeping.
 */
function replaceHash(id: string) {
  window.history.replaceState(window.history.state, "", `#${id}`);
}

/**
 * All of the FAQ explorer's state — topic, search text, the one open answer —
 * and what derives from it. The match rules live in `faqSearch.ts`; this hook
 * only holds state, so the explorer components stay presentational.
 *
 * The first answer starts open, so the list never looks like a wall of
 * closed rows. A `#id` link resets the filters before opening its answer, so
 * it can never target a panel the current search has hidden.
 */
export function useFaqExplorer(entries: FaqEntry[]) {
  const [topic, setTopic] = useState<FaqTopicFilter>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | false>(entries[0]?.id ?? false);

  const ids = useMemo(() => entries.map((entry) => entry.id), [entries]);
  const visible = useMemo(() => filterFaqs(entries, topic, query), [entries, topic, query]);
  const options = useMemo(() => topicOptions(entries, query), [entries, query]);

  const openFromLink = useCallback((id: string) => {
    setTopic("all");
    setQuery("");
    setExpanded(id);
  }, []);
  useFaqDeepLink(ids, openFromLink);

  const toggle = (id: string) => {
    const next = expanded === id ? false : id;
    setExpanded(next);
    if (next) {
      replaceHash(next);
    }
  };

  const clear = () => {
    setTopic("all");
    setQuery("");
  };

  return {
    topic,
    setTopic,
    query,
    setQuery,
    clear,
    expanded,
    toggle,
    visible,
    options,
    statusText: describeResults(visible.length, topic, query),
  };
}

export type FaqExplorerState = ReturnType<typeof useFaqExplorer>;
