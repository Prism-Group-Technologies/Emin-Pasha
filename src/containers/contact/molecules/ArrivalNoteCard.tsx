import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { ArrivalNote } from "@/containers/contact/copy";

/**
 * One practical arrival note. The airport-transfer note carries a link into
 * its own page, which turns a reassurance card into a cross-sell.
 */
export function ArrivalNoteCard({ note }: { note: ArrivalNote }) {
  return (
    <Box component="article" sx={[cardSurface(false), { gap: 3 }]}>
      <IconBadge name={note.icon} tone="garden" size={48} />
      <Text variant="h5" component="h3">
        {note.title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {note.body}
      </Text>
      {note.href && note.cta && (
        <Button
          href={note.href}
          variant="link"
          size="small"
          endIcon={<Icon name="arrow-forward" fontSize="small" />}
          sx={{ mt: "auto", alignSelf: "flex-start", px: 0 }}
        >
          {note.cta}
        </Button>
      )}
    </Box>
  );
}
