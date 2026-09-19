import { Icon } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { QuickAnswer } from "@/containers/faq/copy";
import { HashLink } from "@/containers/faq/molecules/HashLink";

/**
 * One at-a-glance fact — icon, label, the short answer — as a card that jumps
 * to (and opens) the full answer in the explorer. The whole card is the link,
 * so the tap target is generous on a phone.
 */
export function QuickAnswerCard({ answer, readMore }: { answer: QuickAnswer; readMore: string }) {
  return (
    <HashLink targetId={answer.target} sx={[cardSurface(false), { p: { xs: 4, md: 5 }, gap: 2 }]}>
      <IconBadge name={answer.icon} size={44} />
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mt: 2 }}
      >
        {answer.label}
      </Text>
      <Text variant="h5" component="p" sx={{ textWrap: "balance" }}>
        {answer.value}
      </Text>
      <Text
        component="span"
        variant="body2"
        sx={{
          mt: "auto",
          pt: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          fontWeight: 600,
        }}
      >
        {readMore}
        <Icon name="arrow-forward" fontSize="small" aria-hidden sx={{ color: "primary.main" }} />
      </Text>
    </HashLink>
  );
}
