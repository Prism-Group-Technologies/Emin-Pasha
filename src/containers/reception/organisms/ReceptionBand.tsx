import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { receptionAsset, receptionSections } from "@/containers/reception/copy";
import { DeskStatRail } from "@/containers/reception/molecules/DeskStatRail";
import { ReceptionMediaPair } from "@/containers/reception/molecules/ReceptionMediaPair";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const copy = receptionSections.home;

/**
 * The homepage's arrival band.
 *
 * It sits between the estate tiles and the rate card, which is the one gap in
 * the funnel where it does any work. By that point a visitor wants the place
 * and has not yet seen the price, and the objection in between is not "is it
 * beautiful" — the six tiles above just settled that — but "will anyone
 * actually look after me when I land at midnight in a city I do not know".
 * A desk that never closes is the answer, and this is the only band on the
 * page whose photograph contains someone who works here.
 *
 * Copy and photography enter from opposite sides, the device `IntroBlock`
 * established: the band is an argument with evidence beside it, and the motion
 * closes the two halves together rather than sliding the pair in as one block.
 *
 * The media column leads on `md`+ and follows on a phone — the stat rail is
 * the fastest thing to read on the page, and on a narrow viewport it should
 * not be below a 3:2 photograph and its offset partner.
 */
export function ReceptionBand({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell motion={motion} variant="raised" topRule id="reception">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.05fr)" },
          gap: { xs: 7, md: 9 },
          alignItems: "center",
        }}
      >
        {/*
          No `order` on this column: `order: -1` on the media column alone is
          enough to lift it above an unordered sibling, whose default order is
          0. Setting both would be two numbers to keep in step instead of one.
        */}
        <Reveal direction={motion}>
          <Stack spacing={4}>
            <Text variant="overline" component="p" color="text.secondary">
              {copy.eyebrow}
            </Text>
            <Text
              variant="h2"
              component="h2"
              sx={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
            >
              {copy.heading}
            </Text>
            <Text variant="subtitle1" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {copy.lede}
            </Text>

            <DeskStatRail />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
              <Button href={copy.primaryCta.href} variant="primary">
                {copy.primaryCta.label}
              </Button>
              <Button href={copy.secondaryCta.href} variant="ghost">
                {copy.secondaryCta.label}
              </Button>
            </Stack>
          </Stack>
        </Reveal>

        <Box sx={{ order: { xs: -1, md: 0 } }}>
          <Reveal index={1} direction={oppositeOf(motion)} media>
            <ReceptionMediaPair
              lead={receptionAsset("reception-desk-wide")}
              support={receptionAsset("reception-waiting-window")}
            />
          </Reveal>
        </Box>
      </Box>
    </SectionShell>
  );
}
