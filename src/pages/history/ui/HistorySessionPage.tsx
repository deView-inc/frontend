import type { Metadata } from 'next';

interface HistorySessionPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: HistorySessionPageProps): Promise<Metadata> {
    const { id } = params;

    return {
        description: `Детальная информация о собеседовании ${id}: видео-запись, код, фидбэк и оценка навыков.`,
        keywords: [
            'запись собеседования',
            'детали интервью',
            'фидбэк',
            'оценка навыков',
            'видео запись',
        ],
        openGraph: {
            description: `Детальная информация о собеседовании ${id}: запись, код, фидбэк, оценка`,
            images: [
                {
                    alt: `Собеседование ${id}`,
                    height: 630,
                    url: 'https://app.deview.ru/og/history-session.jpg',
                    width: 1200,
                },
            ],
            title: `Собеседование #${id} - Детальная запись`,
            url: `https://app.deview.ru/history/${id}`,
        },
        title: `Собеседование #${id} - Детальная запись`,
        twitter: {
            card: 'summary_large_image',
            description: `Детальная информация о собеседовании ${id}`,
            images: ['https://app.deview.ru/og/history-session.jpg'],
            title: `Собеседование #${id} - Детальная запись`,
        },
    };
}

export function HistorySessionPage({ params }: HistorySessionPageProps) {
    return <div>HistorySessionPage: {params.id}</div>;
}
