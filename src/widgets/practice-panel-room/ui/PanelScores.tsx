import { Badge, Card } from '~&/shared/ui';

import { panelRoomMock } from '../lib';

export function PanelScores() {
    const { participants, session } = panelRoomMock;

    const interviewers = participants.filter((participant) => participant.type === 'interviewer');

    const progress = `${session.consensusScore * 10}%`;

    return (
        <Card className="gap-0 rounded-[3px] p-[22px]">
            <header className="flex items-center justify-between pb-4">
                <h2 className="text-[15px] font-bold">Оценки панели</h2>

                <Badge
                    variant="outline"
                    className="bg-muted text-muted-foreground h-auto rounded-[3px] px-2.5 py-1 text-[11px] leading-none"
                >
                    live
                </Badge>
            </header>

            <div>
                {interviewers.map((participant) => (
                    <div
                        key={participant.id}
                        className="flex items-center justify-between border-b py-[11px]"
                    >
                        <div>
                            <p className="text-[13px] font-semibold">{participant.name}</p>

                            <p className="text-muted-foreground text-[11px]">{participant.role}</p>
                        </div>

                        <span className="text-primary font-mono text-[13px] font-bold">
                            {participant.score ?? '—'}
                        </span>
                    </div>
                ))}
            </div>

            <div className="bg-muted mt-3.5 h-2 overflow-hidden rounded-[3px]">
                <div
                    className="bg-primary h-full"
                    style={{ width: progress }}
                />
            </div>

            <p className="mt-2 text-base leading-tight">
                AI пересчитывает консенсус-балл после каждой отправленной оценки.
            </p>
        </Card>
    );
}
