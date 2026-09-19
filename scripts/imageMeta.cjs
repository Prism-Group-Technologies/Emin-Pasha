/**
 * Reproduces, outside the bundler, what `next/image` hands back for a static
 * image import: `{ src, width, height, blurDataURL }`.
 *
 * Webpack resolves `import hero from "./hero.webp"` to that object. Node does
 * not — it tries to parse the WebP bytes as JavaScript and dies on `RIFF`. So
 * anything that loads the content layer outside a Next build (the `check:*`
 * scripts, Vitest) needs this shim, or it either crashes or, worse, silently
 * resolves the import to a bare path string and tests pass against a shape
 * production never sees.
 *
 * Dimensions are read from the file header rather than faked, so a test or a
 * script that reasons about aspect ratio gets the truth. Plain CommonJS on
 * purpose: it has to be loadable from a `--require` hook before any TypeScript
 * transform is in play, and from `vitest.config.mts` through `createRequire`.
 */
const fs = require("node:fs");

/** WebP: RIFF container, then a VP8 / VP8L / VP8X chunk carrying the size. */
function webpSize(buffer) {
  const chunk = buffer.toString("ascii", 12, 16);

  if (chunk === "VP8X") {
    return {
      width: (buffer.readUIntLE(24, 3) & 0xffffff) + 1,
      height: (buffer.readUIntLE(27, 3) & 0xffffff) + 1,
    };
  }

  if (chunk === "VP8 ") {
    // 3-byte frame tag, then the 0x9d012a sync code, then 14-bit dimensions.
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  if (chunk === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }

  throw new Error(`Unrecognised WebP chunk "${chunk}"`);
}

/** PNG: the IHDR chunk always starts at byte 16, big-endian. */
function pngSize(buffer) {
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

/**
 * ICO: a directory of entries after a 6-byte header. Byte 6 is the first
 * entry's width and byte 7 its height, each stored as a single byte where 0
 * means 256. Only the first entry is read — the favicon is declared
 * `sizes="any"` (see src/config/icons.ts), so nothing downstream reasons
 * about which resolution a multi-image .ico happens to lead with.
 */
function icoSize(buffer) {
  return { width: buffer.readUInt8(6) || 256, height: buffer.readUInt8(7) || 256 };
}

/**
 * The `StaticImageData` a bundler would produce for `file`.
 *
 * `blurDataURL` is a 1×1 transparent GIF rather than a real LQIP: generating
 * the genuine article needs the image pipeline, and no test or script asserts
 * on its contents — only that the field is a data URL when the bundler would
 * have supplied one.
 */
function imageMeta(file) {
  const buffer = fs.readFileSync(file);
  const sizeOf = file.endsWith(".png") ? pngSize : file.endsWith(".ico") ? icoSize : webpSize;
  const { width, height } = sizeOf(buffer);

  return {
    src: `/_next/static/media/${file.split("/").pop()}`,
    width,
    height,
    blurDataURL: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  };
}

const EXTENSIONS = [".webp", ".png", ".jpg", ".jpeg", ".avif", ".gif", ".ico"];

/** Teach CommonJS `require` to resolve image files the way webpack does. */
function registerImageRequireHook() {
  for (const extension of EXTENSIONS) {
    require.extensions[extension] = (module, file) => {
      module.exports = imageMeta(file);
    };
  }
}

module.exports = { imageMeta, registerImageRequireHook, EXTENSIONS };
