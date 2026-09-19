import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { NewsletterFormMount } from "@/components/organisms/Footer/NewsletterFormMount";
import { SectionShell } from "@/components/templates/SectionShell";
import { ALERTS_ANCHOR_ID } from "@/containers/offers/anchors";
import { alertsCopy } from "@/containers/offers/copy";
import { OfferInclusions } from "@/containers/offers/molecules/OfferInclusions";
import { shell } from "@/content/shell";
import type { RevealDirection } from "@/theme/motion";
import { colorTokens, radiusTokens, shadowTokens } from "@/theme/tokens";

/**
 * The approved newsletter copy with only the submit label swapped. The
 * field labels, consent wording, errors and result messages stay the
 * `content/shell.ts` strings, because this posts to the same
 * `/api/enquiry/newsletter` route the footer does.
 */
const FORM_COPY = { ...shell.newsletter, submitLabel: alertsCopy.submitLabel };

/**
 * The capture for visitors not ready to claim: the pitch and three list
 * benefits beside the sitewide newsletter form, in one gold-edged panel. The
 * form keeps its deferred-hydration mount and takes its own id prefix, so it
 * can share a page with the footer's copy without duplicate ids.
 */
export function OfferAlertsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell id={ALERTS_ANCHOR_ID} motion={motion}>
      <Reveal direction={motion}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
            gap: { xs: 6, md: 8 },
            alignItems: "center",
            p: { xs: 5, sm: 7, md: 8 },
            borderRadius: `${radiusTokens.xl}px`,
            border: "1px solid",
            borderColor: colorTokens.gold[500],
            bgcolor: "background.paper",
            boxShadow: shadowTokens.md,
          }}
        >
          <Box sx={{ display: "grid", gap: 4 }}>
            <IconBadge name="mail" size={52} />
            <Text
              variant="overline"
              component="p"
              color="text.secondary"
              sx={{ fontFamily: "var(--font-cartographic)" }}
            >
              {alertsCopy.eyebrow}
            </Text>
            <Text variant="h2" component="h2" sx={{ textWrap: "balance" }}>
              {alertsCopy.heading}
            </Text>
            <Text variant="subtitle1" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {alertsCopy.description}
            </Text>
            <OfferInclusions items={alertsCopy.benefits} label="What you get on the list" />
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 3,
              p: { xs: 4, sm: 6 },
              borderRadius: `${radiusTokens.lg}px`,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Text variant="h4" component="h3">
              {alertsCopy.formTitle}
            </Text>
            <NewsletterFormMount copy={FORM_COPY} idPrefix="offer-alerts" />
          </Box>
        </Box>
      </Reveal>
    </SectionShell>
  );
}
