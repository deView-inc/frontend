import type { Metadata } from 'next';

export const metadataLanguage: Metadata = {
    description:
        'Отработка технического английского: произношение, грамматика, лексика в реальном времени. Тренировка по уровням CEFR.',
    keywords: [
        'технический английский',
        'английский для IT',
        'произношение',
        'CEFR',
        'лексика',
        'грамматика',
    ],
    openGraph: {
        description: 'Отработка технического английского: произношение, грамматика, лексика',
        images: [
            {
                alt: 'Language Room',
                height: 630,
                url: 'https://app.deview.ru/og/language.jpg',
                width: 1200,
            },
        ],
        title: 'Language Room - Технический английский',
        url: 'https://app.deview.ru/practice/language',
    },
    title: 'Language Room - Технический английский',
    twitter: {
        card: 'summary_large_image',
        description: 'Отработка технического английского в реальном времени',
        images: ['https://app.deview.ru/og/language.jpg'],
        title: 'Language Room - Технический английский',
    },
};

export function PracticeLanguagePage() {
    return <div>PracticeLanguagePage</div>;
}
