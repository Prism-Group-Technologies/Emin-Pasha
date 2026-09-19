import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

/**
 * Short "best for" tags as outlined pills. Server-rendered text, not MUI
 * `Chip`s — they are labels, not controls, so they ship no JavaScript.
 */
export function TagList({ label, tags }: { label: string; tags: readonly string[] }) {
  return (
    <Box
      component="ul"
      aria-label={label}
      sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexWrap: "wrap", gap: 1.5 }}
    >
      {tags.map((tag) => (
        <Text
          key={tag}
          component="li"
          variant="body2"
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 999,
            border: "1px solid",
            borderColor: "primary.main",
            color: "text.primary",
            bgcolor: "rgba(196,168,50,0.08)",
          }}
        >
          {tag}
        </Text>
      ))}
    </Box>
  );
}
