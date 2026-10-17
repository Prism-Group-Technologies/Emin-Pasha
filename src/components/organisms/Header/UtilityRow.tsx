"use client";

import Box from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";

import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { NAV_METRICS, atNav } from "@/components/organisms/Header/constants";
import type { HeaderData } from "@/components/organisms/Header/headerData";

export interface UtilityRowProps {
  variant: "light" | "dark";
  data: HeaderData;
}

/**
 * Phone · WhatsApp · theme toggle · BOOK NOW. Phone and WhatsApp carry real
 * `tel:`/`wa.me` targets built from the approved NAP
 * (02_CONTENT_SOURCE_OF_TRUTH.md §1) — the fastest conversion paths this
 * property has. Below `NAV_BREAKPOINT` they move to the sticky action bar
 * rather than hiding behind the drawer.
 *
 * **WhatsApp waits for `xl`.** Between `lg` and `xl` the bar is at its
 * tightest, and in exactly that band `FloatingActionDock` is already
 * painting a WhatsApp control in the bottom-left corner — so the 52px this
 * icon costs there buys a second route to a destination the page is already
 * offering. Phone has no such twin above `lg`, so it stays. Neither action
 * is ever unreachable: both are in the footer, on /contact, and in the
 * sticky bar below `NAV_BREAKPOINT`.
 */
export function UtilityRow({ variant, data }: UtilityRowProps) {
  const color = variant === "light" ? "common.white" : "text.primary";
  const { contact, bookCta, labels } = data;
  const iconSx = { width: 44, height: 44, color, flexShrink: 0 };
  const phoneSx = { ...iconSx, display: atNav("none", "inline-flex") };
  const whatsappSx = { ...iconSx, display: { xs: "none", xl: "inline-flex" } };

  return (
    <Box
      component="nav"
      aria-label={labels.utilityNavLabel}
      sx={{ display: "flex", alignItems: "center", gap: NAV_METRICS.utilityGap, flexShrink: 0 }}
    >
      <MuiIconButton
        href={contact.telephoneUrl}
        aria-label={`${contact.callLabel} ${contact.telephone}`}
        sx={phoneSx}
      >
        <Icon name="phone" fontSize="small" />
      </MuiIconButton>
      <MuiIconButton
        href={contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${contact.whatsappLabel} ${contact.whatsappDisplay}`}
        sx={whatsappSx}
      >
        <Icon name="whatsapp" fontSize="small" />
      </MuiIconButton>
      <Box sx={{ color, flexShrink: 0 }}>
        <ThemeToggle color="inherit" />
      </Box>
      <Button
        href={bookCta.href}
        size="small"
        sx={{ ml: NAV_METRICS.ctaOffset, whiteSpace: "nowrap", flexShrink: 0 }}
      >
        {bookCta.label}
      </Button>
    </Box>
  );
}
