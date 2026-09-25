import type { Metadata } from 'next';
import { CollaborativeCodeEditor } from '~&/features/collaborative-code-editor';

interface RoomSessionPageProps {
    params: Promise<{ roomId: string }>;
}

export async function generateMetadata({ params }: RoomSessionPageProps): Promise<Metadata> {
    const { roomId: id } = await params;

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

export async function RoomSessionPage({ params }: RoomSessionPageProps) {
    const { roomId } = await params;
    return (
        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col gap-4">
            <CollaborativeCodeEditor
                kind="room"
                roomId={roomId}
                className="min-h-[380px] flex-1"
            />
        </div>
    );
}
