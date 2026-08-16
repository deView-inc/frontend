import type { Metadata } from 'next';

export const metadataBehavioral: Metadata = {
    description:
        'Поведенческие вопросы по методу STAR с разбором по компетенциям. Прокачка мягких навыков и подготовка к HR-интервью.',
    keywords: [
        'поведенческое собеседование',
        'метод STAR',
        'компетенции',
        'мягкие навыки',
        'HR интервью',
    ],
    openGraph: {
        description: 'Поведенческие вопросы по методу STAR с разбором компетенций',
        images: [
            {
                alt: 'Behavioral Room',
                height: 630,
                url: 'https://app.deview.ru/og/behavioral.jpg',
                width: 1200,
            },
        ],
        title: 'Behavioral Room - STAR метод',
        url: 'https://app.deview.ru/practice/behavioral',
    },
    title: 'Behavioral Room - Собеседование по компетенциям',
    twitter: {
        card: 'summary_large_image',
        description: 'Поведенческие вопросы по методу STAR',
        images: ['https://app.deview.ru/og/behavioral.jpg'],
        title: 'Behavioral Room - STAR метод',
    },
};

export function PracticeBehavioralPage() {
    return <div>PracticeBehavioralPage</div>;
}
