"use client";

import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Image, type ImageProps } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";

export interface MediaCardProps {
  image: Omit<ImageProps, "sizes"> & { sizes?: string };
  title: string;
  description?: string;
  href?: string;
}

/**
 * An image + title + description card — room/outlet/space listings.
 *
 * 'use client' justification: passes `Link` as `CardActionArea`'s
 * `component` prop — same real, build-verified constraint as `Link.tsx`
 * itself (a Server Component can't pass a component reference as a prop
 * into an MUI client component).
 */
export function MediaCard({ image, title, description, href }: MediaCardProps) {
  const { alt, ...imageRest } = image;
  const content = (
    <>
      <Image alt={alt} sizes="(max-width: 600px) 100vw, 33vw" {...imageRest} />
      <CardContent>
        <Typography variant="h4" component="h3">
          {title}
        </Typography>
        {description && <Typography variant="body2">{description}</Typography>}
      </CardContent>
    </>
  );

  if (href) {
    return (
      <MuiCard>
        <CardActionArea component={Link} href={href}>
          {content}
        </CardActionArea>
      </MuiCard>
    );
  }

  return <MuiCard>{content}</MuiCard>;
}
