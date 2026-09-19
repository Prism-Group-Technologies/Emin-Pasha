import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { MENUS_ANCHOR_ID, type OutletId } from "@/containers/dining/anchors";
import { getOutletMenuView } from "@/containers/dining/menuView";
import { MenuBoard } from "@/containers/dining/molecules/MenuBoard";
import { SignatureDishStrip } from "@/containers/dining/molecules/SignatureDishStrip";
import type { Outlet } from "@/schemas/content/outlet";
import type { RevealDirection } from "@/theme/motion";

/**
 * One outlet's sample menu: a strip of two or three plated signature dishes,
 * then the full menu as a two-column board. Carries the same "sample,
 * seasonal" disclaimer as the index — the dishes and prices are invented
 * (TODO(EMIN-Q12)).
 */
export function OutletMenuSection({
  outlet,
  motion = "up",
}: {
  outlet: Outlet;
  motion?: RevealDirection;
}) {
  const menu = getOutletMenuView(outlet.id as OutletId);

  return (
    <SectionShell
      id={MENUS_ANCHOR_ID}
      motion={motion}
      eyebrow="§ WHAT'S COOKING"
      heading="A sample menu"
      description={menu.summary}
    >
      <Stack spacing={{ xs: 7, md: 9 }}>
        <SignatureDishStrip dishes={menu.signatureDishes} />

        <Box component="section">
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 3,
              pb: 3,
              mb: { xs: 5, md: 6 },
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Text
              variant="overline"
              component="h3"
              sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
            >
              § THE FULL MENU
            </Text>
            <Text variant="overline" component="p" color="text.secondary">
              Sample · seasonal
            </Text>
          </Box>

          <MenuBoard courses={menu.courses} />

          <Text
            variant="body2"
            color="text.secondary"
            sx={{ mt: { xs: 5, md: 6 }, fontStyle: "italic" }}
          >
            Sample menu — seasonal and subject to change. The current menu, with prices, is
            confirmed when you reserve.
          </Text>
        </Box>
      </Stack>
    </SectionShell>
  );
}
