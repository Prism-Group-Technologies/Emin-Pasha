import { type Facility, facilitySchema } from "@/schemas/content/facility";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §8, §9. Transfer distance/price is
 * TODO(EMIN-Q09). Shop naming ("CG Shop" / "Emin Pasha CG Shop" / "Mehmet
 * Gift Shop", and what CG stands for) is unresolved — TODO(EMIN-Q19); "Emin
 * Pasha CG Shop" is used here as the form most repeated in approved copy.
 */
export const airportTransfer: Facility = facilitySchema.parse({
  id: "airport-transfer",
  name: "Airport Transfer",
  description:
    "Comfortable and well-maintained vehicles with modern amenities and spacious interiors. Professional and courteous chauffeurs prioritising safety, comfort and satisfaction — professionalism, punctuality and impeccable service. Personalised assistance, from luggage to special requests. Efficient transfers with close flight monitoring, so chauffeurs are ready on arrival regardless of unexpected delays. Safety and security: vehicles regularly maintained to the highest safety standards; well-trained chauffeurs. Arrange transfers at reservations@eminpasha.com.",
});

export const airportTransferPageIntro =
  "Begin and end your trip the right way. A fleet of comfortable, well-maintained vehicles, professional chauffeurs who monitor your flight and are waiting regardless of delays, and personalised assistance from the kerb to your room. Complimentary on stays of more than one week.";

export const cgShop: Facility = facilitySchema.parse({
  id: "cg-shop",
  name: "Emin Pasha CG Shop",
  description:
    "For generations we have communicated through art. Uganda has an illustrious history in the arts, and you can delve into it during your visit to the Emin Pasha CG Shop. Buy authentic art pieces and décor. Art exists in every community, culture and country, and has been created since time began — evidenced in cave paintings and rock art. At the Gift Shop we believe that art speaks a language that cuts across all cultures, and in doing so unites us all.",
});

export const cgShopPageIntro =
  "For generations we have communicated through art. Uganda has an illustrious history in the arts — delve into it at the Emin Pasha CG Shop, where you can buy authentic art pieces and décor. We believe art speaks a language that cuts across all cultures, and in so doing unites us all.";
