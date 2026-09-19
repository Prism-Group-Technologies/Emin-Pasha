import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { NamedAfterLink } from "@/containers/story/copy/namedAfter";

/**
 * One "named from this story" cross-link. The whole card is the link — the
 * internal-linking spine CLAUDE.md §9 asks for, where the pillar page earns
 * the authority and passes it to the commercial pages that carry those names.
 * `name` and `from` are drawn from the record; only `blurb` is invented.
 */
export function NamedAfterCard({ link }: { link: NamedAfterLink }) {
  return (
    <Link href={link.href} underline="none" sx={{ ...cardSurface(), color: "text.primary" }}>
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 2 }}
      >
        {`From — ${link.from}`}
      </Text>
      <Text
        variant="h5"
        component="h3"
        sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
      >
        {link.name}
        <Icon name="arrow-forward" fontSize="small" aria-hidden sx={{ color: "primary.main" }} />
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {link.blurb}
      </Text>
    </Link>
  );
}
