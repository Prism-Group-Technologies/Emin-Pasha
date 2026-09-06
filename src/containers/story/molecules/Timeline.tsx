import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { TIMELINE_LINKS } from "@/containers/story/constants";
import { story } from "@/content/story";

/**
 * The life, as the Equatorial Line turned horizontal — DESIGN_DIRECTION.md
 * §B.6's second application of the signature element.
 *
 * Every entry is an `<article>` with its own `<h3>` and a stable `id`, so a
 * single chapter can be linked and quoted on its own. That structure is the
 * point: an answer engine asked "what happened to Emin Pasha in Equatoria"
 * should be able to lift one self-contained section rather than the page.
 *
 * Body text is the source narrative verbatim. No historical claim, date or
 * detail is added here.
 */
export function Timeline() {
  return (
    <Box sx={{ position: "relative", pl: { xs: 5, md: 7 } }}>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: 0,
          top: 12,
          bottom: 12,
          width: "1px",
          bgcolor: "primary.main",
        }}
      />
      <Stack spacing={8}>
        {story.timeline.map((entry, index) => (
          <Reveal key={entry.id} index={index}>
            <Box
              component="article"
              id={entry.id}
              sx={{ position: "relative", scrollMarginTop: 120 }}
            >
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  left: { xs: -40, md: -56 },
                  top: 14,
                  width: { xs: 32, md: 44 },
                  height: "1px",
                  bgcolor: "primary.main",
                }}
              />
              <Text
                variant="overline"
                component="p"
                sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 2 }}
              >
                {`§ ${String(index + 1).padStart(2, "0")}`}
              </Text>
              <Text variant="h3" component="h3" sx={{ mb: 3 }}>
                {entry.title}
              </Text>
              <Text variant="body1" color="text.secondary" sx={{ maxWidth: "68ch" }}>
                {entry.body}
              </Text>
              {TIMELINE_LINKS[entry.id] && (
                <Stack direction="row" spacing={4} sx={{ mt: 3, flexWrap: "wrap" }}>
                  {TIMELINE_LINKS[entry.id]?.map((link) => (
                    <Link key={link.href} href={link.href} variant="body2">
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              )}
            </Box>
          </Reveal>
        ))}
      </Stack>
    </Box>
  );
}
