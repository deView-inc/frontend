import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Управление комнатами для проведения собеседований. Создавайте или присоединяйтесь к существующим комнатам.',
    keywords: [
        'комнаты собеседований',
        'создать комнату',
        'присоединиться к комнате',
        'интервью комната',
    ],
    openGraph: {
        description: 'Создавайте или присоединяйтесь к комнатам для проведения интервью',
        images: [
            {
                alt: 'Комнаты собеседований',
                height: 630,
                url: 'https://app.deview.ru/og/room.jpg',
                width: 1200,
            },
        ],
        title: 'Комнаты собеседований',
        url: 'https://app.deview.ru/room',
    },
    title: 'Комнаты собеседований',
    twitter: {
        card: 'summary_large_image',
        description: 'Создавайте или присоединяйтесь к комнатам для проведения интервью',
        images: ['https://app.deview.ru/og/room.jpg'],
        title: 'Комнаты собеседований',
    },
};

export function RoomPage() {
    return <div>RoomPage</div>;
}
