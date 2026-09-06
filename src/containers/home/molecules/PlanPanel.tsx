import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { PlanPathCopy } from "@/containers/home/copy";
import { CtaPair } from "@/containers/home/molecules/CtaPair";

export interface PlanPanelProps {
  path: PlanPathCopy;
  id: string;
  labelledBy: string;
}

/**
 * The open lead path: the argument on the left, the three concrete reasons and
 * the CTA pair on the right.
 *
 * `tabIndex={0}` on the panel is required by the tabs pattern — the panel has
 * no other focusable content on its own, so without it a keyboard user
 * arrowing through the tablist can never reach what they just selected.
 */
export function PlanPanel({ path, id, labelledBy }: PlanPanelProps) {
  return (
    <Box
      role="tabpanel"
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={0}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(0, 0.95fr)" },
        gap: { xs: 6, md: 8 },
        alignItems: "start",
        "&:focus-visible": { outlineOffset: 4 },
      }}
    >
      <Stack spacing={4}>
        <Text
          variant="overline"
          component="p"
          sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
        >
          {path.eyebrow}
        </Text>
        <Text variant="h2" component="h3" sx={{ textWrap: "balance" }}>
          {path.headline}
        </Text>
        <Text variant="subtitle1" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {path.body}
        </Text>
      </Stack>

      {/* The points and CTA sit on a card rather than loose in the column:
          three short bullets and two buttons floating on the page ground gave
          the panel no right-hand edge, which is what made the whole section
          look half-empty next to the headline. */}
      <Box sx={[cardSurface(), { gap: 6, bgcolor: "background.paper" }]}>
        <Stack component="ul" spacing={3} sx={{ m: 0, p: 0 }}>
          {path.points.map((point) => (
            <Box
              key={point}
              component="li"
              sx={{
                display: "flex",
                gap: 3,
                listStyle: "none",
                pb: 3,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Icon
                name="check-circle"
                aria-hidden
                fontSize="small"
                sx={{ color: "primary.main", flexShrink: 0, mt: "2px" }}
              />
              <Text variant="body1">{point}</Text>
            </Box>
          ))}
        </Stack>
        <CtaPair
          primary={path.primary}
          secondary={path.secondary}
          section={`plan-${path.id}`}
          size="large"
        />
      </Box>
    </Box>
  );
}
