'use client';

import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '~&/shared/lib/utils';

const segmentedVariants = cva('group/segmented inline-flex w-fit items-center', {
    defaultVariants: {
        size: 'default',
        variant: 'outlined',
    },
    variants: {
        size: {
            default: null,
            icon: 'h-[34px]',
        },
        variant: {
            buttons: 'gap-2',
            outlined: 'gap-1 rounded-[10px] border border-[#1C2026] bg-[#101215] p-[3px]',
        },
    },
});

const segmentedItemClasses = cn(
    "relative inline-flex cursor-pointer items-center justify-center gap-1.5 font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    'group-data-[variant=outlined]/segmented:max-h-7 group-data-[variant=outlined]/segmented:rounded-[7px] group-data-[variant=outlined]/segmented:px-3 group-data-[variant=outlined]/segmented:py-1.5 group-data-[variant=outlined]/segmented:text-xs group-data-[variant=outlined]/segmented:font-medium group-data-[variant=outlined]/segmented:leading-[14px] group-data-[variant=outlined]/segmented:[font-family:Manrope,sans-serif] group-data-[variant=outlined]/segmented:text-[#98A0A8] group-data-[variant=outlined]/segmented:hover:text-[#98A0A8] group-data-[variant=outlined]/segmented:data-pressed:bg-[#B9F24C] group-data-[variant=outlined]/segmented:data-pressed:text-[#0A0C0E]',
    'group-data-[variant=buttons]/segmented:h-12 group-data-[variant=buttons]/segmented:rounded-sm group-data-[variant=buttons]/segmented:border group-data-[variant=buttons]/segmented:border-border group-data-[variant=buttons]/segmented:bg-card group-data-[variant=buttons]/segmented:px-5 group-data-[variant=buttons]/segmented:text-base group-data-[variant=buttons]/segmented:font-semibold group-data-[variant=buttons]/segmented:text-muted-foreground group-data-[variant=buttons]/segmented:hover:bg-accent group-data-[variant=buttons]/segmented:hover:text-foreground group-data-[variant=buttons]/segmented:data-pressed:border-primary group-data-[variant=buttons]/segmented:data-pressed:bg-primary group-data-[variant=buttons]/segmented:data-pressed:text-primary-foreground',
    'group-data-[size=icon]/segmented:!h-auto',
);

interface SegmentedProps<Value extends string>
    extends
        Omit<ToggleGroup.Props<Value>, 'value' | 'defaultValue' | 'onValueChange' | 'multiple'>,
        VariantProps<typeof segmentedVariants> {
    value?: Value;
    defaultValue?: Value;
    onValueChange?: (value: Value) => void;
}

/** Выбор единственного значения из представленных. */
function Segmented<Value extends string = string>({
    className,
    size = 'default',
    variant = 'outlined',
    value,
    defaultValue,
    onValueChange,
    ...props
}: SegmentedProps<Value>) {
    const onValueChangeFn = React.useCallback(
        (groupValue: Value[]) => {
            const [next] = groupValue;

            if (next !== undefined) {
                onValueChange?.(next);
            }
        },
        [onValueChange],
    );

    const groupValue = React.useMemo(() => (value === undefined ? undefined : [value]), [value]);

    const groupDefaultValue = React.useMemo(
        () => (defaultValue === undefined ? undefined : [defaultValue]),
        [defaultValue],
    );

    return (
        <ToggleGroup
            data-slot="segmented"
            data-size={size}
            data-variant={variant}
            value={groupValue}
            defaultValue={groupDefaultValue}
            onValueChange={onValueChangeFn}
            className={cn(segmentedVariants({ size, variant }), className)}
            {...props}
        />
    );
}

function SegmentedItem({ className, ...props }: Toggle.Props) {
    return (
        <Toggle
            data-slot="segmented-item"
            className={cn(segmentedItemClasses, className)}
            {...props}
        />
    );
}

export { Segmented, SegmentedItem, segmentedVariants };
export type { SegmentedProps };
