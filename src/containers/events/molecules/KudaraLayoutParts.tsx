import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

/**
 * The seat-dot primitives `KudaraLayoutDiagram` composes its schematics from.
 * Split into their own module so the diagram itself stays inside the
 * max-lines ceiling; nothing else imports these.
 */
export function Dot({ round }: { round: boolean }) {
  return (
    <Box
      sx={{
        width: round ? 11 : 9,
        height: round ? 11 : 9,
        borderRadius: round ? "50%" : "2px",
        bgcolor: "primary.main",
        opacity: 0.85,
      }}
    />
  );
}

export function Row({ count, round }: { count: number; round: boolean }) {
  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} round={round} />
      ))}
    </Box>
  );
}

/** The stage (or dance-floor) marker that heads every schematic. */
export function StageBadge({ label }: { label: string }) {
  return (
    <Box
      sx={{
        alignSelf: "center",
        px: 2,
        py: 0.25,
        borderRadius: "999px",
        bgcolor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Text
        sx={{
          fontFamily: "var(--font-cartographic)",
          fontSize: "0.5625rem",
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

/** A column of seat dots — the two arms of the U. */
export function Column({ count }: { count: number }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} round={false} />
      ))}
    </Box>
  );
}

/** The U-shape is the one layout `ROWS` cannot express as flat rows. */
export function UShapeSeating() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        height: "100%",
      }}
    >
      <Column count={4} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          justifyContent: "flex-end",
          height: "100%",
        }}
      >
        <Row count={5} round={false} />
      </Box>
      <Column count={4} />
    </Box>
  );
}
