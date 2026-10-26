import type { CSSProperties } from 'react';
import { cn } from '~&/shared/lib/utils';

import { type PanelParticipant, panelRoomMock } from '../lib';

interface ParticipantTileProps {
    participant: PanelParticipant;
}

function ParticipantTile({ participant }: ParticipantTileProps) {
    const roleLabel = participant.isCurrentUser ? 'Вы · кандидат' : participant.role;

    return (
        <article
            className={cn(
                'flex aspect-[20/9] items-end p-3',
                participant.isActive
                    ? 'bg-background ring-primary ring-2 ring-inset'
                    : participant.isCurrentUser
                      ? 'bg-primary/5'
                      : 'from-secondary to-background bg-gradient-to-br',
            )}
        >
            <div className="flex flex-col items-start">
                <span className="text-muted-foreground text-[9.5px] font-semibold tracking-[0.285px] uppercase">
                    {roleLabel}
                </span>

                <span className="w-full rounded-[3px] bg-black px-[9px] py-1 text-xs font-bold text-white">
                    {participant.name}
                </span>
            </div>
        </article>
    );
}

export function PanelParticipantsGrid() {
    const { participants } = panelRoomMock;

    const interviewers = participants.filter(({ type }) => type === 'interviewer');

    const candidate = participants.find(({ type }) => type === 'candidate');

    const interviewerColumns =
        interviewers.length <= 2
            ? Math.max(interviewers.length, 1)
            : Math.ceil(interviewers.length / 2);

    return (
        <section
            aria-label="Участники интервью"
            className="bg-border flex flex-col gap-[5px] overflow-hidden rounded-sm border"
        >
            <div
                className="grid grid-cols-1 gap-[5px] sm:grid-cols-[repeat(var(--interviewer-columns),minmax(0,1fr))]"
                style={
                    {
                        '--interviewer-columns': interviewerColumns,
                    } as CSSProperties
                }
            >
                {interviewers.map((participant) => (
                    <ParticipantTile
                        key={participant.id}
                        participant={participant}
                    />
                ))}
            </div>

            {candidate && <ParticipantTile participant={candidate} />}
        </section>
    );
}
