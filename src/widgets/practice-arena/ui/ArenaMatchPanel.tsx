import { cn } from '~&/shared/lib/utils';
import { Card, Glow } from '~&/shared/ui';

import { arenaMock } from '../lib/arena-mock';
import { ArenaCodeWindow } from './ArenaCodeWindow';

interface ParticipantInfoProps {
    initials: string;
    name: string;
    elo: number;
    className?: string;
}

function ParticipantInfo({ initials, name, elo, className }: ParticipantInfoProps) {
    return (
        <div className={cn('relative flex items-center gap-3', className)}>
            <div className="bg-muted border-border grid size-10 shrink-0 place-items-center rounded-[3px] border">
                <span className="text-primary text-xs font-bold">{initials}</span>
            </div>

            <div>
                <p className="text-sm font-bold">{name}</p>

                <p className="text-muted-foreground/60 font-mono text-[11.5px]">ELO {elo}</p>
            </div>
        </div>
    );
}

export function ArenaMatchPanel() {
    const { match, participants } = arenaMock;
    const [currentUser, opponent] = participants;

    return (
        <div className="flex flex-col gap-2.5">
            <Card className="relative items-center justify-center gap-4 rounded-sm p-5 md:flex-row md:gap-6">
                <Glow
                    width={340}
                    blur={100}
                    opacity={0.08}
                    className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />

                <ParticipantInfo
                    className="relative"
                    initials={currentUser.initials}
                    name={currentUser.name}
                    elo={currentUser.elo}
                />

                <div className="text-primary relative font-mono text-[30px] leading-none font-extrabold tracking-[-0.3px]">
                    {match.remainingTime}
                </div>

                <ParticipantInfo
                    className="relative md:flex-row-reverse md:text-right"
                    initials={opponent.initials}
                    name={opponent.name}
                    elo={opponent.elo}
                />
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {participants.map((participant) => {
                    const ownerLabel = participant.isCurrentUser ? 'вы' : participant.name;

                    return (
                        <ArenaCodeWindow
                            key={participant.id}
                            {...participant.editor}
                            fileName={`${participant.editor.fileName} — ${ownerLabel}`}
                            isCurrentUser={participant.isCurrentUser}
                        />
                    );
                })}
            </div>
        </div>
    );
}
