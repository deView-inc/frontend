import { cn } from '~&/shared/lib/utils';
import { Avatar, AvatarFallback, Badge } from '~&/shared/ui';

import { PARTICIPANT_LEVEL_CLASSES } from '../../lib/constants';
import type { ParticipantDetailsProps } from '../../lib/types';
import { ParticipantIdentity } from './ParticipantIdentity';

export function ParticipantHeader({ participant }: ParticipantDetailsProps) {
    return (
        <div className="flex items-start gap-3">
            <Avatar className="size-[46px]">
                <AvatarFallback
                    className={cn(
                        'rounded-[3px] font-mono text-[15px] font-bold',
                        participant.avatarClassName,
                    )}
                >
                    {participant.initials}
                </AvatarFallback>
            </Avatar>
            <ParticipantIdentity participant={participant} />
            <Badge
                className={cn(
                    'h-[22px] rounded-[3px] border-0 font-mono text-[11px]',
                    PARTICIPANT_LEVEL_CLASSES[participant.level],
                )}
            >
                {participant.level}
            </Badge>
        </div>
    );
}
