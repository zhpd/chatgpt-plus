/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `http://localhost:3002/api/:path*`,
        },
      ],
    }
  },
  i18n: {
    ...i18n,
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: /url/ }, // exclude if *.svg?url
      use: ['@svgr/webpack'],
    }) // 针对 SVG 的处理规则
    return config
  },
}

module.exports = nextConfig
