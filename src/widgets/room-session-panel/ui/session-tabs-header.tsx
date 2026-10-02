'use client';
import { useTracks } from '@livekit/components-react';
import { ChatCircleIcon, NotePencilIcon, CaretDoubleRightIcon } from '@phosphor-icons/react';
import { Track } from 'livekit-client';
import { cn } from '~&/shared/lib/utils';

import { useSessionTab } from '../model/session-tabs';

export function SessionTabsHeader({ chatUnreadCount = 0 }: { chatUnreadCount?: number }) {
    const { tab, setTab } = useSessionTab();
    const participantCount = useTracks([Track.Source.Camera], { onlySubscribed: false }).length;

    return (
        <div className="border-border bg-background border-b border-l px-4 pt-[19px] pb-3">
            <div className="flex items-center justify-between">
                <span className="text-foreground-muted text-[9.5px] tracking-[0.95px] uppercase">
                    Панель сессии
                </span>
                <div className="flex items-center gap-1.5">
                    <span className="bg-primary size-1.5 rounded-full" />
                    <span className="text-foreground-light text-[10.5px]">
                        {participantCount} участника
                    </span>
                    <button className="border-border grid size-6 place-items-center rounded-lg border">
                        <CaretDoubleRightIcon size={13} />
                    </button>
                </div>
            </div>

            <div className="border-border mt-2.5 flex gap-1 rounded-[10px] border p-1">
                <button
                    onClick={() => setTab('chat')}
                    className={cn(
                        'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[12.5px] font-semibold',
                        tab === 'chat' ? 'bg-card text-foreground' : 'text-foreground-muted',
                    )}
                >
                    <ChatCircleIcon size={14} />
                    Чат
                    {chatUnreadCount > 0 && (
                        <span className="bg-primary/14 text-primary rounded-[5px] px-[5px] py-px text-[9.5px] font-bold">
                            {chatUnreadCount}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setTab('notes')}
                    className={cn(
                        'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[12.5px] font-semibold',
                        tab === 'notes' ? 'bg-card text-foreground' : 'text-foreground-muted',
                    )}
                >
                    <NotePencilIcon size={14} />
                    Заметки
                </button>
            </div>
        </div>
    );
}
