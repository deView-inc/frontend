'use client';

import * as React from 'react';
import { SidebarInset } from '~&/shared/ui';
import { RoomHeader, RoomFooter } from '~&/widgets/layout';
import { LeftSidebar, RightSidebar } from '~&/widgets/room-sidebar';
import { SessionPanelProvider } from '~&/widgets/session-panel/model/session-panel-context';
import { TaskPanelProvider } from '~&/widgets/task-panel/model/task-panel-context';

export function RoomLayout({ children }: React.PropsWithChildren) {
    return (
        <TaskPanelProvider>
            <SessionPanelProvider>
                <div className="flex h-svh flex-col overflow-hidden">
                    <RoomHeader />

                    <div className="relative flex min-h-0 flex-1 [transform:translateZ(0)]">
                        <LeftSidebar />

                        <SidebarInset className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto">
                            <main className="min-h-0 flex-1">{children}</main>
                            <RoomFooter />
                        </SidebarInset>

                        <RightSidebar />
                    </div>
                </div>
            </SessionPanelProvider>
        </TaskPanelProvider>
    );
}
