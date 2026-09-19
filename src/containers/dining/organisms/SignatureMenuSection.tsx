import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { MENUS_ANCHOR_ID } from "@/containers/dining/anchors";
import { sections } from "@/containers/dining/copy";
import { MenuTabs } from "@/containers/dining/organisms/MenuTabs";
import type { RevealDirection } from "@/theme/motion";

/**
 * A tabbed sample menu for each outlet. The tab state lives in the `MenuTabs`
 * client island; everything around it is server-rendered. The disclaimer is
 * not decoration — the menus, dishes and prices are invented placeholders
 * (TODO(EMIN-Q12)), and this line says so plainly.
 */
export function SignatureMenuSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={MENUS_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.menus.eyebrow}
      heading={sections.menus.heading}
      description={sections.menus.description}
      variant="raised"
    >
      <Stack spacing={4}>
        <MenuTabs />
        <Text variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
          Sample menu — seasonal and subject to change. The current menu, with prices, is confirmed
          when you reserve.
        </Text>
      </Stack>
    </SectionShell>
  );
}
