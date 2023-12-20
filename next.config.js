/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/main',
        destination: '/main/chat',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
