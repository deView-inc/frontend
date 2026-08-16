import { execSync } from 'child_process';
import path from 'path';

import type { NextConfig } from 'next';

import packageJson from './package.json';

const webpack = require('webpack');

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
    output: 'standalone',
    typedRoutes: true,
    turbopack: {
        root: __dirname,
    },
    env: {
        NEXT_PUBLIC_BUILD_ID: BUILD_ID,
        NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
        NEXT_PUBLIC_BUILD_VERSION: packageJson.version,
    },
    generateBuildId: async () => BUILD_ID,
    webpack: (config) => {
        config.plugins.push(
            new webpack.ContextReplacementPlugin(
                /\@phosphor-icons[\/\\]react[\/\\]dist[\/\\]ssr/,
                path.join(process.cwd(), 'node_modules/@phosphor-icons/react/dist/ssr'),
                true,
                /\.\/[A-Za-z0-9_]+$/,
            ),
        );

        if (config.optimization?.splitChunks?.cacheGroups) {
            config.optimization.splitChunks.cacheGroups.phosphorIcons = {
                test: /[\\/]node_modules[\\/]@phosphor-icons[\\/]react[\\/]dist[\\/]ssr[\\/][A-Za-z]+\.mjs$/,
                name: (module: { resource?: string }) => {
                    const iconName = module.resource?.match(/[\/\\]([A-Za-z]+)\.mjs$/)?.[1];
                    return iconName ? `icon-${iconName.toLowerCase()}` : 'phosphor-icon';
                },
                priority: 999,
                chunks: 'async',
            };
        }

        return config;
    },
};

export default nextConfig;
