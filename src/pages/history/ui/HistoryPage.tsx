import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Полный журнал всех проведённых собеседований: дата, формат, участники, результаты и ссылки на записи.',
    keywords: [
        'история собеседований',
        'журнал интервью',
        'архив',
        'проведённые собеседования',
        'записи интервью',
    ],
    openGraph: {
        description: 'Журнал всех проведённых собеседований с результатами',
        images: [
            {
                alt: 'История собеседований',
                height: 630,
                url: 'https://app.deview.ru/og/history.jpg',
                width: 1200,
            },
        ],
        title: 'История собеседований',
        url: 'https://app.deview.ru/history',
    },
    title: 'История собеседований',
    twitter: {
        card: 'summary_large_image',
        description: 'Журнал всех проведённых собеседований с результатами',
        images: ['https://app.deview.ru/og/history.jpg'],
        title: 'История собеседований',
    },
};

export function HistoryPage() {
    return <div>HistoryPage</div>;
}
