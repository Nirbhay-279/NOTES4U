/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["firebasestorage.googleapis.com"],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;
// next.config.js
module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'res.cloudinary.com'],
  },
};
