import { useEffect, useRef, useState } from 'react';

import {
    type ChatMessage,
    type FakeReplySource,
    getFakeReply,
    getInitialMessages,
} from '../lib/practice-message';

export function useAiChat(source: FakeReplySource) {
    const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages(source));
    const [value, setValue] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            behavior: 'smooth',
            top: scrollRef.current.scrollHeight,
        });
    }, [messages]);

    const handleSend = () => {
        const text = value.trim();
        if (!text) {
            return;
        }

        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text }]);
        setValue('');

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { id: crypto.randomUUID(), role: 'ai', text: getFakeReply(source) },
            ]);
        }, 700);
    };

    return { handleSend, messages, scrollRef, setValue, value };
}
