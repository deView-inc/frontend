import type { Metadata } from 'next';

export const metadataProfileSettings: Metadata = {
    description:
        'Управление настройками аккаунта: личные данные, уведомления, конфиденциальность, безопасность и предпочтения.',
    keywords: [
        'настройки профиля',
        'личные данные',
        'уведомления',
        'конфиденциальность',
        'безопасность аккаунта',
        'предпочтения',
    ],
    openGraph: {
        description: 'Управление настройками аккаунта: данные, уведомления, безопасность',
        images: [
            {
                alt: 'Настройки профиля',
                height: 630,
                url: 'https://app.deview.ru/og/settings.jpg',
                width: 1200,
            },
        ],
        title: 'Настройки профиля',
        url: 'https://app.deview.ru/profile/settings',
    },
    title: 'Настройки профиля',
    twitter: {
        card: 'summary_large_image',
        description: 'Управление настройками аккаунта: данные, уведомления, безопасность',
        images: ['https://app.deview.ru/og/settings.jpg'],
        title: 'Настройки профиля',
    },
};

export function ProfileSettingsPage() {
    return <div>ProfileSettingsPage</div>;
}
