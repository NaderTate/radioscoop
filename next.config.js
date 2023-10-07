/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  i18n: {
    locales: ["ar"],
    defaultLocale: "ar",
  },
  images: {
    domains: ["telegra.ph", "res.cloudinary.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
