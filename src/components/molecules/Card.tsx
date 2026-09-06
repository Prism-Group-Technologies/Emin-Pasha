import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export interface CardProps extends MuiCardProps {
  children: React.ReactNode;
}

/** A content card — `radius-md` and `shadow-none` by default via `theme/components.ts`. */
export function Card({ children, ...rest }: CardProps) {
  return (
    <MuiCard {...rest}>
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
}
