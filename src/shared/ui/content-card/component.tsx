'use client';

import type { ReactNode } from 'react';
import { cn } from '~&/shared/lib/utils';

export type ContentCardLayout = 'feature' | 'panel' | 'stat';

export interface ContentCardActionProps {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    href?: string;
}

export interface ContentCardProps {
    title?: string;
    icon?: ReactNode;
    layout?: ContentCardLayout;
    action?: ContentCardActionProps;
    children?: ReactNode;
    className?: string;
}

export function ContentCard({
    title,
    icon,
    layout = 'panel',
    action,
    children,
    className,
}: ContentCardProps) {
    const hasHeader = layout !== 'feature' && Boolean(title || icon || action);

    return (
        <div className={cn('rounded-2xl border border-border bg-popover p-5', className)}>
            {layout === 'feature' && (
                <>
                    {icon && <div className="mb-3">{icon}</div>}
                    {title && (
                        <h3 className="text-foreground mb-1.5 text-[15px] font-semibold">
                            {title}
                        </h3>
                    )}
                </>
            )}

            {hasHeader && (
                <div className="flex items-center justify-between">
                    <div
                        className={cn(
                            'flex items-center gap-1.5',
                            layout === 'stat' && 'text-muted-foreground',
                        )}
                    >
                        {icon}
                        {title && (
                            <span
                                className={
                                    layout === 'stat'
                                        ? 'text-muted-foreground text-xs'
                                        : 'text-foreground text-[15px] font-medium'
                                }
                            >
                                {title}
                            </span>
                        )}
                    </div>

                    {action && <ContentCardActionButton action={action} />}
                </div>
            )}

            {children}
        </div>
    );
}

function ContentCardActionButton({ action }: { action: ContentCardActionProps }) {
    const classes =
        'flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors';
    const content = (
        <>
            {action.label}
            {action.icon}
        </>
    );

    if (action.href) {
        return (
            <a
                href={action.href}
                className={classes}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            type="button"
            onClick={action.onClick}
            className={classes}
        >
            {content}
        </button>
    );
}
