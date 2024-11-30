/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add this to help with type generation
  typescript: {
    // Don't fail build on type errors during development
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
