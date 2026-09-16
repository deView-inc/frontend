import type { LeaderboardEntry, RecentSession } from './types';

export const DASHBOARD_STATS = {
    averageScore: '8.3',
    interviews: 27,
    rank: 5,
    streakDays: 8,
} as const;

export const RECENT_SESSIONS: RecentSession[] = [
    {
        avatarClassName: 'bg-[#4a1c3c] text-[#f584c7]',
        id: 'kim',
        initials: 'КЛ',
        name: 'Ким Ли',
        score: 8,
        scoreTone: 'success',
        topics: 'React • алгоритмы • TypeScript',
    },
    {
        avatarClassName: 'bg-[#4a381c] text-[#f5cc84]',
        id: 'dmitry',
        initials: 'ДС',
        name: 'Дмитрий Со',
        score: 9,
        scoreTone: 'success',
        topics: 'System Design • Go',
    },
    {
        avatarClassName: 'bg-[#183e30] text-[#8ef6be]',
        id: 'anya',
        initials: 'АК',
        name: 'Аня Кот',
        score: 6,
        scoreTone: 'warning',
        topics: 'SQL + структуры • Python',
    },
];

export const LEADERBOARD: LeaderboardEntry[] = [
    {
        avatarClassName: 'bg-[#4a381c] text-[#f5cc84]',
        initials: 'ДС',
        name: 'Дмитрий Со',
        points: 78,
        rank: 1,
    },
    {
        avatarClassName: 'bg-[#4a1c3c] text-[#f584c7]',
        initials: 'КЛ',
        name: 'Ким Ли',
        points: 63,
        rank: 2,
    },
    {
        avatarClassName: 'bg-[#1c3e4a] text-[#84d5f5]',
        initials: 'ЛР',
        name: 'Лена Ро',
        points: 41,
        rank: 3,
    },
    {
        avatarClassName: 'bg-[#33204d] text-[#b995f5]',
        initials: 'МГ',
        name: 'Марк Гринёв',
        points: 34,
        rank: 4,
    },
];
