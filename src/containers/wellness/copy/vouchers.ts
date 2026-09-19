/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface GiftVoucher {
  id: string;
  title: string;
  /** One line above the value — the "who it's for". */
  forWhom: string;
  blurb: string;
  /** Indicative value in UGX, or omit when the buyer sets the amount. */
  priceUgx?: number;
  /** Renders beside / instead of the value. */
  priceNote: string;
  /** The card's action label. */
  cta: string;
  /** Tints the card and adds the "Most loved" flag. */
  featured?: boolean;
}

/**
 * Three ways to give the spa. Values are invented placeholders (§0.7) and the
 * section copy flags them indicative and confirmed on purchase. Redemption
 * maps only onto approved §6 offerings. There is no online checkout — every
 * card routes to the WhatsApp wellness desk or the enquiry form, the same as
 * every other conversion surface on the page.
 */
export const giftVouchers: GiftVoucher[] = [
  {
    id: "treatment-voucher",
    title: "One Signature Treatment",
    forWhom: "A thank-you, or a birthday",
    blurb: "Their choice from the signature menu — massage, facial or deep sea-salt ritual.",
    priceUgx: 260000,
    priceNote: "indicative value",
    cta: "Buy a treatment voucher",
  },
  {
    id: "spa-day-voucher",
    title: "The Half-Day Retreat",
    forWhom: "The one they will remember",
    blurb:
      "A treatment, the Turkish bath, the pool and a two-course lunch — a whole morning given away.",
    priceUgx: 720000,
    priceNote: "indicative value",
    cta: "Buy a spa-day voucher",
    featured: true,
  },
  {
    id: "open-value-voucher",
    title: "An Open Amount",
    forWhom: "When you would rather they chose",
    blurb: "Choose any value and let them spend it on treatments, retail or the lounge.",
    priceNote: "You set the amount",
    cta: "Arrange an open voucher",
  },
];
