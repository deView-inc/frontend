'use client';

import { CaretDoubleLeftIcon, ChatCircleIcon, NotePencilIcon } from '@phosphor-icons/react';
import * as React from 'react';
import { cn } from '~&/shared/lib/utils';
import { Sidebar, SidebarContent, SidebarProvider } from '~&/shared/ui/sidebar';
import {
    SessionPanel,
    TaskPanel,
    useChatUnread,
    useSessionPanel,
    useTaskPanel,
} from '~&/widgets/room-session';

export function RightSidebar() {
    const { open, setOpen, toggle, tab, openTab } = useSessionPanel();
    const unread = useChatUnread();
    const railButton = (active: boolean) =>
        cn(
            'border-border grid size-8 place-items-center rounded-lg border transition-colors',
            active ? 'bg-card text-foreground' : 'text-foreground-muted hover:bg-card',
        );

    return (
        <SidebarProvider
            open={open}
            onOpenChange={setOpen}
            className="relative h-full min-h-0 w-auto flex-none"
        >
            <Sidebar
                side="right"
                collapsible="icon"
                className="absolute! h-full!"
            >
                <div className="hidden h-full flex-col items-center gap-2 py-3 group-data-[collapsible=icon]:flex">
                    <button
                        type="button"
                        onClick={toggle}
                        aria-label="Показать панель"
                        className={railButton(false)}
                    >
                        <CaretDoubleLeftIcon size={14} />
                    </button>

                    <button
                        type="button"
                        onClick={() => openTab('chat')}
                        aria-label="Чат"
                        className={railButton(tab === 'chat')}
                    >
                        <ChatCircleIcon size={16} />
                    </button>

                    <button
                        type="button"
                        onClick={() => openTab('notes')}
                        aria-label="Заметки"
                        className={railButton(tab === 'notes')}
                    >
                        <NotePencilIcon size={16} />
                    </button>
                    <span className="text-foreground-muted mt-3 text-[10px] tracking-[0.95px] uppercase [writing-mode:vertical-rl]">
                        Панель сессии
                    </span>
                </div>

                <SidebarContent className="min-h-0 overflow-hidden group-data-[collapsible=icon]:hidden">
                    <SessionPanel />
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}

export function LeftSidebar() {
    const { open, setOpen, isVisible } = useTaskPanel();

    if (!isVisible) {
        return null;
    }

    return (
        <SidebarProvider
            open={open}
            onOpenChange={setOpen}
            className="h-full min-h-0 w-auto flex-none"
        >
            <Sidebar
                side="left"
                collapsible="icon"
            >
                <SidebarContent>
                    <TaskPanel />
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}
