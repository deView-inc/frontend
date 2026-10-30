import { execSync } from 'child_process';

import type { NextConfig } from 'next';

import packageJson from './package.json';

function getBuildId() {
    const parts: string[] = [];
    parts.push(packageJson.version);

    try {
        const hash = execSync('git rev-parse --short HEAD').toString().trim();

        parts.push(hash);
    } catch {
        parts.push('no-git-hash');
    }

    return parts.join('-');
}

const BUILD_ID = getBuildId();

const nextConfig: NextConfig = {
    reactCompiler: true,

    experimental: {
        turbopackPluginRuntimeStrategy: 'workerThreads',
    },

    output: 'standalone',
    typedRoutes: true,
    allowedDevOrigins: ['127.0.0.1'],

    turbopack: {
        root: __dirname,
    },

    env: {
        NEXT_PUBLIC_BUILD_ID: BUILD_ID,
        NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
        NEXT_PUBLIC_BUILD_VERSION: packageJson.version,
    },

    generateBuildId: async () => BUILD_ID,
};

export default nextConfig;
