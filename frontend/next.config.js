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
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "drive.google.com",
      "github.com",
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "0.academia-photos.com",
      "i1.rgstatic.net",
      "instagram.fjpa11-1.fna.fbcdn.net",
      "yt3.ggpht.com",
    ],
    remotePatterns: [
      {
        hostname: "**docs.googleusercontent.com",
      },
    ],
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["nextjs-toploader"],
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
});
