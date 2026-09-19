import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import type { RhythmEntry } from "@/containers/spaces/copy/rhythm";
import { radiusTokens } from "@/theme/tokens";

/**
 * One day of the weekly rhythm: the day in the cartographic face, an icon, the
 * evening's title, where and when. The highlighted day (Band Night) gets a
 * gold fill wash and links through to its approved offer.
 */
export function RhythmDayCard({ entry }: { entry: RhythmEntry }) {
  return (
    <Box
      component="li"
      sx={{
        listStyle: "none",
        display: "grid",
        gap: 1.5,
        alignContent: "start",
        p: 3,
        minHeight: 180,
        borderRadius: `${radiusTokens.md}px`,
        border: "1px solid",
        borderColor: entry.highlight ? "primary.main" : "divider",
        bgcolor: entry.highlight ? "rgba(196,168,50,0.12)" : "background.default",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          component="p"
          sx={{
            fontFamily: "var(--font-cartographic)",
            letterSpacing: "0.14em",
            color: "primary.main",
          }}
        >
          {entry.day.toUpperCase()}
        </Text>
        <Icon name={entry.icon} fontSize="small" aria-hidden sx={{ color: "text.secondary" }} />
      </Box>
      <Text variant="subtitle1" component="h3" sx={{ fontWeight: 600, textWrap: "balance" }}>
        {entry.title}
      </Text>
      <Text variant="body2" color="text.secondary">
        {entry.where}
      </Text>
      {entry.href ? (
        <Link href={entry.href} variant="body2" sx={{ mt: "auto" }}>
          {entry.time} →
        </Link>
      ) : (
        <Text variant="body2" sx={{ mt: "auto", fontWeight: 600 }}>
          {entry.time}
        </Text>
      )}
    </Box>
  );
}
