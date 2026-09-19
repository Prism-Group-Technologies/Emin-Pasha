import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { FOOTER_BAND_DIVIDER } from "@/components/organisms/Footer/constants";
import type { FooterData } from "@/components/organisms/Footer/footerData";
import { quietLinkSx } from "@/theme/linkStyles";

/**
 * Legal links and the copyright.
 *
 * All five links — Privacy, Cookie policy, Terms, Accessibility and Cookie
 * settings — are real routes (`containers/legal`). "Cookie settings" used to
 * be a `<button>` that opened the consent dialog; it is now a link to the
 * full `/cookie-settings` page, which drives the same consent store, so the
 * whole bar is server-rendered with no client island. The consent banner's
 * "Manage preferences" still opens the quick dialog.
 *
 * The copyright pushes right from `md` up and wraps underneath below it,
 * where a single flex row of links plus a year would otherwise break
 * mid-item. The year is computed per render in `footerData`, not at module
 * load — see the note there.
 */
export function FooterLegalBar({ legal }: { legal: FooterData["legal"] }) {
  return (
    <Box
      sx={[
        FOOTER_BAND_DIVIDER,
        { display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 5, rowGap: 1 },
      ]}
    >
      <Box
        component="nav"
        aria-label={legal.navLabel}
        sx={{ display: "flex", flexWrap: "wrap", columnGap: 5, rowGap: 0 }}
      >
        {legal.links.map((link) => (
          <Link key={link.href} href={link.href} variant="body2" sx={quietLinkSx}>
            {link.label}
          </Link>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ ml: { md: "auto" } }}>
        {legal.copyright}
      </Text>
    </Box>
  );
}
