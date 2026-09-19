"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { cookieSettingsCopy } from "@/containers/legal/copy/cookieSettings";
import { useCookieSettingsPanel } from "@/containers/legal/hooks/useCookieSettingsPanel";
import { ConsentCategoryCard } from "@/containers/legal/molecules/ConsentCategoryCard";
import { ConsentStatusCard } from "@/containers/legal/molecules/ConsentStatusCard";
import type { ConsentCategory, OptionalConsentCategory } from "@/types/consent";

const { panel, examples } = cookieSettingsCopy;

export interface ConsentCategoryCopy {
  id: ConsentCategory;
  title: string;
  description: string;
}

/**
 * The live consent controls. Structure only — every piece of state comes from
 * `useCookieSettingsPanel`. Until hydration it holds a fixed-height,
 * `aria-busy` placeholder: the saved choice exists only in this browser, so
 * rendering switches on the server would show the wrong state.
 */
export function CookieSettingsPanel({ categories }: { categories: ConsentCategoryCopy[] }) {
  const state = useCookieSettingsPanel();

  if (!state.ready) {
    return <Box aria-busy sx={{ minHeight: 560, borderRadius: 5, bgcolor: "action.hover" }} />;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 340px" },
        gap: { xs: 4, md: 6 },
        alignItems: "start",
      }}
    >
      <Box sx={{ display: "grid", gap: 3, order: { xs: 2, md: 1 } }}>
        {categories.map((category) => {
          const locked = category.id === "necessary";
          return (
            <ConsentCategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              locked={locked}
              checked={locked || state.choices[category.id as OptionalConsentCategory]}
              onChange={(checked) => state.toggle(category.id as OptionalConsentCategory, checked)}
              examples={examples[category.id]}
              includesLabel={panel.includes}
              alwaysOnLabel={panel.alwaysOn}
            />
          );
        })}
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 3, pt: 2 }}>
          <Button onClick={state.save} size="large" disabled={!state.dirty && state.decided}>
            {panel.save}
          </Button>
          <Text
            role="status"
            variant="body2"
            color={state.dirty ? "text.secondary" : "primary.main"}
            sx={{ fontWeight: 600 }}
          >
            {state.dirty ? panel.unsaved : state.status === "saved" ? panel.saved : ""}
          </Text>
        </Box>
      </Box>
      <Box sx={{ order: { xs: 1, md: 2 }, height: "100%" }}>
        <ConsentStatusCard
          decided={state.decided}
          savedAt={state.savedAt}
          activeCount={state.activeCount}
          onAcceptAll={state.acceptAll}
          onRejectAll={state.rejectAll}
        />
      </Box>
    </Box>
  );
}
