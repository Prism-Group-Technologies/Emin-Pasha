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
 * TODO(EMIN-Q20): the embed is centred on the approved NAP address string,
 * not on a coordinate pin — the property's real coordinates are unresolved
 * and inventing them would put a fabricated fact in a live map.
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
      {asset && <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 50vw" />}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          bgcolor: "rgba(11,11,10,0.55)",
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
