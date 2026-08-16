export default {
    '*.{js,jsx,mjs,cjs,ts,tsx}': ['oxlint --fix --no-error-on-unmatched-pattern', 'oxfmt'],
    '*.{json,jsonc,css,scss,md,mdx,yaml,yml}': ['oxfmt'],
};
