'use client';

import { Card } from '~&/shared/ui';

import type { ParticipantCardProps } from '../../lib/types';
import { ParticipantFooter } from './ParticipantFooter';
import { ParticipantHeader } from './ParticipantHeader';
import { ParticipantTechnologies } from './ParticipantTechnologies';

export function ParticipantCard({
    participant,
    responded = false,
    onRespond,
}: ParticipantCardProps) {
    return (
        <Card className="text-foreground min-w-0 gap-[13px] rounded-[3px] border p-[18px] font-sans ring-0">
            <ParticipantHeader participant={participant} />
            <ParticipantTechnologies participant={participant} />
            <p className="text-muted-foreground min-h-[48px] flex-1 text-[13px] leading-[19.5px]">
                {participant.description}
            </p>
            <ParticipantFooter
                participant={participant}
                responded={responded}
                onRespond={onRespond}
            />
        </Card>
    );
}
