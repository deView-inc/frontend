'use client';

import { ClipboardTextIcon, EyeSlashIcon, InfoIcon } from '@phosphor-icons/react';
import * as React from 'react';

export const NotesPanel = () => {
    const [value, setValue] = React.useState('');

    return (
        <div className="flex h-full min-h-0 flex-1 flex-col gap-4 p-4">
            <div className="flex shrink-0 flex-col gap-1">
                <div className="flex items-center gap-2">
                    <ClipboardTextIcon
                        size={18}
                        className="text-primary"
                        weight="fill"
                    />
                    <span className="text-sm">Мои заметки</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <EyeSlashIcon size={14} />
                    <span>Заметки видите только вы</span>
                </div>
            </div>

            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="border-border focus:border-primary/80 min-h-0 w-full flex-1 resize-none overflow-y-auto rounded-lg border p-3 focus:outline-none"
                placeholder="Заметки по ходу собеседования…"
            />

            <div className="text-muted-foreground flex shrink-0 items-start gap-1.5 text-xs">
                <InfoIcon
                    size={12}
                    className="mt-0.5 shrink-0"
                />
                <span>
                    Заметки остаются у вас после созвона —
                    <br />
                    интервьюер их не видит.
                </span>
            </div>
        </div>
    );
};
