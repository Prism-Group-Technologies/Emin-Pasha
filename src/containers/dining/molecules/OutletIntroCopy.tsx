import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { type OutletId } from "@/containers/dining/anchors";
import { outletIntros, outletMeta } from "@/containers/dining/copy";
import { getOutletMenuView } from "@/containers/dining/menuView";
import { NamesakeNote } from "@/containers/dining/molecules/NamesakeNote";
import { OutletDishTeaser } from "@/containers/dining/molecules/OutletDishTeaser";
import { OutletMetaList } from "@/containers/dining/molecules/OutletMetaList";
import { OutletReserveCard } from "@/containers/dining/molecules/OutletReserveCard";
import { OutletWhyList } from "@/containers/dining/molecules/OutletWhyList";
import type { Outlet } from "@/schemas/content/outlet";

/**
 * The scrolling half of the intro band, in one reading order: the approved §5
 * description, the invented long-form framing, the cuisine/setting/dress
 * trio, the namesake note where the source records one, the three-line case
 * for this room, two dishes off the sample menu, and the booking prompt.
 *
 * Split out of `OutletIntroSection` so that organism stays a pure two-column
 * layout — the same division `OutletShowcaseMedia` and `OutletFactGrid`
 * already follow, and what keeps the organism inside the §5.4 line ceiling
 * now that the column carries seven blocks instead of three.
 *
 * `NamesakeNote` still renders nothing for the two outlets with no recorded
 * namesake, and that is still correct — deriving one would be inventing a
 * fact. The difference is that the column no longer depends on it: every
 * block after it renders for all five outlets, so the band has the same
 * weight whether or not the source supplies a name.
 */
export function OutletIntroCopy({ outlet }: { outlet: Outlet }) {
  const id = outlet.id as OutletId;
  const meta = outletMeta[id];
  const intro = outletIntros[id];

  return (
    <Stack spacing={{ xs: 6, md: 7 }} sx={{ order: { xs: 2, md: 1 }, maxWidth: "58ch" }}>
      <Stack spacing={4}>
        <Text variant="subtitle1" sx={{ textWrap: "pretty" }}>
          {outlet.description}
        </Text>
        {intro.paragraphs.map((paragraph) => (
          <Text key={paragraph} variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
            {paragraph}
          </Text>
        ))}
      </Stack>

      <OutletMetaList
        items={[
          { label: "Cuisine", value: meta.cuisine },
          { label: "Setting", value: meta.setting },
          { label: "Dress", value: meta.dress },
        ]}
      />

      <NamesakeNote note={outlet.namedForNote} />
      <OutletWhyList items={intro.whyCome} />
      <OutletDishTeaser dishes={getOutletMenuView(id).signatureDishes} />
      <OutletReserveCard outletName={outlet.name} isInRoom={outlet.type === "in-room"} />
    </Stack>
  );
}
