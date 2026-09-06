import type { NextConfig } from "next";

const baseConfig: NextConfig = {};

export default async function config(): Promise<NextConfig> {
  if (process.env.ANALYZE !== "true") {
    return baseConfig;
  }

  const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
    enabled: true,
  });

  return withBundleAnalyzer(baseConfig);
}
