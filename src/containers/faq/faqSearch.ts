import { FAQ_TOPIC_LABEL, FAQ_TOPIC_ORDER, type FaqTopicId } from "@/containers/faq/anchors";
import type { FaqEntry } from "@/containers/faq/types";

/**
 * The FAQ explorer's search and filter rules — pure, framework-free and unit
 * tested, so `useFaqExplorer` stays a thin state container.
 */

export type FaqTopicFilter = "all" | FaqTopicId;

export interface FaqTopicOption {
  value: FaqTopicFilter;
  label: string;
  /** Answers in this topic that match the current search. */
  count: number;
}

type Searchable = Pick<FaqEntry, "question" | "answer">;

const ALL_TOPICS_LABEL = "All topics";

/**
 * Lower-cases and strips accents, so "a la carte" finds "à la carte": NFD
 * splits "à" into "a" + a combining mark, and `\p{M}` removes the mark.
 */
export function normaliseText(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

/** Splits on anything that is not a letter or digit: "wi-fi" → ["wi", "fi"]. */
export function toSearchTokens(query: string): string[] {
  return normaliseText(query)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/** Every token must appear somewhere in the question or the answer. */
export function matchesTokens(entry: Searchable, tokens: string[]): boolean {
  if (tokens.length === 0) {
    return true;
  }
  const haystack = normaliseText(`${entry.question} ${entry.answer}`);
  return tokens.every((token) => haystack.includes(token));
}

export function filterFaqs<T extends Searchable & { topic: FaqTopicId }>(
  entries: T[],
  topic: FaqTopicFilter,
  query: string,
): T[] {
  const tokens = toSearchTokens(query);
  return entries.filter(
    (entry) => (topic === "all" || entry.topic === topic) && matchesTokens(entry, tokens),
  );
}

/** "All topics" plus every topic, each counted against the current search. */
export function topicOptions(
  entries: Array<Searchable & { topic: FaqTopicId }>,
  query: string,
): FaqTopicOption[] {
  const tokens = toSearchTokens(query);
  const matching = entries.filter((entry) => matchesTokens(entry, tokens));
  return [
    { value: "all", label: ALL_TOPICS_LABEL, count: matching.length },
    ...FAQ_TOPIC_ORDER.map((topic) => ({
      value: topic,
      label: FAQ_TOPIC_LABEL[topic],
      count: matching.filter((entry) => entry.topic === topic).length,
    })),
  ];
}

/** The `aria-live` result line: "Showing 3 answers in Dining for “vegan”." */
export function describeResults(count: number, topic: FaqTopicFilter, query: string): string {
  const noun = count === 1 ? "answer" : "answers";
  const scope = topic === "all" ? "" : ` in ${FAQ_TOPIC_LABEL[topic]}`;
  const trimmed = query.trim();
  const search = trimmed ? ` for “${trimmed}”` : "";
  return `Showing ${count} ${noun}${scope}${search}.`;
}
