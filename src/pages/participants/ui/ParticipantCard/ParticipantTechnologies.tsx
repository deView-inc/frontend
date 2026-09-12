import { Badge } from '~&/shared/ui';

import type { ParticipantDetailsProps } from '../../lib/types';

export function ParticipantTechnologies({ participant }: ParticipantDetailsProps) {
    return (
        <ul
            aria-label="Стек технологий"
            className="flex flex-wrap gap-1.5"
        >
            {participant.stack.map((technology) => (
                <li key={technology}>
                    <Badge
                        variant="outline"
                        className="bg-background text-muted-foreground h-[23px] rounded-[3px] px-2 font-mono text-[11.5px] font-normal"
                    >
                        {technology}
                    </Badge>
                </li>
            ))}
        </ul>
    );
}
