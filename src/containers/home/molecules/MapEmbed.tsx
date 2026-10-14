"use client";

import { useState } from "react";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface MapEmbedProps {
  asset?: AssetRef;
  mapUrl: string;
  label: string;
  loadLabel: string;
}

/**
 * Click-to-load map — CLAUDE.md §8: "maps are click-to-load with a static
 * image fallback". Nothing is requested from Google until the visitor asks,
 * which keeps a third-party iframe (and its cookies) off the critical path
 * and out of the pre-consent load entirely.
 *
 * The placeholder and the iframe occupy the same aspect-ratio box, so
 * swapping one for the other moves nothing — CLS stays at zero through the
 * interaction.
 *
 * `mapUrl` is expected to be `lib/geo.ts`'s pinned embed URL. Both callers
 * pass exactly that; nothing here geocodes an address, which is what used to
 * leave the map unmarked.
 */
export function MapEmbed({ asset, mapUrl, label, loadLabel }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const ratio = asset ? `${asset.width} / ${asset.height}` : "3 / 2";

  if (loaded) {
    return (
      <Box sx={{ position: "relative", width: "100%", aspectRatio: ratio }}>
        <Box
          component="iframe"
          src={mapUrl}
          title={label}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* The click here already has a job — it loads the live map. */}
      {asset && (
        <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 50vw" zoomable={false} />
      )}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          bgcolor: "rgba(8,5,3,0.55)",
        }}
      >
        <Text variant="body2" sx={{ color: "common.white" }}>
          {label}
        </Text>
        <Button onClick={() => setLoaded(true)}>{loadLabel}</Button>
      </Box>
    </Box>
  );
}
