import type { Metadata } from 'next';
import { RoomCreateForm, RoomCreateHeader } from '~&/widgets/room-create';

export const metadataCreate: Metadata = {
    description:
        'Настройте параметры комнаты для собеседования: формат, участники, продолжительность и дополнительные опции.',
    keywords: [
        'создать комнату',
        'новая комната',
        'настройка собеседования',
        'интервью комната',
        'создание интервью',
    ],
    openGraph: {
        description: 'Настройте параметры комнаты: формат, участники, продолжительность',
        images: [
            {
                alt: 'Создание комнаты собеседования',
                height: 630,
                url: 'https://app.deview.ru/og/room-create.jpg',
                width: 1200,
            },
        ],
        title: 'Создание комнаты собеседования',
        url: 'https://app.deview.ru/room/create',
    },
    title: 'Создание комнаты собеседования',
    twitter: {
        card: 'summary_large_image',
        description: 'Настройте параметры комнаты: формат, участники, продолжительность',
        images: ['https://app.deview.ru/og/room-create.jpg'],
        title: 'Создание комнаты собеседования',
    },
};

export function RoomCreatePage() {
    return (
        <div className="flex min-h-0 flex-1 flex-col gap-4 md:gap-[22px]">
            <RoomCreateHeader />
            <RoomCreateForm />
        </div>
    );
}
