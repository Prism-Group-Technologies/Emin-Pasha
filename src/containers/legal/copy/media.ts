/**
 * ⚠️ INVENTED COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * The one placeholder photo slot the legal pages use, in the promise band.
 * `assetRefSchema`-validated at module load and rendered through `AssetImage`
 * as a named, dimension-labelled stand-in that doubles as a shooting brief
 * (CLAUDE.md §6.6) — the same construction as `faq/copy/media.ts`.
 */
import { assetRefSchema } from "@/schemas/content/assetRef";

export const legalPromiseAsset = assetRefSchema.parse({
  id: "legal-promise-garden-walk",
  page: "legal",
  subject: "A quiet, shaded garden path inside the estate walls, no people in frame",
  altText: "A quiet garden path within the grounds of The Emin Pasha Hotel & Spa",
  kind: "image",
  width: 1200,
  height: 1500,
  priority: "low",
  status: "placeholder",
});
