import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
    ...fsd.configs.recommended,
    {
        rules: {
            'fsd/insignificant-slice': [
                'warn',
                {
                    // TODO: delete at feature
                    ignore: ['/src/features/global-search', 'src/features/notifications'],
                },
            ],
        },
    },
    {
        files: ['./src/shared/config/**', './src/shared/styles/**'],
        rules: {
            'fsd/public-api': 'off',
        },
    },
]);
