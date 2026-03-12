/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Source maps for client-side bundles in production
  productionBrowserSourceMaps: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
}

export default nextConfig
