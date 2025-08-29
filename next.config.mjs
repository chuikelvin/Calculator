/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Commented out to enable API routes
  // distDir: "out", // Commented out to enable API routes
  assetPrefix: "",
  basePath: "",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
