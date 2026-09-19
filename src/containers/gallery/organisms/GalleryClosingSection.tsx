import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { ChannelCard } from "@/components/molecules/ChannelCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { galleryChannels } from "@/containers/gallery/channels";
import { sections } from "@/containers/gallery/copy/sections";
import { GalleryWhatsAppCta } from "@/containers/gallery/molecules/GalleryWhatsAppCta";
import { whatsappGalleryUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

const { closing } = sections;

/** The last exit: the WhatsApp CTA and all three direct lines. Mirrors the spaces closing band. */
export function GalleryClosingSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell variant="raised" topRule motion={motion}>
      <Reveal direction={motion}>
        <Box sx={{ maxWidth: "64ch", mx: "auto", textAlign: "center" }}>
          <Text
            variant="overline"
            component="p"
            sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 4 }}
          >
            {closing.eyebrow}
          </Text>
          <Text variant="h2" component="h2" sx={{ mb: 4, textWrap: "balance" }}>
            {closing.heading}
          </Text>
          <Text variant="subtitle1" color="text.secondary" sx={{ mb: 3, textWrap: "pretty" }}>
            {closing.supporting}
          </Text>
          <Text variant="caption" component="p" color="text.secondary" sx={{ mb: 6 }}>
            {sections.indicative}
          </Text>
          <GalleryWhatsAppCta href={whatsappGalleryUrl} label={closing.ctaLabel} size="large" />
        </Box>
        <Box
          sx={{
            mt: { xs: 7, md: 8 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: 3,
          }}
        >
          {galleryChannels.map((channel) => (
            <ChannelCard key={channel.value} {...channel} />
          ))}
        </Box>
      </Reveal>
    </SectionShell>
  );
}
