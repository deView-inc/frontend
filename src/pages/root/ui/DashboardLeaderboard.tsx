import Link from 'next/link';
import { ROUTES } from '~&/shared/config';
import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';

import { LEADERBOARD } from '../lib/dashboard';
import type { LeaderboardEntry } from '../lib/types';
import { InitialsAvatar } from './InitialsAvatar';

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
    const isFirst = entry.rank === 1;

    return (
        <div className="flex h-[31px] items-center">
            <span
                className={cn(
                    'w-2 shrink-0 text-[8px] leading-none',
                    isFirst ? 'text-[#A3E635]' : 'text-[#737982]',
                )}
            >
                {entry.rank}
            </span>
            <InitialsAvatar
                className={cn('ml-2', entry.avatarClassName)}
                initials={entry.initials}
                size="leaderboard"
            />
            <span className="ml-2 min-w-0 flex-1 truncate text-[9px] leading-none text-[#C7CBD1]">
                {entry.name}
            </span>
            <span className="ml-2 shrink-0 text-[8px] leading-none text-[#6C727A]">
                {entry.points}
            </span>
        </div>
    );
}

function LeaderboardHeader() {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-[10px] leading-none font-semibold text-[#D5D8DD]">Лидерборд</h2>
            <Link
                className="text-[8px] leading-none text-[#A3E635] outline-none hover:opacity-80 focus-visible:underline"
                href={ROUTES.LEADERS}
            >
                Весь →
            </Link>
        </div>
    );
}

function LeaderboardList() {
    return (
        <div className="mt-[14px] flex flex-1 flex-col justify-between">
            {LEADERBOARD.map((entry) => (
                <LeaderboardRow
                    key={entry.rank}
                    entry={entry}
                />
            ))}
        </div>
    );
}

export function DashboardLeaderboard() {
    return (
        <Card className="bg-popover ring-foreground/10 h-[182px] w-[303px] gap-0 overflow-hidden rounded-[9px] p-[13px] ring-1">
            <LeaderboardHeader />
            <LeaderboardList />
        </Card>
    );
}
