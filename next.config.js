/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Remove the output: 'export' for development
  // output: 'export', // Only use this when building for production
};

module.exports = nextConfig;
