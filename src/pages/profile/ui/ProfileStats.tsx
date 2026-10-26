import { Card } from '~&/shared/ui';

import { profileMock } from '../lib/profile-mock';

export function ProfileStats() {
    const { stats } = profileMock;

    const items = [
        {
            label: 'интервью проведено',
            value: stats.interviewsCount,
        },
        {
            label: 'средняя оценка',
            value: stats.averageScore,
        },
        {
            label: 'языков в практике',
            value: stats.languagesCount,
        },
        {
            label: 'общее время сессий',
            value: `${stats.totalHours}ч`,
        },
    ];

    return (
        <section
            aria-label="Статистика профиля"
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
        >
            {items.map((item) => (
                <Card
                    key={item.label}
                    className="gap-1 rounded-sm px-4 py-3.5"
                >
                    <p className="font-mono text-[22px] leading-none font-bold">{item.value}</p>

                    <p className="text-muted-foreground text-[11px]">{item.label}</p>
                </Card>
            ))}
        </section>
    );
}
