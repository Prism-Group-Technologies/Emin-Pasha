"use client";

import { useState } from "react";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { useLightbox } from "@/containers/gallery/hooks/useLightbox";
import { GalleryLightbox } from "@/containers/gallery/organisms/GalleryLightbox";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface GalleryGridProps {
  categories: { id: string; label: string; assets: AssetRef[] }[];
}

/**
 * 'use client' justification: category filter and lightbox state.
 *
 * Thumbnails are `next/image` throughout via `AssetImage`, lazy by default —
 * only the lightbox image is eager, and only once opened. Each thumbnail is a
 * real `<button>`, so the whole grid is keyboard-operable before the lightbox
 * is even involved.
 */
export function GalleryGrid({ categories }: GalleryGridProps) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const current = categories.find((category) => category.id === active) ?? categories[0];
  const items = current?.assets ?? [];
  const lightbox = useLightbox(items.length);

  return (
    <Stack spacing={6}>
      <Stack
        direction="row"
        spacing={3}
        sx={{ flexWrap: "wrap" }}
        role="group"
        aria-label="Filter by category"
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={category.id === active ? "primary" : "ghost"}
            size="small"
            aria-pressed={category.id === active}
            onClick={() => setActive(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
          gap: 4,
        }}
      >
        {items.map((asset, index) => (
          <Box
            key={asset.id}
            component="button"
            type="button"
            onClick={() => lightbox.openAt(index)}
            aria-label={`Open ${asset.altText || asset.subject}`}
            sx={{ p: 0, border: 0, background: "none", cursor: "pointer", display: "block" }}
          >
            <AssetImage
              asset={asset}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Box>
        ))}
      </Box>

      <GalleryLightbox items={items} lightbox={lightbox} />
    </Stack>
  );
}
