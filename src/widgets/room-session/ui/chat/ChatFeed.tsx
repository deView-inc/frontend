'use client';

import { useLocalParticipant } from '@livekit/components-react';
import * as React from 'react';
import { cn } from '~&/shared/lib/utils';
import { useRoomChat } from '~&/widgets/room-session';

const timeFormat = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' });

function getInitials(name: string): string {
    const base = name.split('@')[0]; // В токене name = email
    const parts = base.split(/[\s._-]+/).filter(Boolean);
    const letters = parts.length > 1 ? parts[0][0] + parts[1][0] : base.slice(0, 2);
    return letters.toUpperCase();
}

function ChatAvatar({ name, own }: { name: string; own: boolean }) {
    return (
        <div
            className={cn(
                'border-card grid size-7 shrink-0 place-items-center rounded-full border font-mono text-[11px] font-bold',
                own ? 'bg-[#1c4a22] text-[#8ef69c]' : 'bg-[#2f1c4a] text-[#b98ef6]',
            )}
        >
            {getInitials(name)}
        </div>
    );
}

export function ChatFeed() {
    const { chatMessages } = useRoomChat();
    const { localParticipant } = useLocalParticipant();
    const bottomRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: 'end' });
    }, [chatMessages.length]);

    if (chatMessages.length === 0) {
        return (
            <div className="text-foreground-muted grid h-full place-items-center p-6 text-center text-xs">
                Сообщений пока нет. Чат виден только участникам этой комнаты.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2.5 px-4 py-3.5">
            {chatMessages.map((m, i) => {
                const own = m.from?.identity === localParticipant.identity;
                const name = m.from?.name ?? m.from?.identity ?? 'Участник';

                return (
                    <div
                        key={m.id ?? `${m.timestamp}-${i}`}
                        className="flex items-start gap-2.5"
                    >
                        {!own && (
                            <ChatAvatar
                                name={name}
                                own={false}
                            />
                        )}

                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-foreground text-[12.5px] leading-none font-semibold">
                                    {own ? 'Вы' : name}
                                </span>
                                <span className="text-foreground-muted text-[10.5px] leading-none">
                                    {timeFormat.format(m.timestamp)}
                                </span>
                            </div>

                            <p
                                className={cn(
                                    'rounded-[11px] border px-[13px] py-3 text-[13px] leading-[18.4px] break-words whitespace-pre-wrap',
                                    own
                                        ? 'bg-primary/10 border-primary/25 text-foreground'
                                        : 'border-border bg-card text-[#c4cad1]',
                                )}
                            >
                                {m.message}
                            </p>
                        </div>

                        {own && (
                            <ChatAvatar
                                name={name}
                                own
                            />
                        )}
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
}
