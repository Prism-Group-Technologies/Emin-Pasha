"use client";

import dynamic from "next/dynamic";

/**
 * Next.js requires `error.tsx` to be a Client Component — it is an error
 * boundary, and boundaries only exist on the client. Verified against the
 * installed next@16.2.12: the boundary is handed `error` and `reset`.
 *
 * Because it is a boundary, Next includes it in **every** route's client
 * graph, whether or not anything ever throws. `ErrorState` reads its copy
 * from the Zod-validated content layer, so importing it directly put Zod and
 * the whole shell content module into the first-load bundle of every page —
 * measured at 65 KB gzipped (DECISIONS.md D25). Loading it on demand costs
 * nothing: by definition it is only ever needed after something has already
 * gone wrong.
 *
 * `error` is deliberately not rendered. A raw stack or framework message is
 * not brand-voice copy and can leak internals; `reset` is the useful part.
 */
const ErrorState = dynamic(
  () => import("@/containers/route-states/ErrorState").then((m) => m.ErrorState),
  { ssr: false },
);

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <ErrorState onRetry={reset} />;
}
