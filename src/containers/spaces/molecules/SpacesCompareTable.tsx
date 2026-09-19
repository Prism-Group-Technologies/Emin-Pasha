import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import type { SpaceProfile } from "@/containers/spaces/copy/profiles";
import { radiusTokens } from "@/theme/tokens";

export interface CompareRow {
  id: string;
  name: string;
  profile: SpaceProfile;
}

const HEADINGS = [
  "Space",
  "Setting",
  "Seated / standing",
  "Hours",
  "Best for",
  "Hire from",
] as const;
const cell = {
  py: 3,
  px: { xs: 3, md: 4 },
  borderBottom: "1px solid",
  borderColor: "divider",
  verticalAlign: "top",
} as const;

const cellsFor = ({ profile }: CompareRow) => [
  profile.setting,
  `${profile.seated} / ${profile.standing}`,
  profile.hours,
  profile.bestFor.slice(0, 2).join(", "),
  formatUsd(profile.hireFromUsd),
];

/**
 * The three spaces side by side. A real `<table>` for assistive tech, inside
 * its own horizontal scroller so a phone scrolls the table — never the page.
 */
export function SpacesCompareTable({ rows }: { rows: CompareRow[] }) {
  return (
    <Box
      tabIndex={0}
      role="region"
      aria-label="Compare the spaces"
      sx={{
        overflowX: "auto",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: "background.paper",
      }}
    >
      <Box component="table" sx={{ width: "100%", minWidth: 720, borderCollapse: "collapse" }}>
        <Box component="thead">
          <Box component="tr" sx={{ bgcolor: "rgba(196,168,50,0.08)" }}>
            {HEADINGS.map((heading) => (
              <Box key={heading} component="th" scope="col" sx={{ ...cell, textAlign: "left" }}>
                <Text variant="overline" color="text.secondary">
                  {heading}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {rows.map((row) => (
            <Box component="tr" key={row.id}>
              <Box component="th" scope="row" sx={{ ...cell, textAlign: "left" }}>
                <Link href={`#${row.id}`} variant="subtitle2">
                  {row.name}
                </Link>
              </Box>
              {cellsFor(row).map((value, index) => (
                <Box component="td" key={HEADINGS[index + 1]} sx={cell}>
                  <Text variant="body2" color="text.secondary">
                    {value}
                  </Text>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
