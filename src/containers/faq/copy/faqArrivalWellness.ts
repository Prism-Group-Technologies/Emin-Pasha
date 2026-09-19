/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { InventedFaq } from "@/containers/faq/types";

/**
 * Arrival and wellness questions the approved FAQ does not cover. The pool
 * and age rules echo `content/faq.ts`; the drive time, booking lead times and
 * spa provisions are wording to confirm — TODO(EMIN-COPY).
 */
export const arrivalWellnessFaqs: InventedFaq[] = [
  {
    id: "airport-distance",
    topic: "arrival",
    question: "How far is the hotel from Entebbe International Airport?",
    answer:
      "About 40 km. The drive usually takes between 45 minutes and an hour and a half on the Entebbe Expressway, depending on the time of day and Kampala traffic — which is exactly why our chauffeurs monitor your flight.",
  },
  {
    id: "late-arrival",
    topic: "arrival",
    question: "What if my flight lands late at night?",
    answer:
      "Share your flight number when you book. Your driver tracks the flight and the front desk expects you whatever the hour, so your room is ready when you walk in.",
  },
  {
    id: "getting-around-kampala",
    topic: "arrival",
    question: "How do I get around Kampala during my stay?",
    answer:
      "The desk can arrange a chauffeured car by the hour or the day, or a trusted driver for a single journey. Nakasero is minutes from the business district, the embassies and the city centre.",
  },
  {
    id: "whats-nearby",
    topic: "arrival",
    question: "What is close to the hotel?",
    answer:
      "The business district, several embassies, the Kampala Golf Club and Nakasero Market are a short drive away, and the Uganda Museum and the city's cultural sights are easy to reach. Ask the desk for a route that suits your day.",
  },
  {
    id: "spa-booking-lead-time",
    topic: "wellness",
    question: "How far ahead should I book a spa treatment?",
    answer:
      "A day ahead gives you the widest choice of times, and a few days ahead for weekends or treatments for two. Same-day bookings are welcome whenever a therapist is free — message us to check.",
  },
  {
    id: "spa-what-to-bring",
    topic: "wellness",
    question: "What should I bring to the spa?",
    answer:
      "Just yourself. Robes, towels and slippers are provided. Please arrive 15 minutes before your treatment to settle in, and remember the spa is for guests aged 16 and over.",
  },
  {
    id: "gym-for-guests",
    topic: "wellness",
    question: "Can hotel guests use the gym?",
    answer:
      "Yes — hotel guests can use the gym throughout their stay. Visitors who are not staying can buy a gym membership, which includes the facility and its professional trainers.",
  },
  {
    id: "pool-towels",
    topic: "wellness",
    question: "Are towels provided at the pool?",
    answer:
      "Yes. Pool towels are provided for hotel guests and day visitors, with changing facilities beside the pool. Children must be accompanied by an adult at all times.",
  },
];
