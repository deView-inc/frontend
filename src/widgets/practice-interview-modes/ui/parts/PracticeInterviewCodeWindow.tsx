import { SparkleIcon } from '@phosphor-icons/react';
import { cn } from '~&/shared/lib/utils';
import {
    CodeBody,
    CodeWindowHeader,
    type Participant,
    ParticipantsPanelAvatars,
    validParenthesesSnippet,
} from '~&/shared/ui/code-window';

const participants: Participant[] = [
    { content: 'АК', hue: 265 },
    { content: <SparkleIcon />, hue: 128 },
];

interface Props {
    className?: string;
}

export const PracticeInterviewCodeWindow = ({ className }: Props) => (
    <div
        className={cn(
            'flex flex-col bg-card rounded-md w-full min-w-0 max-w-full md:max-w-[550px]',
            className,
        )}
    >
        <CodeWindowHeader
            className="bg-secondary rounded-t-md"
            fileName="practice.js"
            statusLabel="AI-СЕССИЯ"
            statusColor="text-primary"
            live
        />
        <CodeBody
            className="h-[280px] overflow-auto sm:h-[380px] md:h-[560px]"
            snippet={validParenthesesSnippet}
        />
        <div className="bg-secondary flex flex-wrap gap-3 rounded-b-md border-t px-4 py-3">
            <ParticipantsPanelAvatars participants={participants} />
            <div className="bg-primary text-primary-foreground w-fit rounded-md px-3 py-1 text-nowrap">
                <span className="animate-blink-caret">●</span> практика — 06:42
            </div>
        </div>
    </div>
);
