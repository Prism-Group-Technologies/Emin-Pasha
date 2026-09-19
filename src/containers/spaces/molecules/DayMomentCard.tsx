import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { DayMoment } from "@/containers/spaces/copy/day";

/**
 * One stop on the day timeline: the hour in the display face, an icon, the
 * moment and where it happens. A gold dot on the top edge sits on the
 * timeline rule drawn by the parent grid.
 */
export function DayMomentCard({ moment }: { moment: DayMoment }) {
  return (
    <Box component="li" sx={{ position: "relative", listStyle: "none", pt: 5 }}>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          left: 20,
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: "primary.main",
          boxShadow: "0 0 0 4px rgba(196,168,50,0.2)",
        }}
      />
      <Box component="article" sx={[cardSurface(), { gap: 2, height: "100%" }]}>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}
        >
          <Text
            component="p"
            sx={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              lineHeight: 1,
              color: "primary.main",
            }}
          >
            {moment.time}
          </Text>
          <IconBadge name={moment.icon} size={40} />
        </Box>
        <Text variant="h6" component="h3">
          {moment.title}
        </Text>
        <Text variant="overline" component="p" color="text.secondary">
          {moment.where}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {moment.detail}
        </Text>
      </Box>
    </Box>
  );
}
