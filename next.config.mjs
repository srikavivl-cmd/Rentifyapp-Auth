import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  allowedDevOrigins: [
    '3dc730e5-c617-413a-810a-17b1deeb3d40-00-1zki55en201tp.riker.replit.dev',
    '.replit.dev',
    'localhost',
    '127.0.0.1',
    
  ],
};

export default withNextIntl(nextConfig);
