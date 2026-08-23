// Model/useAiChat.ts
import { useEffect, useRef, useState } from 'react';

import {
    type ChatMessage,
    type InterviewStyle,
    getFakeAiReply,
    mockMessages,
} from '../lib/practice-message';

export function useAiChat(style: InterviewStyle = 'friendly') {
    const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
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
                { id: crypto.randomUUID(), role: 'ai', text: getFakeAiReply(style) },
            ]);
        }, 700);
    };

    return { handleSend, messages, scrollRef, setValue, value };
}
