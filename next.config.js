const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
  let config = {
    images: {
      unoptimized: true,
    },
    env: {
      BASE_URL: process.env.BLOG_HOST,
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return config;
  }

  config.output = "export";
  config.env.BASE_URL = "https://wookiya1364.github.io/";
  config.exclude = ["/src/api/*/*.ts"];

  return config;
};

module.exports = nextConfig;
