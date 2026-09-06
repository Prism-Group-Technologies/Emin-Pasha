import Stack from "@mui/material/Stack";

import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { Text } from "@/components/atoms/Text";

const variants = ["primary", "secondary", "ghost", "link"] as const;

/** Button + IconButton — every variant, plus disabled/loading states. */
export function ButtonsSection() {
  return (
    <Stack spacing={2}>
      <Text variant="h2">Buttons</Text>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </Stack>
      <Text variant="body2">Disabled</Text>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} disabled>
            {variant}
          </Button>
        ))}
      </Stack>
      <Text variant="body2">Loading, with an icon slot, and as a link</Text>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap alignItems="center">
        <Button loading>Reserving…</Button>
        <Button startIcon={<Icon name="arrow-forward" fontSize="small" />}>Book Now</Button>
        <Button href="/contact" variant="ghost">
          Enquire (real Next.js Link)
        </Button>
      </Stack>
      <Text variant="body2">IconButton (44×44px touch target)</Text>
      <Stack direction="row" spacing={2}>
        <IconButton aria-label="Example: search">
          <Icon name="search" />
        </IconButton>
        <IconButton aria-label="Example: menu, disabled" disabled>
          <Icon name="menu" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
