import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { roomPoliciesSection } from "@/containers/accommodation/copy";
import { RoomFactList } from "@/containers/accommodation/molecules/RoomFactList";
import { FaqBlock } from "@/containers/accommodation/organisms/FaqBlock";
import { roomFaqs } from "@/containers/accommodation/roomFaqs";
import { childrenAndExtraBeds, extraBedPriceUgx } from "@/content/rooms";
import type { RevealDirection } from "@/theme/motion";

function ExtraBedNote() {
  if (extraBedPriceUgx !== undefined) {
    return null;
  }
  return (
    <Text variant="body2" color="text.secondary">
      TODO(EMIN-Q05): extra-bed pricing is quoted in the source in a currency that is itself
      unresolved, so no figure is published. Ask us and we will confirm it.
    </Text>
  );
}

/**
 * The last objections, answered side by side: the children and extra-bed
 * policy from `content/rooms.ts`, and the five questions reservations answer
 * most from the governed FAQ.
 *
 * Two columns rather than the hub's stacked accordion, because on a room page
 * these are the same decision — "will this room work for us" — and a guest
 * reading the policy is one scroll from the question it raises. Neither list
 * is rewritten here; both render whatever the content layer holds.
 */
export function RoomPolicies({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={roomPoliciesSection.eyebrow}
      heading={roomPoliciesSection.heading}
      description={roomPoliciesSection.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.2fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "start",
        }}
      >
        <RoomFactList
          title={childrenAndExtraBeds.title}
          items={childrenAndExtraBeds.items}
          footnote={<ExtraBedNote />}
        />
        {roomFaqs.length > 0 && <FaqBlock items={roomFaqs} />}
      </Box>
    </SectionShell>
  );
}
