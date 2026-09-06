import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { PendingInfoNotice } from "@/components/molecules/PendingInfoNotice";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { OutletCard } from "@/containers/dining/molecules/OutletCard";
import { diningOutlets, diningPageIntro } from "@/content/dining";
import { alternatingDirection } from "@/theme/motion";

const TYPE_LABEL: Record<string, string> = {
  restaurant: "Restaurant",
  bar: "Bar",
  "in-room": "In-room",
};

/**
 * The Dining index. The approved §12.3 intro carries the two points the brief
 * calls out — the modern dumbwaiter, and the Asian/European/African
 * influences — so they are rendered as that copy rather than restated in
 * words of my own.
 */
export function DiningContainer() {
  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ DINING"
        heading="Restaurants & Bars"
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dining" }]} />
          <Text variant="subtitle1" sx={{ maxWidth: "70ch" }}>
            {diningPageIntro}
          </Text>
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: { xs: 6, md: 7 },
          }}
        >
          {diningOutlets.map((outlet) => (
            <OutletCard
              key={outlet.id}
              id={outlet.id}
              name={outlet.name}
              description={outlet.description}
              href={`/dining/${outlet.id}`}
              kicker={TYPE_LABEL[outlet.type]}
            />
          ))}
        </Box>
      </SectionShell>

      <SectionShell motion={alternatingDirection(2)} heading="Menus and hours" variant="raised">
        <PendingInfoNotice subject="Menus and opening hours" todoId="EMIN-Q12" />
      </SectionShell>

      <SectionShell motion={alternatingDirection(3)} heading="Also here">
        <RelatedLinks
          hrefs={["/accommodation", "/meetings-and-events", "/offers", "/lounges-and-spaces"]}
        />
      </SectionShell>
    </>
  );
}
