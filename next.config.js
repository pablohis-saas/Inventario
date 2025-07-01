/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5558/api/:path*', // Cambiado a 5558
      },
    ]
  },
}

module.exports = nextConfig 