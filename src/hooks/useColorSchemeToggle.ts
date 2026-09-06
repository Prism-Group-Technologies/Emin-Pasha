"use client";

import { useMounted } from "@/hooks/useMounted";
import { useColorScheme } from "@/theme/useColorScheme";

export function useColorSchemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const mounted = useMounted();

  const resolvedMode = mounted ? (mode === "system" ? systemMode : mode) : undefined;

  function toggle() {
    setMode(resolvedMode === "dark" ? "light" : "dark");
  }

  return { mode: resolvedMode, mounted, toggle };
}
