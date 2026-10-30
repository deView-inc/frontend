'use client';

import { useMaybeRoomContext } from '@livekit/components-react';
import { GearSixIcon, LockSimpleIcon, SignOutIcon } from '@phosphor-icons/react';
import { useClipboard } from '@siberiacancode/reactuse';
import Link from 'next/link';
import { useState } from 'react';
import { useRoomId, useRoomSlug, useRouteMeta, ParticipantAvatars } from '~&/shared/lib/hooks';
import { cn, getContrastColor } from '~&/shared/lib/utils';
import { Badge } from '~&/shared/ui/badge';
import { Button } from '~&/shared/ui/button';
import { PageHeader } from '~&/shared/ui/page-header';
import { Timer } from '~&/shared/ui/timer';
import { RoomSettingsModal } from '~&/widgets/room-session';

interface BadgesProps {
    roomId?: string;
    onCopy: () => void;
    copied: boolean;
}

export function RoomHeader() {
    const { label, description } = useRouteMeta();
    const room = useMaybeRoomContext();
    const roomId = useRoomId();
    const roomSlug = useRoomSlug();

    const { copy } = useClipboard();
    const [copied, setCopied] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleCopy = () => {
        setCopied(true);

        void copy(window.location.href);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <>
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
                    <Button
                        variant="ghost"
                        className="text-muted-foreground border-border"
                        aria-label="Настройки сессии"
                        onClick={() => setSettingsOpen(true)}
                    >
                        <GearSixIcon size={32} />
                    </Button>

                    {room && <ParticipantAvatars />}

                    <Button
                        variant="destructive"
                        nativeButton={false}
                        render={<Link href={`/room/${roomSlug}/summary`} />}
                        onClick={() => void room?.disconnect()}
                    >
                        <SignOutIcon size={32} />
                        Завершить
                    </Button>
                </div>
            </PageHeader>

            <RoomSettingsModal
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </>
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
