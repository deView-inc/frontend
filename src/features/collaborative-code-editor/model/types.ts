import type { Awareness } from 'y-protocols/awareness';
import type { Doc } from 'yjs';

import type { CodeEditorProps } from '~&/shared/ui/code-editor';

interface EditorUser {
    id: string;
    name: string;
    color: string;
}

export interface EditorSession {
    documentId: string;
    fileName: string;
    language: string;
    wsUrl: string;
    user: EditorUser;
}

export type SyncStatus = 'connecting' | 'syncing' | 'connected' | 'reconnecting' | 'error';

export interface SyncState {
    status: SyncStatus;
    errorMessage?: string;
    retryable: boolean;
}

export interface CollaborationSession {
    doc: Doc;
    awareness: Awareness;
    getSnapshot: () => SyncState;
    subscribe: (listener: () => void) => () => void;
    retry: () => void;
    destroy: () => void;
}

export type SessionFactory = (config: EditorSession) => CollaborationSession;

export interface EditorBindingOptions {
    session: CollaborationSession;
    editor: Parameters<CodeEditorProps['onReady']>[0];
    monaco: Parameters<CodeEditorProps['onReady']>[1];
    onParticipantsChange: (count: number) => void;
}
