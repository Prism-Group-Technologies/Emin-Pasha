import { SectionShell } from "@/components/templates/SectionShell";
import { faqSection } from "@/containers/accommodation/copy";
import { FaqBlock } from "@/containers/accommodation/organisms/FaqBlock";
import { roomFaqs } from "@/containers/accommodation/roomFaqs";
import type { RevealDirection } from "@/theme/motion";

/**
 * The five questions reservations answer most, drawn from the governed FAQ
 * content — never rewritten here. Renders nothing if that set is ever empty.
 */
export function FaqSection({ motion = "up" }: { motion?: RevealDirection }) {
  if (roomFaqs.length === 0) {
    return null;
  }

  return (
    <SectionShell
      motion={motion}
      eyebrow={faqSection.eyebrow}
      heading={faqSection.heading}
      description={faqSection.description}
      variant="raised"
    >
      <FaqBlock items={roomFaqs} />
    </SectionShell>
  );
}
