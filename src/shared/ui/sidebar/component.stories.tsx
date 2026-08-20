import { GearIcon, HouseIcon, UserIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from './component';

const meta = {
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    title: 'shared/ui/Sidebar',
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
    { icon: HouseIcon, title: 'Home' },
    { icon: UserIcon, title: 'Profile' },
    { icon: GearIcon, title: 'Settings' },
];

export const Default: Story = {
    render: () => (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader className="p-3 text-sm font-medium">deView</SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="text-muted-foreground p-3 text-xs">v1.0.0</SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <div className="flex items-center gap-2 p-3">
                    <SidebarTrigger />
                    <span className="text-sm">Main content</span>
                </div>
            </SidebarInset>
        </SidebarProvider>
    ),
};
