"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { STORY_SECTIONS } from "@/containers/story/constants";
import { useActiveSection } from "@/containers/story/hooks/useActiveSection";

const ids = STORY_SECTIONS.map((section) => section.id);

/**
 * Sticky table of contents. Real in-page anchors, so it works with JS off and
 * every heading is independently linkable — which is what lets an answer
 * engine cite a specific passage rather than the whole page.
 *
 * `aria-current="location"` marks the section in view; the highlight is
 * decoration on top of a working list of links, never a replacement for one.
 */
export function StoryToc() {
  const active = useActiveSection(ids);

  return (
    <Box
      component="nav"
      aria-label="On this page"
      sx={{ position: { md: "sticky" }, top: { md: 120 }, alignSelf: "start" }}
    >
      <Text variant="overline" component="p" sx={{ color: "text.secondary", mb: 3 }}>
        On this page
      </Text>
      <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1 }}>
        {STORY_SECTIONS.map((section) => (
          <li key={section.id}>
            <Text
              component="a"
              href={`#${section.id}`}
              aria-current={active === section.id ? "location" : undefined}
              variant="body2"
              sx={{
                display: "block",
                py: 1,
                pl: section.nested ? 4 : 0,
                textDecoration: "none",
                borderLeft: "1px solid",
                borderColor: active === section.id ? "primary.main" : "transparent",
                color: active === section.id ? "text.primary" : "text.secondary",
                "&:hover": { color: "text.primary" },
              }}
            >
              {section.title}
            </Text>
          </li>
        ))}
      </Box>
    </Box>
  );
}
