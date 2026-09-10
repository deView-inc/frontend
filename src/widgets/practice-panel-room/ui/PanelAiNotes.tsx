'use client';

import { CheckIcon, ClockIcon } from '@phosphor-icons/react';
import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';

import { type PanelAiNote, panelRoomMock } from '../lib';

interface AiNoteProps {
    note: PanelAiNote;
}

function AiNote({ note }: AiNoteProps) {
    const isSuccess = note.tone === 'success';

    return (
        <li className="bg-secondary flex w-full min-w-0 items-start gap-3 rounded-[3px] border px-3.5 py-3">
            <span
                aria-hidden
                className={cn(
                    'bg-foreground/10 grid size-7 shrink-0 place-items-center rounded-[3px]',
                    isSuccess ? 'text-primary' : 'text-muted-foreground',
                )}
            >
                {isSuccess ? <CheckIcon size={14} /> : <ClockIcon size={14} />}
            </span>

            <div className="w-full max-w-[358px] min-w-0">
                <p className="text-[13px] font-semibold">{note.title}</p>

                <p className="text-muted-foreground mt-[3px] text-xs leading-[18px]">
                    {note.description}
                </p>
            </div>
        </li>
    );
}

export function PanelAiNotes() {
    const { aiNotes } = panelRoomMock;

    return (
        <Card className="gap-4 rounded-[3px] p-[22px]">
            <h2 className="text-[15px] font-bold">Заметки AI-модератора</h2>

            <ul className="grid w-full auto-rows-fr gap-3">
                {aiNotes.map((note) => (
                    <AiNote
                        key={note.id}
                        note={note}
                    />
                ))}
            </ul>
        </Card>
    );
}
