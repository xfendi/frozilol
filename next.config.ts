import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ayhadv00jl.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "rose-realistic-gibbon-837.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
