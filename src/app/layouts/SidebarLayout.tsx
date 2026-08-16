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
                <div className="h-full overflow-x-hidden p-5">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
