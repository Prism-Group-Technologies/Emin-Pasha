"use client";

import NextLink from "next/link";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Icon } from "@/components/atoms/Icon";
import type { HeaderPanel } from "@/components/organisms/Header/headerData";
import { easingTokens, motionTokens } from "@/theme/tokens";

export interface MegaMenuIntroProps {
  panel: HeaderPanel;
  onNavigate: () => void;
}

/**
 * The panel's left rail: eyebrow, one framing sentence, and the link to the
 * section's own index page.
 *
 * The eyebrow is a real `<h2>`, not styled text. That is the fix for the one
 * accessibility gap the old panel had: a screen-reader user met an
 * undifferentiated run of links with no way to tell which section they were
 * in or to skip past it. A heading gives the panel an internal landmark, so
 * heading navigation lands here and the links below are announced as
 * belonging to something named.
 */
export function MegaMenuIntro({ panel, onNavigate }: MegaMenuIntroProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
      <Typography
        component="h2"
        variant="overline"
        id={`megamenu-heading-${panel.href}`}
        sx={{ color: "primary.main", m: 0 }}
      >
        {panel.eyebrow}
      </Typography>

      {panel.intro && (
        <Typography
          sx={{
            fontFamily: "var(--font-display)",
            fontSize: { md: "1.375rem", lg: "1.5rem" },
            lineHeight: 1.25,
            color: "text.primary",
            textWrap: "balance",
          }}
        >
          {panel.intro}
        </Typography>
      )}

      <Box
        component={NextLink}
        href={panel.href}
        onClick={onNavigate}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: 1,
          mt: "auto",
          pt: 3,
          minHeight: 44,
          color: "text.primary",
          textDecoration: "none",
          fontSize: "0.8125rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderBottom: "1px solid",
          borderColor: "divider",
          transition: `border-color ${motionTokens.linkUnderline}ms ${easingTokens.emin}, color ${motionTokens.linkUnderline}ms ${easingTokens.emin}`,
          "&:hover, &:focus-visible": { color: "primary.main", borderColor: "primary.main" },
          "&:hover .MegaMenuIntro-arrow": { transform: "translateX(4px)" },
          "@media (prefers-reduced-motion: reduce)": {
            transition: "none",
            "&:hover .MegaMenuIntro-arrow": { transform: "none" },
          },
        }}
      >
        {panel.viewAllLabel}
        <Icon
          name="arrow-forward"
          className="MegaMenuIntro-arrow"
          sx={{
            fontSize: "0.9375rem",
            transition: `transform ${motionTokens.linkUnderline}ms ${easingTokens.emin}`,
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        />
      </Box>
    </Box>
  );
}
