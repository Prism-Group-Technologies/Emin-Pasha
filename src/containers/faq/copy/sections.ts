/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Section eyebrows, headings, ledes and UI strings for every FAQ band, in
 * scroll order. Eyebrows are passed already prefixed "§ ", matching the site.
 * Plain strings only, so client islands can import this leaf directly.
 */
export const sections = {
  quick: {
    eyebrow: "§ AT A GLANCE",
    heading: "The six answers everyone looks for",
    description: "Tap a card to jump straight to the full answer.",
    readMore: "Read the answer",
  },
  questions: {
    eyebrow: "§ ASK ANYTHING",
    heading: "Search every answer",
    description:
      "Type a word — “breakfast”, “parking”, “deposit” — or pick a topic. Every answer has its own link, so you can share it.",
    searchLabel: "Search the FAQ",
    searchPlaceholder: "Try “airport”, “children” or “cancel”",
    clearSearch: "Clear search",
    topicsLabel: "Filter answers by topic",
    popularBadge: "Most asked",
    askAbout: "Ask about this",
    emptyHeading: "No answer for that — yet",
    emptyBody:
      "Ask the desk instead. The question you just typed is exactly the kind we are glad to answer.",
    emptyReset: "Show all answers",
  },
  helpful: {
    prompt: "Was this helpful?",
    yes: "Yes",
    no: "No",
    thanksYes: "Thank you — glad it helped.",
    thanksNo: "Sorry it didn't. Ask us directly and a person will answer properly.",
  },
  aside: {
    popularHeading: "Most asked",
    askHeading: "Can't find your answer?",
    askBody:
      "Message the desk on WhatsApp — a person replies, usually within the hour between 7am and 11pm.",
    askWhatsapp: "Ask on WhatsApp",
    askCall: "Call the desk",
  },
  guides: {
    eyebrow: "§ PLAN YOUR STAY",
    heading: "Beyond the answers",
    description:
      "Short guides to the parts of a visit guests plan most — each with the questions that go with it.",
    relatedLabel: "Related questions",
  },
  voices: {
    eyebrow: "§ GUESTS SAY",
    heading: "Why guests plan their stay with us directly",
    description: "Reviews from recent guests, and the promises behind every answer on this page.",
  },
  closing: {
    eyebrow: "§ STILL WONDERING?",
    heading: "Ask us anything — a person will answer",
    supporting:
      "Dates, dietary needs, a surprise for someone special. Send one WhatsApp message and the desk takes it from there.",
    whatsapp: "Ask on WhatsApp",
    call: "Call",
  },
  related: {
    eyebrow: "§ EXPLORE",
    heading: "Keep planning",
  },
  sticky: {
    lead: "Didn't find it?",
    whatsapp: "Ask on WhatsApp",
    search: "Search again",
  },
};
