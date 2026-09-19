import { type BreadcrumbItem } from "@/components/molecules/Breadcrumbs";
import { type HeroImage, HeroShell } from "@/components/molecules/HeroShell";
import { HeroActions, type HeroCta } from "@/components/organisms/PageHero/HeroActions";
import { HeroCopyColumn } from "@/components/organisms/PageHero/HeroCopyColumn";
import { HeroCrumbs } from "@/components/organisms/PageHero/HeroCrumbs";
import { type HeroStatItem, HeroStatRail } from "@/components/organisms/PageHero/HeroStatRail";

export interface PageHeroProps {
  /**
   * Cartographic-face marker, rendered verbatim — pass it already prefixed
   * "§ " to match every other section eyebrow on the site.
   */
  eyebrow: string;
  /** The page `<h1>`. */
  headline: string;
  lede?: string;
  /** Accessible name for the hero `<section>` — defaults to the headline. */
  label?: string;
  /** Full-bleed background — resolve it with `pageHeroImage()` from the content layer. */
  image?: HeroImage;
  breadcrumbs?: BreadcrumbItem[];
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  /** Two to four traceable figures on a hairline rail. */
  stats?: HeroStatItem[];
  minHeight?: { xs: number; md: number };
  /** `center` narrows and centres the copy column; defaults to left. */
  align?: "start" | "center";
}

/**
 * Applied as one spread rather than as per-parameter defaults, so the three
 * of them cost one branch instead of three against the `complexity` ceiling —
 * the same trick `SectionShell` uses.
 */
const HERO_DEFAULTS = {
  minHeight: { xs: 520, md: 640 },
  align: "start",
} as const;

/**
 * The one above-the-fold block every route except Home shares.
 *
 * Composes the shared `HeroShell` (priority image = LCP, gradient scrim,
 * bottom-aligned overlay at the 1280 content width) and stays type-led:
 * eyebrow, `h1`, lede, then optional in-page CTAs and an optional figure rail.
 * There is no booking widget here — the sitewide sticky bar and each page's
 * own conversion section carry that — so the hero stays fast.
 *
 * A Server Component: the only interactivity it can hold is a `next/link`
 * button, and `HeroShell` / `Breadcrumbs` already own that boundary. Each
 * child renders nothing when its prop is absent, so this function branches
 * only on `align`.
 */
export function PageHero(props: PageHeroProps) {
  const { minHeight, align } = { ...HERO_DEFAULTS, ...props };

  return (
    <HeroShell image={props.image} label={props.label ?? props.headline} minHeight={minHeight}>
      <HeroCrumbs items={props.breadcrumbs} />
      <HeroCopyColumn
        eyebrow={props.eyebrow}
        headline={props.headline}
        lede={props.lede}
        centred={align === "center"}
      />
      <HeroActions primary={props.primaryCta} secondary={props.secondaryCta} />
      <HeroStatRail stats={props.stats} />
    </HeroShell>
  );
}
