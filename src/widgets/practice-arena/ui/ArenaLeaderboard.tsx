import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';

import { arenaMock } from '../lib/arena-mock';

export function ArenaLeaderboard() {
    const { leaderboard } = arenaMock;

    return (
        <Card className="h-full gap-0 rounded-sm p-[22px]">
            <h2 className="pb-4 text-[15px] font-bold">Лидерборд недели</h2>

            <div>
                {leaderboard.map((participant) => {
                    const isTopThree = participant.rank <= 3;

                    const participantName = participant.isCurrentUser
                        ? `${participant.name} (вы)`
                        : participant.name;

                    return (
                        <div
                            key={participant.id}
                            className="flex items-center gap-3 py-2.5"
                        >
                            <span
                                className={cn(
                                    'w-[22px] shrink-0 font-mono text-xs font-bold',
                                    isTopThree ? 'text-primary' : 'text-muted-foreground/60',
                                )}
                            >
                                {participant.rank}
                            </span>

                            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
                                {participantName}
                            </span>

                            <span className="text-muted-foreground/60 shrink-0 font-mono text-xs">
                                {participant.elo}
                            </span>
                        </div>
                    );
                })}
            </div>

            <p className="pt-2 text-base">
                AI подбирает соперников так, чтобы разница ELO не превышала 60 очков.
            </p>
        </Card>
    );
}
