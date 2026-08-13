import { defineConfig } from 'oxfmt';

export default defineConfig({
    printWidth: 100,
    tabWidth: 4,
    useTabs: false,
    singleQuote: true,
    trailingComma: 'all',
    semi: true,
    arrowParens: 'always',
    bracketSpacing: true,
    bracketSameLine: false,
    singleAttributePerLine: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: false,

    sortPackageJson: true,
    sortTailwindcss: true,
    sortImports: true,

    ignore: [
        '**/node_modules/**',
        '**/.pnpm-store/**',

        '**/dist/**',
        '**/build/**',
        '**/.next/**',
        '**/out/**',
        '**/coverage/**',

        '**/.turbo/**',
        '**/.cache/**',

        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/__tests__/**',
        '**/__mocks__/**',

        '**/.storybook/**',
        '**/storybook-static/**',

        '**/*.generated.ts',
        '**/generated/**',

        '**/*.min.js',
        '**/*.bundle.js',
        '**/*.min.css',

        '**/next-env.d.ts',

        '**/.env*',

        '**/pnpm-lock.yaml',
        '**/package-lock.json',
        '**/yarn.lock',

        '**/*.log',
        '**/.vercel/**',
        '**/.netlify/**',
        '**/.DS_Store',

        '**/.idea/**',
        '**/.vscode/**',
    ],
});
