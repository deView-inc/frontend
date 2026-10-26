import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Рейтинг лучших участников платформы. ELO-рейтинг, количество проведённых собеседований, процент успешных прохождений и достижения.',
    keywords: [
        'лидеры',
        'рейтинг участников',
        'ELO рейтинг',
        'достижения',
        'топ участников',
        'соревнования',
    ],
    openGraph: {
        description: 'Рейтинг лучших участников: ELO, собеседования, достижения',
        images: [
            {
                alt: 'Лидеры - рейтинг участников',
                height: 630,
                url: 'https://app.deview.ru/og/leaders.jpg',
                width: 1200,
            },
        ],
        title: 'Лидеры - Рейтинг участников',
        url: 'https://app.deview.ru/leaders',
    },
    title: 'Лидеры - Рейтинг участников',
    twitter: {
        card: 'summary_large_image',
        description: 'Рейтинг лучших участников: ELO, собеседования, достижения',
        images: ['https://app.deview.ru/og/leaders.jpg'],
        title: 'Лидеры - Рейтинг участников',
    },
};

export function LeadersPage() {
    return <div>LeadersPage</div>;
}
