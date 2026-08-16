import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Архитектурное собеседование с интерактивной доской. Разбор trade-offов, оценка ёмкости и проектирование систем в реальном времени.',
    keywords: [
        'системный дизайн',
        'архитектурное собеседование',
        'интерактивная доска',
        'trade-off',
        'проектирование систем',
    ],
    openGraph: {
        description: 'Интерактивная доска, разбор trade-offов и проектирование',
        images: [
            {
                alt: 'System Design Room',
                height: 630,
                url: 'https://app.deview.ru/og/design.jpg',
                width: 1200,
            },
        ],
        title: 'System Design Room - Архитектура',
        url: 'https://app.deview.ru/practice/design',
    },
    title: 'System Design Room - Архитектурное собеседование',
    twitter: {
        card: 'summary_large_image',
        description: 'Архитектурное собеседование с интерактивной доской',
        images: ['https://app.deview.ru/og/design.jpg'],
        title: 'System Design Room - Архитектура',
    },
};

export function PracticeDesignPage() {
    return <div>PracticeDesignPage</div>;
}
