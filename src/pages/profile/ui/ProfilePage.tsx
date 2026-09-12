import type { Metadata } from 'next';

import { ProfileDirectory } from './ProfileDirectory';

export const metadata: Metadata = {
    description:
        'Найдите партнёра для технического интервью по стеку, уровню и роли. Просматривайте карточки участников и свою карточку.',
    keywords: [
        'профиль пользователя',
        'личный кабинет',
        'стек технологий',
        'достижения',
        'статистика',
    ],
    openGraph: {
        description: 'Личная информация, стек технологий, статистика и достижения',
        images: [
            {
                alt: 'Профиль пользователя',
                height: 630,
                url: 'https://app.deview.ru/og/profile.jpg',
                width: 1200,
            },
        ],
        title: 'Профиль пользователя',
        url: 'https://app.deview.ru/profile',
    },
    title: 'Профиль пользователя',
    twitter: {
        card: 'summary_large_image',
        description: 'Личная информация, стек технологий, статистика и достижения',
        images: ['https://app.deview.ru/og/profile.jpg'],
        title: 'Профиль пользователя',
    },
};

export function ProfilePage() {
    return <ProfileDirectory />;
}
