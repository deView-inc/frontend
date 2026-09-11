import { useCallback, useState, useSyncExternalStore } from 'react';

import { CodeEditor, type CodeEditorProps } from '~&/shared/ui/code-editor';

import { bindEditorSession } from '../../model/bindEditorSession';
import type { CollaborationSession } from '../../model/types';
import { EditorHeader } from './EditorHeader';
import { EditorStatusBar } from './EditorStatusBar';

interface Props {
    session: CollaborationSession;
    fileName: string;
    language: string;
}

export function CollaborationEditorView({ session, fileName, language }: Props) {
    const state = useSyncExternalStore(session.subscribe, session.getSnapshot);
    const { retry: handleRetry } = session;
    const [participants, setParticipants] = useState(0);
    const [editorFailed, setEditorFailed] = useState(false);
    const handleEditorError = useCallback(() => setEditorFailed(true), []);

    const onReady = useCallback<CodeEditorProps['onReady']>(
        (editor, monaco) => {
            setEditorFailed(false);
            return bindEditorSession({
                session,
                editor,
                monaco,
                onParticipantsChange: setParticipants,
            });
        },
        [session],
    );

    return (
        <>
            <EditorHeader
                fileName={fileName}
                participants={participants}
            />
            <CodeEditor
                onReady={onReady}
                onError={handleEditorError}
                language={language}
            />
            <EditorStatusBar
                state={state}
                editorFailed={editorFailed}
                onRetry={handleRetry}
            />
        </>
    );
}
