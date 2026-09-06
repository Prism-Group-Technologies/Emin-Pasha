import Container from "@mui/material/Container";

import { Box } from "@/components/atoms/Box";
import { VisuallyHidden } from "@/components/atoms/VisuallyHidden";
import { FooterBrandRail } from "@/components/organisms/Footer/FooterBrandRail";
import { FooterLegalBar } from "@/components/organisms/Footer/FooterLegalBar";
import { FooterLinkGrid } from "@/components/organisms/Footer/FooterLinkGrid";
import { NapBlock } from "@/components/organisms/Footer/NapBlock";
import { NewsletterBlock } from "@/components/organisms/Footer/NewsletterBlock";
import { FOOTER_BAND } from "@/components/organisms/Footer/constants";
import { getFooterData } from "@/components/organisms/Footer/footerData";

/**
 * One band of four tracks — identity, links, location, newsletter — over a
 * single hairline and the legal line.
 *
 * A Server Component, and the only place the footer's content is read:
 * `getFooterData()` is called here at render and handed down as plain data,
 * the same discipline `PageShell` applies to `headerData`. Nothing below
 * reaches into `content/*` itself, which is what keeps Zod out of the client
 * bundle (DECISIONS.md D25) and what makes every block testable with a
 * literal. Only the newsletter's hydration decision and the cookie reopener
 * cross a client boundary.
 *
 * The `<h2>`s inside each block are the footer's own heading level; the
 * landmark itself takes a visually hidden `<h2>` so heading order stays
 * ordered (CLAUDE.md §9) on pages whose last section heading is also an h2.
 */
export function Footer() {
  const data = getFooterData();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 7 } }}>
        <VisuallyHidden>
          <h2>Site footer</h2>
        </VisuallyHidden>
        <Box sx={FOOTER_BAND}>
          <FooterBrandRail data={data} />
          <FooterLinkGrid columns={data.linkColumns} />
          <NapBlock nap={data.nap} name={data.brand.name} />
          <NewsletterBlock copy={data.newsletter} />
        </Box>
        <FooterLegalBar legal={data.legal} />
      </Container>
    </Box>
  );
}
