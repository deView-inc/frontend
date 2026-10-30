import { type VariantProps, cva } from 'class-variance-authority';

export const sidebarMenuButtonVariants = cva(
    'peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebars-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebars=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebars-accent hover:text-sidebars-accent-foreground focus-visible:ring-2 active:bg-sidebars-accent active:text-sidebars-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebars-accent data-open:hover:text-sidebars-accent-foreground data-active:bg-sidebars-accent data-active:font-medium data-active:text-sidebars-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate',
    {
        defaultVariants: {
            size: 'default',
            variant: 'default',
        },
        variants: {
            size: {
                default: 'h-8 text-sm',
                lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
                sm: 'h-7 text-xs',
            },
            variant: {
                default: 'hover:bg-sidebars-accent hover:text-sidebars-accent-foreground',
                outline:
                    'bg-background shadow-[0_0_0_1px_var(--sidebars-border)] hover:bg-sidebars-accent hover:text-sidebars-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebars-accent)]',
            },
        },
    },
);

export type TSidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;
