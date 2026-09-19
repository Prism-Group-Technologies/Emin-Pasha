import react from "@vitejs/plugin-react";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

const { EXTENSIONS, imageMeta } = createRequire(import.meta.url)("./scripts/imageMeta.cjs");
const IMAGE_RE = new RegExp(`\\.(${EXTENSIONS.map((e: string) => e.slice(1)).join("|")})$`);

/**
 * Resolve static image imports to the `StaticImageData` object a Next build
 * produces. Without this Vite hands back a bare path string, and any test
 * touching the content layer passes against a shape production never sees —
 * `asset.image.src` would be `undefined` in tests and correct in the browser.
 */
const staticImageData = {
  name: "static-image-data",
  enforce: "pre" as const,
  load(id: string) {
    const file = id.split("?")[0] ?? id;
    if (!IMAGE_RE.test(file)) return null;
    return `export default ${JSON.stringify(imageMeta(file))};`;
  },
};

/**
 * Vitest + Testing Library — the stack PLAN.md §3 recommended. Q29 was never
 * signed off, so this is logged as an assumption (DECISIONS.md D72).
 *
 * `jsdom` rather than happy-dom: the consent store touches `localStorage` and
 * `matchMedia`, and jsdom's implementations are the closer match to a browser.
 */
export default defineConfig({
  plugins: [staticImageData, react()],
  resolve: { alias: { "@": resolve(__dirname, "./src") } },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    globals: true,
    restoreMocks: true,
  },
});
