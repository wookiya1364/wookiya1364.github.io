const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
  let config = {
    output: "export",
    distDir: "out",
    images: {
      unoptimized: true,
    },
    env: {
      BASE_URL: process.env.BLOG_HOST,
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log("DEV SERVER");
    return config;
  }

  // config.output = "export";
  config.env.BASE_URL = "https://wookiya1364.github.io/";

  return config;
};

module.exports = nextConfig;
