import Image from 'next/image';
import { cn } from '~&/shared/lib/utils';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
    lg: { gap: 'gap-3', image: 40, text: 'text-xl' },
    md: { gap: 'gap-2.5', image: 32, text: 'text-lg' },
    sm: { gap: 'gap-1.5', image: 24, text: 'text-base' },
} as const;

/**
 * Logo - адаптивный логотип.
 * Автоматически подстраивается под состояние сайдбара через data-атрибуты.
 */
export function Logo({ className, size = 'md' }: LogoProps) {
    const sizes = SIZE_MAP[size];

    return (
        <div className={cn('group/logo flex w-full items-center', sizes.gap, className)}>
            <Image
                alt="deView logo"
                src="/meta/favicon.svg"
                loading="eager"
                width={sizes.image}
                height={sizes.image}
                className="aspect-square shrink-0"
                style={{ height: sizes.image, width: sizes.image }}
                sizes={`${sizes.image}px`}
                fetchPriority="high"
            />

            <p
                className={cn(
                    'font-mono font-bold text-foreground whitespace-nowrap',
                    sizes.text,
                    'group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:overflow-hidden',
                    'transition-all duration-300 ease-in-out',
                )}
            >
                deView
            </p>
        </div>
    );
}
