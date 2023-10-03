/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ar"],
    defaultLocale: "ar",
  },
  images: {
    domains: ["telegra.ph", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
