import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

/**
 * Stands in for a room's descriptive prose.
 *
 * The four descriptions in §4 are marked `[DRAFT — VERIFY]` and there is no
 * approval entry in `docs/DECISIONS.md`, so they are not rendered
 * (TODO(EMIN-Q15)). No substitute prose is written here either: inventing
 * room copy is precisely what CLAUDE.md §3 forbids, and the drafts
 * themselves reference a bed configuration and a view, neither of which is
 * verified and both of which this step's brief rules out.
 *
 * Visible rather than silent, so the gap is obvious to anyone reviewing the
 * page and cannot ship unnoticed.
 */
export function DraftCopyNotice({ roomName }: { roomName: string }) {
  return (
    <Box
      sx={{
        p: 4,
        border: "1px dashed",
        borderColor: "warning.main",
        display: "grid",
        gap: 1,
      }}
    >
      <Text variant="overline" component="p" sx={{ fontFamily: "var(--font-cartographic)" }}>
        TODO(EMIN-Q15) — DESCRIPTION AWAITING APPROVAL
      </Text>
      <Text variant="body2" color="text.secondary">
        {`The written description of the ${roomName} is still marked [DRAFT — VERIFY] in the content source and has not been signed off. The facts below are approved and accurate.`}
      </Text>
    </Box>
  );
}
