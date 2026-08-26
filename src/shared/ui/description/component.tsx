import { cn } from '~&/shared/lib/utils';

function Description({ children, className, ...rest }: React.ComponentProps<'p'>) {
    return (
        <p
            className={cn('text-muted-foreground text-xs leading-tight  ', className)}
            {...rest}
        >
            {children}
        </p>
    );
}

export { Description };
