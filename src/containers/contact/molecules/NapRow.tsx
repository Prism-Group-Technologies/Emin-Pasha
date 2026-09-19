import { Box } from "@/components/atoms/Box";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

export interface NapRowProps {
  icon: IconName;
  label: string;
  value: string;
  href: string;
}

/** One line of the address block: a gold glyph, a small label, the linked value. */
export function NapRow({ icon, label, value, href }: NapRowProps) {
  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
      <Icon name={icon} sx={{ color: "primary.main", mt: 0.5 }} aria-hidden />
      <Box sx={{ display: "grid", gap: 0.25, minWidth: 0 }}>
        <Text variant="caption" component="span" color="text.secondary">
          {label}
        </Text>
        <ExternalLink href={href} variant="body1" sx={{ overflowWrap: "anywhere" }}>
          {value}
        </ExternalLink>
      </Box>
    </Box>
  );
}
