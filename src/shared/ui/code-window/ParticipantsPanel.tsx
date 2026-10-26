import type { ReactNode } from 'react';
import { cn } from '~&/shared/lib/utils';

export interface Participant {
    content: ReactNode;
    name?: string;
    hue: number;
}

const defaultParticipants: Participant[] = [
    { content: 'МГ', hue: 265, name: 'Марк' },
    { content: 'АЛ', hue: 128, name: 'Вы' },
];

interface ParticipantsPanelProps {
    className?: string;
}

export const ParticipantsPanel = ({ className }: ParticipantsPanelProps) => (
    <div
        className={cn(
            'flex flex-row items-center gap-2 border-t border-border bg-background p-2.5 text-chart-2 md:flex-col md:items-stretch md:border-t md:border-l',
            className,
        )}
    >
        <ParticipantsPanelAvatars participants={defaultParticipants} />

        <ParticipantsPanelStatus
            onlineCount={defaultParticipants.length}
            className="ml-auto md:mt-auto md:ml-0 md:text-center"
        />
    </div>
);

interface ParticipantsPanelAvatarProps {
    participant: Participant;
    className?: string;
}
export const ParticipantsPanelAvatar = ({
    participant,
    className,
}: ParticipantsPanelAvatarProps) => {
    const { content, name, hue } = participant;

    return (
        <div className={cn('flex shrink-0 flex-col items-center gap-1', className)}>
            <div
                className="grid size-8 place-items-center rounded-lg select-none"
                style={{
                    background: `linear-gradient(150deg, hsl(${hue} 46% 20%), #0d0f13)`,
                    color: `hsl(${hue} 85% 76%)`,
                }}
            >
                {typeof content === 'string' ? (
                    <span className="text-sm font-bold">{content}</span>
                ) : (
                    content
                )}
            </div>

            {name && (
                <span
                    className="hidden text-center font-mono text-[9px] leading-none md:block"
                    style={{ color: `hsl(${hue} 85% 76%)` }}
                >
                    {name}
                </span>
            )}
        </div>
    );
};

interface ParticipantsPanelAvatarsProps {
    participants: Participant[];
    className?: string;
}
export const ParticipantsPanelAvatars = ({
    participants,
    className,
}: ParticipantsPanelAvatarsProps) => (
    <div className={cn('flex items-center gap-2', className)}>
        {participants.map((p, i) => (
            <ParticipantsPanelAvatar
                key={p.name ?? i}
                participant={p}
            />
        ))}
    </div>
);

interface ParticipantsPanelStatusProps {
    onlineCount: number;
    className?: string;
}
export const ParticipantsPanelStatus = ({
    onlineCount,
    className,
}: ParticipantsPanelStatusProps) => (
    <div className={cn('font-mono text-[9.5px] leading-relaxed text-foreground-subtle', className)}>
        {onlineCount} в сети
        <br />
        синхронно
    </div>
);
