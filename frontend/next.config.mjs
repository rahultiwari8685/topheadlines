/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        domains: ["topheadlinesnews.com"],
        protocol: "http",
        hostname: "localhost",
        port: "5002",
        pathname: "/uploads/**",
      },
    ],

    // Enable modern image formats
    formats: ["image/webp", "image/avif"],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Minimum cache TTL in seconds
    minimumCacheTTL: 60,

    // Enable dangerouslyAllowSVG for SVG optimization
    dangerouslyAllowSVG: true,

    // Content security policy for SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
