import { Box } from "@/components/atoms/Box";
import { BrandMark } from "@/components/atoms/BrandMark";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { ctas } from "@/content/ctas";
import { identity } from "@/content/identity";
import { story } from "@/content/story";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const readHistory = ctas.find((cta) => cta.id === "story-read");

/**
 * The namesake teaser.
 *
 * "Who was Emin Pasha" is a real search with weak commercial competition, so
 * the pillar page it links to is this site's intended link magnet — this block
 * exists to send people there, not to summarise it. `story.lifeIntro` runs as
 * a pull quote in the display face rather than as body copy, because the
 * sentence is the hook and burying it in a paragraph wastes it.
 *
 * The lock-up leads the grid here, so it takes the section's own direction and
 * the copy comes back against it — the mirror of `IntroBlock`, where the copy
 * leads.
 */
export function StorySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell topRule motion={motion}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.8fr) minmax(0, 1.2fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "center",
        }}
      >
        <Reveal direction={motion} media>
          {/* The brand lock-up, not the photograph the assignment table
              would resolve for `story-emin-pasha-portrait`. No portrait of
              the namesake is confirmed as delivered or cleared for use
              (TODO(EMIN-Q44), assets.ts), and the line-art lock-up *is* a
              portrait of him — so this is the one honest image for the slot
              until the client supplies one.

              Rendered through `BrandMark` rather than `AssetImage` on
              purpose. `AssetImage` is built for photographs: it crops with
              `objectFit: cover` and paints `action.hover` behind the frame,
              which on artwork with a transparent ground would both clip the
              lock-up and put a grey plate behind it. `BrandMark` reserves the
              artwork's own ratio and contains it, so CLS stays at 0 here too.

              Capped and centred instead of filling the column: at 2.56:1 a
              full-width lock-up would read as a stretched band across the
              track on wide viewports, which is the opposite of what a
              lock-up is for. */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <BrandMark
              width={{ xs: 260, md: 340 }}
              sizes="(max-width: 899px) 260px, 340px"
              alt={identity.name}
            />
          </Box>
        </Reveal>
        <Reveal index={1} direction={oppositeOf(motion)}>
          <Stack spacing={5}>
            <Text
              variant="overline"
              component="p"
              sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
            >
              § OUR NAMESAKE
            </Text>
            {/* The heading is the namesake's own name — the approved form.
                There is no approved teaser headline, and slicing a sentence
                out of the approved story copy to manufacture one would be
                editing approved text. */}
            <Text variant="h2" component="h2">
              {identity.shortName}
            </Text>
            <Text
              variant="h3"
              component="p"
              sx={{
                pl: 5,
                borderLeft: "2px solid",
                borderColor: "primary.main",
                fontFamily: "var(--font-display)",
                textWrap: "pretty",
              }}
            >
              {story.lifeIntro}
            </Text>
            <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {story.whyWeCarryThisName}
            </Text>
            {readHistory?.href && (
              <Button href={readHistory.href} variant="ghost" sx={{ alignSelf: "flex-start" }}>
                {readHistory.label}
              </Button>
            )}
          </Stack>
        </Reveal>
      </Box>
    </SectionShell>
  );
}
