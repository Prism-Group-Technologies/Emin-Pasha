import Box from "@mui/material/Box";

/** A single hex-colour box, sized in px. Used by /styleguide only. */
export function ColorSwatch({ hex, size = 32 }: { hex: string; size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        backgroundColor: hex,
        border: "1px solid rgba(128,128,128,0.3)",
        flexShrink: 0,
      }}
    />
  );
}
