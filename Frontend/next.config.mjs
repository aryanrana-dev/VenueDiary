/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:5000'}/:path*`,
      },
    ]
  },
}

export default nextConfig
