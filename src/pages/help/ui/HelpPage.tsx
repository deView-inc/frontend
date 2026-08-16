import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Ответы на частые вопросы, руководства по использованию платформы, советы по проведению собеседований и связь со службой поддержки.',
    keywords: [
        'помощь',
        'поддержка',
        'руководство',
        'инструкция',
        'как использовать',
        'помощь с платформой',
        'техническая поддержка',
        'контакты поддержки',
    ],
    openGraph: {
        description: 'Ответы на вопросы, руководства и связь со службой поддержки',
        images: [
            {
                alt: 'Центр помощи deView',
                height: 630,
                url: 'https://app.deview.ru/og/help.jpg',
                width: 1200,
            },
        ],
        title: 'Центр помощи и поддержки deView',
        url: 'https://app.deview.ru/help',
    },
    title: 'Центр помощи и поддержки',
    twitter: {
        card: 'summary_large_image',
        description: 'Ответы на вопросы, руководства и связь со службой поддержки',
        images: ['https://app.deview.ru/og/help.jpg'],
        title: 'Центр помощи и поддержки deView',
    },
};

export function HelpPage() {
    return <div>HelpPage</div>;
}
