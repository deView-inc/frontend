'use client';

import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import * as React from 'react';
import { useRoomChat } from '~&/widgets/room-session';

export function ChatComposer() {
    const { send, isSending } = useRoomChat();
    const [value, setValue] = React.useState('');
    const fieldRef = React.useRef<HTMLTextAreaElement>(null);

    React.useLayoutEffect(() => {
        const el = fieldRef.current;
        if (!el) {
            return;
        }
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
    }, [value]);

    const canSend = value.trim().length > 0 && !isSending;

    const submit = async () => {
        const text = value.trim();
        if (!text || isSending) {
            return;
        }
        setValue('');
        try {
            await send(text);
        } catch (error) {
            console.error('Не удалось отправить сообщение', error);
            setValue(text);
        }
    };

    return (
        <form
            className="border-border flex min-h-[67px] shrink-0 items-center gap-2 border-t px-3.5 py-[11px]"
            onSubmit={(e) => {
                e.preventDefault();
                void submit();
            }}
        >
            <textarea
                ref={fieldRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        void submit();
                    }
                }}
                rows={1}
                maxLength={2000}
                placeholder="Сообщение…"
                className="bg-card border-border placeholder:text-foreground-muted focus:border-primary/60 max-h-32 min-h-[38px] min-w-0 flex-1 resize-none overflow-y-auto rounded-[10px] border px-3 py-2.5 text-[13px] leading-[15px] focus:outline-none"
            />

            <button
                type="submit"
                disabled={!canSend}
                aria-label="Отправить"
                className="bg-primary border-primary text-primary-foreground grid h-11 w-[46px] shrink-0 place-items-center rounded-xl border transition-opacity disabled:opacity-50"
            >
                <PaperPlaneRightIcon
                    size={19}
                    weight="fill"
                />
            </button>
        </form>
    );
}
