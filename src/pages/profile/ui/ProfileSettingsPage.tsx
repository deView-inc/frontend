import type { Metadata } from 'next';
import { ConnectedAccounts } from '~&/features/auth';
import { Description } from '~&/shared/ui/description';
import { Title } from '~&/shared/ui/title';

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
    return (
        <div className="flex min-h-0 flex-1 flex-col gap-6">
            <header className="flex flex-col gap-1.5">
                <Title className="font-[family-name:var(--font-inter)] text-[22px] font-extrabold md:text-[26px]">
                    Настройки
                </Title>
                <Description>Управление аккаунтом и подключёнными сервисами</Description>
            </header>
            <ConnectedAccounts />
        </div>
    );
}
