/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface BenefitCopy {
  title: string;
  description: string;
}

export const roomsSection = {
  eyebrow: "§ THE FOUR",
  heading: "Choose your room",
  description:
    "Every room and suite opens onto the gardens and comes with fast unlimited fibre, 24/7 room service and an à la carte breakfast. Set the number of guests to see the categories that fit.",
};

export const amenitiesSection = {
  eyebrow: "§ WHAT'S INCLUDED",
  heading: "The same standard in every room",
  description:
    "No resort fees, no tiers on the essentials. What follows is in every category, from the Deluxe Room up — and then there is the rest of the estate, a few steps from your door.",
  inRoomTitle: "In every room",
  estateTitle: "Across the estate",
};

export const comparisonSection = {
  eyebrow: "§ SIDE BY SIDE",
  heading: "Compare the four",
  description:
    "Only the facts the property verifies — who each room suits, how many it sleeps, and the nightly rate it starts from.",
};

export const packagesSection = {
  eyebrow: "§ WAYS TO STAY",
  heading: "Packages built around a reason to be here",
  description:
    "Business in Nakasero, a weekend in the garden, a month between postings, a family in one suite. Tell reservations which one you are and the rest is arranged before you arrive.",
};

export const bookDirectSection = {
  eyebrow: "§ BOOK DIRECT",
  heading: "Better with us than about us",
  description:
    "We are independently owned. Booking direct means the people confirming your room are the ones who will meet you at the gate.",
  benefits: [
    {
      title: "The published rate",
      description:
        "Rates in Ugandan shillings, breakfast included, shown in full before you start — nothing revealed at a final step.",
    },
    {
      title: "A person on the other end",
      description:
        "Reservations answer by phone, WhatsApp and email, and can hold a room while you confirm your dates.",
    },
    {
      title: "Requests that stick",
      description:
        "Early arrival, a garden-facing room, a quiet wing, a dietary need — tell us once and it reaches housekeeping and the kitchen.",
    },
    {
      title: "Arranged directly",
      description:
        "Extended stays, late checkout and a flight-monitored airport transfer, without a third party's rules in the way.",
    },
  ] satisfies BenefitCopy[],
  primaryCta: { label: "Check availability", href: "#book" },
};

export const bookingSection = {
  eyebrow: "§ YOUR DATES",
  heading: "Check dates and rates",
  description:
    "Pick your nights and party size. Reservations confirm the room, the rate and any request you add — the same working day.",
};

export const guestVoicesSection = {
  eyebrow: "§ IN THEIR WORDS",
  heading: "What guests say about staying here",
  description: "Attributed, dated and unedited — the accommodation reviews first.",
};

export const faqSection = {
  eyebrow: "§ GOOD TO KNOW",
  heading: "Before you book",
  description:
    "Check-in and check-out, breakfast, Wi-Fi, children and the cancellation terms — the questions reservations answer most.",
};

export const locationSection = {
  eyebrow: "§ NAKASERO",
  descriptionLead:
    "The room is only half of it. The address is the other half: enclosed, gardened and quiet, five minutes from the business district and completely out of earshot of it.",
  directionsHeading: "Getting here",
};

export const closingSection = {
  eyebrow: "§ THE LAST STEP",
  heading: "Your room is waiting",
  supporting:
    "Send us your dates and reservations reply the same working day. Would rather see it first? The gate is open.",
  primaryCtaLabel: "Check availability",
  callLabel: "Call reservations",
  whatsappLabel: "Message on WhatsApp",
  emailLabel: "Email reservations",
};
