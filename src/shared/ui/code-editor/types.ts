import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

export interface CodeEditorProps {
    language: string;
    onError?: () => void;
    onReady: (editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco) => () => void;
}
