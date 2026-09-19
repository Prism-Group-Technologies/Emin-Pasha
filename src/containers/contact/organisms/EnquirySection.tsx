import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { HoursBlock } from "@/components/organisms/Footer/HoursBlock";
import { SocialLinks } from "@/components/organisms/Footer/SocialLinks";
import { getFooterData } from "@/components/organisms/Footer/footerData";
import { SectionShell } from "@/components/templates/SectionShell";
import { ENQUIRE_ANCHOR_ID } from "@/containers/contact/anchors";
import { sections } from "@/containers/contact/copy";
import { DirectInboxList } from "@/containers/contact/molecules/DirectInboxList";
import { NextSteps } from "@/containers/contact/molecules/NextSteps";
import { DeferredContactForm } from "@/containers/contact/organisms/DeferredContactForm";
import { contactChannels } from "@/content/contact";
import {
  whatsappBookingUrl,
  whatsappEventsUrl,
  whatsappUrl,
  whatsappWellnessUrl,
} from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

/**
 * Intent → WhatsApp hand-off, reusing the four approved openings (no new
 * string is minted): stay and dining are booking conversations, events and
 * wellness have their own, "something else" gets the general one.
 */
const WHATSAPP_BY_INTENT = {
  stay: whatsappBookingUrl,
  dining: whatsappBookingUrl,
  events: whatsappEventsUrl,
  wellness: whatsappWellnessUrl,
  general: whatsappUrl,
};

const panelSx = {
  p: { xs: 4, sm: 5, md: 6 },
  border: "1px solid",
  borderColor: "divider",
  borderTop: "2px solid",
  borderTopColor: "primary.main",
  borderRadius: `${radiusTokens.lg}px`,
  bgcolor: "background.default",
  boxShadow: shadowTokens.sm,
  minWidth: 0,
} as const;

/**
 * The page's conversion surface: the adaptive enquiry form in its own panel,
 * beside a rail that removes the last reasons not to send it — what happens
 * next, the real inboxes for people who would rather email, the approved
 * hours and the social channels. The rail is sticky from `lg`, so it keeps
 * the visitor company down the length of the form.
 */
export function EnquirySection({ motion = "up" }: { motion?: RevealDirection }) {
  const footer = getFooterData();
  const { enquiry } = sections;

  return (
    <SectionShell
      id={ENQUIRE_ANCHOR_ID}
      motion={motion}
      eyebrow={enquiry.eyebrow}
      heading={enquiry.heading}
      description={enquiry.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.55fr) minmax(0, 1fr)" },
          gap: { xs: 6, lg: 8 },
          alignItems: "start",
        }}
      >
        <Box sx={panelSx}>
          <DeferredContactForm whatsappByIntent={WHATSAPP_BY_INTENT} />
        </Box>

        <Stack spacing={6} sx={{ position: { lg: "sticky" }, top: { lg: 96 } }}>
          <NextSteps title={enquiry.nextStepsTitle} steps={enquiry.nextSteps} />
          <DirectInboxList title={enquiry.directTitle} channels={contactChannels} />
          <HoursBlock hours={footer.hours} />
          <SocialLinks social={footer.social} />
        </Stack>
      </Box>
    </SectionShell>
  );
}
