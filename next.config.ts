import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dining/hakki-pasha-restaurant-bar",
        destination: "/dining/equatoria-restaurant-bar",
        permanent: true,
      },
      // The hotel has no gym. /gym was indexed for "gym membership
      // Nakasero", so the route is retired with a permanent redirect to the
      // wellness hub rather than left to 404 on inbound links.
      {
        source: "/gym",
        destination: "/spa-and-wellness",
        permanent: true,
      },
      // Sir Samuel Baker is no longer sold as an outlet (general manager,
      // 2026-10-13): the hotel operates two restaurants, Equatoria and The
      // Rooftop Terrace. The URL was indexed for "fine dining Kampala" and
      // was already 404ing — `content/dining.ts` had dropped the outlet while
      // `routes.ts` still published it in the sitemap — so it redirects to the
      // dining hub, where both restaurants are listed, rather than to either
      // one of them: neither is a like-for-like replacement for a fine-dining
      // room, and the hub lets the visitor choose.
      {
        source: "/dining/sir-samuel-baker-fine-dining",
        destination: "/dining",
        permanent: true,
      },
    ];
  },
};

export default async function config(): Promise<NextConfig> {
  if (process.env.ANALYZE !== "true") {
    return baseConfig;
  }

  const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
    enabled: true,
  });

  return withBundleAnalyzer(baseConfig);
}
