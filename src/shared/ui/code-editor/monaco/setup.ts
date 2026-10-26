import { loader } from '@monaco-editor/react';
import 'monaco-editor/esm/vs/basic-languages/go/go.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js';
import 'monaco-editor/esm/vs/editor/editor.all.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution.js';

export const workerErrorEvent = 'monaco-worker-error';
globalThis.MonacoEnvironment = {
    getWorker: (_moduleId, label) => {
        const name = label === 'javascript' || label === 'typescript' ? 'typescript' : 'editor';
        const worker = new Worker(`/monaco/${name}.worker.js`, { type: 'module' });
        worker.addEventListener('error', () => window.dispatchEvent(new Event(workerErrorEvent)));
        return worker;
    },
};
loader.config({ monaco });

monaco.editor.defineTheme('deview', {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: 'comment', foreground: '5a636d' },
        { token: 'keyword', foreground: 'c792ea' },
        { token: 'string', foreground: 'c3e88d' },
        { token: 'number', foreground: 'f78c6c' },
    ],
    colors: {
        'editor.background': '#0c0e11',
        'editor.foreground': '#e7eaed',
        'editorLineNumber.foreground': '#626a73',
        'editor.lineHighlightBackground': '#ffffff08',
        'editorCursor.foreground': '#b9f24c',
    },
});

export { loader };
