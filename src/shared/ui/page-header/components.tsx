import type { ReactNode } from 'react';
import { cn } from '~&/shared/lib/utils';

interface PageHeaderProps {
    title: ReactNode;
    description?: ReactNode;
    icons?: ReactNode;
    badges?: ReactNode;
    children?: ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    description,
    icons,
    badges,
    children,
    className,
}: PageHeaderProps) {
    return (
        <header
            className={cn(
                'bg-background z-10 flex h-auto shrink-0 flex-wrap items-center justify-between gap-3 border-b px-8 py-3.5 transition-[width,height]',
                className,
            )}
        >
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-1">
                        {icons}
                        <h1 className="text-lg leading-tight font-bold">{title}</h1>
                    </div>
                    {badges}
                </div>
                {description && (
                    <p className="text-muted-foreground text-xs leading-tight">{description}</p>
                )}
            </div>
            {children}
        </header>
    );
}
