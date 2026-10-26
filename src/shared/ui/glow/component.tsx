import type { CSSProperties } from 'react';
import { cn } from '~&/shared/lib/utils';

export interface GlowProps {
    color?: string;
    width?: string | number;
    height?: string | number;
    blur?: number;
    opacity?: number;
    className?: string;
    style?: CSSProperties;
}

export const Glow = ({
    color = 'var(--primary)',
    width = 500,
    height,
    blur = 100,
    opacity = 0.1,
    className,
    style,
}: GlowProps) => (
    <div
        aria-hidden
        className={cn('pointer-events-none absolute rounded-full', className)}
        style={{
            background: color,
            filter: `blur(${blur}px)`,
            height: height ?? width,
            opacity,
            width,
            ...style,
        }}
    />
);
