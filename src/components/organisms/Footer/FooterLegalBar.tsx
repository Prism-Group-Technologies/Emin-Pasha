import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { CookieSettingsButton } from "@/components/organisms/Footer/CookieSettingsButton";
import { FOOTER_BAND_DIVIDER } from "@/components/organisms/Footer/constants";
import type { FooterData } from "@/components/organisms/Footer/footerData";
import { quietLinkSx } from "@/theme/linkStyles";

/**
 * Legal links, the cookie reopener and the copyright.
 *
 * The four legal routes land in a later step (PLAN.md §6, step 15) and until
 * then resolve to the branded 404 — listed rather than hidden so the
 * obligation stays visible in the UI instead of being forgotten
 * (TODO(EMIN-Q40): the pages need a lawyer's text, not this build's).
 *
 * The copyright pushes right from `md` up and wraps underneath below it,
 * where a single flex row of four links plus a year would otherwise break
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
        <CookieSettingsButton label={legal.cookieLabel} />
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ ml: { md: "auto" } }}>
        {legal.copyright}
      </Text>
    </Box>
  );
}
