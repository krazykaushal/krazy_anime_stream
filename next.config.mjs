/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.noitatnemucod.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gogocdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.flawlessfiles.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
