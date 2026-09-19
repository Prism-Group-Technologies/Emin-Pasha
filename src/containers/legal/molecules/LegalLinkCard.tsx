import { Box } from "@/components/atoms/Box";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { LegalLink } from "@/containers/legal/catalogue";

export interface LegalLinkCardProps {
  link: LegalLink;
  current: boolean;
  currentLabel: string;
}

/** A cross-link card to another legal page; the current page is marked, not linked. */
export function LegalLinkCard({ link, current, currentLabel }: LegalLinkCardProps) {
  const body = (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <IconBadge name={link.icon} size={40} />
        {current ? (
          <Chip label={currentLabel} size="small" color="primary" variant="outlined" />
        ) : (
          <Icon name="arrow-forward" fontSize="small" aria-hidden sx={{ color: "primary.main" }} />
        )}
      </Box>
      <Text variant="h5" component="h3">
        {link.label}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {link.teaser}
      </Text>
    </>
  );

  const surface = [cardSurface(false), { gap: 2.5, p: { xs: 4, md: 5 }, color: "text.primary" }];

  if (current) {
    return (
      <Box
        aria-current="page"
        sx={[...surface, { borderColor: "primary.main", "&:hover": { transform: "none" } }]}
      >
        {body}
      </Box>
    );
  }
  return (
    <Link href={link.href} underline="none" sx={surface}>
      {body}
    </Link>
  );
}
