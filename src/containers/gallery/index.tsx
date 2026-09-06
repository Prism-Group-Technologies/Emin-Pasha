import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { SectionShell } from "@/components/templates/SectionShell";
import { GalleryGrid } from "@/containers/gallery/organisms/GalleryGrid";
import { assets } from "@/content/assets";
import { alternatingDirection } from "@/theme/motion";

/**
 * Categories are derived from the asset manifest's own `page` field rather
 * than hand-listed, so every image the manifest gains appears here
 * automatically and nothing can drift out of sync with
 * docs/ASSET_MANIFEST.md.
 *
 * Video, Open Graph and floor-plan assets are excluded: they are not
 * photographs of the property and do not belong in a visitor-facing gallery.
 */
const EXCLUDED = ["home-og-image", "meetings-kudara-floorplan", "contact-static-map"];

const CATEGORY_ORDER: { id: string; label: string; match: (page: string) => boolean }[] = [
  { id: "rooms", label: "Rooms & Suites", match: (page) => page.startsWith("accommodation") },
  { id: "dining", label: "Dining", match: (page) => page.startsWith("dining") },
  { id: "spaces", label: "Lounges & Gardens", match: (page) => page.startsWith("lounges") },
  { id: "wellness", label: "Spa, Gym & Pool", match: (page) => page.startsWith("spa") },
  {
    id: "events",
    label: "Events & Weddings",
    match: (page) => page.startsWith("meetings") || page.startsWith("weddings"),
  },
  {
    id: "estate",
    label: "The Estate",
    match: (page) =>
      page.startsWith("gallery") ||
      page.startsWith("home") ||
      page.startsWith("story") ||
      page.startsWith("experiences"),
  },
];

const photographs = assets.filter(
  (asset) => asset.kind === "image" && !EXCLUDED.includes(asset.id),
);

const categories = CATEGORY_ORDER.map((category) => ({
  id: category.id,
  label: category.label,
  assets: photographs.filter((asset) => category.match(asset.page)),
})).filter((category) => category.assets.length > 0);

export function GalleryContainer() {
  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ GALLERY"
        heading="Gallery"
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />
          <Text variant="subtitle1" sx={{ maxWidth: "68ch" }}>
            The rooms, the gardens, the tables and the water — the estate as it is.
          </Text>
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)}>
        <GalleryGrid categories={categories} />
      </SectionShell>
    </>
  );
}
