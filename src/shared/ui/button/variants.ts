import { type VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-sans font-[600] whitespace-nowrap transition-opacity outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 cursor-pointer hover:opacity-80 active:opacity-60 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        defaultVariants: {
            size: 'medium',
            variant: 'primary',
        },
        variants: {
            size: {
                default:
                    'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
                icon: 'size-8',
                'icon-lg': 'size-9',
                'icon-sm': 'size-7 rounded-[10px] p-0',
                'icon-xs': "size-6 rounded-none [&_svg:not([class*='size-'])]:size-3",
                large: 'h-12 rounded-[11px] px-[22px] text-sm',
                lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
                medium: 'h-9 rounded-[10px] px-[17px] text-[15px]',
                sm: "h-7 gap-1 rounded-none px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
                xs: "h-6 gap-1 rounded-none px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            },
            variant: {
                destructive:
                    'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
                ghost: 'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
                link: 'text-primary underline-offset-4 hover:underline',
                outline:
                    'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
                primary: 'border-0 bg-primary text-primary-foreground',
                secondary: 'border border-input bg-secondary text-secondary-foreground',
            },
        },
    },
);

export type TButtonVariants = VariantProps<typeof buttonVariants>;
