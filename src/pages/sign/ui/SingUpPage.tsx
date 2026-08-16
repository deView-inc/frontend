import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Зарегистрируйтесь на платформе deView для проведения онлайн-собеседований. Начните использовать совместный редактор кода, видеозвонки и оценку навыков.',
    keywords: [
        'регистрация',
        'создать аккаунт',
        'присоединиться',
        'deView регистрация',
        'новый пользователь',
    ],
    openGraph: {
        description: 'Зарегистрируйтесь для проведения онлайн-собеседований',
        images: [
            {
                alt: 'Регистрация deView',
                height: 630,
                url: 'https://app.deview.ru/og/signup.jpg',
                width: 1200,
            },
        ],
        title: 'Регистрация - Создайте аккаунт на deView',
        url: 'https://app.deview.ru/signup',
    },
    robots: {
        follow: false,
        index: false,
    },
    title: 'Регистрация - Создайте аккаунт',
    twitter: {
        card: 'summary_large_image',
        description: 'Зарегистрируйтесь для проведения онлайн-собеседований',
        images: ['https://app.deview.ru/og/signup.jpg'],
        title: 'Регистрация - Создайте аккаунт',
    },
};

export function SignUpPage() {
    return <div>SignUpPage</div>;
}
