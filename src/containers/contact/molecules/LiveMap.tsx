"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { useInView } from "@/containers/contact/hooks/useInView";
import { radiusTokens } from "@/theme/tokens";

export interface LiveMapProps {
  embedUrl: string;
  /** Link-out to the full Google Maps listing. */
  openUrl: string;
  title: string;
  openLabel: string;
  loadingLabel: string;
}

/**
 * The interactive Google map — pan, zoom, Street View — mounted automatically
 * as it nears the viewport (`useInView`), so the third-party iframe stays off
 * the critical path without asking the visitor to click. A skeleton holds the
 * exact box until then, so CLS stays at 0 through the swap.
 *
 * Google's keyless embed cannot be restyled, so dark mode inverts it and
 * rotates the hue back: roads read light on dark, water stays blue, and the
 * page no longer has a white slab in the middle of it.
 *
 * TODO(EMIN-Q20): centred on the approved NAP string, not a coordinate pin.
 */
export function LiveMap({ embedUrl, openUrl, title, openLabel, loadingLabel }: LiveMapProps) {
  const [ref, inView] = useInView<HTMLDivElement>("300px");

  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: { xs: 360, md: 520 },
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: "action.hover",
        "& iframe": theme.applyStyles("dark", {
          filter: "invert(0.9) hue-rotate(180deg) saturate(0.75) brightness(0.95)",
        }),
      })}
    >
      {/* Always painted underneath: the iframe is transparent until Google's
          tiles arrive, so on a slow connection this is what shows through. */}
      <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <Text variant="body2" color="text.secondary" sx={{ display: "flex", gap: 1 }}>
          <Icon name="location" fontSize="small" aria-hidden />
          {loadingLabel}
        </Text>
      </Box>
      {inView && (
        <Box
          component="iframe"
          src={embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      )}

      <Button
        href={openUrl}
        size="small"
        variant="secondary"
        startIcon={<Icon name="directions" />}
        aria-label={`${openLabel}${NEW_TAB_NOTE}`}
        sx={{ position: "absolute", top: 16, right: 16, boxShadow: 3 }}
      >
        {openLabel}
      </Button>
    </Box>
  );
}
