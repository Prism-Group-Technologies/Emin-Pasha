"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { FilmChapter } from "@/containers/gallery/copy/film";
import { colorTokens, radiusTokens } from "@/theme/tokens";

export interface ReelChapterChipsProps {
  chapters: FilmChapter[];
  active: string | undefined;
  onSelect: (id: string) => void;
}

const { ink, gold } = colorTokens;

/**
 * The film's chapters as time-stamped toggles on the dark band. Colours are
 * the band's fixed ink/gold pair, not palette roles — the band does not follow
 * the colour scheme (see `sectionShellStyles` CONTRAST_BAND).
 */
export function ReelChapterChips({ chapters, active, onSelect }: ReelChapterChipsProps) {
  return (
    <Box
      role="group"
      aria-label="Film chapters"
      sx={{ display: "flex", gap: 1.5, overflowX: "auto", pb: 1, scrollbarWidth: "none" }}
    >
      {chapters.map((chapter) => {
        const selected = chapter.id === active;
        return (
          <Box
            key={chapter.id}
            component="button"
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(chapter.id)}
            sx={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "baseline",
              gap: 1.5,
              px: 3,
              py: 1.5,
              font: "inherit",
              cursor: "pointer",
              borderRadius: `${radiusTokens.pill}px`,
              border: "1px solid",
              borderColor: selected ? gold[500] : "rgba(251,250,247,0.24)",
              bgcolor: selected ? "rgba(212,188,94,0.14)" : "transparent",
              color: ink.contrastCopy,
              "&:hover": { borderColor: gold[300] },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: gold[300],
                outlineOffset: 2,
              },
            }}
          >
            <Text
              component="span"
              sx={{ fontFamily: "var(--font-cartographic)", fontSize: "0.75rem", color: gold[300] }}
            >
              {chapter.mark}
            </Text>
            <Text component="span" variant="body2" sx={{ color: "inherit" }}>
              {chapter.title}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
