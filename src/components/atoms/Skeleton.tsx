import MuiSkeleton, { type SkeletonProps as MuiSkeletonProps } from "@mui/material/Skeleton";

export type SkeletonProps = MuiSkeletonProps;

/** Loading placeholder — reserve the real element's dimensions to keep CLS at zero (CLAUDE.md §8). */
export function Skeleton(props: SkeletonProps) {
  return <MuiSkeleton {...props} />;
}
