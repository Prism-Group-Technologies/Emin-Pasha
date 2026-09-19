/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface CirclePerk {
  icon: IconName;
  title: string;
  detail: string;
}

export const circleCopy = {
  price: "Complimentary",
  qualifier: "after your third visit, or on request for hotel residents",
  ctaLabel: "Ask to join the Circle",
  footnote: "Perks are indicative and confirmed when you join.",
};

export const circlePerks: CirclePerk[] = [
  {
    icon: "payments",
    title: "10% on every lounge bill",
    detail: "Food and drink across all three spaces.",
  },
  {
    icon: "laptop",
    title: "Priority alcove booking",
    detail: "First call on the Acropole alcoves, even at weekends.",
  },
  {
    icon: "wine",
    title: "First invitations",
    detail: "Tastings, launches and the season's garden evenings.",
  },
  {
    icon: "camera",
    title: "A yearly garden portrait",
    detail: "One complimentary photoshoot slot in the gardens.",
  },
  {
    icon: "gift",
    title: "A birthday nightcap",
    detail: "On the house, by the fire, in your birthday month.",
  },
  {
    icon: "support-agent",
    title: "A named host",
    detail: "One person who knows your table and your drink.",
  },
];
