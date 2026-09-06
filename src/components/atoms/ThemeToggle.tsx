"use client";

import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import IconButton from "@mui/material/IconButton";

import { useColorSchemeToggle } from "@/hooks/useColorSchemeToggle";

/**
 * Keyboard-operable via native IconButton (button element, Enter/Space
 * activate it, visible focus ring from theme). 44×44px touch target per
 * CLAUDE.md §7. Renders a disabled placeholder until mounted so the server
 * and first client render match exactly — see useColorSchemeToggle.
 */
export interface ThemeToggleProps {
  /** `inherit` lets the header tint it white while floating over the hero. */
  color?: "default" | "inherit";
}

export function ThemeToggle({ color = "default" }: ThemeToggleProps) {
  const { mode, mounted, toggle } = useColorSchemeToggle();

  if (!mounted) {
    return (
      <IconButton
        disabled
        color={color}
        aria-label="Toggle colour theme"
        sx={{ width: 44, height: 44 }}
      />
    );
  }

  const isDark = mode === "dark";

  return (
    <IconButton
      onClick={toggle}
      color={color}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      sx={{ width: 44, height: 44 }}
    >
      {isDark ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
}
