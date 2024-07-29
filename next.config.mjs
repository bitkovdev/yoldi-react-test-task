/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frontend-test-api.yoldi.agency',
        port: '',
        pathname: '/api/image/src/**',
      },
    ],
  },
};

export default nextConfig;
