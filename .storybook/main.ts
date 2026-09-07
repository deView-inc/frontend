import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/nextjs-vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@chromatic-com/storybook', '@storybook/addon-a11y', '@storybook/addon-docs'],
    framework: '@storybook/nextjs-vite',
    staticDirs: ['../public'],
    viteFinal: (viteConfig) => {
        viteConfig.resolve ??= {};
        viteConfig.resolve.alias = {
            ...viteConfig.resolve.alias,
            '~&': path.resolve(dirname, '../src'),
        };
        return viteConfig;
    },
};

export default config;
