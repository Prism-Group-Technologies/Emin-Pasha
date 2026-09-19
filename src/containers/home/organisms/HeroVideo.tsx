import { Box } from "@/components/atoms/Box";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import { HERO_SCRIM } from "@/components/organisms/Header/constants";
import { placeholderImageSrc } from "@/config/assets";
import { HeroBookingWidget, getBookingWidgetData } from "@/containers/booking";
import { activeHero } from "@/containers/home/constants";
import { ScrollCue } from "@/containers/home/molecules/ScrollCue";
import { assets } from "@/content/assets";

const poster = assets.find((asset) => asset.id === "home-hero-poster");

/**
 * Hero footage, ordered smallest-codec-first — the browser takes the first
 * `type` it can decode, so Chrome/Firefox/Edge get VP9 and Safari falls
 * through to H.264. Both are re-encoded from the 54.9 MB / 14.9 Mbps master
 * in `src/assets/video/`; that master is the archive copy and is never
 * served. Audio is stripped at encode time rather than only muted at
 * playback, so the bytes are not shipped at all.
 */
const HERO_VIDEO_SOURCES = [
  { src: "/video/emin-pasha.webm", type: "video/webm" },
  { src: "/video/emin-pasha.mp4", type: "video/mp4" },
] as const;

/** MUI's `visuallyHidden`, inlined rather than pulled from a transitive dep. */
const VISUALLY_HIDDEN = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

/**
 * A Server Component, and entirely static. `autoPlay muted loop playsInline`
 * are plain attributes in the server HTML — a looping muted background video
 * needs no JavaScript, so this stays off the hydration path entirely.
 *
 * The poster photograph is kept *underneath* the video rather than passed as
 * the `poster` attribute. `poster` would ship the raw asset: unoptimised, no
 * AVIF/WebP negotiation, no preload, no blur-up. Layering the existing
 * `next/image` beneath the video keeps all four, so the LCP element is still
 * the optimised still and the video is free to arrive whenever it arrives.
 * It doubles as the fallback whenever autoplay is refused — data-saver mode,
 * low-power mode, or a decode failure — where `poster` alone would leave a
 * black rectangle behind the booking widget.
 *
 * `preload="metadata"`, not `auto`: the still already covers the first paint,
 * so the video must not contend with it for bandwidth on the connections
 * where that contention actually hurts.
 *
 * No headline or subheadline. `activeHero.headline` still supplies the
 * section's `aria-label` and a visually-hidden `<h1>` — the homepage keeps
 * exactly one document heading for search engines and screen readers, and
 * switching it remains the one-character edit in `content/site.ts` that
 * `containers/home/constants.ts` describes.
 *
 * CLS: the section is `100svh` with both layers `fill`-ing it, so the hero
 * occupies its final size before any image or video byte arrives. `svh`
 * rather than `vh` deliberately — on mobile `100vh` is taller than the
 * visible viewport until the URL bar collapses, which shifts everything
 * below the fold.
 */
export function HeroVideo() {
  const bookingData = getBookingWidgetData();

  return (
    <Box
      component="section"
      aria-label={activeHero.headline}
      sx={{ position: "relative", height: "100svh", minHeight: 560, overflow: "hidden" }}
    >
      <Image
        src={poster?.image?.src ?? placeholderImageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        blurDataURL={poster?.image?.blurDataURL}
        style={{ objectFit: "cover" }}
      />
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        tabIndex={-1}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      >
        {HERO_VIDEO_SOURCES.map((source) => (
          <source key={source.type} src={source.src} type={source.type} />
        ))}
      </Box>
      <Box sx={{ position: "absolute", inset: 0, backgroundImage: HERO_SCRIM }} />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(11,11,10,0.35)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          px: { xs: 5, md: 8 },
          pb: { xs: 5, md: 6 },
          color: "common.white",
        }}
      >
        <Text component="h1" sx={VISUALLY_HIDDEN}>
          {activeHero.headline}
        </Text>
        <HeroBookingWidget data={bookingData} />
      </Box>
      <ScrollCue />
    </Box>
  );
}
