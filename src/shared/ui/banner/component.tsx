'use client';

import { ArrowRightIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { cn } from '~&/shared/lib/utils';
import { Button } from '~&/shared/ui/button';

interface BannerProps {
    title: string;
    description: string;
    icon?: ReactNode;
    iconBackgroundColor?: string;
    showArrow?: boolean;
    buttonLabel?: string;
    onButtonClick?: () => void;
    color?: string;
    className?: string;
}

export const Banner = ({
    title,
    description,
    icon,
    iconBackgroundColor,
    showArrow = true,
    buttonLabel,
    onButtonClick,
    color,
    className,
}: BannerProps) => (
    <div
        className={cn(
            'relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-border p-5',
            className,
        )}
        style={
            color
                ? { backgroundImage: `linear-gradient(135deg, ${color}, transparent 70%)` }
                : undefined
        }
    >
        <div className="relative z-10 flex items-center gap-4">
            {icon && (
                <div
                    className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full p-3',
                        iconBackgroundColor,
                    )}
                >
                    {icon}
                </div>
            )}
            <div>
                <h2 className="text-foreground text-3xl">{title}</h2>
                <p className="text-muted-foreground text-sm">{description}</p>
            </div>
        </div>

        <div className="relative z-10 shrink-0">
            <Button
                type="button"
                onClick={onButtonClick}
                variant="primary"
                size="large"
            >
                {buttonLabel}
                {showArrow && (
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
                )}
            </Button>
        </div>
    </div>
);
