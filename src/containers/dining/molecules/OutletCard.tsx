import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { OUTLET_ASSET_IDS } from "@/containers/dining/constants";
import { assets } from "@/content/assets";

export interface OutletCardProps {
  id: string;
  name: string;
  description: string;
  href: string;
  /** "restaurant" / "bar" / "in-room" — the source's own classification. */
  kicker?: string;
}

/** One outlet or space. Description is the approved §5 copy, unedited. */
export function OutletCard({ id, name, description, href, kicker }: OutletCardProps) {
  const asset = assets.find((item) => item.id === OUTLET_ASSET_IDS[id]);

  return (
    <Box
      component="article"
      sx={{ display: "grid", gap: 4, borderTop: "1px solid", borderColor: "primary.main", pt: 4 }}
    >
      {asset && <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 45vw" />}
      <Stack spacing={2}>
        {kicker && (
          <Text variant="overline" component="p" color="text.secondary">
            {kicker}
          </Text>
        )}
        <Text variant="h3" component="h2">
          <Link href={href} underline="hover" color="textPrimary">
            {name}
          </Link>
        </Text>
        <Text variant="body1" color="text.secondary">
          {description}
        </Text>
      </Stack>
    </Box>
  );
}
