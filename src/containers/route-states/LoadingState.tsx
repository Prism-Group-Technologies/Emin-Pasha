import { Box } from "@/components/atoms/Box";
import { Skeleton } from "@/components/atoms/Skeleton";
import { SectionShell } from "@/components/templates/SectionShell";
import { shell } from "@/content/shell";

const copy = shell.routeStates.loading;

/** Matches `PageHero`'s own `minHeight` default, so nothing jumps on the swap. */
const HERO_HEIGHT = { xs: 520, md: 640 };

/** The three-up grid that nearly every band on this site resolves to. */
const CARDS = [0, 1, 2];

/**
 * Route-level loading UI: the *shape* of the page that is coming, not a
 * spinner in the middle of an empty screen.
 *
 * The shape is the point. A centred spinner tells a guest that something is
 * happening but nothing about what, and when the real page lands it replaces a
 * small centred thing with a full-bleed hero — a layout jump at the exact
 * moment the guest is deciding whether their click worked. A block the height
 * of the hero followed by the standard header-and-three-cards rhythm reserves
 * what the page will actually occupy, so the swap is a change of content
 * rather than a change of layout.
 *
 * The heading stays in the document as a real `h1` but is not drawn: every
 * route needs one for document structure, and "Just gathering this for you"
 * set at display size over a grey rectangle would be the loudest thing on a
 * screen that exists to be looked past.
 *
 * `Skeleton`'s pulse is exempt from `prefers-reduced-motion` on the same
 * grounds as `Spinner` — it reports real status rather than decorating.
 */
export function LoadingState() {
  return (
    <>
      <Box
        component="h1"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          m: "-1px",
          p: 0,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
        }}
      >
        {copy.heading}
      </Box>

      <Skeleton variant="rectangular" aria-hidden sx={{ height: HERO_HEIGHT }} />

      <SectionShell motion="none">
        <Box sx={{ display: "grid", gap: 3, maxWidth: 640, mb: { xs: 6, md: 8 } }}>
          <Skeleton variant="text" aria-hidden sx={{ width: 120, fontSize: "0.8125rem" }} />
          <Skeleton variant="text" aria-hidden sx={{ width: "80%", fontSize: "2rem" }} />
          <Skeleton variant="text" aria-hidden sx={{ width: "95%" }} />
        </Box>

        <Box
          aria-hidden
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, 1fr)",
            },
            gap: { xs: 5, md: 6 },
          }}
        >
          {CARDS.map((card) => (
            <Box key={card} sx={{ display: "grid", gap: 3 }}>
              <Skeleton variant="rounded" sx={{ height: { xs: 220, md: 260 } }} />
              <Skeleton variant="text" sx={{ width: "70%", fontSize: "1.5rem" }} />
              <Skeleton variant="text" sx={{ width: "90%" }} />
              <Skeleton variant="text" sx={{ width: "45%" }} />
            </Box>
          ))}
        </Box>
      </SectionShell>
    </>
  );
}
