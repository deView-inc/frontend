import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import * as React from 'react';
import { cn } from '~&/shared/lib/utils/index';
import { Separator } from '~&/shared/ui/separator';

import {
    type TItemMediaVariants,
    type TItemVariants,
    itemMediaVariants,
    itemVariants,
} from './variants';

function ItemGroup({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            role="list"
            data-slot="item-group"
            className={cn(
                'group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2',
                className,
            )}
            {...props}
        />
    );
}

function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
    return (
        <Separator
            data-slot="item-separator"
            orientation="horizontal"
            className={cn('my-2', className)}
            {...props}
        />
    );
}

function Item({
    className,
    variant = 'default',
    size = 'default',
    render,
    ...props
}: useRender.ComponentProps<'div'> & TItemVariants) {
    return useRender({
        defaultTagName: 'div',
        props: mergeProps<'div'>(
            {
                className: cn(itemVariants({ className, size, variant })),
            },
            props,
        ),
        render,
        state: {
            size,
            slot: 'item',
            variant,
        },
    });
}

function ItemMedia({
    className,
    variant = 'default',
    ...props
}: React.ComponentProps<'div'> & TItemMediaVariants) {
    return (
        <div
            data-slot="item-media"
            data-variant={variant}
            className={cn(itemMediaVariants({ className, variant }))}
            {...props}
        />
    );
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="item-content"
            className={cn(
                'flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none',
                className,
            )}
            {...props}
        />
    );
}

function ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="item-title"
            className={cn(
                'line-clamp-1 flex w-fit items-center gap-2 text-xs font-medium underline-offset-4',
                className,
            )}
            {...props}
        />
    );
}

function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
    return (
        <p
            data-slot="item-description"
            className={cn(
                'line-clamp-2 text-left text-xs/relaxed font-normal text-muted-foreground group-data-[size=xs]/item:text-xs/relaxed [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
                className,
            )}
            {...props}
        />
    );
}

function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="item-actions"
            className={cn('flex items-center gap-2', className)}
            {...props}
        />
    );
}

function ItemHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="item-header"
            className={cn('flex basis-full items-center justify-between gap-2', className)}
            {...props}
        />
    );
}

function ItemFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="item-footer"
            className={cn('flex basis-full items-center justify-between gap-2', className)}
            {...props}
        />
    );
}

export {
    Item,
    ItemMedia,
    ItemContent,
    ItemActions,
    ItemGroup,
    ItemSeparator,
    ItemTitle,
    ItemDescription,
    ItemHeader,
    ItemFooter,
};
