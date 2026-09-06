"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./index";

/**
 * 'use client' justification: AppRouterCacheProvider streams Emotion's SSR
 * cache via `useServerInsertedHTML` (a client-only hook) — see
 * DECISIONS.md D11. Wraps every page; keep this the only client boundary
 * this high in the tree.
 */
export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
