'use client';

import { LockSimpleIcon, SignOutIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { useRoomId, useRoomSlug, useRouteMeta } from '~&/shared/lib/hooks';
import { cn, getContrastColor } from '~&/shared/lib/utils';
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    Badge,
    Button,
    PageHeader,
    Timer,
} from '~&/shared/ui';

const PARTICIPANTS = [
    { initials: 'МГ', className: 'bg-red-700' },
    { initials: 'АЛ', className: 'bg-yellow-600' },
];

export function RoomHeader({ children }: PropsWithChildren) {
    const { label, description } = useRouteMeta();
    const roomId = useRoomId();
    const roomSlug = useRoomSlug();
    const isHex = Boolean(roomId && /^[0-9a-f]{6}$/i.test(roomId));

    return (
        <PageHeader
            title={label}
            description={description}
            icons={
                <LockSimpleIcon
                    size={24}
                    className="text-foreground-light"
                />
            }
            badges={
                <div className="inline-flex items-center gap-2">
                    {roomId && (
                        <Badge
                            className={cn(!isHex && 'bg-card/50')}
                            style={
                                isHex
                                    ? {
                                          backgroundColor: `#${roomId}`,
                                          color: getContrastColor(roomId),
                                      }
                                    : undefined
                            }
                        >
                            #{roomId.toUpperCase()}
                        </Badge>
                    )}
                    <Badge>БЕЗ ЗАДАЧИ</Badge>
                </div>
            }
        >
            <Timer className="flex items-center gap-2" />
            <div className="inline-flex items-center gap-6">
                <AvatarGroup className="*:data-[slot=avatar]:ring-1">
                    {PARTICIPANTS.map(({ initials, className }) => (
                        <Avatar
                            key={initials}
                            className="size-8 rounded-full after:rounded-full"
                        >
                            <AvatarFallback
                                className={cn(
                                    'rounded-full text-xs font-medium text-white',
                                    className,
                                )}
                            >
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    ))}
                </AvatarGroup>

                <Button
                    variant="destructive"
                    nativeButton={false}
                    render={<Link href={`/room/${roomSlug}/summary`} />}
                >
                    <SignOutIcon size={32} />
                    Завершить
                </Button>
            </div>
        </PageHeader>
    );
}
