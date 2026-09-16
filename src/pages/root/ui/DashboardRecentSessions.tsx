import Link from 'next/link';
import { ROUTES } from '~&/shared/config';
import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';

import { RECENT_SESSIONS } from '../lib/dashboard';
import type { RecentSession } from '../lib/types';
import { InitialsAvatar } from './InitialsAvatar';

function ScoreBadge({ score, scoreTone }: Pick<RecentSession, 'score' | 'scoreTone'>) {
    return (
        <span
            className={cn(
                'inline-flex size-5 shrink-0 items-center justify-center rounded-[5px] border text-[10px] leading-none font-semibold',
                scoreTone === 'warning'
                    ? 'border-[#6B5210] text-[#EAB308]'
                    : 'border-[#587C17] text-[#A3E635]',
            )}
        >
            {score}
        </span>
    );
}

function SessionMeta({ name, topics }: Pick<RecentSession, 'name' | 'topics'>) {
    return (
        <div className="min-w-0 flex-1">
            <p className="text-[9px] leading-none font-medium text-[#D5D8DD]">{name}</p>
            <p className="mt-[2px] truncate text-[7px] leading-none text-[#575D65]">{topics}</p>
        </div>
    );
}

function RecentSessionItem({ session }: { session: RecentSession }) {
    return (
        <div className="flex h-[32px] items-center gap-2">
            <InitialsAvatar
                className={session.avatarClassName}
                initials={session.initials}
                size="session"
            />
            <SessionMeta
                name={session.name}
                topics={session.topics}
            />
            <ScoreBadge
                score={session.score}
                scoreTone={session.scoreTone}
            />
        </div>
    );
}

function RecentSessionsHeader() {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-[10px] leading-none font-semibold text-[#D5D8DD]">
                Недавние сессии
            </h2>
            <Link
                className="text-[8px] leading-none text-[#A3E635] outline-none hover:opacity-80 focus-visible:underline"
                href={ROUTES.HISTORY.ROOT}
            >
                Вся история →
            </Link>
        </div>
    );
}

function RecentSessionsList() {
    return (
        <div className="mt-[14px] flex flex-col gap-[9px]">
            {RECENT_SESSIONS.map((session) => (
                <RecentSessionItem
                    key={session.id}
                    session={session}
                />
            ))}
        </div>
    );
}

export function DashboardRecentSessions() {
    return (
        <Card className="bg-popover ring-foreground/10 h-[182px] w-[423px] gap-0 overflow-hidden rounded-[9px] p-[13px] ring-1">
            <RecentSessionsHeader />
            <RecentSessionsList />
        </Card>
    );
}
