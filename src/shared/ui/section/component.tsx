import * as React from 'react';
import { cn } from '~&/shared/lib/utils';

type SpacingValue = 'none' | '14' | '18' | '22' | '24';

const paddingTopMap: Record<SpacingValue, string> = {
    '14': 'pt-[14px]',
    '18': 'pt-[18px]',
    '22': 'pt-[22px]',
    '24': 'pt-[24px]',
    none: 'pt-0',
};

const paddingBottomMap: Record<SpacingValue, string> = {
    '14': 'pb-[14px]',
    '18': 'pb-[18px]',
    '22': 'pb-[22px]',
    '24': 'pb-[24px]',
    none: 'pb-0',
};

const paddingMap: Record<SpacingValue, string> = {
    '14': 'py-[14px]',
    '18': 'py-[18px]',
    '22': 'py-[22px]',
    '24': 'py-[24px]',
    none: 'py-0',
};

interface WithPadding {
    padding?: SpacingValue;
    paddingTop?: never;
    paddingBottom?: never;
}

interface WithIndividualPadding {
    padding?: never;
    paddingTop?: SpacingValue;
    paddingBottom?: SpacingValue;
}

export type SectionProps = React.HTMLAttributes<HTMLElement> &
    (WithPadding | WithIndividualPadding);

export const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, ...props }, ref) => {
        const { padding, paddingTop, paddingBottom, ...rest } =
            props as React.HTMLAttributes<HTMLElement> & WithPadding & WithIndividualPadding;

        const paddingClass = padding
            ? paddingMap[padding ?? 'none']
            : cn(paddingTopMap[paddingTop ?? 'none'], paddingBottomMap[paddingBottom ?? 'none']);

        return (
            <section
                ref={ref}
                className={cn('w-full', paddingClass, className)}
                {...rest}
            />
        );
    },
);

Section.displayName = 'Section';
