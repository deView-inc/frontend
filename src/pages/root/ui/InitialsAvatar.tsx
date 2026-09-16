import { cn } from '~&/shared/lib/utils';

interface InitialsAvatarProps {
    className: string;
    initials: string;
    size: 'session' | 'leaderboard';
}

const SIZE_CLASS = {
    leaderboard: 'size-5 text-[7px]',
    session: 'size-[23px] text-[8px]',
} as const;

export function InitialsAvatar({ className, initials, size }: InitialsAvatarProps) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                'flex shrink-0 items-center justify-center rounded-[6px] font-semibold',
                SIZE_CLASS[size],
                className,
            )}
        >
            {initials}
        </span>
    );
}
