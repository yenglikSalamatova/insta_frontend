/** @type {import('next').NextConfig} */
const nextConfig = {};

const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "app", "styles")],
  },
  images: {
    domains: ["loremflickr.com", "167.71.58.8"],
  },
};
