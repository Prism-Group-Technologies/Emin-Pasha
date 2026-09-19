"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { CollectionSlug } from "@/containers/gallery/anchors";
import { colorTokens, radiusTokens } from "@/theme/tokens";

export interface CollectionTabsProps {
  items: { slug: CollectionSlug; title: string; mood: string }[];
  active: CollectionSlug | undefined;
  onSelect: (slug: CollectionSlug) => void;
  label: string;
  panelId: string;
}

/**
 * The six moods as numbered toggle cards: a 3×2 grid on desktop, a sideways
 * scroll of cards on a phone. `aria-pressed` + `aria-controls` rather than a
 * full tablist, matching the filter chips elsewhere on the site.
 */
export function CollectionTabs({ items, active, onSelect, label, panelId }: CollectionTabsProps) {
  return (
    <Box
      role="group"
      aria-label={label}
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: { md: "repeat(3, minmax(0, 1fr))", lg: "repeat(6, minmax(0, 1fr))" },
        gap: 2,
        overflowX: { xs: "auto", md: "visible" },
        mx: { xs: -2, sm: 0 },
        px: { xs: 2, sm: 0 },
        pb: { xs: 1, md: 0 },
        scrollSnapType: { xs: "x mandatory", md: "none" },
        scrollbarWidth: "none",
      }}
    >
      {items.map((item, index) => {
        const selected = item.slug === active;
        return (
          <Box
            key={item.slug}
            component="button"
            type="button"
            aria-pressed={selected}
            aria-controls={panelId}
            onClick={() => onSelect(item.slug)}
            sx={{
              flex: { xs: "0 0 72%", sm: "0 0 42%", md: "initial" },
              scrollSnapAlign: "start",
              display: "grid",
              alignContent: "start",
              gap: 1,
              p: 3,
              textAlign: "start",
              cursor: "pointer",
              font: "inherit",
              color: "text.primary",
              bgcolor: selected ? "background.paper" : "transparent",
              border: "1px solid",
              borderColor: selected ? "primary.main" : "divider",
              borderRadius: `${radiusTokens.md}px`,
              boxShadow: selected ? `inset 0 3px 0 ${colorTokens.gold[500]}` : "none",
              transition: "border-color 160ms ease, background-color 160ms ease",
              "&:hover": { borderColor: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: 2,
              },
            }}
          >
            <Text
              component="span"
              sx={{
                fontFamily: "var(--font-cartographic)",
                fontSize: "0.75rem",
                color: "text.secondary",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </Text>
            <Text component="span" variant="subtitle2" sx={{ fontWeight: 600 }}>
              {item.title}
            </Text>
            <Text
              component="span"
              variant="caption"
              color="text.secondary"
              sx={{ textWrap: "pretty" }}
            >
              {item.mood}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
