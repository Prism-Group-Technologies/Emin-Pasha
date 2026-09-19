import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { RouteStop } from "@/containers/experiences/transfer/copy/route";

/**
 * The drive as a vertical line of stops — hollow markers for the waypoints,
 * filled for the two ends — joined by a hairline in the brand colour. An
 * ordered list, so the sequence is announced as a sequence.
 */
export function RouteTimeline({ stops }: { stops: RouteStop[] }) {
  const last = stops.length - 1;

  return (
    <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0 }}>
      {stops.map((stop, index) => {
        const isEnd = index === 0 || index === last;
        return (
          <Box
            component="li"
            key={stop.label}
            sx={{
              position: "relative",
              pl: 6,
              pb: index === last ? 0 : 5,
              "&::before": {
                content: '""',
                position: "absolute",
                left: 7,
                top: 18,
                bottom: 0,
                width: "2px",
                bgcolor: "primary.main",
                opacity: 0.35,
                display: index === last ? "none" : "block",
              },
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                left: 0,
                top: 3,
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: "2px solid",
                borderColor: "primary.main",
                bgcolor: isEnd ? "primary.main" : "background.default",
              }}
            />
            <Text variant="subtitle2" component="p">
              {stop.label}
            </Text>
            <Text variant="body2" color="text.secondary">
              {stop.detail}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
