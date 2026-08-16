import * as React from 'react';
import { cn } from '~&/shared/lib/utils';

import logoSvg from './assets/logo.svg';

export interface BlockLogoProps extends React.HTMLAttributes<HTMLDivElement> {}

const logoSrc =
    typeof logoSvg === 'string' ? logoSvg : ((logoSvg as unknown as { src?: string }).src ?? '');

export const BlockLogo = React.forwardRef<HTMLDivElement, BlockLogoProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'flex h-8 w-8 items-center justify-center rounded-[9px] bg-primary',
                className,
            )}
            {...props}
        >
            <img
                src={logoSrc}
                alt="devduo"
                className="h-5 w-5 object-contain select-none"
            />
        </div>
    ),
);

BlockLogo.displayName = 'BlockLogo';
