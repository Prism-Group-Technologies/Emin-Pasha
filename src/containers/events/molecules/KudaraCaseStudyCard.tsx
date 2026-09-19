import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { KudaraCaseStudy } from "@/containers/events/copy";

/**
 * One placeholder case note: the format, a headline outcome, two sentences of
 * detail and a strip of three figures. Attributions are placeholders — no real
 * organisation is named (see `copy/kudaraProof.ts`).
 */
export function KudaraCaseStudyCard({ study }: { study: KudaraCaseStudy }) {
  return (
    <Box component="article" sx={[cardSurface(), { gap: 3 }]}>
      <Text variant="overline" component="p" sx={{ color: "primary.main" }}>
        {study.format}
      </Text>
      <Text variant="h4" component="h3" sx={{ textWrap: "pretty" }}>
        {study.headline}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {study.body}
      </Text>

      <Box
        sx={{
          mt: "auto",
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
        }}
      >
        {study.metrics.map((metric) => (
          <Box key={metric.label} sx={{ display: "grid", gap: 0.5, justifyItems: "start" }}>
            <Icon name={metric.icon} aria-hidden fontSize="small" sx={{ color: "primary.main" }} />
            <Text component="span" sx={{ fontFamily: "var(--font-display)", fontSize: "1.125rem" }}>
              {metric.value}
            </Text>
            <Text
              variant="caption"
              component="span"
              color="text.secondary"
              sx={{ textWrap: "pretty" }}
            >
              {metric.label}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
