import { ChatsIcon, FireIcon, StarIcon, TrophyIcon } from '@phosphor-icons/react/dist/ssr';
import type { ReactNode } from 'react';
import { cn } from '~&/shared/lib/utils';
import { Card } from '~&/shared/ui';

import { DASHBOARD_STATS } from '../lib/dashboard';

const STAT_CARD_CLASS =
    'h-[70px] gap-0 overflow-hidden rounded-[9px] bg-popover p-[13px] ring-1 ring-foreground/10';

function StatValue({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'mt-[9px] text-[20px] leading-none font-semibold text-[#E5E7EB]',
                className,
            )}
        >
            {children}
        </div>
    );
}

function InterviewsLabel() {
    return (
        <div className="flex items-center gap-[6px] text-[9px] leading-none font-medium text-[#737982]">
            <ChatsIcon
                aria-hidden="true"
                size={10}
                weight="bold"
            />
            <span>Интервью</span>
        </div>
    );
}

function AverageScoreLabel() {
    return (
        <div className="flex items-center gap-[6px] text-[9px] leading-none font-medium text-[#737982]">
            <StarIcon
                aria-hidden="true"
                size={10}
                weight="bold"
            />
            <span>Ср. оценка</span>
        </div>
    );
}

function StreakLabel() {
    return (
        <div className="flex items-center gap-[6px] text-[9px] leading-none font-medium text-[#737982]">
            <FireIcon
                aria-hidden="true"
                className="text-[#FF5A4F]"
                size={10}
                weight="fill"
            />
            <span>Стрик</span>
        </div>
    );
}

function RankLabel() {
    return (
        <div className="flex items-center gap-[6px] text-[9px] leading-none font-medium text-[#737982]">
            <TrophyIcon
                aria-hidden="true"
                size={10}
                weight="bold"
            />
            <span>Место в топе</span>
        </div>
    );
}

function StreakValue() {
    return (
        <div className="mt-[9px] flex items-end gap-[5px]">
            <span className="text-[20px] leading-none font-semibold text-[#E5E7EB]">
                {DASHBOARD_STATS.streakDays}
            </span>
            <span className="text-[9px] leading-none text-[#737982]">дней</span>
        </div>
    );
}

function InterviewsCard() {
    return (
        <Card className={STAT_CARD_CLASS}>
            <InterviewsLabel />
            <StatValue>{DASHBOARD_STATS.interviews}</StatValue>
        </Card>
    );
}

function AverageScoreCard() {
    return (
        <Card className={STAT_CARD_CLASS}>
            <AverageScoreLabel />
            <StatValue className="text-[#A3E635]">{DASHBOARD_STATS.averageScore}</StatValue>
        </Card>
    );
}

function StreakCard() {
    return (
        <Card className={STAT_CARD_CLASS}>
            <StreakLabel />
            <StreakValue />
        </Card>
    );
}

function RankCard() {
    return (
        <Card className={STAT_CARD_CLASS}>
            <RankLabel />
            <StatValue>#{DASHBOARD_STATS.rank}</StatValue>
        </Card>
    );
}

export function DashboardStats() {
    return (
        <div className="grid grid-cols-4 gap-2">
            <InterviewsCard />
            <AverageScoreCard />
            <StreakCard />
            <RankCard />
        </div>
    );
}
