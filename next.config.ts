import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    output: 'standalone',
    typedRoutes: true,
    turbopack: {
        root: __dirname,
    },
};

export default nextConfig;
