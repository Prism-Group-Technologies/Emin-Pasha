import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";

export interface CollectionLinkRowProps {
  items: { slug: string; title: string }[];
}

/**
 * Plain links to every collection route. The explorer above only renders the
 * active collection's link, so without this row five of the six routes would
 * be unreachable to crawlers and to anyone who skips the switcher.
 */
export function CollectionLinkRow({ items }: CollectionLinkRowProps) {
  return (
    <Box
      component="nav"
      aria-label="Every collection"
      sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", columnGap: 3, rowGap: 1.5 }}
    >
      <Text variant="body2" color="text.secondary">
        Open a collection:
      </Text>
      {items.map((item) => (
        <Link key={item.slug} href={`/gallery/${item.slug}`} variant="body2" underline="hover">
          {item.title}
        </Link>
      ))}
    </Box>
  );
}
