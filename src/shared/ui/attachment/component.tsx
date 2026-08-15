import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import * as React from 'react';
import { cn } from '~&/shared/lib/utils/index';
import { Button } from '~&/shared/ui/button';

import type { TAttachmentMediaVariants, TAttachmentVariants } from './variants';
import { attachmentMediaVariants, attachmentVariants } from './variants';

export type TAttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done';

function Attachment({
    className,
    state = 'done',
    size = 'default',
    orientation = 'horizontal',
    ...props
}: React.ComponentProps<'div'> &
    TAttachmentVariants & {
        state?: TAttachmentState;
    }) {
    return (
        <div
            data-slot="attachment"
            data-state={state}
            data-size={size}
            data-orientation={orientation}
            className={cn(attachmentVariants({ orientation, size }), className)}
            {...props}
        />
    );
}

function AttachmentMedia({
    className,
    variant = 'icon',
    ...props
}: React.ComponentProps<'div'> & TAttachmentMediaVariants) {
    return (
        <div
            data-slot="attachment-media"
            data-variant={variant}
            className={cn(attachmentMediaVariants({ variant }), className)}
            {...props}
        />
    );
}

function AttachmentContent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="attachment-content"
            className={cn(
                'max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1',
                className,
            )}
            {...props}
        />
    );
}

function AttachmentTitle({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="attachment-title"
            className={cn(
                'block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer',
                className,
            )}
            {...props}
        />
    );
}

function AttachmentDescription({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="attachment-description"
            className={cn(
                'mt-0.5 block min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive/80',
                'max-w-full',
                className,
            )}
            {...props}
        />
    );
}

function AttachmentActions({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="attachment-actions"
            className={cn(
                'relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1',
                className,
            )}
            {...props}
        />
    );
}

function AttachmentAction({
    className,
    variant,
    size = 'icon-xs',
    ...props
}: React.ComponentProps<typeof Button>) {
    return (
        <Button
            data-slot="attachment-action"
            variant={variant ?? 'ghost'}
            size={size}
            className={cn(className)}
            {...props}
        />
    );
}

function AttachmentTrigger({
    className,
    render,
    type,
    ...props
}: useRender.ComponentProps<'button'>) {
    return useRender({
        defaultTagName: 'button',
        props: mergeProps<'button'>(
            {
                className: cn('absolute inset-0 z-10 outline-none', className),
                type: render ? type : (type ?? 'button'),
            },
            props,
        ),
        render,
        state: {
            slot: 'attachment-trigger',
        },
    });
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="attachment-group"
            className={cn(
                'flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 scrollbar-none gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start',
                className,
            )}
            {...props}
        />
    );
}

export {
    Attachment,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentContent,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentActions,
    AttachmentAction,
    AttachmentTrigger,
};
