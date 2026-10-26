'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { useSession } from '~&/features/auth';
import { ROUTES } from '~&/shared/config';
import { useIsMobile } from '~&/shared/lib/hooks';
import { getUserInitials } from '~&/shared/lib/session';
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
    const { user } = useSession();
    const name = user?.firstName || user?.email || 'Пользователь';
    const subtitle = user?.grade || user?.email || '';

    return (
        <>
            <Avatar>
                <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
                <AvatarImage />
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-sm font-semibold">{name}</span>
                <span className="text-muted-foreground truncate text-xs">{subtitle}</span>
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
    const { signOut } = useSession();

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
                    <DropdownMenuItem
                        render={
                            <Link href={ROUTES.PROFILE.ROOT as Route}>
                                <Icon name="UserIcon" />
                                Профиль
                            </Link>
                        }
                    />
                    <DropdownMenuItem
                        render={
                            <Link href={ROUTES.PROFILE.SETTINGS as Route}>
                                <Icon name="GearIcon" />
                                Настройки
                            </Link>
                        }
                    />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Icon name="QuestionIcon" /> Поддержка
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        render={
                            <Link href={ROUTES.HELP.FAQ as Route}>
                                <Icon name="InfoIcon" /> FAQ
                            </Link>
                        }
                    />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => void signOut()}
                    variant="destructive"
                >
                    <Icon name="SignOutIcon" /> Выйти
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
