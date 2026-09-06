import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

/**
 * Vitest + Testing Library — the stack PLAN.md §3 recommended. Q29 was never
 * signed off, so this is logged as an assumption (DECISIONS.md D72).
 *
 * `jsdom` rather than happy-dom: the consent store touches `localStorage` and
 * `matchMedia`, and jsdom's implementations are the closer match to a browser.
 */
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": resolve(__dirname, "./src") } },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    globals: true,
    restoreMocks: true,
  },
});
