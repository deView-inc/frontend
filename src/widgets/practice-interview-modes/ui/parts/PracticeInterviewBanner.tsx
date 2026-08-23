'use client';

import { ArrowRightIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { cn } from '~&/shared/lib/utils';
import { Button } from '~&/shared/ui/button';

interface Props {
    title: string;
    description: string;
    icon?: ReactNode;
    iconBackgroundColor?: string;
    badgeLabel?: string;
    badgeColor?: string;
    glowClassName?: string;
    showArrow?: boolean;
    buttonLabel?: string;
    onButtonClick?: () => void;
    className?: string;
}

export const PracticeInterviewBanner = ({
    title,
    description,
    icon,
    iconBackgroundColor = 'bg-white/5',
    badgeLabel,
    badgeColor = 'bg-lime-400',
    glowClassName,
    showArrow = false,
    buttonLabel,
    onButtonClick,
    className,
}: Props) => (
    <div
        className={cn(
            'relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5',
            className,
        )}
    >
        {/* Фоновое свечение, включается через glowClassName, напр. "from-primary/40 to-transparent" */}
        {glowClassName && (
            <div
                className={cn(
                    'pointer-events-none absolute inset-0 bg-gradient-to-b',
                    glowClassName,
                )}
            />
        )}

        <div className="relative z-10 flex items-start justify-between gap-4">
            {icon && (
                <div
                    className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                        iconBackgroundColor,
                    )}
                >
                    {icon}
                </div>
            )}

            {badgeLabel && (
                <span
                    className={cn(
                        'rounded-full px-3 py-1 text-xs font-medium text-black',
                        badgeColor,
                    )}
                >
                    {badgeLabel}
                </span>
            )}
        </div>

        <div className="relative z-10 flex flex-col gap-1">
            <h2 className="text-foreground text-lg font-semibold">{title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>

        {showArrow && (
            <div className="relative z-10 mt-2">
                <Button
                    type="button"
                    onClick={onButtonClick}
                    variant="primary"
                    size="large"
                >
                    {buttonLabel}
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
                </Button>
            </div>
        )}
    </div>
);
