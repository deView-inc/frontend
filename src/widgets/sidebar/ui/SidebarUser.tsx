'use client';

import Link from 'next/link';
import { useIsMobile } from '~&/shared/lib/hooks';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Icon,
    SidebarMenuButton,
} from '~&/shared/ui';

export function SidebarUser() {
    return (
        <>
            <Avatar>
                <AvatarFallback>АЛ</AvatarFallback>
                <AvatarImage />
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-sm font-semibold">Алекс Ким</span>
                <span className="text-muted-foreground truncate text-xs">Middle · #5</span>
            </div>
            <Icon
                name="DotsThreeVerticalIcon"
                className="ml-auto size-3.5"
            />
        </>
    );
}

export function DropdownUser() {
    const isMobile = useIsMobile();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <SidebarMenuButton
                        size="lg"
                        className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                    >
                        <SidebarUser />
                    </SidebarMenuButton>
                }
            />
            <DropdownMenuContent side={isMobile ? 'bottom' : 'right'}>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Аккаунт</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Icon name="UserIcon" />
                        Профиль
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Icon name="GearIcon" />
                        Настройки
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Icon name="QuestionIcon" /> Поддержка
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        render={
                            <Link href="/faq">
                                <Icon name="InfoIcon" /> FAQ
                            </Link>
                        }
                    />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    <Icon name="SignOutIcon" /> Выйти
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
