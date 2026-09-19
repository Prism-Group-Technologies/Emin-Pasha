import { describe, expect, it } from "vitest";

import { FAQ_TOPIC_ORDER } from "@/containers/faq/anchors";
import { buildFaqCatalogue, faqById, faqCatalogue, popularFaqs } from "@/containers/faq/catalogue";
import { approvedFaqTopics, faqGuideAsset, faqGuides, quickAnswers } from "@/containers/faq/copy";
import { faqItems } from "@/content/faq";
import { findNavItem } from "@/content/navigation";

describe("faq catalogue", () => {
  it("places every approved answer, with no stale placements", () => {
    expect(Object.keys(approvedFaqTopics).sort()).toEqual(faqItems.map((item) => item.id).sort());
  });

  it("renders approved answers verbatim", () => {
    for (const item of faqItems) {
      expect(faqById(item.id)).toMatchObject({ ...item, approved: true });
    }
  });

  it("groups answers in topic order", () => {
    const indexes = faqCatalogue.map((entry) => FAQ_TOPIC_ORDER.indexOf(entry.topic));
    expect(indexes).toEqual([...indexes].sort((a, b) => a - b));
    expect(FAQ_TOPIC_ORDER.every((topic) => faqCatalogue.some((e) => e.topic === topic))).toBe(
      true,
    );
  });

  it("flags a short 'Most asked' list", () => {
    expect(popularFaqs.length).toBeGreaterThanOrEqual(4);
    expect(popularFaqs.length).toBeLessThanOrEqual(8);
  });

  it("points every quick answer and guide question at a real answer", () => {
    const targets = [
      ...quickAnswers.map((a) => a.target),
      ...faqGuides.flatMap((g) => g.questionIds),
    ];
    expect(targets.filter((id) => !faqById(id))).toEqual([]);
  });

  it("links every guide to a real route and gives it a photo slot", () => {
    for (const guide of faqGuides) {
      expect(findNavItem(guide.href), guide.href).toBeDefined();
      expect(faqGuideAsset(guide.id), guide.id).toBeDefined();
    }
  });

  it("refuses an approved answer without a topic, and duplicate ids", () => {
    const item = { id: "a", question: "Q?", answer: "A." };
    expect(() => buildFaqCatalogue([item], {}, [])).toThrow(/no topic/);
    expect(() =>
      buildFaqCatalogue([item], { a: { topic: "stay" } }, [{ ...item, topic: "dining" }]),
    ).toThrow(/Duplicate/);
  });
});
