/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Remote patterns can be added here when real photography is hosted externally.
    // For now all imagery lives in /public and is served locally.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
