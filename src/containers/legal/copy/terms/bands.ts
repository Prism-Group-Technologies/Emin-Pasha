/** ⚠️ INVENTED LEGAL COPY — NOT LEGAL ADVICE. Windows and percentages are placeholders. */
import type { LegalBand } from "@/containers/legal/types";
import { identity } from "@/content/identity";

export const termsSummary: LegalBand = {
  eyebrow: "§ AT A GLANCE",
  heading: "The terms that matter most",
  description: "The six points guests ask about — the full document follows.",
  items: [
    {
      icon: "event",
      title: "Free cancellation to 72 hours",
      body: "Flexible rates cancel free of charge until 72 hours before arrival, 14:00 local time.",
    },
    {
      icon: "payments",
      title: "One night's deposit",
      body: "A deposit of the first night secures most bookings; the balance is settled at departure.",
    },
    {
      icon: "schedule",
      title: `In from ${identity.checkInTime}, out by ${identity.checkOutTime}`,
      body: "Early check-in and late check-out are offered on request, subject to availability.",
    },
    {
      icon: "receipt",
      title: "Clear prices",
      body: "Rates are quoted with taxes and service shown, so the price you agree is the price you pay.",
    },
    {
      icon: "groups",
      title: "Children welcome",
      body: "Under-12s stay free in their parents' room using existing bedding.",
    },
    {
      icon: "gavel",
      title: "Ugandan law applies",
      body: "These terms are governed by the laws of Uganda, with disputes heard in Kampala.",
    },
  ],
};

export const termsHighlights: LegalBand = {
  eyebrow: "§ BOOK DIRECT",
  heading: "The same terms — with more when you book with us",
  description:
    "Booking directly by WhatsApp, phone or email always gives you our most flexible terms, and a few things no booking site can.",
  items: [
    {
      icon: "verified",
      title: "Best available rate",
      body: "Find a lower public rate for the same stay within 24 hours and we will match it.",
    },
    {
      icon: "handshake",
      title: "Flexible changes",
      body: "Move your dates once, free of charge, up to 72 hours before arrival.",
    },
    {
      icon: "auto-awesome",
      title: "Room preferences noted",
      body: "Garden view, quiet wing or connecting rooms — requested direct, recorded before you arrive.",
    },
  ],
  cta: { label: "See current offers", href: "/offers" },
};
