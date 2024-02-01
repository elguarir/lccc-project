/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["este-center.s3.amazonaws.com", "res.cloudinary.com"],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/tailwind",
    ],
  },
};

export default nextConfig;
