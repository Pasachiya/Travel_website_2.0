import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/Travel_website_2.0', // Replace 'repository-name' with your GitHub repository name
};

export default nextConfig;
