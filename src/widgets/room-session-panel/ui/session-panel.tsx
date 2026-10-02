'use client';
import { ChatComposer } from '~&/widgets/chat-composer';
import { ChatFeed } from '~&/widgets/chat-feed';
import { NotesPanel } from '~&/widgets/notes-panel';

import { useSessionTab, SessionTabsProvider } from '../model/session-tabs';
import { SessionTabsHeader } from './session-tabs-header';
import { VideoStrip } from './video-strip';

function SessionPanelContent() {
    const { tab } = useSessionTab();

    return (
        <div className="flex h-full flex-col">
            <VideoStrip />
            <SessionTabsHeader chatUnreadCount={4} />
            <div className="min-h-0 flex-1 overflow-y-auto">
                {tab === 'chat' ? <ChatFeed /> : <NotesPanel />}
            </div>
            {tab === 'chat' && <ChatComposer />}
        </div>
    );
}

export function SessionPanel() {
    return (
        <SessionTabsProvider>
            <SessionPanelContent />
        </SessionTabsProvider>
    );
}
