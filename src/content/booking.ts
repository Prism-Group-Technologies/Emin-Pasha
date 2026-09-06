import { type BookingCopy, bookingCopySchema } from "@/schemas/content/booking";

/**
 * Availability-widget copy. Interface copy, not facts — nothing here asserts
 * a rate, a capacity or that a room is available. Written to the §2 tone of
 * voice: warm, plain, no exclamation marks, no "Oops". Registered with the
 * rest of the chrome copy as TODO(EMIN-Q68).
 *
 * The error sentences deliberately never blame the guest and never name the
 * vendor. Two of them route to a human, because a booking form that fails
 * with no way forward is a lost booking.
 */
const raw: BookingCopy = {
  eyebrow: "§ AVAILABILITY",
  heading: "Check dates and rates",

  fields: {
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    adults: "Adults",
    children: "Children",
    rooms: "Rooms",
    promoCode: "Promo or rate code",
  },

  actions: {
    submit: "Check Availability",
    submitting: "Checking…",
    openGuests: "Change guests and rooms",
    done: "Done",
    back: "Back",
    next: "Next",
    close: "Close",
  },

  nights: { one: "{count} night", many: "{count} nights" },

  summary: {
    label: "Your stay",
    editDates: "Change dates",
    editGuests: "Change guests and rooms",
    collapse: "Hide the availability search",
    guests: { one: "{count} guest", many: "{count} guests" },
    rooms: { one: "{count} room", many: "{count} rooms" },
    dateSeparator: " – ",
    partSeparator: " · ",
  },

  states: {
    idle: "Choose your dates and we will show you what is open.",
    loading: "Looking at the diary…",
    handoff: "Taking you through to booking — one moment.",
    empty:
      "Nothing is open for those dates. Try moving them by a day or two, or talk to us — we can often find a way.",
  },

  validation: {
    checkInPast: "Check-in cannot be in the past.",
    checkOutNotAfter: "Check-out needs to be after check-in.",
    checkOutTooLong:
      "That is a longer stay than we can book online. Talk to us and we will arrange it.",
    checkInTooFarAhead:
      "That is further ahead than our diary is open. Talk to us and we will pencil you in.",
    required: "Please choose your dates.",
  },

  errors: {
    configuration:
      "We cannot reach our booking system just now. Nothing is wrong at your end — send us your dates and we will confirm by hand.",
    engineDown:
      "Our booking system is not responding. Send us your dates and we will come straight back to you.",
    dates: "Those dates did not come through correctly. Please pick them again.",
    stayTooLong:
      "That is a longer stay than we can book online. Talk to us and we will arrange it.",
    occupancy:
      "That is more guests than one booking allows. Split it across rooms, or ask us and we will set it up.",
    noAvailability:
      "Nothing is open for those dates. Try moving them by a day or two, or talk to us — we can often find a way.",
    generic: "That did not go through. Send us your dates and we will confirm your room by hand.",
  },

  enquiryFallback: {
    lead: "Prefer to speak to someone? Every booking here is handled by a person anyway.",
    action: "Send your dates",
  },
};

export const bookingCopy: BookingCopy = bookingCopySchema.parse(raw);
