import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    swcPlugins: [["@swc/plugin-styled-components", {}]],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "mobx-react-lite": require.resolve("mobx-react-lite"),
    };
    return config;
  },
};

export default nextConfig;
