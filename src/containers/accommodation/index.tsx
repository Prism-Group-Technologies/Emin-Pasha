import { accommodationSectionMotion as m } from "@/containers/accommodation/motion";
import { AccommodationHero } from "@/containers/accommodation/organisms/AccommodationHero";
import { AmenitiesSection } from "@/containers/accommodation/organisms/AmenitiesSection";
import { BookDirectSection } from "@/containers/accommodation/organisms/BookDirectSection";
import { BookingSection } from "@/containers/accommodation/organisms/BookingSection";
import { ClosingSection } from "@/containers/accommodation/organisms/ClosingSection";
import { ComparisonSection } from "@/containers/accommodation/organisms/ComparisonSection";
import { FaqSection } from "@/containers/accommodation/organisms/FaqSection";
import { GuestVoices } from "@/containers/accommodation/organisms/GuestVoices";
import { LocationSection } from "@/containers/accommodation/organisms/LocationSection";
import { PackagesSection } from "@/containers/accommodation/organisms/PackagesSection";
import { RoomsSection } from "@/containers/accommodation/organisms/RoomsSection";
import { accommodationPageIntro } from "@/content/rooms";

/**
 * The Accommodation index. A Server Component that composes the section
 * organisms and holds no logic of its own — the only client islands are the
 * guest filter inside `RoomsSection` and the deferred booking widget inside
 * `BookingSection`. Scroll motion is entirely CSS.
 *
 * The order is a funnel, not a brochure:
 *
 *   hero          — the promise, the rate, and the two in-page CTAs
 *   rooms         — the four categories, filterable by party size
 *   amenities     — what every room includes, then the wider estate
 *   comparison    — the four side by side, the "compare" anchor target
 *   packages      — four reasons to be here, priced from the rate card
 *   book direct   — the answer to "should I use an aggregator instead?"
 *   booking       — check dates: the primary conversion surface, #book
 *   guest voices  — three attributed reviews, accommodation first
 *   faq           — the five questions reservations answer most
 *   location      — Nakasero, check-in/out, directions, cross-sell
 *   closing       — the last exit, on all three contact channels
 *
 * Conversion surfaces are spread rather than stacked: a visitor ready at the
 * hero jumps straight to #book; one who needs the whole argument still gets it.
 */
export function AccommodationContainer() {
  return (
    <>
      <AccommodationHero lede={accommodationPageIntro} />
      <RoomsSection motion={m.rooms} />
      <AmenitiesSection motion={m.amenities} />
      <ComparisonSection motion={m.comparison} />
      <PackagesSection motion={m.packages} />
      <BookDirectSection motion={m.bookDirect} />
      <BookingSection motion={m.booking} />
      <GuestVoices motion={m.guestVoices} />
      <FaqSection motion={m.faq} />
      <LocationSection motion={m.location} />
      <ClosingSection motion={m.closing} />
    </>
  );
}
