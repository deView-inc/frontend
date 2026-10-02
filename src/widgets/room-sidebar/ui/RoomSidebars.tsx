import * as React from 'react';
import { Sidebar, SidebarContent, SidebarProvider } from '~&/shared/ui';
import { SessionPanel } from '~&/widgets/room-session-panel/ui/session-panel';
import { useSessionPanel } from '~&/widgets/session-panel';
import { TaskPanel, useTaskPanel } from '~&/widgets/task-panel';

export function RightSidebar() {
    const { open, setOpen } = useSessionPanel();

    return (
        <SidebarProvider
            open={open}
            onOpenChange={setOpen}
            className="h-full min-h-0 w-auto flex-none"
        >
            <Sidebar side="right">
                <SidebarContent>
                    <SessionPanel />
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}

export function LeftSidebar() {
    const { open, setOpen } = useTaskPanel();

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
