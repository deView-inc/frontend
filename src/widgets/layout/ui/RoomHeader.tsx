'use client';

import { LockSimpleIcon, SignOutIcon } from '@phosphor-icons/react';
import { useClipboard } from '@siberiacancode/reactuse';
import Link from 'next/link';
import { useState } from 'react';
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

interface BadgesProps {
    roomId?: string;
    onCopy: () => void;
    copied: boolean;
}

export function RoomHeader() {
    const { label, description } = useRouteMeta();
    const roomId = useRoomId();
    const roomSlug = useRoomSlug();

    const { copy } = useClipboard();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);

        void copy(window.location.href);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

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
                <Badges
                    roomId={roomId}
                    onCopy={handleCopy}
                    copied={copied}
                />
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

function Badges({ roomId, onCopy, copied }: BadgesProps) {
    if (!roomId) {
        return <Badge>БЕЗ ЗАДАЧИ</Badge>;
    }

    const isHex = /^[0-9a-f]{6}$/i.test(roomId);

    return (
        <div className="inline-flex items-center gap-2">
            <Badge
                className={cn(
                    !isHex && 'bg-card/50',
                    'w-20 cursor-pointer select-none justify-center',
                )}
                style={
                    isHex
                        ? {
                              backgroundColor: `#${roomId}`,
                              color: getContrastColor(roomId),
                          }
                        : undefined
                }
                onClick={onCopy}
            >
                {copied ? 'Copy!' : `#${roomId.toUpperCase()}`}
            </Badge>

            <Badge>БЕЗ ЗАДАЧИ</Badge>
        </div>
    );
}
