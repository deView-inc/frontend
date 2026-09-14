import { cn } from '~&/shared/lib/utils';

import type { ParticipantDetailsProps } from '../../lib/types';

export function ParticipantIdentity({ participant }: ParticipantDetailsProps) {
    return (
        <div className="min-w-0 flex-1">
            <h2 className="flex items-center gap-2 text-[15px] leading-5 font-semibold">
                <span className="break-words">{participant.name}</span>
                <span
                    aria-hidden="true"
                    className={cn(
                        'size-[7px] shrink-0 rounded-[3px]',
                        participant.online ? 'bg-[#73d99c]' : 'bg-[#4a525b]',
                    )}
                />
            </h2>
            <p className="text-muted-foreground mt-0.5 font-mono text-[12px] leading-[18px]">
                {participant.role} · {participant.online ? 'в сети' : 'не в сети'}
            </p>
        </div>
    );
}
