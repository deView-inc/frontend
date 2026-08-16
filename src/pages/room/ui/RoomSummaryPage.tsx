import type { Metadata } from 'next';

interface RoomSummaryPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: RoomSummaryPageProps): Promise<Metadata> {
    const { id } = params;

    return {
        description: `Детальные итоги собеседования ${id}: оценка навыков, фидбэк от интервьюера и рекомендации.`,
        keywords: [
            'итоги собеседования',
            'оценка навыков',
            'фидбэк',
            'рекомендации',
            'результаты интервью',
        ],
        openGraph: {
            description: `Детальные итоги собеседования ${id}: оценка навыков, фидбэк, рекомендации.`,
            images: [
                {
                    alt: `Итоги собеседования ${id}`,
                    height: 630,
                    url: 'https://app.deview.ru/og/room-summary.jpg',
                    width: 1200,
                },
            ],
            title: `Итоги собеседования #${id} - Оценка и фидбэк`,
            url: `https://app.deview.ru/room/${id}/summary`,
        },
        title: `Итоги собеседования #${id} - Оценка и фидбэк`,
        twitter: {
            card: 'summary_large_image',
            description: `Детальные итоги собеседования ${id}: оценка навыков, фидбэк, рекомендации.`,
            images: ['https://app.deview.ru/og/room-summary.jpg'],
            title: `Итоги собеседования #${id} - Оценка и фидбэк`,
        },
    };
}

export function RoomSummaryPage({ params }: RoomSummaryPageProps) {
    return <div>RoomSummaryPage: {params.id}</div>;
}
