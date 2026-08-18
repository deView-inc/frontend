import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cn } from '~&/shared/lib/utils';

import { type TButtonVariants, buttonVariants } from './variants';

function Button({
    className,
    variant = 'primary',
    size = 'medium',
    ...props
}: ButtonPrimitive.Props & TButtonVariants) {
    return (
        <ButtonPrimitive
            data-slot="button"
            className={cn(buttonVariants({ className, size, variant }))}
            {...props}
        />
    );
}

export { Button };
