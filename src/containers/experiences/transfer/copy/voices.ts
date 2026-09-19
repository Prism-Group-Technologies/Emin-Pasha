/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface TransferVoice {
  id: string;
  heading: string;
  quote: string;
  author: string;
  location: string;
  date: string;
}

/**
 * Placeholder traveller notes, rendered in the shared `QuoteCard`. None is a
 * real review and none may be attributed to a real person — the three
 * approved testimonials are about the hotel as a whole (TODO(EMIN-COPY)).
 */
export const transferVoices: TransferVoice[] = [
  {
    id: "delayed-flight",
    heading: "Three hours late, and he was still there",
    quote:
      "My connection through Addis slipped by three hours. I landed at 2am expecting to haggle for a taxi — instead the chauffeur was standing at the barrier with my name, and a cold towel in the car.",
    author: "Business traveller",
    location: "London",
    date: "Stayed March",
  },
  {
    id: "family-arrival",
    heading: "The child seats were already fitted",
    quote:
      "Two tired kids and five suitcases. The van was spotless, the car seats were in and checked, and we were in our room within the hour.",
    author: "Family of four",
    location: "Nairobi",
    date: "Stayed July",
  },
  {
    id: "delegation",
    heading: "Twelve delegates, not one missed",
    quote:
      "We had arrivals on four different flights. The hotel tracked all of them, sent the coach for the main group and a saloon for the late one. Flawless.",
    author: "NGO programme lead",
    location: "Geneva",
    date: "Stayed May",
  },
];
