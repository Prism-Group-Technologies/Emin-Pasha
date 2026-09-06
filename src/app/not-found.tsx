import type { Metadata } from "next";

import { NotFoundState } from "@/containers/route-states/NotFoundState";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundState />;
}
