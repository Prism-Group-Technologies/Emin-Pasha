"use client";

import { useState } from "react";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Tabs } from "@/components/molecules/Tabs";
import { OUTLET_ID, OUTLET_ORDER, type OutletId } from "@/containers/dining/anchors";
import { outletMenus } from "@/containers/dining/copy/menus";
import { MenuCourse } from "@/containers/dining/molecules/MenuCourse";

const SHORT_LABEL: Record<OutletId, string> = {
  [OUTLET_ID.hakkiPasha]: "Hakki Pasha",
  [OUTLET_ID.sirSamuelBaker]: "Sir Samuel Baker",
  [OUTLET_ID.rooftopTerrace]: "Rooftop",
  [OUTLET_ID.manutea]: "Manutea",
  [OUTLET_ID.inRoom]: "In-Room",
};

/**
 * 'use client' justification: the tab selection is controlled disclosure
 * state. The menu data is a static invented `copy/` object — no content layer
 * or Zod crosses the boundary.
 */
export function MenuTabs() {
  const [value, setValue] = useState<string>(OUTLET_ID.hakkiPasha);

  const items = OUTLET_ORDER.map((id) => {
    const menu = outletMenus[id];
    return {
      id,
      label: SHORT_LABEL[id],
      panel: (
        <Stack spacing={6} sx={{ pt: 5 }}>
          <Text
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "60ch", textWrap: "pretty" }}
          >
            {menu.summary}
          </Text>
          <Box sx={{ display: "grid", gap: 6 }}>
            {menu.courses.map((course) => (
              <MenuCourse key={course.name} course={course} />
            ))}
          </Box>
        </Stack>
      ),
    };
  });

  return (
    <Tabs items={items} value={value} onChange={setValue} aria-label="Sample menus by outlet" />
  );
}
