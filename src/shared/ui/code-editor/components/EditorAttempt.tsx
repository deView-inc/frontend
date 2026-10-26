import Editor from '@monaco-editor/react';

import { useEditorLifecycle } from '../hooks/useEditorLifecycle';
import { editorOptions } from '../monaco/editorOptions';
import type { CodeEditorProps } from '../types';
import { EditorError } from './EditorError';
import { EditorLoading } from './EditorLoading';

interface EditorAttemptProps extends CodeEditorProps {
    onRetry: () => void;
}

const loadingElement = <EditorLoading />;

export function EditorAttempt({ language, onReady, onError, onRetry }: EditorAttemptProps) {
    const { loaded, error, handleMount } = useEditorLifecycle({ onReady, onError });

    if (error) {
        return <EditorError onRetry={onRetry} />;
    }

    if (!loaded) {
        return loadingElement;
    }
    return (
        <div className="absolute inset-0">
            <Editor
                language={language}
                theme="deview"
                options={editorOptions}
                loading={loadingElement}
                saveViewState={false}
                keepCurrentModel={false}
                onMount={handleMount}
            />
        </div>
    );
}
