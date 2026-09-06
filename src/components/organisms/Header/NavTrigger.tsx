"use client";

import NextLink from "next/link";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Icon } from "@/components/atoms/Icon";
import type { NavItem } from "@/schemas/content/navItem";
import { easingTokens, motionTokens } from "@/theme/tokens";

export interface NavTriggerProps {
  item: NavItem;
  variant: "light" | "dark";
  submenuHint: string;
  active: boolean;
  hasPanel: boolean;
  open: boolean;
  onScheduleOpen: () => void;
  onToggle: () => void;
  onScheduleClose: () => void;
  onClose: () => void;
}

/**
 * One top-level nav entry. The section link itself is always a real `<a>` —
 * an entry with a panel is still navigable to its own index page, so the
 * panel is opened by a separate adjacent button rather than by hijacking the
 * link. That keeps one tab stop per action and means the mega-menu is never a
 * hover-only affordance (CLAUDE.md §7/§10).
 *
 * The panel itself no longer lives here; `MegaMenuLayer` renders all panels as
 * siblings so they can span the bar and still align to the site container.
 * This component is left owning exactly one thing: the trigger.
 */
export function NavTrigger(props: NavTriggerProps) {
  const { item, variant, active, hasPanel, open, submenuHint } = props;
  const color = variant === "light" ? "common.white" : "text.primary";
  // The underline reads as the section's state: solid for the current route,
  // and also shown while its panel is open so the bar says which panel this is.
  const underlined = active || open;

  return (
    <Box
      onPointerEnter={hasPanel ? props.onScheduleOpen : undefined}
      onPointerLeave={hasPanel ? props.onScheduleClose : undefined}
      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
    >
      <Typography
        component={NextLink}
        href={item.href}
        variant="overline"
        aria-current={active ? "page" : undefined}
        onClick={props.onClose}
        sx={{
          color,
          textDecoration: "none",
          whiteSpace: "nowrap",
          position: "relative",
          display: "flex",
          alignItems: "center",
          minHeight: 44,
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: 10,
            height: "1px",
            width: underlined ? "100%" : 0,
            bgcolor: "primary.main",
            transition: `width ${motionTokens.linkUnderline}ms ${easingTokens.emin}`,
          },
          "&:hover::after, &:focus-visible::after": { width: "100%" },
          "@media (prefers-reduced-motion: reduce)": { "&::after": { transition: "none" } },
        }}
      >
        {item.label}
      </Typography>
      {hasPanel && (
        <Box
          component="button"
          type="button"
          data-menu-trigger={item.href}
          aria-expanded={open}
          aria-controls={`megamenu-${item.href}`}
          // The label stays constant; `aria-expanded` carries the state, so
          // a screen reader announces the change rather than re-reading a
          // different name for the same control.
          aria-label={`${item.label} — ${submenuHint}`}
          onClick={props.onToggle}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // Kept at the 44px minimum target the rest of the header uses
            // (CLAUDE.md §10), even though this control is desktop-only.
            width: 44,
            height: 44,
            p: 0,
            border: 0,
            background: "none",
            color: open ? "primary.main" : color,
            cursor: "pointer",
            transform: open ? "rotate(180deg)" : "none",
            transition: `transform ${motionTokens.navFade}ms ${easingTokens.emin}, color ${motionTokens.buttonHover}ms ${easingTokens.emin}`,
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: 2,
            },
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        >
          <Icon name="keyboard-arrow-down" fontSize="small" />
        </Box>
      )}
    </Box>
  );
}
