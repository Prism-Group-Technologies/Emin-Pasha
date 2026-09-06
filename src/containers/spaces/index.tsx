import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { NamesakeNote } from "@/containers/dining/molecules/NamesakeNote";
import { OutletCard } from "@/containers/dining/molecules/OutletCard";
import { spaces } from "@/content/spaces";
import { alternatingDirection } from "@/theme/motion";

/**
 * Lounges & Spaces — the three approved §5 spaces on one page rather than a
 * page each. Each has a single approved description and no rates, hours or
 * capacities of its own, so a detail route would be a thin page carrying one
 * paragraph, which PLAN.md §5 (risk 9) explicitly warns dilutes rather than
 * helps. The Equatorial Gardens' event use is carried by Meetings & Events.
 *
 * Cards link to the on-page anchor rather than to a route that would have
 * nothing more to say.
 */
export function SpacesContainer() {
  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ LOUNGES & SPACES"
        heading="Lounges & Spaces"
        headingLevel="h1"
      >
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Lounges & Spaces" }]} />
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)}>
        <Stack spacing={9}>
          {spaces.map((space) => (
            <Box key={space.id} id={space.id}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                  gap: { xs: 5, md: 8 },
                  alignItems: "start",
                }}
              >
                <OutletCard
                  id={space.id}
                  name={space.name}
                  description={space.description}
                  href={`#${space.id}`}
                />
                <NamesakeNote note={space.namedForNote} />
              </Box>
            </Box>
          ))}
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(2)} heading="Nearby" variant="raised">
        <RelatedLinks hrefs={["/dining", "/meetings-and-events", "/accommodation", "/offers"]} />
      </SectionShell>
    </>
  );
}
