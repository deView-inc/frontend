import { cn } from '~&/shared/lib/utils';

import { PracticeInterviewInfoCard } from './PracticeInterviewInfoCard';

type StarStage = 'S' | 'T' | 'A' | 'R';
type StarStageStatus = 'done' | 'active' | 'pending';

const STAR_LABELS: Record<StarStage, string> = {
    A: 'Action',
    R: 'Result',
    S: 'Situation',
    T: 'Task',
};

interface Props {
    className?: string;
    statuses: Record<StarStage, StarStageStatus>;
    note: string;
}

export const PracticeInterviewStarBreakdown = ({ className, statuses, note }: Props) => (
    <PracticeInterviewInfoCard
        title="Разбор по STAR"
        description={note}
        className={className}
    >
        <div className="flex flex-wrap items-center justify-center gap-3">
            {(Object.keys(STAR_LABELS) as StarStage[]).map((stage) => (
                <StarBadge
                    key={stage}
                    stage={stage}
                    status={statuses[stage]}
                />
            ))}
        </div>
    </PracticeInterviewInfoCard>
);

interface StarBadgeProps {
    stage: StarStage;
    status: StarStageStatus;
}

const StarBadge = ({ stage, status }: StarBadgeProps) => (
    <div
        className={cn(
            'flex flex-col items-center gap-2 rounded-xl border px-2 py-3 min-h=[65px] min-w-[100px]',
            status === 'done' && 'border-primary bg-primary/10 text-primary',
            status === 'active' && 'border-destructive bg-destructive/10 text-destructive',
            status === 'pending' &&
                'border-secondary bg-transparent opacity-60 text-muted-foreground',
        )}
    >
        <span
            className={cn(
                'text-[15px] font-semibold',
                // Status === 'active' ? 'text-destructive' : 'text-primary',
            )}
        >
            {stage}
        </span>
        <span className="text-muted-foreground text-[11px] leading-tight">
            {STAR_LABELS[stage]}
        </span>
    </div>
);
