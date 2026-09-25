import * as React from 'react';
import { Sidebar, SidebarInset, SidebarProvider } from '~&/shared/ui';
import { RoomHeader, RoomFooter } from '~&/widgets/layout';

export function RoomLayout({ children, ...props }: React.ComponentProps<typeof SidebarProvider>) {
    return (
        <div className="flex h-svh flex-col overflow-hidden">
            <RoomHeader />

            <div className="relative min-h-0 flex-1 [transform:translateZ(0)]">
                <SidebarProvider
                    {...props}
                    className="h-full min-h-0"
                >
                    <Sidebar side="left" />

                    <SidebarInset className="flex h-full min-h-0 flex-col overflow-y-auto">
                        <main className="min-h-0 flex-1">{children}</main>
                        <RoomFooter />
                    </SidebarInset>

                    <Sidebar side="right" />
                </SidebarProvider>
            </div>
        </div>
    );
}
