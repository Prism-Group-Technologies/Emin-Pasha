import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  HELPFUL_VOTES_STORAGE_KEY,
  parseVotes,
  useHelpfulVotes,
} from "@/containers/faq/hooks/useHelpfulVotes";

describe("parseVotes", () => {
  it("drops malformed data and unknown values", () => {
    expect(parseVotes("not json")).toEqual({});
    expect(parseVotes("[1,2]")).toEqual({});
    expect(parseVotes('{"a":"yes","b":"maybe","c":"no"}')).toEqual({ a: "yes", c: "no" });
  });
});

describe("useHelpfulVotes", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("records a vote and persists it in this browser", () => {
    const { result } = renderHook(() => useHelpfulVotes());
    expect(result.current.votes).toEqual({});

    act(() => result.current.vote("wifi", "yes"));
    expect(result.current.votes).toEqual({ wifi: "yes" });

    act(() => result.current.vote("wifi", "no"));
    expect(result.current.votes).toEqual({ wifi: "no" });
    expect(JSON.parse(window.localStorage.getItem(HELPFUL_VOTES_STORAGE_KEY) ?? "{}")).toEqual({
      wifi: "no",
    });
  });

  // Last on purpose: a failed write switches the module to its in-memory copy.
  it("still records the vote when storage refuses the write", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    const { result } = renderHook(() => useHelpfulVotes());

    act(() => result.current.vote("parking", "yes"));
    expect(result.current.votes).toEqual({ parking: "yes" });
  });
});
