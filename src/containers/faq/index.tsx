import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { faqItems } from "@/content/faq";
import { alternatingDirection } from "@/theme/motion";

/**
 * The FAQ, rendered from the same `content/faq.ts` array in the same order as
 * the `FAQPage` markup — so the visible page and the structured data cannot
 * disagree.
 *
 * Deliberately **not** an accordion. Every answer is in the DOM, expanded, as
 * a self-contained paragraph under its own `<h2>` with a stable anchor: that
 * is what "extractable form" means in CLAUDE.md §9. A collapsed answer is
 * still crawlable, but one question plus one complete paragraph is the shape
 * an answer engine quotes cleanly, and each is independently linkable.
 */
export function FaqContainer() {
  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ FAQ"
        heading="Frequently asked questions"
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
          <Text variant="subtitle1" sx={{ maxWidth: "68ch" }}>
            The things people ask us most, answered plainly.
          </Text>
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)}>
        <Stack spacing={7} sx={{ maxWidth: "72ch" }}>
          {faqItems.map((item) => (
            <Box key={item.id} id={item.id} component="section" sx={{ scrollMarginTop: 120 }}>
              <Text variant="h3" component="h2" sx={{ mb: 3 }}>
                {item.question}
              </Text>
              <Text variant="body1" color="text.secondary">
                {item.answer}
              </Text>
            </Box>
          ))}
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(2)} heading="Still need us?" variant="raised">
        <RelatedLinks hrefs={["/contact", "/accommodation", "/spa-and-wellness"]} />
      </SectionShell>
    </>
  );
}
