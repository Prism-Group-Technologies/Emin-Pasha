import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { navPanelCopy } from "@/content/nav-copy";
import { findNavItem } from "@/content/navigation";
import type { RevealDirection } from "@/theme/motion";

/**
 * The three Our Story chapter pages as a card band — the pillar page and each
 * chapter page point at the other two, so the section is one linked cluster
 * rather than three orphans (`yarn check:seo` §4). Labels and one-line
 * descriptions both resolve from `content/navigation.ts` and
 * `content/nav-copy.ts` by href, so a chapter renamed anywhere is renamed
 * here too (CLAUDE.md §5.4). Nothing is written in this file.
 */
const CHAPTER_HREFS = [
  "/our-story/emin-pasha",
  "/our-story/the-hotel",
  "/our-story/message-from-the-general-manager",
] as const;

const chapterBlurbs = navPanelCopy["/our-story"]?.descriptions ?? {};

export function StoryChaptersSection({
  eyebrow,
  heading,
  exclude,
  motion = "up",
}: {
  eyebrow: string;
  heading: string;
  /** A chapter page passes its own href so it does not link to itself. */
  exclude?: string;
  motion?: RevealDirection;
}) {
  const hrefs = CHAPTER_HREFS.filter((href) => href !== exclude);

  return (
    <SectionShell variant="raised" eyebrow={eyebrow} heading={heading} motion={motion}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: hrefs.length > 1 ? "repeat(2, minmax(0, 1fr))" : "1fr",
            md: `repeat(${hrefs.length}, minmax(0, 1fr))`,
          },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {hrefs.map((href, index) => {
          const item = findNavItem(href);
          if (!item) {
            return null;
          }
          return (
            <Reveal key={href} index={index} fill>
              <Link href={href} underline="none" sx={{ ...cardSurface(), color: "text.primary" }}>
                <Text
                  variant="h5"
                  component="h3"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  {item.label}
                  <Icon
                    name="arrow-forward"
                    fontSize="small"
                    aria-hidden
                    sx={{ color: "primary.main" }}
                  />
                </Text>
                <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
                  {chapterBlurbs[href]}
                </Text>
              </Link>
            </Reveal>
          );
        })}
      </Box>
    </SectionShell>
  );
}
