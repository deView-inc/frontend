import * as React from 'react';
import { cn } from '~&/shared/lib/utils';

type SpacingValue = 'none' | '28';

const paddingLeftMap: Record<SpacingValue, string> = {
    '28': 'pl-[28px]',
    none: 'pl-0',
};

const paddingRightMap: Record<SpacingValue, string> = {
    '28': 'pr-[28px]',
    none: 'pr-0',
};

const paddingXMap: Record<SpacingValue, string> = {
    '28': 'px-[28px]',
    none: 'px-0',
};

interface WithPaddingX {
    paddingX?: SpacingValue;
    paddingLeft?: never;
    paddingRight?: never;
}

interface WithIndividualPaddingX {
    paddingX?: never;
    paddingLeft?: SpacingValue;
    paddingRight?: SpacingValue;
}

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
    (WithPaddingX | WithIndividualPaddingX);

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, ...props }, ref) => {
        const { paddingX, paddingLeft, paddingRight, ...rest } =
            props as React.HTMLAttributes<HTMLDivElement> & WithPaddingX & WithIndividualPaddingX;

        const paddingClass = paddingX
            ? paddingXMap[paddingX]
            : cn(paddingLeftMap[paddingLeft ?? 'none'], paddingRightMap[paddingRight ?? 'none']);

        return (
            <div
                ref={ref}
                className={cn('mx-auto w-full max-w-300', paddingClass, className)}
                {...rest}
            />
        );
    },
);

Container.displayName = 'Container';
