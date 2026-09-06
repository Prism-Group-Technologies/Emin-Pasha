# The Emin Pasha Hotel & Spa — website

Marketing and lead-generation site for a luxury boutique hotel at Plot 27 Akii Bua Road,
Nakasero, Kampala. Next.js App Router, TypeScript strict, MUI v6.

- **Content rules and approved copy:** `docs/02_CONTENT_SOURCE_OF_TRUTH.md`
- **Editing copy without touching code:** `docs/CONTENT_EDITING_GUIDE.md`
- **Open questions blocking launch:** `docs/03_OPEN_QUESTIONS.md`
- **Every decision and why:** `docs/DECISIONS.md`
- **Pre-launch tasks:** `docs/LAUNCH_CHECKLIST.md`

---

## Getting started

```bash
nvm use                 # Node 22.19.0, pinned in .nvmrc
yarn install
cp .env.example .env    # all values optional — the site runs without them
yarn dev
```

The site builds and runs with **no credentials at all**. Missing keys degrade the booking
flow to an enquiry form; they never break the build.

## Scripts

| Script                         | What it does                                          |
| ------------------------------ | ----------------------------------------------------- |
| `yarn dev`                     | Development server                                    |
| `yarn build`                   | Production build (runs `generate:llms` first)         |
| `yarn start`                   | Serve the production build                            |
| `yarn lint`                    | ESLint, including the MUI boundary rule               |
| `yarn typecheck`               | `tsc --noEmit`                                        |
| `yarn format` / `format:check` | Prettier                                              |
| `yarn test` / `test:watch`     | Vitest — unit, component and content-integrity        |
| `yarn check:content`           | Forbidden-content and duplicate-copy rules            |
| `yarn check:seo`               | Metadata lengths, canonicals, NAP audit, orphan pages |
| `yarn generate:llms`           | Regenerates `public/llms.txt` from `src/content`      |
| `yarn analyze`                 | Bundle analyzer (`--webpack`; see DECISIONS D08)      |

CI runs lint → typecheck → format → content → test → build → SEO, then Lighthouse budgets.

---

## Architecture

### The MUI boundary — the one rule that matters most

```
@mui/*  may ONLY be imported inside  src/components/**  and  src/theme/**
@mui/*  is FORBIDDEN in              src/app/**  src/containers/**  src/hooks/**
                                     src/stores/**  src/lib/**  src/utils/**  src/content/**
```

Enforced by ESLint `no-restricted-imports`. **Never disable it inline.** If a container needs
an MUI capability, wrap it as an atom/molecule in `src/components` first — that is how
`useMediaBreakpoint`, `ExternalLink` and `HoneypotField` came to exist.

### Folders

```
src/
  app/          Routes only — metadata, JSON-LD, one container import. No JSX layout.
  containers/   Page content. No MUI. No business logic — that lives in hooks/.
  components/   The design system. The only place MUI lives.
                atoms/ molecules/ organisms/ templates/
  content/      All copy, rates, nav and facts. Zod-validated. Single source of truth.
  schemas/      Shared Zod schemas.
  lib/          Services — booking adapters, mail, SEO/JSON-LD, API pipeline.
  hooks/ stores/ utils/ config/ theme/
```

**Rule of thumb:** if a string appears twice in the codebase, that is a bug. `check:content`
fails the build on duplicated copy.

### Server vs client

Server Components by default. `'use client'` only on interactive leaves. Two traps that have
bitten this codebase repeatedly — both worth knowing before you add a component:

1. **A Server Component rendered as a child of a Client Component becomes client code**, and
   drags its imports with it. `RoomGrid` doing this pulled Zod into the bundle at 63 KB
   (DECISIONS D71). Pass server-rendered markup in as `children` instead.
2. **Importing `src/content/*` from a client component pulls Zod in**, because every content
   module runs `.parse()` at module scope. Assemble the data in a Server Component and pass
   it across as one plain prop — see `Header/headerData.ts` (DECISIONS D25).

---

## How to add a page

1. **Register it** in `src/content/routes.ts` with its keyword cluster and at least three
   internal links. `check:seo` fails on orphans, so this is not optional.
2. **Create the container** at `src/containers/<page>/index.tsx`. Compose `SectionShell`
   sections. No MUI imports.
3. **Create the route** at `src/app/<path>/page.tsx` — metadata (with `alternates.canonical`),
   JSON-LD, and one container import. Target ≤ 40 lines.
4. **Add breadcrumbs** as the first thing in the container, below the `h1`.
5. Run `yarn check:seo`.

## How to edit content

Never edit copy in a component. See `docs/CONTENT_EDITING_GUIDE.md` for the file-by-file map.
In short: everything lives in `src/content/*.ts`, is Zod-validated, and `yarn check:content`
will tell you if you have broken a rule.

## How to add an image

1. Add the file to `public/images/`.
2. Find its row in `src/content/assets.ts`, set `filename` and flip `status` to `"delivered"`.
3. Nothing else changes — `AssetImage` swaps the placeholder for the real file and drops the
   label. Because the box already holds the manifest's aspect ratio, the swap moves nothing.

Every image goes through `next/image` via `AssetImage`. A raw `<img>` is a build failure.

## Environment variables

All optional. Server-only unless prefixed `NEXT_PUBLIC_`.

| Variable                                           | Purpose                                         |
| -------------------------------------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                             | Canonical origin. Set before launch (Q38).      |
| `YCS_HOTEL_CODE` / `YCS_API_KEY` / `YCS_AUTH_CODE` | Booking-engine credentials (Q50).               |
| `YCS_BOOKING_URL`                                  | The hotel's real "Book Now" URL (Q49).          |
| `YCS_ENVIRONMENT`                                  | `sandbox` (default) or `live`.                  |
| `ENABLE_STYLEGUIDE`                                | `true` serves `/styleguide`; otherwise it 404s. |

A blank value means "not set" — declared-but-empty vars are handled (DECISIONS D38).

## Deployment

**Not yet configured** — the hosting target is still open (Q23). The build is a standard
Next.js 16 production build with no host-specific APIs, so it should deploy to any Node host
or Vercel unchanged. See `docs/LAUNCH_CHECKLIST.md`.
