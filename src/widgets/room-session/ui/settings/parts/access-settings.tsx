'use client';

import {
    ArrowsClockwiseIcon,
    CaretDownIcon,
    CheckIcon,
    CopyIcon,
    GlobeIcon,
    LinkIcon,
    LockSimpleIcon,
} from '@phosphor-icons/react';
import { useClipboard } from '@siberiacancode/reactuse';
import { useState } from 'react';
import { Button } from '~&/shared/ui/button';

import { SectionHeader } from './shared';

type Mode = 'link' | 'invite';

const MODES: Record<Mode, { label: string; hint: string; meta: string }> = {
    link: {
        label: 'Открытая',
        hint: 'Войдут только те, у кого есть эта ссылка.',
        meta: 'по ссылке',
    },
    invite: {
        label: 'По приглашению',
        hint: 'Войдут только те, кого вы пригласили. Остальные увидят запрос на вход.',
        meta: 'закрыта',
    },
};

export function AccessSettings() {
    const { copy } = useClipboard();
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState<Mode>('link');

    const link = window.location.href;

    const handleCopy = () => {
        void copy(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <>
            <SectionHeader
                icon={
                    <LinkIcon
                        size={16}
                        className="text-primary"
                    />
                }
                title="Приглашение"
                meta={MODES[mode].meta}
                hint="Кого и как пускать в эту сессию."
            />

            <div className="flex flex-col gap-2">
                <div className="bg-background border-border flex items-center gap-[7px] rounded-[9px] border px-2.5 py-2">
                    <p className="text-foreground min-w-0 flex-1 truncate font-mono text-[11.5px]">
                        {link}
                    </p>
                    <Button
                        variant="ghost"
                        aria-label="Скопировать ссылку"
                        onClick={handleCopy}
                        className={
                            copied ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                        }
                    >
                        {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
                    </Button>
                </div>

                <div className="flex items-center gap-1.5">
                    {/* TODO: POST на эндпоинт перегенерации ссылки, когда он появится на бэке */}
                    <Button
                        variant="secondary"
                        disabled
                        title="Появится вместе с эндпоинтом на бэке"
                        className="inline-flex gap-2 px-3 text-xs"
                    >
                        <ArrowsClockwiseIcon size={14} />
                        Новая ссылка
                    </Button>

                    <div className="relative flex-1">
                        {mode === 'link' ? (
                            <GlobeIcon
                                size={13}
                                className="text-primary pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2"
                            />
                        ) : (
                            <LockSimpleIcon
                                size={13}
                                className="text-primary pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2"
                            />
                        )}
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value as Mode)}
                            className="bg-card border-border text-foreground focus-visible:border-primary h-8 w-full appearance-none rounded-lg border pr-7 pl-8 text-xs font-medium outline-none"
                        >
                            {(Object.keys(MODES) as Mode[]).map((m) => (
                                <option
                                    key={m}
                                    value={m}
                                >
                                    {MODES[m].label}
                                </option>
                            ))}
                        </select>
                        <CaretDownIcon
                            size={12}
                            className="text-secondary pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
                        />
                    </div>
                </div>

                <p className="text-muted-foreground px-0.5 text-[10.5px] leading-[1.45]">
                    {MODES[mode].hint}
                </p>
            </div>
        </>
    );
}
