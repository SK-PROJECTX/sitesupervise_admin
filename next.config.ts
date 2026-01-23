import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MAKE TO REDIRECT FROM "/" TO "/admin"
  // rewrites: async () => ({
  //   beforeFiles: [
  //     {
  //       source: "/",
  //       destination: "/admin",
  //     },
  //   ],
  // }),
};

export default nextConfig;
