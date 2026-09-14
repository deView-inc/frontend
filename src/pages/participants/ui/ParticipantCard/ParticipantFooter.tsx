import { useCallback } from 'react';
import { Button, Icon } from '~&/shared/ui';

import type { ParticipantCardProps } from '../../lib/types';

export function ParticipantFooter({ participant, responded, onRespond }: ParticipantCardProps) {
    const handleRespond = useCallback(() => onRespond?.(participant), [onRespond, participant]);

    return (
        <div className="flex flex-wrap items-center gap-x-[11px] gap-y-3 border-t pt-[13px]">
            <span
                aria-label={`Рейтинг ${participant.rating} из 10`}
                className="text-primary flex items-center gap-1.5 text-[13px] font-bold"
            >
                <Icon
                    name="Star"
                    weight="fill"
                    aria-hidden="true"
                    className="size-[13px]"
                    skeletonClassName="size-[13px]"
                />
                {participant.rating}
            </span>
            <span className="text-muted-foreground font-mono text-xs">
                {participant.sessions} сессий
            </span>
            {onRespond && (
                <Button
                    size="sm"
                    className="ml-auto h-8 gap-[7px] rounded-[3px] px-[15px] text-[13px]"
                    onClick={handleRespond}
                    aria-pressed={responded}
                    aria-label={`${responded ? 'Отменить отклик' : 'Откликнуться'}: ${participant.name}`}
                >
                    <Icon
                        name="HandWaving"
                        aria-hidden="true"
                        className="size-[13px]"
                        skeletonClassName="size-[13px]"
                    />
                    {responded ? 'Вы откликнулись' : 'Откликнуться'}
                </Button>
            )}
        </div>
    );
}
