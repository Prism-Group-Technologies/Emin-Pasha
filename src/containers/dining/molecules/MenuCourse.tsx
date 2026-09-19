import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { MenuCourse as MenuCourseData } from "@/containers/dining/copy";
import { DishRow } from "@/containers/dining/molecules/DishRow";

export interface MenuCourseProps {
  course: MenuCourseData;
  /**
   * Link each signature dish's "Signature" tag up to its card in the photo
   * strip. On by the outlet detail page (which has that strip), off on the
   * Dining index (which does not).
   */
  linkSignatures?: boolean;
}

/**
 * One course block from a sample menu: the course name in the cartographic
 * face over a divided list of `DishRow`s. Signature dishes are sorted to the
 * head of the list — a stable sort, so everything else keeps its order — so
 * the marked rows always come first.
 */
export function MenuCourse({ course, linkSignatures = false }: MenuCourseProps) {
  const items = [...course.items].sort(
    (a, b) => Number(Boolean(b.signature)) - Number(Boolean(a.signature)),
  );

  return (
    <Box component="section" sx={{ display: "grid", gap: 2 }}>
      <Text
        variant="overline"
        component="h4"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
      >
        {course.name}
      </Text>
      <Box sx={{ "& > * + *": { borderTop: "1px solid", borderColor: "divider" } }}>
        {items.map((item) => (
          <DishRow
            key={item.name}
            item={item}
            signatureHref={
              linkSignatures && item.signature && item.assetId ? `#${item.assetId}` : undefined
            }
          />
        ))}
      </Box>
    </Box>
  );
}
