import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cn } from '~&/shared/lib/utils';

import { type TBadgeVariants, badgeVariants } from './variants';

function Badge({
    className,
    variant = 'default',
    render,
    ...props
}: useRender.ComponentProps<'span'> & TBadgeVariants) {
    return useRender({
        defaultTagName: 'span',
        props: mergeProps<'span'>(
            {
                className: cn(badgeVariants({ variant }), className),
            },
            props,
        ),
        render,
        state: {
            slot: 'badge',
            variant,
        },
    });
}

export { Badge };
