import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { CheckList } from "@/containers/experiences/transfer/molecules/CheckList";
import { PriceTag } from "@/containers/experiences/transfer/molecules/PriceTag";
import { GalleryWhatsAppCta } from "@/containers/gallery/molecules/GalleryWhatsAppCta";
import type { GalleryCollectionView } from "@/containers/gallery/types";

export interface CollectionSummaryProps {
  collection: GalleryCollectionView;
  askLabel: string;
  /** Omitted on the detail route, which is already the full collection. */
  viewLabel?: string;
  headingLevel?: "h2" | "h3";
}

/**
 * The words beside a collection's photographs: mood, title, story, what is
 * included, who it suits, the indicative price, and the two next steps —
 * WhatsApp first, then the full collection route.
 */
export function CollectionSummary({
  collection,
  askLabel,
  viewLabel,
  headingLevel = "h3",
}: CollectionSummaryProps) {
  return (
    <Box sx={{ display: "grid", gap: 3, alignContent: "start" }}>
      <Text variant="overline" component="p" color="text.secondary">
        {collection.mood}
      </Text>
      <Text variant="h3" component={headingLevel} sx={{ textWrap: "balance" }}>
        {collection.title}
      </Text>
      <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {collection.story}
      </Text>
      <CheckList items={collection.highlights} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Icon name="groups" fontSize="small" sx={{ color: "text.secondary" }} />
        <Text variant="body2" color="text.secondary">
          {`Best for: ${collection.bestFor}`}
        </Text>
      </Box>
      <PriceTag amountUsd={collection.priceUsd} unit={collection.priceUnit} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, pt: 1 }}>
        <GalleryWhatsAppCta
          href={collection.whatsappHref}
          label={askLabel}
          context={collection.title}
        />
        {viewLabel && (
          <Button
            href={`/gallery/${collection.slug}`}
            variant="ghost"
            endIcon={<Icon name="arrow-forward" />}
            aria-label={`${viewLabel}: ${collection.title}`}
          >
            {viewLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}
