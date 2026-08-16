import type { Metadata } from 'next';

interface RoomSessionPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: RoomSessionPageProps): Promise<Metadata> {
    const { id } = params;

    return {
        description: `Проведение собеседования в комнате ${id}. Видеосвязь, общий редактор кода и взаимный фидбэк в реальном времени.`,
        keywords: [
            'активное собеседование',
            'проведение интервью',
            'видеозвонок',
            'редактор кода',
            'реалтайм сессия',
        ],
        openGraph: {
            description: `Проведение собеседования в комнате ${id}. Видеосвязь, редактор кода, фидбэк.`,
            images: [
                {
                    alt: `Комната собеседования ${id}`,
                    height: 630,
                    url: 'https://app.deview.ru/og/room-session.jpg',
                    width: 1200,
                },
            ],
            title: `Собеседование #${id} - Активная сессия`,
            url: `https://app.deview.ru/room/${id}`,
        },
        title: `Собеседование #${id} - Активная сессия`,
        twitter: {
            card: 'summary_large_image',
            description: `Проведение собеседования в комнате ${id}`,
            images: ['https://app.deview.ru/og/room-session.jpg'],
            title: `Собеседование #${id} - Активная сессия`,
        },
    };
}

export function RoomSessionPage({ params }: RoomSessionPageProps) {
    return <div>RoomSessionPage: {params.id}</div>;
}
