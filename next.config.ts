import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dining/hakki-pasha-restaurant-bar",
        destination: "/dining/equatoria-restaurant-bar",
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
