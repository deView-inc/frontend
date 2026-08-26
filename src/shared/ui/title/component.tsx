import { cn } from '~&/shared/lib/utils';

function Title({ children, className, ...rest }: React.ComponentProps<'p'>) {
    return (
        <h1
            className={cn('text-lg leading-tight font-bold', className)}
            {...rest}
        >
            {children}
        </h1>
    );
}
export { Title };
