import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    serverActions: {
      bodySizeLimit: '1mb',
      allowedOrigins: [ process.env.NEXT_PUBLIC_SUPABASE_URL!], 
    }
  },
};

export default nextConfig;
