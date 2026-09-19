import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { moments } from "@/containers/spaces/copy/moments";
import { sections } from "@/containers/spaces/copy/sections";
import { MomentTile } from "@/containers/spaces/molecules/MomentTile";
import { SeedEnquiryButton } from "@/containers/spaces/molecules/SeedEnquiryButton";
import type { RevealDirection } from "@/theme/motion";

/**
 * "Moments we host" as a bento grid: the lead tile spans two rows on the left
 * from `md`, the rest tile two-by-two beside it. One column on a phone.
 */
export function MomentsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.moments.eyebrow}
      heading={sections.moments.heading}
      description={sections.moments.description}
      action={
        <SeedEnquiryButton
          label="Plan your moment"
          variant="ghost"
          seed={{ requestType: "private-hire", space: "any" }}
        />
      }
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "1.2fr repeat(2, minmax(0, 1fr))",
          },
          gridTemplateRows: { md: "repeat(2, auto)" },
        }}
      >
        {moments.map((moment, index) => (
          <Box
            key={moment.id}
            sx={
              moment.lead
                ? { gridRow: { md: "span 2" }, gridColumn: { sm: "1 / -1", md: "auto" } }
                : undefined
            }
          >
            <Reveal index={index} fill media>
              <MomentTile moment={moment} />
            </Reveal>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}
