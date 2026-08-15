import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    output: 'standalone',
    typedRoutes: true,
    turbopack: {
        root: __dirname,
    },
    webpack: (config, { isServer }) => {
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
