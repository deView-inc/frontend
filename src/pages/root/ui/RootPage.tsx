import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ROUTES } from '~&/shared/config';

import { Dashboard } from './Dashboard';

export const metadata: Metadata = {
    description: 'Обзорная панель с ключевыми метриками, недавними сессиями и лидербордом',
    keywords: ['дашборд', 'главная', 'статистика интервью', 'лидерборд', 'недавние сессии'],
    openGraph: {
        description: 'Обзорная панель с ключевыми метриками и активностями',
        images: [
            {
                alt: 'Главная - дашборд',
                height: 630,
                url: 'https://app.deview.ru/og/home.jpg',
                width: 1200,
            },
        ],
        title: 'Главная',
        url: 'https://app.deview.ru',
    },
    title: 'Главная',
    twitter: {
        card: 'summary_large_image',
        description: 'Обзорная панель с ключевыми метриками и активностями',
        images: ['https://app.deview.ru/og/home.jpg'],
        title: 'Главная',
    },
};

export async function RootPage() {
    const cookie = await cookies();
    const authStoreData = cookie.get('0auth');
    const isAuthorized = authStoreData?.value === 'true';

    if (!isAuthorized) {
        return redirect(ROUTES.AUTH.SIGN_IN);
    }

    return <Dashboard />;
}
