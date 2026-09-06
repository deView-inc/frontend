import { ROUTES } from '~&/shared/config';

export type SignMode = 'sign-in' | 'sign-up';

export const SIGN_STATS = [
    { label: 'интервью проведено.', value: '12К+' },
    { label: 'средняя оценка', value: '4.9/5' },
] as const;

export const SIGN_COPY = {
    'sign-in': {
        footerAction: 'Зарегистрироваться',
        footerHref: ROUTES.AUTH.SIGN_UP,
        footerPrompt: 'Нет аккаунта?',
        subtitle: 'Без пароля — только email и код подтверждения',
        title: 'С возвращением',
    },
    'sign-up': {
        footerAction: 'Войти',
        footerHref: ROUTES.AUTH.SIGN_IN,
        footerPrompt: 'Уже есть аккаунт?',
        subtitle: 'Без пароля — только email и код подтверждения',
        title: 'Создать аккаунт',
    },
} as const;
