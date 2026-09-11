import type { CollaborationSession, EditorSession } from '../model/types';
import { WebsocketCollaborationSession } from './WebsocketCollaborationSession';

export function createCollaborationSession(config: EditorSession): CollaborationSession {
    return new WebsocketCollaborationSession(config);
}
