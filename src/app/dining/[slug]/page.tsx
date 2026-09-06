import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OutletDetailContainer } from "@/containers/dining/detail";
import { diningOutlets } from "@/content/dining";
import { outletJsonLd } from "@/lib/seo/restaurant";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export function generateStaticParams() {
  return diningOutlets.map((outlet) => ({ slug: outlet.id }));
}

export const dynamicParams = false;

const findOutlet = (slug: string) => diningOutlets.find((outlet) => outlet.id === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const outlet = findOutlet(slug);
  if (!outlet) {
    return {};
  }
  return {
    title: `${outlet.name} | Emin Pasha Hotel Kampala`,
    // Built from the approved description only — no cuisine claim, no hours.
    description: outlet.description.slice(0, 155),
    alternates: { canonical: `/dining/${outlet.id}` },
  };
}

export default async function OutletPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const outlet = findOutlet(slug);
  if (!outlet) {
    notFound();
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Dining", href: "/dining" },
    { name: outlet.name },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(outletJsonLd(outlet)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <OutletDetailContainer outlet={outlet} />
    </>
  );
}
