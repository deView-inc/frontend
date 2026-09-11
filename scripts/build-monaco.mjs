import { build } from 'esbuild';

await build({
    entryPoints: {
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        'typescript.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker.js',
    },
    outdir: 'public/monaco',
    bundle: true,
    format: 'esm',
    platform: 'browser',
    minify: true,
    target: 'es2022',
});
