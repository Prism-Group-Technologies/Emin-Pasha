import MuiBadge, { type BadgeProps as MuiBadgeProps } from "@mui/material/Badge";

export type BadgeProps = MuiBadgeProps;

/** Small count/status marker overlaid on another element (e.g. cart/notification counts). */
export function Badge(props: BadgeProps) {
  return <MuiBadge {...props} />;
}
