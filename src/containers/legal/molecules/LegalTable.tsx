import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { radiusTokens } from "@/theme/tokens";

export interface LegalTableProps {
  caption: string;
  columns: string[];
  rows: string[][];
}

const cellSx = {
  textAlign: "left",
  verticalAlign: "top",
  px: 3,
  py: 2.5,
  borderBottom: "1px solid",
  borderColor: "divider",
  fontSize: "0.875rem",
  lineHeight: 1.5,
} as const;

/**
 * A real `<table>` — column headers, a row header per row and a caption —
 * inside its own horizontal scroller, so a wide table never widens the page
 * on a phone. The scroller is focusable and named by the caption so keyboard
 * users can scroll it too (WCAG 2.1.1).
 */
export function LegalTable({ caption, columns, rows }: LegalTableProps) {
  return (
    <Box
      role="region"
      aria-label={caption}
      tabIndex={0}
      sx={{
        overflowX: "auto",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.md}px`,
        bgcolor: "background.paper",
        "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main" },
      }}
    >
      <Box component="table" sx={{ width: "100%", minWidth: 520, borderCollapse: "collapse" }}>
        <Text
          component="caption"
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: "left", p: 3, captionSide: "top" }}
        >
          {caption}
        </Text>
        <thead>
          <tr>
            {columns.map((column) => (
              <Box
                component="th"
                scope="col"
                key={column}
                sx={[cellSx, { fontWeight: 600, bgcolor: "action.hover" }]}
              >
                {column}
              </Box>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Box
              component="tr"
              key={row.join("|")}
              sx={{ "&:last-of-type > *": { borderBottom: 0 } }}
            >
              {row.map((cell, index) =>
                index === 0 ? (
                  <Box component="th" scope="row" key={cell} sx={[cellSx, { fontWeight: 600 }]}>
                    {cell}
                  </Box>
                ) : (
                  <Box
                    component="td"
                    key={`${index}-${cell}`}
                    sx={[cellSx, { color: "text.secondary" }]}
                  >
                    {cell}
                  </Box>
                ),
              )}
            </Box>
          ))}
        </tbody>
      </Box>
    </Box>
  );
}
