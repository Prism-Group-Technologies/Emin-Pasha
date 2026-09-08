import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import {
  type AmenityCopy,
  amenitiesSection,
  estateAmenities,
  inRoomAmenities,
} from "@/containers/accommodation/copy";
import { AmenityItem } from "@/containers/accommodation/molecules/AmenityItem";
import type { RevealDirection } from "@/theme/motion";

const gridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(3, minmax(0, 1fr))",
  },
  gap: { xs: 5, md: 6 },
} as const;

function AmenityGroup({
  title,
  items,
  tone,
}: {
  title: string;
  items: AmenityCopy[];
  tone: "gold" | "garden";
}) {
  return (
    <Box>
      <Text variant="overline" component="h3" sx={{ mb: 5, color: "text.secondary" }}>
        {title}
      </Text>
      <Box component="ul" sx={{ ...gridSx, m: 0, p: 0 }}>
        {items.map((item, index) => (
          <Reveal key={item.title} index={index} fill>
            <AmenityItem
              icon={item.icon}
              title={item.title}
              description={item.description}
              tone={tone}
            />
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}

/**
 * What every room includes, then the wider estate — the two lists a comparing
 * visitor uses to decide the property is the right tier before they open a
 * booking flow. Every line is traceable to `content/rooms.ts`, `content/site.ts`
 * or `content/faq.ts`; see `copy/amenities.ts`.
 */
export function AmenitiesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={amenitiesSection.eyebrow}
      heading={amenitiesSection.heading}
      description={amenitiesSection.description}
    >
      <Box sx={{ display: "grid", gap: { xs: 8, md: 9 } }}>
        <AmenityGroup title={amenitiesSection.inRoomTitle} items={inRoomAmenities} tone="gold" />
        <AmenityGroup title={amenitiesSection.estateTitle} items={estateAmenities} tone="garden" />
      </Box>
    </SectionShell>
  );
}
