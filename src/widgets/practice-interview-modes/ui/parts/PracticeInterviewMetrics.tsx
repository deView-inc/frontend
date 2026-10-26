import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';
import type { languageInterface } from '~&/widgets/practice-interview-modes/lib';

interface Props {
    list: languageInterface[];
    className?: string;
}

export const PracticeInterviewMetrics = ({ list, className }: Props) => (
    <Card className={cn('p-6 rounded-md', className)}>
        <h3 className="text-sm font-bold">Языковые метрики</h3>
        <div className="flex flex-col gap-4">
            {list.map(({ label, value }) => (
                <div
                    key={label}
                    className="grid grid-cols-[200px_1fr] items-center text-nowrap"
                >
                    <span className="text-muted-foreground">{label}</span>
                    <span>{value}</span>
                </div>
            ))}
        </div>
    </Card>
);
