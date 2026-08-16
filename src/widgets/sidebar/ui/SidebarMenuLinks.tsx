'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU } from '~&/shared/config';
import {
    Icon,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
} from '~&/shared/ui';

export function SidebarMenuLinks() {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="h-4">Навигация</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {MENU.map((link) => {
                        if (typeof link.label === 'function' || typeof link.path === 'function') {
                            return;
                        }

                        const isActive = pathname === link.path;
                        return (
                            <SidebarMenuButton
                                render={
                                    <Link href={link.path}>
                                        <Icon
                                            name={link.icon}
                                            weight="light"
                                        />
                                        {link.label}
                                    </Link>
                                }
                                isActive={isActive}
                                key={`sidebar-menu-link-${link.label}`}
                            />
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
