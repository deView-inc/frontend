import { cn } from '~&/shared/lib/utils';

function Description({ children, className, ...rest }: React.ComponentProps<'p'>) {
    return (
        <h1
            className={cn('', className)}
            {...rest}
        >
            {children}
        </h1>
    );
}

export { Description };
