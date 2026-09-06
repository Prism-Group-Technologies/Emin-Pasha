import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { socialProofSection } from "@/containers/home/copy";
import { TestimonialCard } from "@/containers/home/molecules/TestimonialCard";
import { testimonials } from "@/content/testimonials";
import type { RevealDirection } from "@/theme/motion";

/**
 * All three approved reviews, attributed exactly as the content layer stores
 * them — heading, quote, author, location and stay date, none of it
 * paraphrased. The homepage-placed one leads and takes the display face; the
 * spa and accommodation quotes sit alongside it, because three attributed
 * reviews covering three parts of the property are worth more to a hesitant
 * visitor than one.
 *
 * **No star rating and no review count.** An `AggregateRating` may not be
 * published until verified reviews exist, and a decorative five-star row
 * asserts exactly that claim while dodging the markup.
 *
 * Renders nothing if the content layer is ever emptied, rather than falling
 * back to invented proof.
 */
export function SocialProof({ motion = "up" }: { motion?: RevealDirection }) {
  if (testimonials.length === 0) {
    return null;
  }

  const ordered = [...testimonials].sort((a, b) =>
    a.placement === "homepage" ? -1 : b.placement === "homepage" ? 1 : 0,
  );

  return (
    <SectionShell
      motion={motion}
      eyebrow={socialProofSection.eyebrow}
      heading={socialProofSection.heading}
      description={socialProofSection.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {ordered.map((testimonial, index) => (
          <Reveal key={testimonial.id} index={index} fill>
            <TestimonialCard
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
    </SectionShell>
  );
}
