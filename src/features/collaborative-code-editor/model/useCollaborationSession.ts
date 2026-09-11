import { useEffect, useState } from 'react';

import { createCollaborationSession } from '../api/createCollaborationSession';
import { mockEditorSession } from '../api/mockEditorSession';
import type { CollaborationSession, EditorSession, EditorSessionSource } from './types';

type SessionResult =
    | { status: 'ready'; config: EditorSession; session: CollaborationSession }
    | { status: 'error'; errorMessage: string };

export function useCollaborationSession({ kind, roomId }: EditorSessionSource) {
    const [result, setResult] = useState<SessionResult | null>(null);

    useEffect(() => {
        let session: CollaborationSession | undefined = undefined;
        try {
            const config = mockEditorSession(kind, roomId);
            session = createCollaborationSession(config);
            // Publish an external resource created after commit, never during render.
            // oxlint-disable-next-line react/react-compiler
            setResult({ status: 'ready', config, session });
        } catch {
            setResult({
                status: 'error',
                errorMessage:
                    'Не удалось подготовить сессию редактора. Проверьте параметры документа и доступность хранилища вкладки.',
            });
        }
        return () => session?.destroy();
    }, [kind, roomId]);

    return result;
}
