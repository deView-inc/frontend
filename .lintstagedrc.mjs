export default {
    '*.config.{ts,js,mjs}': ['oxfmt'],
    '*.{js,jsx,mjs,cjs}': ['oxlint --fix', 'oxfmt'],
    '*.{json,jsonc,css,scss,md,mdx,yaml,yml}': ['oxfmt'],
    '*.{ts,tsx}': ['oxlint --fix', 'oxfmt'],
};
