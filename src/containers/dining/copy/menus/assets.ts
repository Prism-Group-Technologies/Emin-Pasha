/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ../index.ts.
 *
 * Placeholder photo slots for the signature dishes that head each outlet's
 * menu section. They live here, colocated with the invented menus, rather
 * than in `src/content/assets.ts`: the dishes are invented (TODO(EMIN-Q12) /
 * TODO(EMIN-COPY)), so their imagery cannot sit in the Zod-governed content
 * layer that `check:content` treats as approved. Promote both together once
 * the menus are signed off.
 *
 * Every entry is still `assetRefSchema`-validated and renders through the same
 * `AssetImage` atom, so each ships as a named, dimension-labelled stand-in
 * (CLAUDE.md §6.6) that doubles as a shooting brief — portrait 4:5, one plated
 * dish per frame.
 */
import { OUTLET_ID, type OutletId } from "@/containers/dining/anchors";
import { OUTLET_ASSET_IDS } from "@/containers/dining/constants";
import { type AssetRef, type AssetRefInput, assetRefSchema } from "@/schemas/content/assetRef";

interface DishAssetSeed {
  /** Trailing id segment — full id is `<outlet asset id>-dish-<key>`. */
  key: string;
  subject: string;
  altText: string;
}

const DISHES: Record<OutletId, DishAssetSeed[]> = {
  [OUTLET_ID.hakkiPasha]: [
    {
      key: "mezze",
      subject: "Signature dish — the Ottoman mezze board with warm flatbread",
      altText: "The Ottoman mezze board at Hakki Pasha Restaurant & Bar",
    },
    {
      key: "charcoal-chicken",
      subject: "Signature dish — charcoal chicken with matoke two ways, plated",
      altText: "Charcoal chicken with matoke two ways at Hakki Pasha Restaurant & Bar",
    },
    {
      key: "nile-perch",
      subject: "Signature dish — Nile perch in a coconut and lemongrass broth, plated",
      altText: "Nile perch with coconut and lemongrass at Hakki Pasha Restaurant & Bar",
    },
  ],
  [OUTLET_ID.sirSamuelBaker]: [
    {
      key: "scallop",
      subject: "Tasting course — seared diver scallop with brown butter, plated",
      altText: "Seared scallop course at Sir Samuel Baker Fine Dining",
    },
    {
      key: "short-rib",
      subject: "Tasting course — 72-hour braised short rib with celeriac, plated",
      altText: "Braised short rib course at Sir Samuel Baker Fine Dining",
    },
    {
      key: "chocolate",
      subject: "Tasting course — dark chocolate, coffee and cardamom dessert, plated",
      altText: "Dark chocolate, coffee and cardamom dessert at Sir Samuel Baker Fine Dining",
    },
  ],
  [OUTLET_ID.rooftopTerrace]: [
    {
      key: "corn-ribs",
      subject: "Signature small plate — charred corn ribs with chilli-lime butter",
      altText: "Charred corn ribs at The Rooftop Terrace",
    },
    {
      key: "suya-skewers",
      subject: "Signature small plate — yaji-spiced beef suya skewers with lime",
      altText: "Beef suya skewers at The Rooftop Terrace",
    },
    {
      key: "negroni",
      subject: "Signature drink — the Nakasero Negroni with orange oil, against the skyline",
      altText: "The Nakasero Negroni at The Rooftop Terrace",
    },
  ],
  [OUTLET_ID.manutea]: [
    {
      key: "syrah",
      subject: "Signature pour — a Northern Rhône Syrah by the glass from the coravin",
      altText: "A Rhône Syrah by the glass at Manutea Wine & Whisky Lounge",
    },
    {
      key: "islay-malt",
      subject: "Signature pour — an Islay single malt served neat in a nosing glass",
      altText: "An Islay single malt at Manutea Wine & Whisky Lounge",
    },
    {
      key: "cheese-board",
      subject: "Signature plate — the cheese and charcuterie board with honeycomb",
      altText: "The cheese and charcuterie board at Manutea Wine & Whisky Lounge",
    },
  ],
  [OUTLET_ID.inRoom]: [
    {
      key: "club",
      subject: "Signature dish — the Emin Pasha club sandwich with fries, on a tray",
      altText: "The Emin Pasha club sandwich, In-Room Dining",
    },
    {
      key: "burger",
      subject: "Signature dish — the highland beef burger with house pickles, on a tray",
      altText: "The highland beef burger, In-Room Dining",
    },
    {
      key: "curry",
      subject: "Signature dish — coconut chicken curry with basmati and poppadom, on a tray",
      altText: "Coconut chicken curry with rice, In-Room Dining",
    },
  ],
};

const raw: AssetRefInput[] = (Object.entries(DISHES) as [OutletId, DishAssetSeed[]][]).flatMap(
  ([outletId, seeds]) =>
    seeds.map((seed) => ({
      id: `${OUTLET_ASSET_IDS[outletId]}-dish-${seed.key}`,
      page: `dining/${outletId}`,
      subject: seed.subject,
      kind: "image" as const,
      width: 1200,
      height: 1500,
      priority: "low" as const,
      altText: seed.altText,
      status: "placeholder" as const,
    })),
);

/** The signature-dish photo slots, schema-checked at module load. */
export const signatureDishAssets: AssetRef[] = raw.map((asset) => assetRefSchema.parse(asset));

const byId = new Map(signatureDishAssets.map((asset) => [asset.id, asset]));

/** Resolve one signature-dish placeholder by id, or `undefined` if unknown. */
export function signatureDishAsset(id: string | undefined): AssetRef | undefined {
  return id ? byId.get(id) : undefined;
}
