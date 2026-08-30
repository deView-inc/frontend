import type { Metadata } from 'next';
import {
    PracticeInterviewHeader,
    PracticeInterviewModes,
} from '~&/widgets/practice-interview-modes';

export const metadata: Metadata = {
    description:
        '7 форматов для подготовки к техническим интервью: от живых собеседований до соревновательной арены. Выберите свой формат.',
    keywords: [
        'практика собеседований',
        'подготовка к интервью',
        'тренировка навыков',
        'техническое интервью',
        'онлайн собеседование',
    ],
    openGraph: {
        description: 'Выберите формат тренировки для подготовки к интервью',
        images: [
            {
                alt: 'Практика собеседований',
                height: 630,
                url: 'https://app.deview.ru/og/practice.jpg',
                width: 1200,
            },
        ],
        title: 'Практика собеседований - 7 форматов',
        url: 'https://app.deview.ru/practice',
    },
    title: 'Практика собеседований',
    twitter: {
        card: 'summary_large_image',
        description: 'Выберите формат тренировки для подготовки к интервью',
        images: ['https://app.deview.ru/og/practice.jpg'],
        title: 'Практика собеседований - 7 форматов',
    },
};

export function PracticePage() {
    return (
        <>
            <PracticeInterviewHeader
                title="Режимы собеседований"
                description="7 форматов практики — от живого 1-to-1 до соревновательной арены. Выберите то, что
                нужно прямо сейчас."
            />
            <PracticeInterviewModes />
        </>
    );
}
