import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { galleryCollections } from "@/containers/gallery/catalogue";
import { CollectionContainer } from "@/containers/gallery/collection";
import { collectionCopy } from "@/containers/gallery/copy/collections";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export function generateStaticParams() {
  return galleryCollections.map((collection) => ({ collection: collection.slug }));
}

export const dynamicParams = false;

const findCopy = (slug: string) => collectionCopy.find((copy) => copy.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const copy = findCopy(collection);
  if (!copy) {
    return {};
  }
  return {
    title: `${copy.title} Gallery | Emin Pasha Hotel Kampala`,
    description: copy.metaDescription,
    alternates: { canonical: `/gallery/${copy.slug}` },
  };
}

export default async function GalleryCollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: slug } = await params;
  const collection = galleryCollections.find((item) => item.slug === slug);
  if (!collection) {
    notFound();
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: collection.title },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <CollectionContainer collection={collection} />
    </>
  );
}
