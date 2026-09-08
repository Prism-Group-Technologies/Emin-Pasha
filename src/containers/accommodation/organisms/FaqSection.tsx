import { SectionShell } from "@/components/templates/SectionShell";
import { faqSection } from "@/containers/accommodation/copy";
import { FaqBlock } from "@/containers/accommodation/organisms/FaqBlock";
import { faqItems } from "@/content/faq";
import type { RevealDirection } from "@/theme/motion";

/** The subset of the approved §15 FAQ that a room booker actually asks. */
const ROOM_FAQ_IDS = [
  "check-in-check-out-times",
  "breakfast-included",
  "wifi",
  "children-welcome",
  "cancellation-policy",
];

const roomFaqs = faqItems.filter((item) => ROOM_FAQ_IDS.includes(item.id));

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
