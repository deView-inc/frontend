import type { Metadata } from 'next';

export const metadataJoin: Metadata = {
    description:
        'Введите код комнаты или ссылку для присоединения к собеседованию. Быстрый доступ к интервью.',
    keywords: [
        'присоединиться к комнате',
        'войти в комнату',
        'код комнаты',
        'ссылка на интервью',
        'присоединение к собеседованию',
    ],
    openGraph: {
        description: 'Введите код комнаты или ссылку для присоединения',
        images: [
            {
                alt: 'Присоединение к комнате собеседования',
                height: 630,
                url: 'https://app.deview.ru/og/room-join.jpg',
                width: 1200,
            },
        ],
        title: 'Присоединение к комнате собеседования',
        url: 'https://app.deview.ru/room/join',
    },
    title: 'Присоединение к комнате собеседования',
    twitter: {
        card: 'summary_large_image',
        description: 'Введите код комнаты или ссылку для присоединения',
        images: ['https://app.deview.ru/og/room-join.jpg'],
        title: 'Присоединение к комнате собеседования',
    },
};

export function RoomJoinPage() {
    return <div>RoomJoinPage</div>;
}
