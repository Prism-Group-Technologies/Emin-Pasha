import { contactMedia } from "@/containers/contact/copy/media";
import { diningCarouselAssets } from "@/containers/dining/copy/carousels";
import { signatureDishAssets } from "@/containers/dining/copy/menus/assets";
import { boardroomAssets } from "@/containers/events/copy/boardroomMedia";
import { celebrationAssets } from "@/containers/events/copy/celebrationsMedia";
import { kudaraAssets } from "@/containers/events/copy/kudaraMedia";
import { eventsAssets } from "@/containers/events/copy/media";
import { transferAssets } from "@/containers/experiences/transfer/copy/media";
import { faqAssets } from "@/containers/faq/copy/media";
import { placeholderPhotos } from "@/containers/gallery/media";
import { legalPromiseAsset } from "@/containers/legal/copy/media";
import { receptionAssets } from "@/containers/reception/copy/media";
import { spacesAssets } from "@/containers/spaces/copy/media";
import { wellnessAssets } from "@/containers/wellness/copy/media";
import { poolAssets } from "@/containers/wellness/copy/poolMedia";
import { spaAssets } from "@/containers/wellness/copy/spaMedia";
import { assets } from "@/content/assets";
import type { AssetRef } from "@/schemas/content/assetRef";

/**
 * Every image slot the site declares, from the approved content layer and from
 * each container's own media module.
 *
 * **One list, two consumers.** `photoAssignments.test.ts` and
 * `scripts/check-photos.ts` both need "every slot on the site", and until this
 * module existed each kept its own copy of the import block. They drifted
 * exactly as you would expect: a new container's media module would be added
 * to one and not the other, so the test would pass while `check:photos`
 * silently under-reported, or an assignment would be flagged as stale against
 * slots that plainly existed. Adding a module here now fixes both at once, and
 * forgetting to add one fails the test rather than going unnoticed.
 *
 * Server-only — every import here reaches the asset schema, and through it the
 * static photography registry (DECISIONS.md D25).
 */
export const allMediaSlots: AssetRef[] = [
  ...assets,
  ...placeholderPhotos.map((photo) => photo.asset),
  ...spacesAssets,
  ...diningCarouselAssets,
  ...signatureDishAssets,
  ...eventsAssets,
  ...kudaraAssets,
  ...boardroomAssets,
  ...celebrationAssets,
  ...transferAssets,
  ...contactMedia,
  ...poolAssets,
  ...spaAssets,
  ...wellnessAssets,
  ...faqAssets,
  ...receptionAssets,
  legalPromiseAsset,
];

/** The subset that is photography; the two `check` consumers both want this. */
export const allImageSlots: AssetRef[] = allMediaSlots.filter((slot) => slot.kind === "image");
