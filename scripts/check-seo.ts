/**
 * SEO/AEO assertions — CLAUDE.md §9 and this step's items 1, 6 and 7.
 *
 * Runs in CI alongside `check:content`. There is no test framework installed
 * (Vitest is still unapproved, Q29), so this follows the established
 * `check-content.ts` precedent: real assertions, real exit codes, no new
 * dependency.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { identity } from "@/content/identity";
import { routes } from "@/content/routes";
import { seoMeta } from "@/content/seo";

const problems: string[] = [];
const pass = (message: string) => console.warn(`✓ ${message}`);
const fail = (message: string) => problems.push(message);

// ── 1. Approved metadata lengths ────────────────────────────────────────────
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;
let overLength = 0;
for (const meta of seoMeta) {
  if (meta.title.length > TITLE_MAX) {
    fail(`title too long (${meta.title.length} > ${TITLE_MAX}) for "${meta.page}": ${meta.title}`);
    overLength += 1;
  }
  if (meta.description.length > DESCRIPTION_MAX) {
    fail(
      `description too long (${meta.description.length} > ${DESCRIPTION_MAX}) for "${meta.page}"`,
    );
    overLength += 1;
  }
}
if (overLength === 0) {
  pass(
    `all ${seoMeta.length} approved titles ≤ ${TITLE_MAX} and descriptions ≤ ${DESCRIPTION_MAX} chars`,
  );
}

// ── 2. Every route file has metadata with a canonical ───────────────────────
function pageFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      return pageFiles(full);
    }
    return entry === "page.tsx" ? [full] : [];
  });
}
const pages = pageFiles("src/app");
let missingCanonical = 0;
for (const file of pages) {
  const source = readFileSync(file, "utf8");
  if (file.includes("styleguide")) {
    continue;
  }
  if (!source.includes("canonical")) {
    fail(`no canonical in ${file}`);
    missingCanonical += 1;
  }
}
if (missingCanonical === 0) {
  pass(`all ${pages.length - 1} indexable routes declare a canonical URL`);
}

// ── 3. NAP audit — byte-identical everywhere ────────────────────────────────
const llms = readFileSync("public/llms.txt", "utf8");
const llmsFull = readFileSync("public/llms-full.txt", "utf8");
const napFields: [string, string][] = [
  ["name", identity.name],
  ["address", identity.address],
  ["telephone", identity.telephone],
];
let napProblems = 0;
for (const [label, value] of napFields) {
  for (const [where, haystack] of [
    ["llms.txt", llms],
    ["llms-full.txt", llmsFull],
  ] as const) {
    if (!haystack.includes(value)) {
      fail(`NAP ${label} not byte-identical in ${where}: expected "${value}"`);
      napProblems += 1;
    }
  }
}
// The footer, contact page and every JSON-LD builder read `identity` directly
// rather than restating the strings — assert that, since it is what makes the
// NAP structurally incapable of drifting.
for (const file of [
  "src/components/organisms/Footer/NapBlock.tsx",
  "src/containers/contact/organisms/ContactDetails.tsx",
  "src/lib/seo/organisation.ts",
]) {
  const source = readFileSync(file, "utf8");
  if (!source.includes("identity.address") || !source.includes("identity.telephone")) {
    fail(`${file} does not read the NAP from content/identity.ts`);
    napProblems += 1;
  }
}
if (napProblems === 0) {
  pass("NAP (name, address, phone) byte-identical across footer, contact, JSON-LD and llms.txt");
}

// ── 4. Internal linking: no orphans, ≥ 3 outbound links per page ────────────
const paths = new Set(routes.map((route) => route.path));
const inboundCount = new Map<string, number>(routes.map((route) => [route.path, 0]));
let linkProblems = 0;
for (const route of routes) {
  if (route.linksTo.length < 3) {
    fail(`${route.path} declares only ${route.linksTo.length} internal links (minimum 3)`);
    linkProblems += 1;
  }
  for (const target of route.linksTo) {
    if (!paths.has(target)) {
      fail(`${route.path} links to "${target}", which is not a known route`);
      linkProblems += 1;
    }
    inboundCount.set(target, (inboundCount.get(target) ?? 0) + 1);
  }
}
for (const [path, count] of inboundCount) {
  // The homepage is reached from the header logo on every page, not from the
  // route graph, so it is exempt from the inbound-link requirement.
  if (count === 0 && path !== "/") {
    fail(`orphan page: nothing links to ${path}`);
    linkProblems += 1;
  }
}
if (linkProblems === 0) {
  pass(`internal linking: ${routes.length} routes, all ≥ 3 outbound links, no orphans`);
}

// ── 5. No AggregateRating anywhere ──────────────────────────────────────────
const seoFiles = readdirSync("src/lib/seo").map((f) =>
  readFileSync(join("src/lib/seo", f), "utf8"),
);
// Match the property as code (`aggregateRating:` or `"aggregateRating"`),
// not as prose — the first run flagged organisation.ts's own comment
// explaining why it is absent.
const ratingAsCode = /aggregateRating\s*:|"aggregateRating"/;
if (seoFiles.some((source) => ratingAsCode.test(source))) {
  fail("aggregateRating present in a JSON-LD builder — forbidden until verified reviews exist");
} else {
  pass("no aggregateRating in any JSON-LD builder");
}

if (problems.length > 0) {
  for (const problem of problems) {
    console.error(`✗ ${problem}`);
  }
  console.error(`\ncheck:seo failed with ${problems.length} problem(s).`);
  process.exit(1);
}
console.warn("\ncheck:seo passed.");
