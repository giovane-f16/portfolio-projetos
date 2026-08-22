import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    // Keep production type checks on the TypeScript compiler API.
    useTypeScriptCli: false,
  },
  poweredByHeader: false,
};

export default nextConfig;
