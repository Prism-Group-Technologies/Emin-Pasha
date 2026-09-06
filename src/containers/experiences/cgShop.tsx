import { ExperiencePage } from "@/containers/experiences/ExperiencePage";
import { cgShop, cgShopPageIntro } from "@/content/experiences";

/**
 * The shop. Naming follows `content/experiences.ts`, which uses **"Emin Pasha
 * CG Shop"** — the form most repeated in approved copy.
 *
 * The Mehmed/Mehmet question is **not resolved**: TODO(EMIN-Q19) covers both
 * the shop's name ("CG Shop" / "Emin Pasha CG Shop" / "Mehmet Gift Shop") and
 * what "CG" stands for, and there is no DECISIONS.md entry settling it. One
 * form is used consistently sitewide rather than mixing them, and the gap is
 * flagged rather than silently picked.
 */
export function CgShopContainer() {
  return (
    <ExperiencePage
      eyebrow="§ ART & CULTURE"
      heading={cgShop.name}
      intro={cgShopPageIntro}
      body={cgShop.description}
      assetId="experiences-cg-shop"
      relatedHrefs={["/our-story", "/lounges-and-spaces", "/accommodation"]}
    />
  );
}
