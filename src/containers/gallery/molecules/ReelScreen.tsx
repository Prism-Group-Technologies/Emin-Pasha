import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import type { FilmChapter } from "@/containers/gallery/copy/film";
import {
  fillImageSx,
  photoBadgeSx,
  photoMutedSx,
  photoOverlineSx,
  photoScrimSx,
  roundedMediaSx,
} from "@/containers/gallery/styles";
import type { AssetRef } from "@/schemas/content/assetRef";
import { colorTokens } from "@/theme/tokens";

export interface ReelScreenProps {
  poster: AssetRef | undefined;
  chapter: FilmChapter | undefined;
  labels: { reel: string; play: string; pending: string };
}

/**
 * The film's poster frame with the chosen chapter's caption. The film itself
 * is TODO(EMIN-Q43), so the play mark is a visual cue with an honest
 * "in production" note beside it rather than a button that does nothing.
 */
export function ReelScreen({ poster, chapter, labels }: ReelScreenProps) {
  return (
    <Box
      sx={{
        ...roundedMediaSx,
        ...fillImageSx,
        aspectRatio: "16 / 9",
        bgcolor: colorTokens.ink[800],
      }}
    >
      {poster && <AssetImage asset={poster} sizes="(max-width: 900px) 100vw, 60vw" />}
      <Box sx={{ ...photoBadgeSx, position: "absolute", top: 16, right: 16 }}>
        <Text component="span" variant="caption" sx={{ color: "inherit", letterSpacing: "0.08em" }}>
          {labels.reel}
        </Text>
      </Box>
      <Box
        role="img"
        aria-label={labels.play}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 64, md: 88 },
          height: { xs: 64, md: 88 },
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          bgcolor: colorTokens.gold[500],
          color: colorTokens.ink[900],
          boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
        }}
      >
        <Icon name="play" sx={{ fontSize: { xs: 32, md: 44 } }} />
      </Box>
      {chapter && (
        <Box
          aria-live="polite"
          sx={{ ...photoScrimSx, p: { xs: 3, md: 5 }, pt: { xs: 6, md: 10 } }}
        >
          <Text variant="overline" component="p" sx={photoOverlineSx}>
            {`${chapter.mark} · ${chapter.title}`}
          </Text>
          <Text
            variant="body1"
            sx={{ color: "inherit", maxWidth: "52ch", display: { xs: "none", sm: "block" } }}
          >
            {chapter.caption}
          </Text>
          <Text variant="caption" sx={photoMutedSx}>
            {labels.pending}
          </Text>
        </Box>
      )}
    </Box>
  );
}
