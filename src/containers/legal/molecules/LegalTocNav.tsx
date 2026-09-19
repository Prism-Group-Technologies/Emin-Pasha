"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { type TocItem, useLegalToc } from "@/containers/legal/hooks/useLegalToc";
import { useReadingProgress } from "@/containers/legal/hooks/useReadingProgress";

export interface LegalTocNavProps {
  items: TocItem[];
  label: string;
  progressLabel: string;
  /** The document element whose reading progress the bar tracks. */
  documentId: string;
}

/**
 * Table of contents with a reading-progress bar. Real in-page anchors, so it
 * works with JavaScript off; `aria-current="location"` marks the section in
 * view, and the bar is a `progressbar` with a numeric value.
 */
export function LegalTocNav({ items, label, progressLabel, documentId }: LegalTocNavProps) {
  const active = useLegalToc(items);
  const percent = Math.round(useReadingProgress(documentId) * 100);

  return (
    <Box component="nav" aria-label={label} sx={{ display: "grid", gap: 3 }}>
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
      >
        {label}
      </Text>
      <Box
        role="progressbar"
        aria-label={progressLabel}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        sx={{ height: 3, borderRadius: 999, bgcolor: "divider", overflow: "hidden" }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${percent}%`,
            bgcolor: "primary.main",
            transition: "width 120ms linear",
          }}
        />
      </Box>
      <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, display: "grid" }}>
        {items.map((item, index) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <Text
                component="a"
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                variant="body2"
                sx={{
                  display: "flex",
                  gap: 2,
                  py: 1.5,
                  pl: 3,
                  textDecoration: "none",
                  borderLeft: "2px solid",
                  borderColor: current ? "primary.main" : "divider",
                  color: current ? "text.primary" : "text.secondary",
                  fontWeight: current ? 600 : 400,
                  "&:hover": { color: "text.primary" },
                }}
              >
                <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </Text>
            </li>
          );
        })}
      </Box>
    </Box>
  );
}
