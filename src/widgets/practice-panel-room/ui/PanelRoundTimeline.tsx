'use client';

import { ChatCircleIcon, CheckIcon, SquareIcon } from '@phosphor-icons/react';
import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';

import { type PanelRoundStage, panelRoomMock } from '../lib';

interface RoundStageProps {
    stage: PanelRoundStage;
    isLast: boolean;
}

function RoundStage({ stage, isLast }: RoundStageProps) {
    const isCompleted = stage.status === 'completed';
    const isActive = stage.status === 'active';
    const isLocked = stage.status === 'locked';

    return (
        <li className={cn('relative min-w-0 pl-7', !isLast && 'pb-6')}>
            <div className="flex items-baseline justify-between gap-4">
                <p className="min-w-0 text-[13.5px] font-semibold">{stage.title}</p>

                <span className="text-muted-foreground shrink-0 font-mono text-[11.5px]">
                    {stage.durationMinutes} мин
                </span>
            </div>

            {stage.description && (
                <p className="text-muted-foreground mt-[3px] text-xs">{stage.description}</p>
            )}

            <span
                aria-hidden
                className={cn(
                    'absolute top-0 left-0 grid size-5 place-items-center rounded-[3px] border',
                    isActive ? 'border-ring bg-primary' : 'border-border bg-secondary',
                )}
            >
                {isCompleted && <CheckIcon size={11} />}

                {stage.status === 'upcoming' && <SquareIcon size={11} />}

                {isLocked && <ChatCircleIcon size={11} />}
            </span>

            {!isLast && (
                <span
                    aria-hidden
                    className="bg-border absolute top-[22px] bottom-[-2px] left-[9px] w-px"
                />
            )}
        </li>
    );
}

export function PanelRoundTimeline() {
    const { stages } = panelRoomMock;

    return (
        <Card className="gap-4 rounded-[3px] p-6">
            <h2 className="text-[15px] font-bold">Сценарий раунда</h2>

            <ol className="pl-2">
                {stages.map((stage, index) => (
                    <RoundStage
                        key={stage.id}
                        stage={stage}
                        isLast={index === stages.length - 1}
                    />
                ))}
            </ol>
        </Card>
    );
}
