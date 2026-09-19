import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { PriceTag } from "@/containers/experiences/transfer/molecules/PriceTag";
import { GalleryWhatsAppCta } from "@/containers/gallery/molecules/GalleryWhatsAppCta";
import type { GalleryItem } from "@/containers/gallery/types";

export interface LightboxCaptionProps {
  item: GalleryItem;
  position: number;
  count: number;
}

/**
 * Turns a photograph into an offer: where it is, what it can be booked as,
 * the indicative starting price and a WhatsApp message that already names
 * the view. The counter is `aria-live` so arrow-key and swipe navigation are
 * announced.
 */
export function LightboxCaption({ item, position, count }: LightboxCaptionProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        gap: { xs: 3, md: 5 },
      }}
    >
      <Box sx={{ display: "grid", gap: 1, minWidth: 0 }}>
        <Text variant="overline" component="p" color="text.secondary" aria-live="polite">
          {`${item.categoryLabel} · ${position} of ${count}`}
        </Text>
        <Text variant="body2" color="text.secondary">
          {`Book it as: ${item.offer.label}`}
        </Text>
        <PriceTag amountUsd={item.offer.priceUsd} unit={item.offer.unit} />
      </Box>
      <GalleryWhatsAppCta
        href={item.whatsappHref}
        label="Ask about this view"
        context={item.title}
        sx={{ flexShrink: 0, alignSelf: { xs: "stretch", md: "center" } }}
      />
    </Box>
  );
}
