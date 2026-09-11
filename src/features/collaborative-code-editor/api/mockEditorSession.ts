import { collaborationWsUrl } from '~&/shared/config';

import { getEditorUserColor } from '../lib/getEditorUserColor';
import type { EditorSession } from '../model/types';

function storedId(key: string) {
    const savedId = sessionStorage.getItem(key);
    if (savedId) {
        return savedId;
    }
    const id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
    return id;
}

export function mockEditorSession(kind: 'room' | 'practice', roomId?: string): EditorSession {
    const userId = storedId('editor.mock-user');
    const sessionId = kind === 'room' ? roomId : storedId('editor.practice-session');

    if (!sessionId) {
        throw new Error('Не указан идентификатор комнаты.');
    }

    const color = getEditorUserColor(userId);

    return {
        documentId: `${kind}:${sessionId}:code`,
        fileName: kind === 'room' ? 'solution.js' : 'practice.js',
        language: 'javascript',
        wsUrl: collaborationWsUrl,
        user: { id: userId, name: `Участник ${userId.slice(0, 4)}`, color },
    };
}
