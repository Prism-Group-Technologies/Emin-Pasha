import type { SxProps, Theme } from "@mui/material/styles";

import { Box } from "@/components/atoms/Box";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Text } from "@/components/atoms/Text";
import { NewsletterFormMount } from "@/components/organisms/Footer/NewsletterFormMount";
import type { FooterData } from "@/components/organisms/Footer/footerData";

/**
 * A Server Component: the heading and the description are static copy and
 * have no reason to cross a client boundary. Only the form's hydration
 * decision does, and that is `NewsletterFormMount`'s single job.
 */
export function NewsletterBlock({
  copy,
  sx,
}: {
  copy: FooterData["newsletter"];
  /** Lets the footer place it as a grid track without an extra wrapper. */
  sx?: SxProps<Theme>;
}) {
  return (
    <Box sx={[{ display: "grid", gap: 3 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Box>
        <SectionLabel sx={{ mb: 2 }}>{copy.title}</SectionLabel>
        <Text variant="body2" color="text.secondary" sx={{ maxWidth: "38ch" }}>
          {copy.description}
        </Text>
      </Box>
      <NewsletterFormMount copy={copy} />
    </Box>
  );
}
