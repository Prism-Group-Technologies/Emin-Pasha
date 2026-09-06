import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const MUI_BOUNDARY_MESSAGE =
  "@mui/* may only be imported inside src/components/** and src/theme/** — see CLAUDE.md §5.1.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Global ignores (extends eslint-config-next's own defaults).
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "coverage/**"]),

  // Project-wide app-code conventions, CLAUDE.md §5 / §11. Scoped to src/** so
  // root-level tooling files (next.config.ts, this file) aren't held to
  // app-code rules they were never meant to satisfy — e.g. a required default export.
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-img-element": "error",
      complexity: ["error", 10],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "max-lines": ["error", { max: 120, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": [
        "error",
        { max: 80, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      "import/no-default-export": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@mui/*", "@mui/**"],
              message: MUI_BOUNDARY_MESSAGE,
            },
          ],
        },
      ],
    },
  },

  // Next.js route conventions require a default export (page/layout/error/loading/etc).
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "import/no-default-export": "off",
    },
  },

  // The MUI boundary (CLAUDE.md §5.1): the design system and theme tokens are
  // the only places allowed to import from @mui/*. Never disable this rule
  // with an inline comment elsewhere — extend this list instead.
  {
    files: ["src/components/**/*.{ts,tsx}", "src/theme/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": "off",
    },
  },

  // src/content/** and src/schemas/** hold data, not logic — line count
  // scales with approved copy volume (e.g. the Emin Pasha biography), not
  // complexity. max-lines exists to bound cyclomatic/structural complexity
  // (CLAUDE.md §5.4); it doesn't serve that purpose against a Zod object
  // literal or a paragraph of copy, so it's scoped off here rather than
  // fragmenting one topic (e.g. one testimonial, one FAQ answer) across
  // files to satisfy a line count. Every other app-code rule stays on,
  // including the MUI boundary and named-exports-only.
  {
    files: ["src/content/**/*.ts", "src/schemas/**/*.ts"],
    rules: {
      "max-lines": "off",
      "max-lines-per-function": "off",
    },
  },
]);

export default eslintConfig;
