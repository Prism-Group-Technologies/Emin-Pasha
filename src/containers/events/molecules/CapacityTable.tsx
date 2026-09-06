import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { rfpCopy } from "@/content/rfp-copy";
import type { Space } from "@/schemas/content/space";

const LAYOUTS = [
  ["theatre", "Theatre"],
  ["classroom", "Classroom"],
  ["banquet", "Banquet"],
  ["uShape", "U-shape"],
  ["cabaret", "Cabaret"],
] as const;

/**
 * Capacities by layout, rendered **from content**.
 *
 * No capacity figure exists anywhere in the source and all are forbidden to
 * invent (§0.7, TODO(EMIN-Q12)), so today every space renders the "on
 * request" state. `spaceSchema.capacities` is already typed and optional —
 * filling it in `content/meetings.ts` turns the table on with no code change,
 * and any space with partial data shows only the layouts it actually has.
 */
export function CapacityTable({ spaces }: { spaces: Space[] }) {
  const withData = spaces.filter((space) => space.capacities !== undefined);

  if (withData.length === 0) {
    return (
      <Box
        sx={{ p: 4, border: "1px dashed", borderColor: "warning.main", display: "grid", gap: 1 }}
      >
        <Text variant="overline" component="p" sx={{ fontFamily: "var(--font-cartographic)" }}>
          TODO(EMIN-Q12) — {rfpCopy.capacities.heading.toUpperCase()} ON REQUEST
        </Text>
        <Text variant="body2" color="text.secondary">
          {rfpCopy.capacities.pending}
        </Text>
      </Box>
    );
  }

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box component="table" sx={{ width: "100%", minWidth: 560, borderCollapse: "collapse" }}>
        <Box component="thead">
          <Box component="tr">
            {["Space", ...LAYOUTS.map(([, label]) => label)].map((heading) => (
              <Box
                key={heading}
                component="th"
                scope="col"
                sx={{
                  textAlign: "left",
                  py: 3,
                  borderBottom: "1px solid",
                  borderColor: "primary.main",
                }}
              >
                <Text variant="overline" component="span">
                  {heading}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {withData.map((space) => (
            <Box component="tr" key={space.id}>
              <Box
                component="th"
                scope="row"
                sx={{ textAlign: "left", py: 3, borderBottom: "1px solid", borderColor: "divider" }}
              >
                <Text variant="body2">{space.name}</Text>
              </Box>
              {LAYOUTS.map(([key]) => (
                <Box
                  key={key}
                  component="td"
                  sx={{ py: 3, borderBottom: "1px solid", borderColor: "divider" }}
                >
                  <Text variant="body2" color="text.secondary">
                    {space.capacities?.[key] ?? "—"}
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
