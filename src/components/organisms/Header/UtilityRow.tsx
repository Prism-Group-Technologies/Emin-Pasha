"use client";

import Box from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";

import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import type { HeaderData } from "@/components/organisms/Header/headerData";

export interface UtilityRowProps {
  variant: "light" | "dark";
  data: HeaderData;
}

/**
 * Phone · WhatsApp · theme toggle · BOOK NOW. Phone and WhatsApp carry real
 * `tel:`/`wa.me` targets built from the approved NAP
 * (02_CONTENT_SOURCE_OF_TRUTH.md §1) — the fastest conversion paths this
 * property has. Below `md` they move to the sticky action bar rather than
 * hiding behind the drawer.
 */
export function UtilityRow({ variant, data }: UtilityRowProps) {
  const color = variant === "light" ? "common.white" : "text.primary";
  const { contact, bookCta, labels } = data;
  const iconSx = { width: 44, height: 44, color, display: { xs: "none", md: "inline-flex" } };

  return (
    <Box
      component="nav"
      aria-label={labels.utilityNavLabel}
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      <MuiIconButton
        href={contact.telephoneUrl}
        aria-label={`${contact.callLabel} ${contact.telephone}`}
        sx={iconSx}
      >
        <Icon name="phone" fontSize="small" />
      </MuiIconButton>
      <MuiIconButton
        href={contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${contact.whatsappLabel} ${contact.whatsappDisplay}`}
        sx={iconSx}
      >
        <Icon name="whatsapp" fontSize="small" />
      </MuiIconButton>
      <Box sx={{ color }}>
        <ThemeToggle color="inherit" />
      </Box>
      <Button href={bookCta.href} size="small" sx={{ ml: 2, whiteSpace: "nowrap" }}>
        {bookCta.label}
      </Button>
    </Box>
  );
}
