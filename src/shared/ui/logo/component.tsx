import * as React from 'react';
import { cn } from '~&/shared/lib/utils';

import { BlockLogo } from './block-logo';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'icon' | 'icon-text' | 'text';
}

export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
    ({ className, variant = 'icon-text', ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center gap-2.75', className)}
            {...props}
        >
            {(variant === 'icon' || variant === 'icon-text') && <BlockLogo />}
            {(variant === 'icon-text' || variant === 'text') && (
                <span className="font-brand text-foreground">devduo</span>
            )}
        </div>
    ),
);

Logo.displayName = 'Logo';
