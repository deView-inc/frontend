import type { Metadata } from 'next';

export const metadataSignIn: Metadata = {
    description:
        'Войдите в свой аккаунт deView для проведения собеседований, просмотра статистики и управления комнатами.',
    keywords: ['вход', 'авторизация', 'логин', 'deView вход', 'войти в аккаунт'],
    openGraph: {
        description: 'Войдите для проведения собеседований и управления комнатами',
        images: [
            {
                alt: 'Вход deView',
                height: 630,
                url: 'https://app.deview.ru/og/signin.jpg',
                width: 1200,
            },
        ],
        title: 'Вход в аккаунт deView',
        url: 'https://app.deview.ru/signin',
    },
    robots: {
        follow: false,
        index: false,
    },
    title: 'Вход в аккаунт',
    twitter: {
        card: 'summary_large_image',
        description: 'Войдите для проведения собеседований',
        images: ['https://app.deview.ru/og/signin.jpg'],
        title: 'Вход в аккаунт deView',
    },
};

export function SignInPage() {
    return <div>SignInPage</div>;
}
