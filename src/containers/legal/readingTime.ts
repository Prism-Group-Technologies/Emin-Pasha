import type { LegalBlock, LegalSection } from "@/containers/legal/types";

/** A comfortable reading pace for policy prose, in words per minute. */
export const WORDS_PER_MINUTE = 220;

function blockText(block: LegalBlock): string {
  switch (block.kind) {
    case "p":
      return block.text;
    case "list":
      return block.items.join(" ");
    case "callout":
      return `${block.title} ${block.text}`;
    case "table":
      return [block.caption, ...block.columns, ...block.rows.flat()].join(" ");
  }
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

/** Whole minutes to read a document, never less than one. */
export function readingMinutes(sections: LegalSection[]): number {
  const words = sections.reduce(
    (total, section) =>
      total +
      countWords(section.title) +
      section.blocks.reduce((sum, block) => sum + countWords(blockText(block)), 0),
    0,
  );
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
