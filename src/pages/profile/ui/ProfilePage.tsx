import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Spinner } from '~&/shared/ui/spinner';

import { ProfileOverview } from './ProfileOverview';

export const metadata: Metadata = {
    description:
        'Личная информация, стек технологий, статистика собеседований и достижения. Управляйте своим профилем и настройками.',
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
    return (
        <Suspense
            fallback={
                <div className="text-muted-foreground flex items-center gap-2">
                    <Spinner />
                    Загрузка профиля
                </div>
            }
        >
            <ProfileOverview />
        </Suspense>
    );
}
