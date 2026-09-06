import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface LogoWordmarkProps {
  shortName: string;
  suffix: string;
  nameColor: string;
  suffixColor: string;
  nameSize: { xs: string; md: string };
  /** Condensed hides the suffix without unmounting it, so nothing reflows. */
  suffixHidden: boolean;
  transition: string;
}

/**
 * The typographic half of the lock-up, and the half that carries the
 * accessible name of the home link — both strings are approved §1 name forms
 * (`identity.shortName`, `shell.header.wordmarkSuffix`), handed down as props
 * rather than read here, so nothing is invented and the content layer stays
 * out of the client bundle (headerData.ts).
 *
 * The suffix collapses rather than unmounting: `height: 0` + `opacity: 0`
 * keeps it in the accessibility tree's document order and, more importantly,
 * means the condense transition animates a value instead of removing a node.
 */
export function LogoWordmark({
  shortName,
  suffix,
  nameColor,
  suffixColor,
  nameSize,
  suffixHidden,
  transition,
}: LogoWordmarkProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      <Typography
        component="span"
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: nameSize,
          lineHeight: 1.1,
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          color: nameColor,
          transition,
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        {shortName}
      </Typography>
      <Typography
        component="span"
        variant="overline"
        aria-hidden={suffixHidden}
        sx={{
          fontSize: "0.625rem",
          lineHeight: 1.4,
          color: suffixColor,
          opacity: suffixHidden ? 0 : 1,
          height: suffixHidden ? 0 : "auto",
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: { xs: "none", sm: "block" },
          transition,
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        {suffix}
      </Typography>
    </Box>
  );
}
