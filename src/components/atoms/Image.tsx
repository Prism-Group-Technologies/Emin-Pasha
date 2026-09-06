import NextImage, { type ImageProps as NextImageProps } from "next/image";

export interface ImageProps extends Omit<NextImageProps, "placeholder" | "sizes"> {
  /**
   * Required, not defaulted — CLAUDE.md §6.6 wants every image's responsive
   * behaviour to be a deliberate choice, not an inherited default.
   */
  sizes: string;
  /** Real base64 blur data once the asset is delivered — see docs/ASSET_MANIFEST.md. */
  blurDataURL?: string;
}

/**
 * The only image element in the product — CLAUDE.md §6.6: "a raw `<img>`
 * anywhere is a build failure." Wraps `next/image`; `priority` should be set
 * true on the LCP image only (one per page).
 */
export function Image({ blurDataURL, alt, ...rest }: ImageProps) {
  return (
    <NextImage
      alt={alt}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      {...rest}
    />
  );
}
