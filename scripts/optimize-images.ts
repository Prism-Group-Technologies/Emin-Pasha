/**
 * Re-encodes the photography masters under `src/assets/images` in place.
 *
 * The masters arrive as untouched camera exports — up to 6720×4480 at 2.4 MB
 * each. `next/image` would resize those at request time anyway, but the
 * originals still get copied into `.next/static/media` and every cold
 * optimizer run has to decode a 30-megapixel source, so the weight is paid
 * twice: once in the repo and once on the first request for each size.
 *
 * Capping the long edge at `MAX_EDGE` costs nothing visually — the widest
 * slot on the site is a 100vw hero, and the largest `deviceSizes` entry
 * next/image will ever request is 3840 for a 2x 1920 viewport. Anything past
 * that is bytes no browser asks for.
 *
 * Idempotent by content hash. A lossy re-encode is not a no-op — running it
 * twice compounds the loss — and a size budget alone cannot tell "already
 * compressed" from "busy frame that will not compress further", so a handful
 * of images would be re-encoded on every run and degrade a little each time.
 * Instead each processed file's hash is recorded in `.optimized.json`, and a
 * file is only touched when its hash is absent: new deliveries are picked up,
 * finished files are left alone.
 *
 * Run with `yarn optimize:images` (add `--dry` to preview).
 */
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/** No `deviceSizes` entry exceeds 3840; 2560 covers every real slot at 2x. */
const MAX_EDGE = 2560;
/** Logos are chrome, never photography — they never need photographic width. */
const MAX_LOGO_EDGE = 640;
const WEBP_QUALITY = 78;
/**
 * Bytes per pixel above which a file is considered un-optimized. A q78 WebP
 * photograph lands around 0.04–0.08; 0.12 leaves headroom for genuinely busy
 * frames without letting a raw export through.
 */
const BYTES_PER_PIXEL_BUDGET = 0.12;

const ROOT = path.join(process.cwd(), "src/assets/images");
/** Hashes of files this script has already re-encoded. Committed with them. */
const MANIFEST = path.join(ROOT, ".optimized.json");
const EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg"]);

const dryRun = process.argv.includes("--dry");

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [full] : [];
    }),
  );
  return files.flat();
}

const format = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const hash = (buffer: Buffer) => createHash("sha256").update(buffer).digest("hex").slice(0, 16);

async function readManifest(): Promise<Record<string, string>> {
  try {
    return JSON.parse(await readFile(MANIFEST, "utf8")) as Record<string, string>;
  } catch {
    return {};
  }
}

async function optimize(file: string, done: Record<string, string>) {
  const key = path.relative(ROOT, file);
  const source = await readFile(file);
  const before = source.byteLength;

  // Already re-encoded, and untouched since. Re-running must not compound the
  // loss of a lossy codec.
  if (done[key] === hash(source)) {
    return { file, key, before, after: before, skipped: true, digest: done[key] };
  }

  const isLogo = path.basename(file).startsWith("logo");
  const maxEdge = isLogo ? MAX_LOGO_EDGE : MAX_EDGE;

  const { width = 0, height = 0 } = await sharp(source).metadata();
  const longEdge = Math.max(width, height);
  const withinBudget = before / (width * height) <= BYTES_PER_PIXEL_BUDGET;

  if (longEdge <= maxEdge && withinBudget) {
    return { file, key, before, after: before, skipped: true, digest: hash(source) };
  }

  const pipeline = sharp(source).rotate();
  if (longEdge > maxEdge) {
    pipeline.resize({
      width: width >= height ? maxEdge : undefined,
      height: height > width ? maxEdge : undefined,
      withoutEnlargement: true,
    });
  }

  // PNG keeps its format so the logo's alpha channel survives the round trip;
  // everything else is photography and belongs in WebP.
  const buffer =
    path.extname(file).toLowerCase() === ".png"
      ? await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
      : await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();

  // Never let a re-encode make a file bigger than it already was.
  if (buffer.byteLength >= before) {
    return { file, key, before, after: before, skipped: true, digest: hash(source) };
  }

  if (!dryRun) await writeFile(file, buffer);
  return { file, key, before, after: buffer.byteLength, skipped: false, digest: hash(buffer) };
}

async function main() {
  const files = (await walk(ROOT)).sort();
  const done = await readManifest();
  const results = [];

  for (const file of files) {
    results.push(await optimize(file, done));
  }

  if (!dryRun) {
    const next = Object.fromEntries(results.map((result) => [result.key, result.digest]));
    await writeFile(MANIFEST, `${JSON.stringify(next, null, 2)}\n`);
  }

  const changed = results.filter((result) => !result.skipped);
  for (const result of changed) {
    const saved = ((1 - result.after / result.before) * 100).toFixed(0);
    console.log(
      `  ${path.relative(ROOT, result.file)}  ${format(result.before)} → ${format(result.after)}  (−${saved}%)`,
    );
  }

  const before = results.reduce((sum, result) => sum + result.before, 0);
  const after = results.reduce((sum, result) => sum + result.after, 0);
  console.log(
    `\n${changed.length}/${results.length} re-encoded${dryRun ? " (dry run)" : ""}: ` +
      `${format(before)} → ${format(after)} (−${((1 - after / before) * 100).toFixed(1)}%)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
