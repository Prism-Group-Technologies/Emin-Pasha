import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { LegalBlockView } from "@/containers/legal/molecules/LegalBlockView";
import type { LegalSection } from "@/containers/legal/types";

export interface LegalSectionArticleProps {
  section: LegalSection;
  number: number;
  askHref: string;
  askLabel: string;
}

/**
 * One numbered section of a legal document, at its own `#id` (with a
 * header-clearing scroll margin) so the table of contents and any shared link
 * land on it. Each section ends with a quiet WhatsApp "ask about this" link —
 * a question at the moment of doubt is the likeliest conversation to start.
 */
export function LegalSectionArticle({
  section,
  number,
  askHref,
  askLabel,
}: LegalSectionArticleProps) {
  const headingId = `${section.id}-heading`;

  return (
    <Box
      component="section"
      id={section.id}
      aria-labelledby={headingId}
      sx={{
        scrollMarginTop: 150,
        display: "grid",
        gap: 4,
        pb: { xs: 6, md: 7 },
        borderBottom: "1px solid",
        borderColor: "divider",
        "&:last-of-type": { borderBottom: 0 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <Text
          aria-hidden
          component="span"
          sx={{
            fontFamily: "var(--font-cartographic)",
            color: "primary.main",
            fontSize: "0.8125rem",
            letterSpacing: "0.1em",
          }}
        >
          {String(number).padStart(2, "0")}
        </Text>
        <Text id={headingId} variant="h3" component="h3" sx={{ textWrap: "balance" }}>
          {section.title}
        </Text>
      </Box>
      {section.blocks.map((block, index) => (
        <LegalBlockView key={`${section.id}-${index}`} block={block} />
      ))}
      <Box>
        <Button
          href={askHref}
          variant="link"
          size="small"
          startIcon={<Icon name="whatsapp" />}
          aria-label={`${askLabel}: ${section.title}${NEW_TAB_NOTE}`}
        >
          {askLabel}
        </Button>
      </Box>
    </Box>
  );
}
