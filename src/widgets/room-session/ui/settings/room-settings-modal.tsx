'use client';

import { useParticipants } from '@livekit/components-react';
import {
    GearSixIcon,
    ProhibitIcon,
    ShieldCheckIcon,
    SlidersHorizontalIcon,
    UsersThreeIcon,
    XIcon,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { cn } from '~&/shared/lib/utils';
import { Button } from '~&/shared/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '~&/shared/ui/dialog';

import { AccessSettings } from './parts/access-settings';
import { BannedSettings } from './parts/banned-settings';
import { DevicesSettings } from './parts/devices-settings';
import { MembersSettings } from './parts/members-settings';

type SectionId = 'devices' | 'access' | 'participants' | 'blocks';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function RoomSettingsModal({ open, onClose }: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (!next) {
                    onClose();
                }
            }}
        >
            <DialogContent
                showCloseButton={false}
                className="bg-card border-border flex h-[600px] max-h-[calc(100%-2rem)] w-[640px] max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden rounded-2xl border p-0 sm:max-w-[640px]"
            >
                <SettingsBody />
            </DialogContent>
        </Dialog>
    );
}

function SettingsBody() {
    const [section, setSection] = useState<SectionId>('devices');
    const participantsCount = useParticipants().length;

    const nav: { id: SectionId; label: string; icon: typeof GearSixIcon; meta?: number }[] = [
        { id: 'devices', label: 'Устройства', icon: SlidersHorizontalIcon },
        { id: 'access', label: 'Доступ', icon: ShieldCheckIcon },
        { id: 'participants', label: 'Участники', icon: UsersThreeIcon, meta: participantsCount },
        { id: 'blocks', label: 'Блокировки', icon: ProhibitIcon },
    ];

    return (
        <>
            <header className="border-border/60 flex items-center gap-2.5 border-b p-5">
                <GearSixIcon
                    size={18}
                    weight="fill"
                    className="text-primary"
                />
                <DialogTitle className="text-foreground text-[15px] leading-normal font-semibold">
                    Настройки сессии
                </DialogTitle>
                <DialogClose
                    aria-label="Закрыть"
                    className="text-foreground-muted hover:text-foreground ml-auto"
                >
                    <XIcon size={16} />
                </DialogClose>
            </header>

            <div className="flex min-h-0 flex-1">
                <nav className="border-border/60 flexshrink-0 flex-col gap-1 border-r p-3">
                    {nav.map(({ id, label, icon: Icon, meta }) => {
                        const active = id === section;
                        return (
                            <Button
                                key={id}
                                type="button"
                                variant="ghost"
                                onClick={() => setSection(id)}
                                className={cn(
                                    'flex flex-row items-center justify-start gap-2 text-muted-foreground',
                                    active
                                        ? 'bg-primary/10 text-primary font-semibold pointer-events-none'
                                        : 'font-semibold',
                                )}
                            >
                                <Icon
                                    size={15}
                                    weight={active ? 'fill' : 'regular'}
                                />
                                {label}
                                {meta !== undefined && <span className="text-sm">{meta}</span>}
                            </Button>
                        );
                    })}
                </nav>

                <div className="min-h-0 flex-1 overflow-y-auto p-5">
                    {section === 'devices' && <DevicesSettings />}
                    {section === 'access' && <AccessSettings />}
                    {section === 'participants' && <MembersSettings />}
                    {section === 'blocks' && <BannedSettings />}
                </div>
            </div>

            <footer className="border-border text-muted-foreground border-t px-4 py-3 text-xs">
                Настройки действуют только в этом созвоне.
            </footer>
        </>
    );
}
