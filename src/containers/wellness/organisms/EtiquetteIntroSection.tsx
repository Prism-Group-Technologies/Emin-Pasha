import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { StatBlock } from "@/components/molecules/StatBlock";
import { SectionShell } from "@/components/templates/SectionShell";
import { etiquetteFacts, etiquetteIntro } from "@/containers/wellness/copy/etiquette";
import type { RevealDirection } from "@/theme/motion";

/**
 * The etiquette page opener: one paragraph of framing and the three facts
 * worth knowing before leaving the house — arrival time, the 16+ minimum age
 * and the pool depth / no-lifeguard notice. All verified §6 / §14.
 */
export function EtiquetteIntroSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell motion={motion} bodyMotion={motion}>
      <Box sx={{ display: "grid", gap: { xs: 6, md: 8 } }}>
        <Text
          variant="subtitle1"
          color="text.secondary"
          sx={{ maxWidth: "64ch", textWrap: "pretty" }}
        >
          {etiquetteIntro}
        </Text>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 5, md: 6 },
            py: { xs: 4, md: 5 },
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {etiquetteFacts.map((fact) => (
            <StatBlock key={fact.label} value={fact.value} label={fact.label} />
          ))}
        </Box>
      </Box>
    </SectionShell>
  );
}
