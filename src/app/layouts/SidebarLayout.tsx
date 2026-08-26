import * as React from 'react';
import { SidebarInset, SidebarProvider } from '~&/shared/ui';
import { Header } from '~&/widgets/layout';
import { Sidebar } from '~&/widgets/sidebar';

export function SidebarLayout({
    children,
    ...props
}: React.ComponentProps<typeof SidebarProvider>) {
    return (
        <SidebarProvider {...props}>
            <Sidebar />
            <SidebarInset>
                <Header />
                <main className="min-h-0 flex-1 overflow-x-hidden p-7">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
