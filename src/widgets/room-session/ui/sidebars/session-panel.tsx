'use client';

import { useParticipants } from '@livekit/components-react';
import { CaretDoubleRightIcon, ChatCircleIcon, NotePencilIcon } from '@phosphor-icons/react';
import { cn, pluralParticipants } from '~&/shared/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~&/shared/ui';
import type { SessionTab } from '~&/widgets/room-session';
import {
    ChatComposer,
    ChatFeed,
    NotesPanel,
    useSessionPanel,
    useTaskPanel,
} from '~&/widgets/room-session';

import { VideoStrip } from '../tracks/video-strip';

export function SessionPanel({ chatUnreadCount = 0 }: { chatUnreadCount?: number }) {
    const { tab, setTab, toggle } = useSessionPanel();
    const participantCount = useParticipants().length;
    const { isVisible: isTaskOpen } = useTaskPanel();

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
            {isTaskOpen && <VideoStrip />}
            <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as SessionTab)}
                className="flex min-h-0 flex-1 flex-col overflow-hidden"
            >
                <div className="border-border bg-background shrink-0 border-b border-l px-4 pt-[19px] pb-3">
                    <div className="flex items-center justify-between">
                        <span className="text-foreground-muted text-[9.5px] tracking-[0.95px] uppercase">
                            Панель сессии
                        </span>

                        <div className="flex items-center gap-1.5">
                            <span className="bg-primary size-1.5 rounded-full" />
                            <span className="text-foreground-light text-[10.5px]">
                                {pluralParticipants(participantCount)}
                            </span>

                            <button
                                className="border-border grid size-6 place-items-center rounded-lg border"
                                type="button"
                                onClick={toggle}
                                aria-label="Скрыть панель"
                            >
                                <CaretDoubleRightIcon size={13} />
                            </button>
                        </div>
                    </div>

                    <TabsList className="border-border mt-2.5 flex h-auto w-full gap-1 rounded-[10px] border bg-transparent p-1">
                        <TabsTrigger
                            value="chat"
                            className={cn(
                                'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[12.5px] font-semibold',
                                'text-foreground-muted transition-colors',
                                'data-selected:bg-card data-selected:text-foreground data-[state=active]:bg-card data-[state=active]:text-foreground',
                            )}
                        >
                            <ChatCircleIcon size={14} />
                            Чат
                            {chatUnreadCount > 0 && (
                                <span className="bg-primary/14 text-primary rounded-[5px] px-[5px] py-px text-[9.5px] font-bold">
                                    {chatUnreadCount}
                                </span>
                            )}
                        </TabsTrigger>

                        <TabsTrigger
                            value="notes"
                            className={cn(
                                'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[12.5px] font-semibold',
                                'text-foreground-muted transition-colors',
                                'data-selected:bg-card data-selected:text-foreground data-[state=active]:bg-card data-[state=active]:text-foreground',
                            )}
                        >
                            <NotePencilIcon size={14} />
                            Заметки
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                    <TabsContent
                        value="chat"
                        className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden data-[hidden]:hidden"
                    >
                        <div className="min-h-0 flex-1 overflow-y-auto">
                            <ChatFeed />
                        </div>
                    </TabsContent>

                    <TabsContent
                        value="notes"
                        className="mt-0 flex h-full min-h-0 flex-1 flex-col overflow-hidden data-[hidden]:hidden"
                    >
                        <NotesPanel />
                    </TabsContent>
                </div>

                {tab === 'chat' && <ChatComposer />}
            </Tabs>
        </div>
    );
}
