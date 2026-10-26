import { type VariantProps, cva } from 'class-variance-authority';

export const emptyMediaVariants = cva(
    'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
        defaultVariants: {
            variant: 'default',
        },
        variants: {
            variant: {
                default: 'bg-transparent',
                icon: "flex size-8 shrink-0 items-center justify-center rounded-none bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
            },
        },
    },
);

export type TEmptyMediaVariants = VariantProps<typeof emptyMediaVariants>;
