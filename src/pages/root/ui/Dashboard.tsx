import { DashboardActions } from './DashboardActions';
import { DashboardBottom } from './DashboardBottom';
import { DashboardStats } from './DashboardStats';

export function Dashboard() {
    return (
        <section
            aria-label="Дашборд"
            className="flex w-[735px] max-w-full flex-col gap-4 px-[14px] font-sans"
        >
            <DashboardStats />
            <DashboardActions />
            <DashboardBottom />
        </section>
    );
}
