import { z } from "zod";

/**
 * Server-only secrets (booking-engine credentials, email-provider keys — see
 * docs/03_OPEN_QUESTIONS.md Q34/Q50) must never be prefixed NEXT_PUBLIC_*.
 *
 * `YCS_BOOKING_URL` is the only one of the four YCS vars whose *value* may
 * reach the browser, and even that travels as a prop from a Server Component
 * rather than as a public env var — so its name stays unprefixed and nothing
 * is inlined into the client bundle at build time.
 *
 * All four YCS vars are `.optional()` on purpose: the site must build, render
 * and take enquiries with no credentials configured at all. With them absent
 * the booking adapter falls back to the enquiry path, which CLAUDE.md §4
 * requires to be "always present". A missing key is a degraded booking flow,
 * never a broken build.
 */
/**
 * `.optional()` alone is not enough here. A var declared-but-blank in `.env`
 * (`YCS_API_KEY=`) arrives as an **empty string**, not `undefined`, so it
 * reaches the validator and fails `.min(1)`/`.url()` — which broke the build
 * the first time the placeholder keys were committed. Blank is the normal
 * state until the operator pastes real credentials, so it has to mean
 * "not set".
 */
function blankAsUnset<T extends z.ZodType>(schema: T) {
  return z.preprocess((value) => (value === "" ? undefined : value), schema.optional());
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // TODO(EMIN-Q38): replace the localhost default with the confirmed production
  // domain once decided.
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),

  /** eZee/YCS property identifier. TODO(EMIN-Q50). */
  YCS_HOTEL_CODE: blankAsUnset(z.string().min(1)),
  /** Key for the `booking/reservation_api/listing.php` request types. TODO(EMIN-Q50). */
  YCS_API_KEY: blankAsUnset(z.string().min(1)),
  /** Key for the `kioskconnectivity` / `pms_connectivity.php` types. TODO(EMIN-Q50). */
  YCS_AUTH_CODE: blankAsUnset(z.string().min(1)),
  /**
   * The hotel's live booking-engine entry point — destination of the v1
   * deep-link handoff. TODO(EMIN-Q49): must be the real "Book Now" URL copied
   * from the hotel's own site, never a constructed one.
   */
  YCS_BOOKING_URL: blankAsUnset(z.url()),
  /**
   * Defaults to `sandbox` so a half-configured environment can never transact
   * against the real property (CLAUDE.md §3.5).
   */
  /** Serves /styleguide when "true"; 404s otherwise. Never on in production. */
  ENABLE_STYLEGUIDE: z.preprocess((value) => value === "true", z.boolean()).default(false),

  YCS_ENVIRONMENT: z
    .preprocess((value) => (value === "" ? undefined : value), z.enum(["sandbox", "live"]))
    .default("sandbox"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const { fieldErrors } = parsed.error.flatten();
  throw new Error(`Invalid environment variables: ${JSON.stringify(fieldErrors)}`);
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
