import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { KudaraLayout } from "@/containers/events/copy";
import { KudaraLayoutDiagram } from "@/containers/events/molecules/KudaraLayoutDiagram";

/**
 * One Kudara Hall layout: the schematic, the layout name with its indicative
 * maximum, what it is set for, and one line on the dressing. The capacity is a
 * placeholder and is labelled "indicative" here and in the section note.
 */
export function KudaraLayoutCard({ layout }: { layout: KudaraLayout }) {
  return (
    <Box component="article" sx={[cardSurface(), { gap: 3 }]}>
      <KudaraLayoutDiagram kind={layout.diagram} />

      <Box
        sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 2 }}
      >
        <Text variant="h4" component="h3">
          {layout.label}
        </Text>
        <Text component="span" sx={{ fontFamily: "var(--font-display)", fontSize: "1.375rem" }}>
          {layout.capacity}
        </Text>
      </Box>

      <Text variant="overline" component="p" color="text.secondary">
        Up to {layout.capacity} · indicative
      </Text>

      <Text variant="body2" sx={{ fontWeight: 600, textWrap: "pretty" }}>
        {layout.bestFor}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ mt: "auto", textWrap: "pretty" }}>
        {layout.note}
      </Text>
    </Box>
  );
}
