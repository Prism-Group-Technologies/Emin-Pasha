import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { StoryArticle } from "@/containers/story/organisms/StoryArticle";
import { StoryToc } from "@/containers/story/organisms/StoryToc";
import { story } from "@/content/story";
import { alternatingDirection } from "@/theme/motion";

/**
 * The pillar page. Every section is an `<h2>` with a stable `id` and
 * `scroll-margin`, so each answers one question on its own and can be cited
 * without the rest — which is what CLAUDE.md §9 means by "extractable form".
 *
 * All narrative is the approved §12.5 copy verbatim. No date, place or
 * historical claim is added: the one thing that would destroy this page's
 * value is a fact the hotel cannot stand behind.
 */
export function StoryContainer() {
  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ OUR NAMESAKE"
        heading="Who was Emin Pasha?"
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Story" }]} />
          <Text variant="subtitle1" sx={{ maxWidth: "68ch" }}>
            {story.lifeIntro}
          </Text>
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 240px) minmax(0, 1fr)" },
            gap: { xs: 6, md: 8 },
            alignItems: "start",
          }}
        >
          <StoryToc />

          <StoryArticle />
        </Box>
      </SectionShell>

      <SectionShell
        motion={alternatingDirection(2)}
        heading="Named from this story"
        variant="raised"
      >
        <RelatedLinks
          hrefs={[
            "/dining/hakki-pasha-restaurant-bar",
            "/dining/sir-samuel-baker-fine-dining",
            "/lounges-and-spaces",
            "/accommodation",
          ]}
        />
      </SectionShell>
    </>
  );
}
