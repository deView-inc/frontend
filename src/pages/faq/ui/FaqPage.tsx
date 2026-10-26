import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Ответы на самые частые вопросы о платформе deView: регистрация, проведение собеседований, форматы практики, оплата и технические моменты.',
    keywords: [
        'faq',
        'часто задаваемые вопросы',
        'вопросы и ответы',
        'как начать',
        'инструкция',
        'ответы на вопросы',
        'регистрация',
        'собеседование',
        'форматы практики',
        'оплата',
        'технические вопросы',
    ],
    openGraph: {
        description: 'Ответы на частые вопросы о платформе deView',
        images: [
            {
                alt: 'FAQ deView',
                height: 630,
                url: 'https://app.deview.ru/og/faq.jpg',
                width: 1200,
            },
        ],
        title: 'Часто задаваемые вопросы (FAQ)',
        url: 'https://app.deview.ru/faq',
    },
    title: 'Часто задаваемые вопросы (FAQ)',
    twitter: {
        card: 'summary_large_image',
        description: 'Ответы на частые вопросы о платформе deView',
        images: ['https://app.deview.ru/og/faq.jpg'],
        title: 'Часто задаваемые вопросы (FAQ)',
    },
};

export function FaqPage() {
    return <div>FaqPage</div>;
}
