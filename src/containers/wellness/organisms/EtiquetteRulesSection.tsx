import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { etiquetteRuleMeta } from "@/containers/wellness/copy/etiquette";
import { EtiquetteRuleCard } from "@/containers/wellness/molecules/EtiquetteRuleCard";
import { policies } from "@/content/policies";
import type { RevealDirection } from "@/theme/motion";

const etiquette = policies.find((section) => section.id === "spa-etiquette");

/**
 * The §14 "Spa etiquette" policy as a card grid — one card per clause, each
 * with a plain-language heading and icon over the approved wording. The
 * policy text is rendered verbatim from `content/policies.ts`; only the
 * heading and icon are editorial (`copy/etiquette.ts`), zipped in by index.
 */
export function EtiquetteRulesSection({ motion = "up" }: { motion?: RevealDirection }) {
  if (!etiquette) {
    return null;
  }

  return (
    <SectionShell
      motion={motion}
      variant="raised"
      eyebrow="§ THE HOUSE RULES"
      heading="Spa etiquette, point by point"
      description="The approved policy, laid out so you can scan it. The wording is exact — this is what your booking is held to."
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {etiquette.items.map((text, index) => {
          const meta = etiquetteRuleMeta[index];
          return meta ? (
            <Reveal key={text} index={index} fill>
              <EtiquetteRuleCard icon={meta.icon} title={meta.title} text={text} />
            </Reveal>
          ) : null;
        })}
      </Box>
    </SectionShell>
  );
}
