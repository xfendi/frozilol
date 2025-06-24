import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ayhadv00jl.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
