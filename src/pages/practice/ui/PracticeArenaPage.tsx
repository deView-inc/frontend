import type { Metadata } from 'next';

export const metadataArena: Metadata = {
    description:
        'Соревновательная дуэль 1x1 на скорость и корректность решения. Рейтинг ELO, реалтайм баттлы и проверка алгоритмических навыков.',
    keywords: [
        'соревнование',
        'дуэль 1x1',
        'ELO рейтинг',
        'алгоритмы',
        'программирование',
        'реалтайм баттл',
    ],
    openGraph: {
        description: 'Соревновательная дуэль на скорость и корректность решения',
        images: [
            {
                alt: 'Coding Arena',
                height: 630,
                url: 'https://app.deview.ru/og/arena.jpg',
                width: 1200,
            },
        ],
        title: 'Coding Arena - Соревновательная дуэль 1x1',
        url: 'https://app.deview.ru/practice/arena',
    },
    title: 'Coding Arena - Соревновательная дуэль 1x1',
    twitter: {
        card: 'summary_large_image',
        description: 'Соревнование 1x1 на скорость и корректность решения',
        images: ['https://app.deview.ru/og/arena.jpg'],
        title: 'Coding Arena - Соревновательная дуэль',
    },
};

export function PracticeArenaPage() {
    return <div>PracticeArenaPage</div>;
}
