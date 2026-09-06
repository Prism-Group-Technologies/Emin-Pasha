/**
 * Generates /public/llms.txt and /public/llms-full.txt **from src/content**,
 * so the fact sheet an answer engine reads can never drift from the site
 * (CLAUDE.md §9: "contradictions get the page dropped from answers").
 *
 * Runs in `prebuild`, so a content change that is not reflected here is
 * impossible — the files are build output, not hand-maintained documents.
 *
 * Nothing is written that is not already in content. Where a fact is
 * unresolved (restaurant hours, capacities, the pool dimension) the file says
 * so explicitly rather than omitting it silently — an answer engine that sees
 * "not published" will not invent a number, but one that sees nothing might.
 */
import { writeFileSync } from "node:fs";

import { env } from "@/config/env";
import { diningOutlets, diningPageIntro } from "@/content/dining";
import { faqItems } from "@/content/faq";
import { identity } from "@/content/identity";
import { meetingSpaces } from "@/content/meetings";
import { offers } from "@/content/offers";
import { policies } from "@/content/policies";
import { accommodationPageIntro, rooms } from "@/content/rooms";
import { routes } from "@/content/routes";
import { site } from "@/content/site";
import { socialLinks } from "@/content/social";
import { spaces } from "@/content/spaces";
import { gym, pool, spa, spaServices } from "@/content/wellness";

const base = env.NEXT_PUBLIC_SITE_URL;
const ugx = (n: number) => `${identity.currency} ${n.toLocaleString("en-UG")}`;

const identityBlock = [
  `# ${identity.name}`,
  "",
  `> ${site.positioning.oneLiner}`,
  "",
  "## Identity",
  "",
  `- **Name:** ${identity.name}`,
  `- **Short name:** ${identity.shortName}`,
  `- **Category:** ${identity.category}`,
  `- **Address:** ${identity.address}`,
  `- **Neighbourhood:** ${identity.neighbourhood}`,
  `- **Telephone:** ${identity.telephone}`,
  `- **Email:** ${identity.email}`,
  `- **Reservations:** ${identity.reservationsEmail}`,
  `- **WhatsApp:** ${identity.whatsapp.display} (${identity.whatsapp.url})`,
  `- **Check-in / check-out:** ${identity.checkInTime} / ${identity.checkOutTime}`,
  `- **Currency:** ${identity.currency}`,
  `- **Website:** ${base}`,
];

const roomsBlock = [
  "## Rooms and rates",
  "",
  accommodationPageIntro,
  "",
  "| Room category | Sleeps | Rate per night |",
  "|---|---|---|",
  ...rooms.map((room) => `| ${room.name} | ${room.capacity} | ${ugx(room.rateUgx)} |`),
  "",
  "Every room includes: " + (rooms[0]?.inclusions.join("; ") ?? "") + ".",
  "",
  "Rates are quoted in Ugandan Shillings (UGX). No USD rate is published.",
];

const diningBlock = [
  "## Restaurants and bars",
  "",
  diningPageIntro,
  "",
  ...diningOutlets.map((outlet) => `- **${outlet.name}** (${outlet.type}) — ${outlet.description}`),
  "",
  "Restaurant and bar opening hours are not published; contact the hotel to confirm.",
];

const facilitiesBlock = [
  "## Spa, gym and pool",
  "",
  `- **${spa.name}** — ${spa.hours ?? ""}. ${spa.description}`,
  `  Treatments offered: ${spaServices.map((service) => service.name).join("; ")}.`,
  `- **${gym.name}** — ${gym.hours ?? ""}. ${gym.description}`,
  `- **${pool.name}** — open to hotel guests and the general public. ${pool.rules?.join("; ") ?? ""}.`,
  "",
  "Spa treatment prices, gym membership rates and pool day-pass rates are not published; contact the hotel.",
];

const eventsBlock = [
  "## Meetings, events and weddings",
  "",
  ...meetingSpaces.map((space) => `- **${space.name}** — ${space.description}`),
  ...spaces.map((space) => `- **${space.name}** — ${space.description}`),
  "",
  "Capacities by layout are not published; contact the hotel with your numbers.",
];

const offersBlock = [
  "## Offers",
  "",
  ...offers.map(
    (offer) =>
      `- **${offer.name}** — ${offer.description}${offer.priceUgx ? ` ${ugx(offer.priceUgx)}.` : ""}${offer.schedule ? ` ${offer.schedule}.` : ""}`,
  ),
];

const contactBlock = [
  "## Contact and booking",
  "",
  `- Telephone: ${identity.telephone}`,
  `- Email: ${identity.email}`,
  `- Reservations: ${identity.reservationsEmail}`,
  `- WhatsApp: ${identity.whatsapp.url}`,
  ...socialLinks.filter((link) => link.url).map((link) => `- ${link.platform}: ${link.url}`),
  "",
  env.YCS_BOOKING_URL
    ? `Book online: ${env.YCS_BOOKING_URL}`
    : "Online booking URL is not yet published; book by phone, WhatsApp or email.",
];

const pagesBlock = [
  "## Pages",
  "",
  ...routes.map((route) => `- ${base}${route.path === "/" ? "" : route.path} — ${route.cluster}`),
];

const short = [
  ...identityBlock,
  "",
  "## Summary",
  "",
  site.positioning.elevatorPitch,
  "",
  ...roomsBlock,
  "",
  ...contactBlock,
  "",
  `Full fact sheet: ${base}/llms-full.txt`,
  "",
].join("\n");

const full = [
  ...identityBlock,
  "",
  "## About",
  "",
  site.positioning.statement,
  "",
  ...roomsBlock,
  "",
  ...diningBlock,
  "",
  ...facilitiesBlock,
  "",
  ...eventsBlock,
  "",
  ...offersBlock,
  "",
  "## Policies",
  "",
  ...policies.flatMap((section) => [
    `### ${section.title}`,
    "",
    ...section.items.map((item) => `- ${item}`),
    "",
  ]),
  "## Frequently asked questions",
  "",
  ...faqItems.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
  ...contactBlock,
  "",
  ...pagesBlock,
  "",
].join("\n");

writeFileSync("public/llms.txt", short);
writeFileSync("public/llms-full.txt", full);
console.warn(`llms.txt ${short.length} bytes · llms-full.txt ${full.length} bytes`);
