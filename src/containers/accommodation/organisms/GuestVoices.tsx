import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { guestVoicesSection } from "@/containers/accommodation/copy";
import { QuoteCard } from "@/containers/accommodation/molecules/QuoteCard";
import { testimonials } from "@/content/testimonials";
import type { RevealDirection } from "@/theme/motion";

/**
 * The three approved reviews, attributed exactly as `content/testimonials.ts`
 * stores them. The accommodation-placement quote leads and takes the display
 * face — reviews placed near a booking decision is standard conversion
 * practice — with the other two alongside it. Renders nothing if the content
 * layer is ever emptied, rather than falling back to invented proof.
 */
export function GuestVoices({ motion = "up" }: { motion?: RevealDirection }) {
  if (testimonials.length === 0) {
    return null;
  }

  const ordered = [...testimonials].sort((a, b) =>
    a.placement === "accommodation" ? -1 : b.placement === "accommodation" ? 1 : 0,
  );

  return (
    <SectionShell
      motion={motion}
      eyebrow={guestVoicesSection.eyebrow}
      heading={guestVoicesSection.heading}
      description={guestVoicesSection.description}
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
    </SectionShell>
  );
}
