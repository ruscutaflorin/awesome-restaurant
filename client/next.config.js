/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   ];
  // },
  transpilePackages: ["@mui/x-charts"],
};

module.exports = nextConfig;
