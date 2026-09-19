import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { LegalCallout } from "@/containers/legal/molecules/LegalCallout";
import { LegalTable } from "@/containers/legal/molecules/LegalTable";
import type { LegalBlock } from "@/containers/legal/types";

/** Renders one document block by kind — the only branch point for body content. */
export function LegalBlockView({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <Text color="text.secondary" sx={{ textWrap: "pretty", lineHeight: 1.75 }}>
          {block.text}
        </Text>
      );
    case "list":
      return (
        <Box component="ul" sx={{ m: 0, pl: 5, display: "grid", gap: 2, color: "text.secondary" }}>
          {block.items.map((item) => (
            <Text
              key={item}
              component="li"
              sx={{ lineHeight: 1.7, "&::marker": { color: "primary.main" } }}
            >
              {item}
            </Text>
          ))}
        </Box>
      );
    case "callout":
      return <LegalCallout tone={block.tone} title={block.title} text={block.text} />;
    case "table":
      return <LegalTable caption={block.caption} columns={block.columns} rows={block.rows} />;
  }
}
