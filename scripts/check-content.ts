/**
 * Content-integrity check — CLAUDE.md §3, this step's item 5. Imports the
 * actual exported content modules (so Zod's own `.parse()` calls run too —
 * a bad value fails this script the same way it fails the build) and scans
 * only what's exported: `LEGACY_ROOMS_DO_NOT_PUBLISH` and the draft room
 * descriptions in rooms.ts are deliberately invisible here because they are
 * never exported, which is the point of that pattern.
 *
 * Run: `yarn check:content`. Exits non-zero on any violation.
 */
import * as assets from "@/content/assets";
import * as booking from "@/content/booking";
import * as contact from "@/content/contact";
import * as contactCopy from "@/content/contact-copy";
import * as ctas from "@/content/ctas";
import * as dining from "@/content/dining";
import * as experiences from "@/content/experiences";
import * as faq from "@/content/faq";
import * as meetings from "@/content/meetings";
import * as navCopy from "@/content/nav-copy";
import * as navigation from "@/content/navigation";
import * as offers from "@/content/offers";
import * as policies from "@/content/policies";
import * as rfpCopy from "@/content/rfp-copy";
import * as rooms from "@/content/rooms";
import * as seo from "@/content/seo";
import * as shellContent from "@/content/shell";
import * as site from "@/content/site";
import * as social from "@/content/social";
import * as spaces from "@/content/spaces";
import * as story from "@/content/story";
import * as testimonials from "@/content/testimonials";
import * as wellness from "@/content/wellness";
import * as wellnessCopy from "@/content/wellness-copy";

const modules: Record<string, unknown> = {
  assets,
  booking,
  contact,
  contactCopy,
  ctas,
  dining,
  experiences,
  faq,
  meetings,
  navCopy,
  navigation,
  offers,
  policies,
  rfpCopy,
  rooms,
  seo,
  site,
  shellContent,
  social,
  spaces,
  story,
  testimonials,
  wellness,
  wellnessCopy,
};

const FORBIDDEN_SUBSTRINGS = [
  "USD",
  "Ina Aldrich",
  "Nice Place",
  "Castro",
  "5 days (change to 24hrs)",
  "(Replace the current with this)",
  "Next Media",
  "Timothy Rafi",
  "Unino Lavnos",
  "Greentree Wildlife Foundation",
  "Columbia Unisex Salon",
  "Fashion Revolution",
  "Two-bedroom Apartment",
];

const MIN_DUPLICATE_LENGTH = 60;

let errors = 0;

function fail(message: string) {
  console.error(`✗ ${message}`);
  errors += 1;
}

function ok(message: string) {
  console.log(`✓ ${message}`);
}

/** Walk every string value reachable from a module's exports. */
function collectStrings(value: unknown, path: string, out: Map<string, string[]>) {
  if (typeof value === "string") {
    const paths = out.get(value) ?? [];
    paths.push(path);
    out.set(value, paths);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, `${path}[${index}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      collectStrings(nested, `${path}.${key}`, out);
    }
  }
}

const allStrings = new Map<string, string[]>();
for (const [moduleName, moduleExports] of Object.entries(modules)) {
  collectStrings(moduleExports, moduleName, allStrings);
}

// 1. Forbidden substrings — none may appear anywhere in exported content.
for (const forbidden of FORBIDDEN_SUBSTRINGS) {
  const hits = [...allStrings.keys()].filter((value) => value.includes(forbidden));
  if (hits.length > 0) {
    fail(`forbidden string "${forbidden}" found in: ${hits.join(" | ")}`);
  }
}
if (errors === 0) {
  ok(`no forbidden strings found (${FORBIDDEN_SUBSTRINGS.length} checked)`);
}

// 2. Room rates: rateUgx must be a positive integer number, and no room
// object may contain the substring "USD" in any field.
for (const room of rooms.rooms) {
  if (!Number.isInteger(room.rateUgx) || room.rateUgx <= 0) {
    fail(`room "${room.id}" has a non-numeric or invalid rate`);
  }
}
ok(`all ${rooms.rooms.length} published room rates are valid UGX integers`);

// 3. Exactly the three approved testimonials, by id.
const approvedTestimonialIds = ["jacqui-fairness", "executive-serenity-spa", "william-w"];
const actualTestimonialIds = testimonials.testimonials.map((testimonial) => testimonial.id).sort();
if (JSON.stringify(actualTestimonialIds) !== JSON.stringify([...approvedTestimonialIds].sort())) {
  fail(
    `testimonials must be exactly ${JSON.stringify(approvedTestimonialIds)}, got ${JSON.stringify(actualTestimonialIds)}`,
  );
} else {
  ok("exactly the three approved testimonials are present, no more, no fewer");
}

// 4. No duplicate long string literals across *different* content modules —
// short shared labels (room/outlet names reused in nav, assets, etc.) are
// expected and not a bug; this only flags accidental copy-paste duplication.
for (const [value, paths] of allStrings) {
  if (value.length < MIN_DUPLICATE_LENGTH) continue;
  const moduleNames = new Set(paths.map((path) => path.split(".")[0]));
  if (moduleNames.size > 1) {
    fail(
      `duplicate string literal across ${[...moduleNames].join(", ")}: "${value.slice(0, 60)}…"`,
    );
  }
}
if (errors === 0) {
  ok("no duplicate long string literals across content modules");
}

if (errors > 0) {
  console.error(`\ncheck:content failed with ${errors} problem(s).`);
  process.exit(1);
}
console.log("\ncheck:content passed.");
