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
