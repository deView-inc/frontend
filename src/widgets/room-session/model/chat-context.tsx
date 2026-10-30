'use client';

import { useChat } from '@livekit/components-react';
import { createContext, useContext, type PropsWithChildren, useState, useEffect } from 'react';
import { useSessionPanel } from '~&/widgets/room-session';

type RoomChat = ReturnType<typeof useChat>;

const ChatContext = createContext<RoomChat | null>(null);

export function ChatProvider({ children }: PropsWithChildren) {
    const chat = useChat();
    return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

export function useRoomChat() {
    const ctx = useContext(ChatContext);
    if (!ctx) {
        throw new Error('useRoomChat must be used within ChatProvider');
    }
    return ctx;
}

export function useChatUnread() {
    const { chatMessages } = useRoomChat();
    const { open, tab } = useSessionPanel();
    const [seen, setSeen] = useState(0);

    const others = chatMessages.filter((m) => !m.from?.isLocal).length;
    const visible = open && tab === 'chat';

    useEffect(() => {
        if (visible) {
            setSeen(others);
        }
    }, [visible, others]);

    return visible ? 0 : Math.max(0, others - seen);
}
