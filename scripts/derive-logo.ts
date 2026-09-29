/**
 * Derives the two shipped brand lock-ups from the delivered master.
 *
 * The master (`logo.webp`) is the delivered export, kept lossless so this
 * script can be re-run without compounding anything. Its transparent margins
 * are badly asymmetric — 104px left against 202px right, 85px top against
 * 12px bottom. Shipped as delivered it would sit visibly high and left of centre
 * in the header bar and in the footer rail, and no CSS fixes that: the offset
 * is baked into the pixels. So the ink box is trimmed out first and the
 * derived files carry no padding at all, which makes the declared box the
 * artwork's real extent and lets the layout do the spacing.
 *
 * The second output is the reverse lock-up. `useLogoLockup` used to recolour
 * the wordmark for the `light` variant because it was live text; now that the
 * whole lock-up is pixels, the only honest way to answer the hero scrim and
 * the dark colour scheme is a second file. It is derived rather than
 * hand-drawn so the two can never drift: the artwork is a single flat
 * terracotta on transparency, so compositing `sand.50` through the master's
 * own alpha channel reproduces it exactly, anti-aliasing included.
 *
 * Both outputs share one source buffer, so their intrinsic ratios are
 * identical by construction — which is what `BrandMark` relies on to reserve
 * one box for either variant (CLAUDE.md §8, CLS ≤ 0.05).
 *
 * Idempotent: trimming an already-trimmed buffer is a no-op and the resize
 * declares `withoutEnlargement`, so re-running cannot compound anything.
 *
 * Run with `yarn derive:logo`.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES = path.join(process.cwd(), "src/assets/images");
/**
 * The master lives outside `src/assets/images/` on purpose. That directory is
 * `optimize-images.ts`'s walk root, and the optimizer would cap this file to
 * `MAX_LOGO_EDGE` in place — quietly turning the pristine derivation source
 * into one of the derivatives. `src/assets/brand/` is a build input: nothing
 * imports it, nothing ships it, and only this script reads it.
 */
const MASTER = path.join(process.cwd(), "src/assets/brand/logo.webp");

/**
 * Matches `MAX_LOGO_EDGE` in `optimize-images.ts`. The widest the lock-up
 * ever renders is 200 CSS px, so 640 is already a 3x master; capping here as
 * well means the optimizer finds these files within budget and leaves them
 * alone rather than re-encoding a lossy file a second time.
 */
const MAX_EDGE = 640;
/** `sand.50` — the dark scheme's `text.primary`, kept in sync by hand. */
const REVERSE = "#FBFAF7";
/**
 * Matches `LOGO_WEBP` in `optimize-images.ts`, and near-lossless for the same
 * reason: this is flat line art on transparency, where a photographic quality
 * setting puts visible ringing on hairline strokes. The optimizer exempts
 * `logo*` from its bytes-per-pixel budget precisely so these files take one
 * lossy pass here and none afterwards.
 */
const ENCODE = { nearLossless: true, quality: 90, effort: 6 } as const;

async function main() {
  // `threshold: 5` rather than 0: the master's margin is not perfectly zero
  // alpha at the edges, and a 0 threshold leaves a one-pixel ghost border.
  const trimmed = sharp(await sharp(MASTER).trim({ threshold: 5 }).toBuffer()).resize({
    width: MAX_EDGE,
    withoutEnlargement: true,
  });

  const dark = await trimmed.clone().webp(ENCODE).toBuffer();
  const { width = 0, height = 0 } = await sharp(dark).metadata();

  const light = await sharp({
    create: { width, height, channels: 4, background: REVERSE },
  })
    .composite([{ input: dark, blend: "dest-in" }])
    .webp(ENCODE)
    .toBuffer();

  await writeFile(path.join(IMAGES, "logo-lockup.webp"), dark);
  await writeFile(path.join(IMAGES, "logo-lockup-light.webp"), light);

  const ratio = (width / height).toFixed(4);
  console.log(`logo-lockup.webp        ${width}×${height} (${ratio})  ${dark.byteLength} B`);
  console.log(`logo-lockup-light.webp  ${width}×${height} (${ratio})  ${light.byteLength} B`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
