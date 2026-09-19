import { Box } from "@/components/atoms/Box";
import type { LayoutDiagram } from "@/containers/events/copy";
import { Row, StageBadge, UShapeSeating } from "@/containers/events/molecules/KudaraLayoutParts";

/** Seat rows per layout — a schematic, not a to-scale plan. */
const ROWS: Record<LayoutDiagram, number[]> = {
  theatre: [8, 8, 8, 8],
  classroom: [6, 6, 6],
  banquet: [4, 4, 4],
  cabaret: [4, 4, 3],
  uShape: [],
  reception: [5, 3, 6, 4],
};

const ROUND: LayoutDiagram[] = ["banquet", "cabaret", "reception"];

/**
 * A pure-CSS floor schematic for one Kudara Hall layout — a stage marker over a
 * dot pattern that reads at a glance. Decorative: the card's heading and
 * capacity carry the meaning, so the frame is `aria-hidden`. No imagery, so it
 * costs nothing and renders identically in both colour schemes.
 */
export function KudaraLayoutDiagram({ kind }: { kind: LayoutDiagram }) {
  const round = ROUND.includes(kind);

  return (
    <Box
      aria-hidden
      sx={{
        aspectRatio: "16 / 9",
        borderRadius: "12px",
        bgcolor: "action.hover",
        border: "1px solid",
        borderColor: "divider",
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <StageBadge label={kind === "reception" ? "FLOOR" : "STAGE"} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1.25,
        }}
      >
        {kind === "uShape" ? (
          <UShapeSeating />
        ) : (
          ROWS[kind].map((count, i) => <Row key={i} count={count} round={round} />)
        )}
      </Box>
    </Box>
  );
}
