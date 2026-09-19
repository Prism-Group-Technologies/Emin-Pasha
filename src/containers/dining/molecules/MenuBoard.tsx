import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import type { MenuCourse as MenuCourseData } from "@/containers/dining/copy";
import { MenuCourse } from "@/containers/dining/molecules/MenuCourse";

/**
 * The full sample menu laid out as a printed-menu board: courses flow into two
 * columns from `md` up so the block uses the section's whole width instead of
 * a single narrow column, and collapse to one column below it.
 *
 * A hairline separates rows but never sits on the top row — that edge already
 * has the section's own rule above it, and a second line 8px under it reads as
 * a mistake. So the rule is suppressed for the first row: every course below
 * `md`, the first two at `md` and up. Staggered per course, one step behind
 * the section header.
 */
export function MenuBoard({ courses }: { courses: MenuCourseData[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        columnGap: { md: 8 },
        rowGap: { xs: 5, md: 7 },
        alignItems: "start",
      }}
    >
      {courses.map((course, index) => (
        <Reveal key={course.name} index={index} fill>
          <Box
            sx={{
              height: "100%",
              borderTop: "1px solid",
              borderColor: "divider",
              borderTopWidth: { xs: index === 0 ? 0 : "1px", md: index < 2 ? 0 : "1px" },
              pt: {
                xs: index === 0 ? 0 : 4,
                md: index < 2 ? 0 : 5,
              },
            }}
          >
            <MenuCourse course={course} linkSignatures />
          </Box>
        </Reveal>
      ))}
    </Box>
  );
}
