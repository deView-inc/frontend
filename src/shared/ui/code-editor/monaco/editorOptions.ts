import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

export const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    automaticLayout: true,
    readOnly: true,
    domReadOnly: true,
    editContext: false,
    minimap: { enabled: false },
    fontFamily: 'var(--font-mono), monospace',
    fontSize: 13.5,
    lineHeight: 23,
    tabSize: 2,
    padding: { top: 12 },
    scrollBeyondLastLine: false,
    ariaLabel: 'Редактор кода',
};
