import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Практикуйте навыки собеседования с AI-ассистентом 24/7. Адаптивная сложность, персонализированные вопросы и мгновенный фидбэк.',
    keywords: [
        'AI собеседование',
        'тренировка с ИИ',
        'адаптивная сложность',
        'AI ассистент',
        '24/7 практика',
    ],
    openGraph: {
        description: 'Практикуйте навыки собеседования с AI-ассистентом 24/7',
        images: [
            {
                alt: 'AI Solo - тренировка с искусственным интеллектом',
                height: 630,
                url: 'https://app.deview.ru/og/solo.jpg',
                width: 1200,
            },
        ],
        title: 'AI Solo - Тренировка собеседования с ИИ',
        url: 'https://app.deview.ru/practice/solo',
    },
    title: 'AI Solo - Тренировка собеседования с ИИ',
    twitter: {
        card: 'summary_large_image',
        description: 'Практикуйте навыки собеседования с AI-ассистентом 24/7',
        images: ['https://app.deview.ru/og/solo.jpg'],
        title: 'AI Solo - Тренировка с ИИ',
    },
};

export function PracticeAiSoloPage() {
    return <div>PracticeAiSoloPage</div>;
}
