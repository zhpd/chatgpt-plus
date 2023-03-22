/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ['zh-CN', 'en-US'],
    defaultLocale: 'zh-CN',
    localeDetection: true,
    fallbackLng: {
      default: ['zh-CN'],
    },
    localePath: './src/locales',
  },
}

module.exports = nextConfig
