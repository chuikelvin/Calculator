/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
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
