/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pages: {
  //   '/': { page: '/index' },
  // },
  includePaths: [join(__dirname, 'styles')],
};

module.exports = nextConfig;
