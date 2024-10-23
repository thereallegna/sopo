/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: true,
  env: {
    // VERSION: version,
  },
  reactStrictMode: false, // if true: BPMN modeling.updateLabel error Cannot read properties of undefined (reading 'parentNode')
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
    // ignore during commit
    // ignoreDuringCommit: true,
  },
  output: 'standalone',
  compiler: {
    // removeConsole: !process.env.SHOW_CONSOLE_LOG,
  },
  //   images: {
  //     // add trusted pattern for external url using next/image
  //     remotePatterns: [
  //       {
  //         protocol: 'https',
  //         hostname: 'platform-dev-upload.s3.ap-southeast-1.amazonaws.com',
  //       },
  //       {
  //         protocol: 'https',
  //         hostname: 'runsystem-upload.s3.ap-southeast-3.amazonaws.com',
  //       },
  //       // ? bypass all domain for image component
  //       {
  //         protocol: 'https',
  //         hostname: '**',
  //       },
  //     ],
  //   },
  //   async redirects() {
  //     return [
  //       {
  //         source: '/setting/:appSlug',
  //         destination: '/setting/:appSlug/app-info',
  //         permanent: true,
  //       },
  //       {
  //         source: '/user-setting',
  //         destination: '/user-setting/account',
  //         permanent: true,
  //       },
  //       {
  //         source: '/editor/:appSlug',
  //         destination: '/editor/:appSlug/resource/entity',
  //         permanent: true,
  //       },
  //       {
  //         source: '/editor/:appSlug/resource',
  //         destination: '/editor/:appSlug/resource/entity',
  //         permanent: true,
  //       },
  //     ];
  //   },
};

export default nextConfig;
