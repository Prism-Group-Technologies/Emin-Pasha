import { describe, expect, it } from "vitest";

import {
  describeResults,
  filterFaqs,
  normaliseText,
  toSearchTokens,
  topicOptions,
} from "@/containers/faq/faqSearch";
import type { FaqEntry } from "@/containers/faq/types";

const entry = (
  id: string,
  topic: FaqEntry["topic"],
  question: string,
  answer: string,
): FaqEntry => ({
  id,
  topic,
  question,
  answer,
  popular: false,
  approved: false,
});

const ENTRIES: FaqEntry[] = [
  entry("wifi", "stay", "Is there Wi-Fi?", "Yes — fast, unlimited fibre."),
  entry("breakfast", "dining", "Is breakfast included?", "Yes — à la carte breakfast."),
  entry("vegan", "dining", "Can the kitchen cater for vegans?", "Yes, tell us when you book."),
  entry("parking", "arrival", "Is there parking?", "Secure parking on site."),
];

describe("faqSearch", () => {
  it("normalises case and accents", () => {
    expect(normaliseText("À la Carte")).toBe("a la carte");
  });

  it("tokenises on anything that is not a letter or digit", () => {
    expect(toSearchTokens("  Wi-Fi!  ")).toEqual(["wi", "fi"]);
    expect(toSearchTokens("")).toEqual([]);
  });

  it("requires every token to match, across question and answer", () => {
    expect(filterFaqs(ENTRIES, "all", "a la carte").map((e) => e.id)).toEqual(["breakfast"]);
    expect(filterFaqs(ENTRIES, "all", "yes book").map((e) => e.id)).toEqual(["vegan"]);
    expect(filterFaqs(ENTRIES, "all", "wifi")).toEqual([]);
  });

  it("narrows by topic and combines topic with search", () => {
    expect(filterFaqs(ENTRIES, "dining", "").map((e) => e.id)).toEqual(["breakfast", "vegan"]);
    expect(filterFaqs(ENTRIES, "dining", "vegans").map((e) => e.id)).toEqual(["vegan"]);
  });

  it("counts every topic against the current search", () => {
    const counts = Object.fromEntries(
      topicOptions(ENTRIES, "yes").map((option) => [option.value, option.count]),
    );
    expect(counts).toMatchObject({ all: 3, stay: 1, dining: 2, arrival: 0, events: 0 });
  });

  it("describes the result for a live region", () => {
    expect(describeResults(4, "all", "")).toBe("Showing 4 answers.");
    expect(describeResults(1, "dining", " vegan ")).toBe("Showing 1 answer in Dining for “vegan”.");
  });
});
