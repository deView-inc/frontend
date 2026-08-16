import type { Metadata } from 'next';

export const metadata: Metadata = {
    description:
        'Все уведомления в одном месте: приглашения на собеседования, новые фидбэки, изменения в комнатах и системные оповещения.',
    keywords: [
        'уведомления',
        'оповещения',
        'приглашения на интервью',
        'фидбэк',
        'системные оповещения',
    ],
    openGraph: {
        description: 'Все уведомления в одном месте: приглашения, фидбэки, оповещения',
        images: [
            {
                alt: 'Уведомления',
                height: 630,
                url: 'https://app.deview.ru/og/notifications.jpg',
                width: 1200,
            },
        ],
        title: 'Уведомления',
        url: 'https://app.deview.ru/notifications',
    },
    title: 'Уведомления',
    twitter: {
        card: 'summary_large_image',
        description: 'Все уведомления в одном месте: приглашения, фидбэки, оповещения',
        images: ['https://app.deview.ru/og/notifications.jpg'],
        title: 'Уведомления',
    },
};

export function NotificationsPage() {
    return <div>NotificationsPage</div>;
}
