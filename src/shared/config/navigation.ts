import type { Route } from 'next';

import type { PhosphorIconName } from '../ui';

type RouteFunction = (...args: never[]) => Route;

type RouteValue = Route | RouteFunction;

interface RouteRecord {
    [key: string]: RouteValue | RouteRecord;
}

export const ROUTES = {
    AUTH: {
        SIGN_IN: '/sign-in',
        SIGN_UP: '/sign-up',
    },
    HELP: {
        FAQ: '/faq',
    },
    HISTORY: {
        ROOT: '/history',
        SESSION: (id: string) => `/history/${id}` as Route,
    },
    HOME: '/',
    LEADERS: '/leaders',
    NOTIFICATIONS: '/notifications',
    PRACTICE: {
        BEHAVIORAL: '/practice/behavioral',
        DESIGN: '/practice/system-design',
        LANGUAGE: '/practice/language',
        LIVE: '/practice/coding',
        PANEL: '/practice/panel',
        ROOT: '/practice',
        SOLO: '/practice/solo',
    },
    PROFILE: {
        ROOT: '/profile',
        SETTINGS: '/profile/settings',
    },
    ROOM: {
        COMPLETE: (id: string) => `/room/${id}/complete` as Route,
        CREATE: '/room/create',
        JOIN: (id: string) => `/room/${id}/join` as Route,
        ROOT: '/room',
        SESSION: (id: string) => `/room/${id}` as Route,
        SUMMARY: (id: string) => `/room/${id}/summary` as Route,
    },
    STATS: '/stats',
} as const satisfies RouteRecord;

interface NavItem {
    path: ((params: string) => Route) | Route;
    label: ((params: string) => string) | string;
    description: string;
    icon?: PhosphorIconName;
    menu?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        description: 'Обзорная панель с ключевыми метриками и активностями',
        icon: 'HouseIcon',
        label: 'Главная',
        menu: true,
        path: ROUTES.HOME,
    },
    {
        description: 'Аналитика данных в разрезе графиков и диаграмм',
        icon: 'ChartPieSliceIcon',
        label: 'Статистика',
        menu: true,
        path: ROUTES.STATS,
    },
    {
        description: 'Центр управления проектами и задачами',
        icon: 'GridFourIcon',
        label: 'Практика',
        menu: true,
        path: ROUTES.PRACTICE.ROOT,
    },
    {
        description: 'Личные данные, настройки и предпочтения',
        icon: 'UserIcon',
        label: 'Профиль',
        menu: true,
        path: ROUTES.PROFILE.ROOT,
    },
    {
        description: 'Журнал всех действий и событий за последнее время',
        icon: 'ClockCounterClockwiseIcon',
        label: 'История',
        menu: true,
        path: ROUTES.HISTORY.ROOT,
    },
    {
        description: 'Страница авторизации пользователя',
        icon: 'SignIn',
        label: 'Вход',
        path: ROUTES.AUTH.SIGN_IN,
    },
    {
        description: 'Страница создания нового аккаунта',
        icon: 'UserPlus',
        label: 'Регистрация',
        path: ROUTES.AUTH.SIGN_UP,
    },
    {
        description: 'Ответы на популярные вопросы пользователей',
        icon: 'Info',
        label: 'Частые вопросы',
        path: ROUTES.HELP.FAQ,
    },
    {
        description: 'Тренировка поведенческих вопросов на собеседованиях',
        icon: 'Student',
        label: 'Поведенческое интервью',
        path: ROUTES.PRACTICE.BEHAVIORAL,
    },
    {
        description: 'Тренировка вопросов по дизайну систем',
        icon: 'AppWindow',
        label: 'Дизайн-интервью',
        path: ROUTES.PRACTICE.DESIGN,
    },
    {
        description: 'Тренировка языковых навыков для собеседований',
        icon: 'GlobeHemisphereEast',
        label: 'Языковое интервью',
        path: ROUTES.PRACTICE.LANGUAGE,
    },
    {
        description: 'Симуляция живого собеседования с обратной связью',
        icon: 'IdentificationCard',
        label: 'Живое интервью',
        path: ROUTES.PRACTICE.LIVE,
    },
    {
        description: 'Тренировка с несколькими интервьюерами',
        icon: 'UserSound',
        label: 'Панельное интервью',
        path: ROUTES.PRACTICE.PANEL,
    },
    {
        description: 'Самостоятельная тренировка интервью',
        icon: 'ChalkboardTeacher',
        label: 'Сольное интервью',
        path: ROUTES.PRACTICE.SOLO,
    },
    {
        description: 'Управление настройками аккаунта',
        icon: 'Gear',
        label: 'Настройки профиля',
        path: ROUTES.PROFILE.SETTINGS,
    },
    {
        description: 'Список доступных комнат для тренировок',
        icon: 'ChalkboardSimple',
        label: 'Комнаты',
        path: ROUTES.ROOM.ROOT,
    },
    {
        description: 'Создание новой комнаты для тренировки',
        icon: 'UserCirclePlus',
        label: 'Создание комнаты',
        path: ROUTES.ROOM.CREATE,
    },
    {
        description: 'Присоединение к существующей комнате',
        label: (id: string) => `Присоединение к комнате #${id}`,
        path: (id: string) => ROUTES.ROOM.JOIN(id),
    },
    {
        description: 'Центр уведомлений и оповещений',
        icon: 'Bell',
        label: 'Уведомления',
        path: ROUTES.NOTIFICATIONS,
    },
    {
        description: 'Рейтинг и достижения пользователей',
        icon: 'Crown',
        label: 'Лидеры',
        path: ROUTES.LEADERS,
    },
];

export const MENU: {
    path: Route | ((params: string) => Route);
    label: string | ((params: string) => string);
    icon: PhosphorIconName;
}[] = NAV_ITEMS.filter(
    (item): item is NavItem & { icon: PhosphorIconName } =>
        Boolean(item.menu) && Boolean(item.icon),
).map(({ path, label, icon }) => ({ icon, label, path }));

export const BREADCRUMBS: {
    path: Route | ((id: string) => Route);
    label: string | ((id: string) => string);
    description: string;
}[] = NAV_ITEMS.map(({ path, label, description }) => ({ description, label, path }));

export const getRouteUrl = (
    route: Route | ((...args: unknown[]) => Route),
    ...args: unknown[]
): Route => {
    if (typeof route === 'function') {
        return route(...args) as Route;
    }
    return route;
};

export const isDynamicRoute = (route: Route | RouteFunction): route is RouteFunction =>
    typeof route === 'function';
