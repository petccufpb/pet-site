/** @type {import('next').NextConfig} */

module.exports = () => ({
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, { dev: isDev, isServer }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /svgr/, // only use svgr to load svg if path ends with *.svg?svgr
      use: ["@svgr/webpack"],
    });

    // Re-add default nextjs loader for svg
    config.module.rules.push({
      test: /\.svg$/i,
      loader: "next-image-loader",
      issuer: { not: /\.(css|scss|sass)$/ },
      dependency: { not: ["url"] },
      resourceQuery: { not: [/svgr/] }, // Ignore this rule if the path ends with *.svg?svgr
      options: { isServer, isDev, basePath: "", assetPrefix: "" },
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "www.personality-insights.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "instagram.fjpa11-1.fna.fbcdn.net",
        port: "",
        pathname: "/v/**",
      },
      {
        protocol: "https",
        hostname: "i1.rgstatic.net",
        port: "",
        pathname: "/ii/profile.image/**",
      },
      {
        protocol: "https",
        hostname: "0.academia-photos.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
});
