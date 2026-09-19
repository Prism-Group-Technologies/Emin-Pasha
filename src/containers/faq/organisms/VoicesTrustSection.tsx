import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { QuoteCard } from "@/containers/accommodation/molecules/QuoteCard";
import { sections, trustPromises } from "@/containers/faq/copy";
import { TrustPromiseList } from "@/containers/faq/molecules/TrustPromiseList";
import { testimonials } from "@/content/testimonials";
import type { RevealDirection } from "@/theme/motion";

const { voices } = sections;

/**
 * Social proof before the final ask: the three **approved** guest reviews
 * from `content/testimonials.ts`, rendered verbatim in the shared `QuoteCard`,
 * above the page's three service promises. No review is invented here.
 */
export function VoicesTrustSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      variant="raised"
      motion={motion}
      eyebrow={voices.eyebrow}
      heading={voices.heading}
      description={voices.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.id} index={index} fill>
            <QuoteCard
              heading={testimonial.heading}
              quote={testimonial.quote}
              author={testimonial.author}
              location={testimonial.location}
              stayDate={testimonial.stayDate}
              featured={index === 0}
            />
          </Reveal>
        ))}
      </Box>
      <TrustPromiseList items={trustPromises} />
    </SectionShell>
  );
}
