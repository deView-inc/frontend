import { cn } from '~&/shared/lib/utils/index';

import { type TEmptyMediaVariants, emptyMediaVariants } from './variants';

function Empty({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="empty"
            className={cn(
                'flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-none border-dashed p-6 text-center text-balance',
                className,
            )}
            {...props}
        />
    );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="empty-header"
            className={cn('flex max-w-sm flex-col items-center gap-2', className)}
            {...props}
        />
    );
}

function EmptyMedia({
    className,
    variant = 'default',
    ...props
}: React.ComponentProps<'div'> & TEmptyMediaVariants) {
    return (
        <div
            data-slot="empty-icon"
            data-variant={variant}
            className={cn(emptyMediaVariants({ className, variant }))}
            {...props}
        />
    );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="empty-title"
            className={cn('text-sm font-medium', className)}
            {...props}
        />
    );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
    return (
        <div
            data-slot="empty-description"
            className={cn(
                'text-xs/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
                className,
            )}
            {...props}
        />
    );
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="empty-content"
            className={cn(
                'flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-xs text-balance',
                className,
            )}
            {...props}
        />
    );
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
