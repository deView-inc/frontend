import type { ReactNode } from 'react';
import { cn } from '~&/shared/lib/utils';

export function SectionHeader({
    icon,
    title,
    meta,
    hint,
}: {
    icon: ReactNode;
    title: string;
    meta?: string;
    hint: string;
}) {
    return (
        <div className="mb-2 flex flex-col gap-2 px-0.5">
            <div className="flex items-center gap-2">
                {icon}
                <h3 className="text-foreground text-sm font-semibold">{title}</h3>
                {meta && <span className="text-muted-foreground xs ml-auto">{meta}</span>}
            </div>
            <p className="text-muted-foreground text-xs">{hint}</p>
        </div>
    );
}

export function plural(n: number, forms: [string, string, string]) {
    const m10 = n % 10;
    const m100 = n % 100;
    if (m10 === 1 && m100 !== 11) {
        return forms[0];
    }
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) {
        return forms[1];
    }
    return forms[2];
}

const TONES = [
    'bg-violet-950 text-violet-300',
    'bg-green-950 text-green-300',
    'bg-sky-950 text-sky-300',
    'bg-amber-950 text-amber-300',
];

export function InitialsAvatar({ name, className }: { name: string; className?: string }) {
    const initials = name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
    const tone = TONES[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % TONES.length];

    return (
        <div
            className={cn(
                'grid size-[30px] shrink-0 place-items-center rounded-full font-mono text-[11px] font-bold',
                tone,
                className,
            )}
        >
            {initials || '?'}
        </div>
    );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div
            className={cn(
                'bg-background border-border/60 rounded-[11px] border px-2.5 py-[9px]',
                className,
            )}
        >
            {children}
        </div>
    );
}
