import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { HeroShell } from "@/components/molecules/HeroShell";
import { placeholderImageSrc } from "@/config/assets";
import { BOOKING_ANCHOR_ID } from "@/containers/accommodation/constants";
import { RateBadge } from "@/containers/accommodation/molecules/RateBadge";
import type { RoomCategory } from "@/schemas/content/roomCategory";

/**
 * The room page's above-the-fold block. Composes the shared `HeroShell`
 * (priority image = LCP, gradient scrim, bottom-aligned overlay). Shows only
 * verified fields — the name, the `from` rate and the capacity — with a
 * single CTA down to the sticky booking widget.
 */
export function RoomDetailHero({ room }: { room: RoomCategory }) {
  return (
    <HeroShell imageSrc={placeholderImageSrc} label={room.name} minHeight={{ xs: 520, md: 600 }}>
      <Box sx={{ "& a": { color: "common.white" }, "& p": { color: "rgba(251,250,247,0.72)" } }}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Accommodation", href: "/accommodation" },
            { label: room.name },
          ]}
        />
      </Box>

      <Box sx={{ display: "grid", gap: 3, maxWidth: "40ch" }}>
        <Text
          variant="overline"
          component="p"
          sx={{ fontFamily: "var(--font-cartographic)", letterSpacing: "0.16em", opacity: 0.9 }}
        >
          {`§ ${room.name.toUpperCase()}`}
        </Text>
        <Text
          component="h1"
          sx={{
            fontFamily: "var(--font-display)",
            fontSize: { xs: "2.5rem", md: "3.75rem" },
            lineHeight: 1.03,
            letterSpacing: "-0.015em",
            textWrap: "balance",
          }}
        >
          {room.name}
        </Text>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: 3,
            "& p": { color: "common.white" },
            "& span": { color: "rgba(251,250,247,0.8)" },
          }}
        >
          <RateBadge rateUgx={room.rateUgx} />
          <Text variant="body2" sx={{ opacity: 0.85 }}>
            {`Sleeps ${room.capacity}`}
          </Text>
        </Box>
      </Box>

      <Button href={`#${BOOKING_ANCHOR_ID}`} size="large" sx={{ alignSelf: "flex-start" }}>
        Check dates
      </Button>
    </HeroShell>
  );
}
