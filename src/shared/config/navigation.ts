import type { Route } from 'next';

import type { PhosphorIconName } from '../ui';

export const ROUTES = {
    AUTH: {
        SIGN_IN: '/sign-in',
        SIGN_UP: '/sign-up',
    },
    HELP: {
        FAQ: '/faq',
        ROOT: '/help',
    },
    HISTORY: {
        ROOT: '/history',
        SESSION: (id: string) => `/history/${id}`,
    },
    HOME: '/',
    LEADERS: '/leaders',
    NOTIFICATIONS: '/notifications',
    PRACTICE: {
        ARENA: '/practice/arena',
        BEHAVIORAL: '/practice/behavioral',
        DESIGN: '/practice/design',
        LANGUAGE: '/practice/language',
        LIVE: '/practice/live',
        PANEL: '/practice/panel',
        ROOT: '/practice',
        SOLO: '/practice/solo',
    },
    PROFILE: {
        ROOT: '/profile',
        SETTINGS: '/profile/settings',
    },
    ROOM: {
        COMPLETE: (id: string) => `/room/${id}/complete`,
        CREATE: '/room/create',
        JOIN: '/room/join',
        ROOT: '/room',
        SESSION: (id: string) => `/room/${id}`,
        SUMMARY: (id: string) => `/room/${id}/summary`,
    },
    SETTINGS: '/settings',
    STATS: '/stats',
} as const satisfies Record<
    string,
    Route | Record<string, Route | ((...args: unknown[] | any[]) => Route)>
>;

export const MENU: {
    href: Route;
    label: string;
    icon: PhosphorIconName;
    description: string;
}[] = [
    {
        description: 'Обзорная панель с ключевыми метриками и активностями',
        href: '/',
        icon: 'HouseIcon',
        label: 'Главная',
    },
    {
        description: 'Аналитика данных в разрезе графиков и диаграмм',
        href: '/stats',
        icon: 'ChartPieSliceIcon',
        label: 'Статистика',
    },
    {
        description: 'Центр управления проектами и задачами',
        href: '/practice',
        icon: 'GridFourIcon',
        label: 'Хаб',
    },
    {
        description: 'Личные данные, настройки и предпочтения',
        href: '/profile',
        icon: 'UserIcon',
        label: 'Профиль',
    },
    {
        description: 'Журнал всех действий и событий за последнее время',
        href: '/history',
        icon: 'ClockCounterClockwiseIcon',
        label: 'История',
    },
];
