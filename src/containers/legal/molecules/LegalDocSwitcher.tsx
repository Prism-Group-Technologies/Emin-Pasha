import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import type { LegalPageId } from "@/containers/legal/anchors";
import type { LegalLink } from "@/containers/legal/catalogue";
import { radiusTokens } from "@/theme/tokens";

export interface LegalDocSwitcherProps {
  links: LegalLink[];
  currentId: LegalPageId;
  label: string;
}

/** Compact jump list between the five legal pages, current page marked. */
export function LegalDocSwitcher({ links, currentId, label }: LegalDocSwitcherProps) {
  return (
    <Box component="nav" aria-label={label} sx={{ display: "grid", gap: 2 }}>
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
      >
        {label}
      </Text>
      {links.map((link) => {
        const current = link.id === currentId;
        return (
          <Link
            key={link.id}
            href={link.href}
            underline="none"
            aria-current={current ? "page" : undefined}
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2.5,
              py: 1.5,
              borderRadius: `${radiusTokens.sm}px`,
              color: current ? "text.primary" : "text.secondary",
              bgcolor: current ? "action.selected" : "transparent",
              fontWeight: current ? 600 : 400,
              "&:hover": { bgcolor: "action.hover", color: "text.primary" },
            }}
          >
            <Icon name={link.icon} fontSize="small" aria-hidden sx={{ color: "primary.main" }} />
            {link.label}
          </Link>
        );
      })}
    </Box>
  );
}
