import { DashboardLeaderboard } from './DashboardLeaderboard';
import { DashboardRecentSessions } from './DashboardRecentSessions';

export function DashboardBottom() {
    return (
        <div className="flex gap-[10px]">
            <DashboardRecentSessions />
            <DashboardLeaderboard />
        </div>
    );
}
