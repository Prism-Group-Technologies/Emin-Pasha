import { Box } from "@/components/atoms/Box";
import { FooterBrand } from "@/components/organisms/Footer/FooterBrand";
import { SocialLinks } from "@/components/organisms/Footer/SocialLinks";
import type { FooterData } from "@/components/organisms/Footer/footerData";

/**
 * The identity track: who this is, one line of voice, and where to follow
 * the estate.
 *
 * The newsletter used to live here too, which is what made this column
 * roughly three times the height of the link grid beside it. It is now a
 * sibling track in `FOOTER_TOP_BAND`, leaving the rail at about the same
 * height as its two neighbours.
 */
export function FooterBrandRail({ data }: { data: FooterData }) {
  return (
    <Box sx={{ display: "grid", gap: 6, alignContent: "start" }}>
      <FooterBrand brand={data.brand} />
      <SocialLinks social={data.social} />
    </Box>
  );
}
