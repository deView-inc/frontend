import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Аналитика собеседований: количество интервью, процент успешных прохождений, динамика навыков и детальные метрики.',
    keywords: [
        'статистика собеседований',
        'аналитика интервью',
        'метрики навыков',
        'динамика прогресса',
        'успешность прохождения',
    ],
    openGraph: {
        description: 'Аналитика интервью, метрики навыков и динамика прогресса',
        images: [
            {
                alt: 'Статистика собеседований',
                height: 630,
                url: 'https://app.deview.ru/og/stats.jpg',
                width: 1200,
            },
        ],
        title: 'Статистика и аналитика собеседований',
        url: 'https://app.deview.ru/stats',
    },
    title: 'Статистика и аналитика',
    twitter: {
        card: 'summary_large_image',
        description: 'Аналитика интервью, метрики навыков и динамика прогресса',
        images: ['https://app.deview.ru/og/stats.jpg'],
        title: 'Статистика и аналитика собеседований',
    },
};

export function StatsPage() {
    return <div>StatsPage</div>;
}
