import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { sections } from "@/containers/contact/copy";
import { contactSectionMotion as m } from "@/containers/contact/motion";
import { ArrivalSection } from "@/containers/contact/organisms/ArrivalSection";
import { ChannelsSection } from "@/containers/contact/organisms/ChannelsSection";
import { ContactClosingSection } from "@/containers/contact/organisms/ContactClosingSection";
import { ContactFaqSection } from "@/containers/contact/organisms/ContactFaqSection";
import { ContactHero } from "@/containers/contact/organisms/ContactHero";
import { EnquirySection } from "@/containers/contact/organisms/EnquirySection";
import { GettingHereSection } from "@/containers/contact/organisms/GettingHereSection";
import { StickyEnquireCta } from "@/containers/contact/organisms/StickyEnquireCta";
import { TeamSection } from "@/containers/contact/organisms/TeamSection";
import { VoicesSection } from "@/containers/contact/organisms/VoicesSection";

/**
 * Contact, rebuilt as a conversion funnel — the same shape as the Story,
 * Dining, Wellness and Events redesigns. A Server Component that composes the
 * section organisms and holds no logic of its own; the client islands are the
 * deferred enquiry form, the live map, the FAQ accordion and the sticky bar.
 *
 * The order follows how a visitor arrives here — already wanting to talk:
 *
 *   hero         — the promise, "enquire" + WhatsApp CTAs, service figures
 *   channels     — WhatsApp / call / email / visit cards + reply promises
 *   enquiry      — the adaptive two-step form beside what-happens-next, #enquire
 *   getting here — live map, NAP, directions and drive times
 *   arrival      — transfers, parking, late arrival, step-free help
 *   team         — the desk as people (placeholders)
 *   voices       — three placeholder notes about the pre-stay conversation
 *   faq          — pre-contact questions + an "ask us" card
 *   closing      — dark band, book-direct on WhatsApp or call
 *   related      — cross-sell into rooms, events, spa and dining
 *
 * Every channel, address and inbox renders from `content/identity.ts` and
 * `content/contact.ts`. Everything invented lives in `containers/contact/copy`,
 * labelled and outside the governed content layer.
 */
export function ContactContainer() {
  return (
    <>
      <ContactHero />
      <ChannelsSection motion={m.channels} />
      <EnquirySection motion={m.enquiry} />
      <GettingHereSection motion={m.gettingHere} />
      <ArrivalSection motion={m.arrival} />
      <TeamSection motion={m.team} />
      <VoicesSection motion={m.voices} />
      <ContactFaqSection motion={m.faq} />
      <ContactClosingSection motion={m.closing} />
      <SectionShell
        motion={m.related}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks
          hrefs={["/accommodation", "/meetings-and-events", "/spa-and-wellness", "/dining"]}
        />
      </SectionShell>

      <StickyEnquireCta />
    </>
  );
}
