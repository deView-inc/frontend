import type { Metadata } from 'next';

export const metadataOneToOne: Metadata = {
    description:
        'Проведите живое собеседование с реальным партнёром. Видеосвязь, общий редактор кода и взаимный фидбэк для максимальной реалистичности.',
    keywords: [
        'живое собеседование',
        '1-to-1 интервью',
        'партнёрское интервью',
        'практика интервью',
    ],
    openGraph: {
        description: 'Видеосвязь, общий редактор кода и взаимный фидбэк',
        images: [
            {
                alt: '1-to-1 Live собеседование',
                height: 630,
                url: 'https://app.deview.ru/og/live.jpg',
                width: 1200,
            },
        ],
        title: '1-to-1 Live - Живое собеседование',
        url: 'https://app.deview.ru/practice/live',
    },
    title: '1-to-1 Live - Живое собеседование с партнёром',
    twitter: {
        card: 'summary_large_image',
        description: 'Видеосвязь, общий редактор кода и взаимный фидбэк',
        images: ['https://app.deview.ru/og/live.jpg'],
        title: '1-to-1 Live - Живое собеседование',
    },
};

export function PracticeOneToOnePage() {
    return <div>PracticeOneToOnePage</div>;
}
