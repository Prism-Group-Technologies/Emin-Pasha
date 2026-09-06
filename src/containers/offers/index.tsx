import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { PendingInfoNotice } from "@/components/molecules/PendingInfoNotice";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { ctas } from "@/content/ctas";
import { offers, offersPageIntro } from "@/content/offers";
import { alternatingDirection } from "@/theme/motion";
import { formatUgx } from "@/utils/currency";

const reserve = ctas.find((cta) => cta.id === "dining-reserve");

/**
 * Offers, driven entirely by `content/offers.ts`.
 *
 * Two deliberate omissions, both unresolved:
 * - **Happy Hour days.** The source gives conflicting day ranges
 *   (TODO(EMIN-Q07)) and no DECISIONS.md entry resolves them, so only the
 *   confirmed time window renders. No "Mon–Fri" is synthesised.
 * - **Reopening packages.** Flagged in the source as possibly stale and never
 *   confirmed as a current campaign (TODO(EMIN-Q08)), so the offer does not
 *   exist here at all. Publishing a dead campaign is worse than publishing
 *   nothing.
 *
 * Validity is rendered only where an offer actually carries a schedule; no
 * offer has an approved expiry date, so none is invented.
 */
export function OffersContainer() {
  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ WHAT IS ON"
        heading="Offers"
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
          <Text variant="subtitle1" sx={{ maxWidth: "68ch" }}>
            {offersPageIntro}
          </Text>
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: { xs: 6, md: 6 },
          }}
        >
          {offers.map((offer, index) => (
            <Reveal key={offer.id} index={index}>
              <Stack
                component="article"
                spacing={3}
                sx={{ height: "100%", p: 5, borderTop: "1px solid", borderColor: "primary.main" }}
              >
                <Text variant="h3" component="h2">
                  {offer.name}
                </Text>
                <Text variant="body1" color="text.secondary">
                  {offer.description}
                </Text>
                <Stack direction="row" spacing={4} sx={{ flexWrap: "wrap", pt: 2 }}>
                  {offer.priceUgx !== undefined && (
                    <Text variant="overline" component="p">
                      {formatUgx(offer.priceUgx)}
                    </Text>
                  )}
                  {offer.schedule && (
                    <Text variant="overline" component="p" color="text.secondary">
                      {offer.schedule}
                    </Text>
                  )}
                </Stack>
                {!offer.schedule && (
                  <Text variant="body2" color="text.secondary">
                    Days and times are confirmed when you book.
                  </Text>
                )}
                {reserve?.href && (
                  <Box sx={{ mt: "auto", pt: 3 }}>
                    <Button href={reserve.href} variant="ghost">
                      {reserve.label}
                    </Button>
                  </Box>
                )}
              </Stack>
            </Reveal>
          ))}
        </Box>
      </SectionShell>

      <SectionShell motion={alternatingDirection(2)} heading="Terms" variant="raised">
        <PendingInfoNotice
          subject="Offer terms and validity dates"
          todoId="EMIN-Q08"
          action="Full terms and validity dates for each offer are confirmed at the time of booking. Ask us and we will send them through."
        />
      </SectionShell>

      <SectionShell motion={alternatingDirection(3)} heading="Also here">
        <RelatedLinks hrefs={["/dining", "/accommodation", "/spa-and-wellness"]} />
      </SectionShell>
    </>
  );
}
