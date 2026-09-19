import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { HashLink } from "@/containers/faq/molecules/HashLink";
import type { FaqEntry } from "@/containers/faq/types";
import { radiusTokens } from "@/theme/tokens";

export interface PopularQuestionListProps {
  heading: string;
  entries: FaqEntry[];
}

/**
 * The "Most asked" shortlist beside the explorer — numbered questions that
 * jump to, and open, their answers. A Server Component of plain anchors (see
 * `HashLink`), wrapped in a labelled `nav` because it is in-page navigation.
 */
export function PopularQuestionList({ heading, entries }: PopularQuestionListProps) {
  return (
    <Box
      component="nav"
      aria-label={heading}
      sx={{
        p: { xs: 4, md: 5 },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: "background.default",
      }}
    >
      <Text
        variant="overline"
        component="h3"
        sx={{
          fontFamily: "var(--font-cartographic)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 2,
        }}
      >
        <Icon name="auto-awesome" fontSize="small" aria-hidden sx={{ color: "primary.main" }} />
        {heading}
      </Text>
      <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0 }}>
        {entries.map((entry, index) => (
          <Box
            component="li"
            key={entry.id}
            sx={{ "& + &": { borderTop: "1px solid", borderColor: "divider" } }}
          >
            <HashLink
              targetId={entry.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "2rem minmax(0, 1fr)",
                alignItems: "baseline",
                gap: 2,
                py: 2.5,
                "&:hover .faq-popular-question": { textDecoration: "underline" },
              }}
            >
              <Text
                component="span"
                sx={{ fontFamily: "var(--font-display)", color: "text.secondary" }}
              >
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Text
                component="span"
                variant="body2"
                className="faq-popular-question"
                sx={{ fontWeight: 600 }}
              >
                {entry.question}
              </Text>
            </HashLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
