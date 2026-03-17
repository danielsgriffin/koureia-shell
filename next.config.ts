import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Images from CDN and Supabase storage
  images: {
    remotePatterns: [
      { hostname: "hypandra.b-cdn.net" },
      { hostname: "*.supabase.co" },
    ],
  },
}

export default nextConfig
