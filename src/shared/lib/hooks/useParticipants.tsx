'use client';

import { useParticipants } from '@livekit/components-react';
import { cn, getAvatarColor, getInitials } from '~&/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarGroup } from '~&/shared/ui';

const MAX_AVATARS = 3;

export function ParticipantAvatars() {
    const participants = useParticipants();
    const shown = participants.slice(0, MAX_AVATARS);
    const rest = participants.length - shown.length;
    return (
        <AvatarGroup className="*:data-[slot=avatar]:ring-1">
            {shown.map((p) => (
                <Avatar
                    key={p.identity}
                    title={p.name || p.identity}
                    className="size-8 rounded-full after:rounded-full"
                >
                    <AvatarFallback
                        className={cn(
                            'rounded-full text-xs font-medium text-white',
                            getAvatarColor(p.identity),
                        )}
                    >
                        {getInitials(p.name || p.identity)}
                    </AvatarFallback>
                </Avatar>
            ))}
            {rest > 0 && (
                <Avatar className="size-8 rounded-full after:rounded-full">
                    <AvatarFallback className="bg-card text-foreground rounded-full text-xs font-medium">
                        +{rest}
                    </AvatarFallback>
                </Avatar>
            )}
        </AvatarGroup>
    );
}
