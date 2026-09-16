export type ScoreTone = 'success' | 'warning';

export interface RecentSession {
    avatarClassName: string;
    id: string;
    initials: string;
    name: string;
    score: number;
    scoreTone: ScoreTone;
    topics: string;
}

export interface LeaderboardEntry {
    avatarClassName: string;
    initials: string;
    name: string;
    points: number;
    rank: number;
}
