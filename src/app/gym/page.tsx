import type { Metadata } from "next";

import { GymContainer } from "@/containers/wellness/gym";
import { gym } from "@/content/wellness";
import { gymJsonLd } from "@/lib/seo/wellness";

export const metadata: Metadata = {
  title: "Gym Membership Nakasero | Emin Pasha Kampala",
  description:
    "Newly renovated gym in Nakasero, Kampala. Certified trainers, personalised programmes and group classes. Membership open to non-residents. Daily 6:00am–9:00pm.",
  alternates: { canonical: "/gym" },
};

export default function GymPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gymJsonLd(gym.name, gym.description)) }}
      />
      <GymContainer />
    </>
  );
}
