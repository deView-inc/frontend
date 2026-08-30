import type { Metadata } from 'next';
import {
    PracticeInterviewHeader,
    PracticeInterviewLanguage,
} from '~&/widgets/practice-interview-modes';

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
    return (
        <>
            <PracticeInterviewHeader
                title="Language Room · Technical English"
                description="Отработка речи для технического интервью на английском"
                sideElement={
                    <div className="bg-primary text-primary-foreground ml-[50px] w-fit rounded-md px-3 py-1 text-nowrap sm:ml-[100px]">
                        <span className="animate-blink-caret">●</span> 14:02
                    </div>
                }
            />
            <PracticeInterviewLanguage className="mt-5" />
        </>
    );
}
