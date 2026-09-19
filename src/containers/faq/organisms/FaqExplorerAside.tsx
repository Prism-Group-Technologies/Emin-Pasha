import { Box } from "@/components/atoms/Box";
import { AskUsCard } from "@/containers/contact/molecules/AskUsCard";
import { popularFaqs } from "@/containers/faq/catalogue";
import { sections } from "@/containers/faq/copy";
import { PopularQuestionList } from "@/containers/faq/molecules/PopularQuestionList";
import { telephoneUrl, whatsappFaqUrl } from "@/lib/directions";

const { aside } = sections;

/**
 * The column beside the answers: the "Most asked" shortlist and the
 * can't-find-it card (the Contact page's `AskUsCard`, with WhatsApp first and
 * a call as the alternative). Sticky from `lg`, so the way to a person stays
 * in view however far down the answers the visitor reads.
 */
export function FaqExplorerAside() {
  return (
    <Box
      component="aside"
      sx={{ display: "grid", gap: 4, position: { lg: "sticky" }, top: { lg: 112 } }}
    >
      <PopularQuestionList heading={aside.popularHeading} entries={popularFaqs} />
      <AskUsCard
        heading={aside.askHeading}
        body={aside.askBody}
        whatsappHref={whatsappFaqUrl}
        whatsappLabel={aside.askWhatsapp}
        enquireHref={telephoneUrl}
        enquireLabel={aside.askCall}
      />
    </Box>
  );
}
