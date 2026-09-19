import { describe, expect, it } from "vitest";

import {
  DOCUMENT_ANCHOR_ID,
  LEGAL_PAGE_ORDER,
  LEGAL_PATH,
  SETTINGS_ANCHOR_ID,
  SUMMARY_ANCHOR_ID,
} from "@/containers/legal/anchors";
import { legalDocuments, legalLinks } from "@/containers/legal/catalogue";
import { routePaths } from "@/content/routes";
import { shell } from "@/content/shell";

const PAGE_ANCHORS = [SUMMARY_ANCHOR_ID, DOCUMENT_ANCHOR_ID, SETTINGS_ANCHOR_ID];

describe("legal catalogue", () => {
  it("gives every document unique section ids that never collide with page anchors", () => {
    for (const document of Object.values(legalDocuments)) {
      const ids = document.sections.map((section) => section.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.filter((id) => PAGE_ANCHORS.includes(id))).toEqual([]);
    }
  });

  it("registers every legal path as a sitemap route", () => {
    for (const path of Object.values(LEGAL_PATH)) {
      expect(routePaths).toContain(path);
    }
  });

  it("points every footer legal link at a real legal page", () => {
    const paths = Object.values(LEGAL_PATH);
    for (const link of shell.footer.legalLinks) {
      expect(paths).toContain(link.href);
    }
  });

  it("builds one cross-link per page, in order", () => {
    expect(legalLinks.map((link) => link.id)).toEqual(LEGAL_PAGE_ORDER);
    expect(legalLinks.every((link) => link.label && link.teaser)).toBe(true);
  });

  it("keeps table rows the same width as their columns", () => {
    for (const document of Object.values(legalDocuments)) {
      for (const block of document.sections.flatMap((section) => section.blocks)) {
        if (block.kind === "table") {
          expect(block.rows.every((row) => row.length === block.columns.length)).toBe(true);
        }
      }
    }
  });
});
