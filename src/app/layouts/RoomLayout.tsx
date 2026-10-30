'use client';

import * as React from 'react';
import { SidebarInset } from '~&/shared/ui/sidebar';
import {
    RightSidebar,
    RoomFooter,
    RoomHeader,
    SessionPanelProvider,
    TaskPanelProvider,
} from '~&/widgets/room-session';

export function RoomLayout({ children }: React.PropsWithChildren) {
    return (
        <TaskPanelProvider>
            <SessionPanelProvider>
                <div className="flex h-svh flex-col overflow-hidden">
                    <RoomHeader />
                    <div className="relative flex min-h-0 flex-1 [transform:translateZ(0)]">
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
