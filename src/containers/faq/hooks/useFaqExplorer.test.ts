import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useFaqExplorer } from "@/containers/faq/hooks/useFaqExplorer";
import type { FaqEntry } from "@/containers/faq/types";

const entry = (id: string, topic: FaqEntry["topic"], question: string): FaqEntry => ({
  id,
  topic,
  question,
  answer: `${question} Answered.`,
  popular: false,
  approved: true,
});

const ENTRIES: FaqEntry[] = [
  entry("check-in", "stay", "When is check-in?"),
  entry("breakfast", "dining", "Is breakfast included?"),
  entry("parking", "arrival", "Is there parking?"),
];

describe("useFaqExplorer", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/faq");
  });

  it("starts on every answer with the first one open", () => {
    const { result } = renderHook(() => useFaqExplorer(ENTRIES));
    expect(result.current.visible).toHaveLength(3);
    expect(result.current.expanded).toBe("check-in");
    expect(result.current.statusText).toBe("Showing 3 answers.");
  });

  it("filters by search and topic, and clears both", () => {
    const { result } = renderHook(() => useFaqExplorer(ENTRIES));

    act(() => result.current.setQuery("is"));
    act(() => result.current.setTopic("arrival"));
    expect(result.current.visible.map((e) => e.id)).toEqual(["parking"]);

    act(() => result.current.clear());
    expect(result.current.visible).toHaveLength(3);
  });

  it("toggles one answer at a time and mirrors it in the hash", () => {
    const { result } = renderHook(() => useFaqExplorer(ENTRIES));

    act(() => result.current.toggle("parking"));
    expect(result.current.expanded).toBe("parking");
    expect(window.location.hash).toBe("#parking");

    act(() => result.current.toggle("parking"));
    expect(result.current.expanded).toBe(false);
  });

  it("opens a linked answer and resets filters that would hide it", () => {
    const { result } = renderHook(() => useFaqExplorer(ENTRIES));
    act(() => result.current.setTopic("stay"));

    act(() => {
      window.history.replaceState(null, "", "/faq#breakfast");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

    expect(result.current.topic).toBe("all");
    expect(result.current.expanded).toBe("breakfast");
  });

  it("ignores hashes that are not answers", () => {
    const { result } = renderHook(() => useFaqExplorer(ENTRIES));
    act(() => {
      window.history.replaceState(null, "", "/faq#questions");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(result.current.expanded).toBe("check-in");
  });
});
