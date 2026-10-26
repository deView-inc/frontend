import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';

interface Props {
    title: string;
    description?: string;
    className?: string;
    children: React.ReactNode;
}

export function PracticeInterviewInfoCard({ title, description, className, children }: Props) {
    return (
        <Card className={cn('flex flex-col gap-3 rounded-md p-6', className)}>
            <h3 className="text-sm font-bold">{title}</h3>
            {children}
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </Card>
    );
}
