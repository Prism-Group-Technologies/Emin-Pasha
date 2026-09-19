/**
 * Prints the photography position: which slots are filled, which are filled
 * with a stand-in that does not actually depict the subject, and which
 * photographs are carrying the most weight.
 *
 * This is the shooting brief. The `STRETCH` list is what the hotel still owes
 * — slots where the nearest delivered frame is being used because nothing on
 * the shoot matched the subject at all.
 *
 * Run: `yarn check:photos`. Exits non-zero only if a slot is completely
 * unfilled, which `src/content/photoAssignments.test.ts` also guards.
 */
import { contactMedia } from "@/containers/contact/copy/media";
import { signatureDishAssets } from "@/containers/dining/copy/menus/assets";
import { kudaraAssets } from "@/containers/events/copy/kudaraMedia";
import { eventsAssets } from "@/containers/events/copy/media";
import { transferAssets } from "@/containers/experiences/transfer/copy/media";
import { faqAssets } from "@/containers/faq/copy/media";
import { placeholderPhotos } from "@/containers/gallery/media";
import { legalPromiseAsset } from "@/containers/legal/copy/media";
import { spacesAssets } from "@/containers/spaces/copy/media";
import { wellnessAssets } from "@/containers/wellness/copy/media";
import { poolAssets } from "@/containers/wellness/copy/poolMedia";
import { spaAssets } from "@/containers/wellness/copy/spaMedia";
import { assets } from "@/content/assets";
import { photoAssignments, stretchedAssignments } from "@/content/photoAssignments";
import { photos } from "@/content/photography";
import type { AssetRef } from "@/schemas/content/assetRef";

const allSlots: AssetRef[] = [
  ...assets,
  ...placeholderPhotos.map((photo) => photo.asset),
  ...spacesAssets,
  ...signatureDishAssets,
  ...eventsAssets,
  ...kudaraAssets,
  ...transferAssets,
  ...contactMedia,
  ...poolAssets,
  ...spaAssets,
  ...wellnessAssets,
  ...faqAssets,
  legalPromiseAsset,
];

const imageSlots = allSlots.filter((slot) => slot.kind === "image");
const unfilled = imageSlots.filter((slot) => !slot.image);
const stretched = imageSlots.filter((slot) => stretchedAssignments.has(slot.id));

console.log(`Slots:       ${imageSlots.length}`);
console.log(`Photographs: ${Object.keys(photos).length}`);
console.log(`Filled:      ${imageSlots.length - unfilled.length}`);
console.log(`Stand-ins:   ${stretched.length}  (no delivered frame depicts the subject)`);

if (unfilled.length > 0) {
  console.error(`\nUNFILLED — these render the labelled placeholder:`);
  for (const slot of unfilled) console.error(`  ${slot.id}  ${slot.subject}`);
}

console.log(`\nSTILL TO SHOOT — ${stretched.length} slots using a stand-in:`);
for (const slot of stretched) {
  console.log(
    `  ${slot.id}\n      needs: ${slot.subject}\n      using: ${photoAssignments[slot.id]}`,
  );
}

const reuse = new Map<string, number>();
for (const key of Object.values(photoAssignments)) {
  reuse.set(key, (reuse.get(key) ?? 0) + 1);
}
const hardest = [...reuse.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
console.log(`\nMOST REUSED photographs:`);
for (const [key, count] of hardest) console.log(`  ${String(count).padStart(2)}×  ${key}`);

if (unfilled.length > 0) process.exitCode = 1;
