import type { NextConfig } from "next";
// import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

// const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'http://localhost:3000/graphql',
      },
    ];
  },
};

export default nextConfig;
