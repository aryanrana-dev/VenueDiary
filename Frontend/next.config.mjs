/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ],
  async rewrites() {
    return [
      {
        source: '/inquiry',
        destination: process.env.BACKEND_URL || 'http://localhost:5000/inquiry',
      },
    ]
  },
}

export default nextConfig
