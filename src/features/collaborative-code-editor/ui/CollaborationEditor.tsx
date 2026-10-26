'use client';

import type { EditorSessionSource } from '../model/types';
import { useCollaborationSession } from '../model/useCollaborationSession';
import { CollaborationEditorView } from './components/CollaborationEditorView';
import { EditorLoading } from './components/EditorLoading';

type Props = EditorSessionSource & { language?: string };

export default function CollaborationEditor(props: Props) {
    const result = useCollaborationSession(props);
    if (!result) {
        return <EditorLoading />;
    }
    if (result.status === 'error') {
        return (
            <div
                role="alert"
                className="p-4 text-sm"
            >
                {result.errorMessage}
            </div>
        );
    }
    return (
        <CollaborationEditorView
            session={result.session}
            fileName={result.config.fileName}
            language={props.language ?? result.config.language}
        />
    );
}
