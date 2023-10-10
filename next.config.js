/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    BASE_URL: process.env.BLOG_HOST,
  },
};

module.exports = nextConfig;
