/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icxlzwevzyhyhtzvaunh.supabase.co",
      },
    ],
  },
};

export default nextConfig;
