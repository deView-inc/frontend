'use client';

import { useIsMuted, useParticipants } from '@livekit/components-react';
import {
    ChatCircleIcon,
    EyeIcon,
    HeadphonesIcon,
    MicrophoneIcon,
    MicrophoneSlashIcon,
    MonitorArrowUpIcon,
    UsersThreeIcon,
    VideoCameraIcon,
} from '@phosphor-icons/react';
import { type Participant, Track } from 'livekit-client';
import { useState } from 'react';
import { cn } from '~&/shared/lib/utils';

import { Card, InitialsAvatar, plural, SectionHeader } from './shared';

const RIGHTS = [
    { id: 'listen', label: 'Слушать', icon: HeadphonesIcon },
    { id: 'mic', label: 'Микрофон', icon: MicrophoneIcon },
    { id: 'cam', label: 'Камера', icon: VideoCameraIcon },
    { id: 'seeChat', label: 'Видит чат', icon: EyeIcon },
    { id: 'writeChat', label: 'Пишет в чат', icon: ChatCircleIcon },
    { id: 'screen', label: 'Показывает экран', icon: MonitorArrowUpIcon },
] as const;

export function MembersSettings() {
    const participants = useParticipants();
    // Ключи "identity:right" для выключенных прав (по умолчанию всё включено)
    const [off, setOff] = useState<Set<string>>(new Set());

    const toggle = (key: string) =>
        setOff((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });

    const count = participants.length;

    return (
        <>
            <SectionHeader
                icon={
                    <UsersThreeIcon
                        size={16}
                        className="text-primary"
                    />
                }
                title="Участники сессии"
                meta={`${count} ${plural(count, ['человек', 'человека', 'человек'])}`}
                hint="Микрофон, камера и чат — по одному тумблеру на человека. Всё меняется на ходу."
            />

            <div className="flex flex-col gap-2">
                {participants.map((p) => (
                    <Card
                        key={p.identity}
                        className="flex flex-col gap-2"
                    >
                        <div className="flex items-center gap-2.5">
                            <InitialsAvatar name={p.name || p.identity} />
                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <p className="text-foreground truncate text-[13px] font-semibold">
                                    {p.name || p.identity}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {p.isLocal ? 'это вы' : 'участник'}
                                </p>
                            </div>
                            <MicState participant={p} />
                        </div>

                        {!p.isLocal && (
                            <div className="flex flex-wrap gap-1">
                                {RIGHTS.map(({ id, label, icon: Icon }) => {
                                    const key = `${p.identity}:${id}`;
                                    const on = !off.has(key);
                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            aria-pressed={on}
                                            onClick={() => toggle(key)}
                                            className={cn(
                                                'flex items-center gap-1 rounded-[7px] border px-2 py-1 text-sm font-medium',
                                                on
                                                    ? 'border-primary/30 bg-primary/10 text-primary'
                                                    : 'border-border text-muted-foreground',
                                            )}
                                        >
                                            <Icon size={12} />
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </>
    );
}

function MicState({ participant }: { participant: Participant }) {
    const muted = useIsMuted({ participant, source: Track.Source.Microphone });

    return muted ? (
        <MicrophoneSlashIcon
            size={14}
            className="text-muted-foreground"
        />
    ) : (
        <MicrophoneIcon
            size={14}
            weight="fill"
            className="text-primary"
        />
    );
}
