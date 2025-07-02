import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '', // Optional: Defaults to '' if not specified
        pathname: '/u/**', // Allows any path starting with /u/
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '', // Optional
        pathname: '/**', // Allows any path under this hostname
      },
    ],
  },
};

export default nextConfig;
