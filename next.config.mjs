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
        ],
      },
};


export default nextConfig;
