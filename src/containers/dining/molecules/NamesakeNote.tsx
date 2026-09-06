import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { NAMESAKE_HREF } from "@/containers/dining/constants";
import { ctas } from "@/content/ctas";

const readHistory = ctas.find((cta) => cta.id === "story-read");

/**
 * "Named for…" — the approved `namedForNote` verbatim, with a deep link into
 * the namesake pillar page. Only rendered where the source actually supplies
 * a note; the outlets with no recorded namesake get nothing rather than an
 * invented derivation.
 */
export function NamesakeNote({ note }: { note?: string }) {
  if (!note) {
    return null;
  }

  return (
    <Box
      sx={{
        borderLeft: "1px solid",
        borderColor: "primary.main",
        pl: 4,
        display: "grid",
        gap: 2,
      }}
    >
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
      >
        § THE NAME
      </Text>
      <Text variant="body1">{note}</Text>
      <Link href={NAMESAKE_HREF} variant="body2">
        {readHistory?.label ?? "Read our history"}
      </Link>
    </Box>
  );
}
