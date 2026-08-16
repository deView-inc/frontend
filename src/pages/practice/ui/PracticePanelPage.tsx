import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Финальный раунд собеседования как в реальной компании. Панель из нескольких интервьюеров, консенсус-оценка и комплексный подход.',
    keywords: [
        'групповое собеседование',
        'панель интервьюеров',
        'финальный раунд',
        'консенсус оценка',
    ],
    openGraph: {
        description: 'Панель из нескольких интервьюеров, консенсус-оценка',
        images: [
            {
                alt: 'Group Panel собеседование',
                height: 630,
                url: 'https://app.deview.ru/og/panel.jpg',
                width: 1200,
            },
        ],
        title: 'Group Panel - Панель интервьюеров',
        url: 'https://app.deview.ru/practice/panel',
    },
    title: 'Group Panel - Собеседование с панелью интервьюеров',
    twitter: {
        card: 'summary_large_image',
        description: 'Финальный раунд собеседования с панелью интервьюеров',
        images: ['https://app.deview.ru/og/panel.jpg'],
        title: 'Group Panel - Панель интервьюеров',
    },
};

export function PracticePanelPage() {
    return <div>PracticePanelPage</div>;
}
