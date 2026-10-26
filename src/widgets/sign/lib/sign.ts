import type { UserGrade } from '~&/features/auth';
import { ROUTES } from '~&/shared/config';

export type SignMode = 'sign-in' | 'sign-up';

export const AUTH_BUTTON_CLASS = 'h-[46px] w-full gap-2';
export const AUTH_OTP_LENGTH = 6;

export const SIGN_STATS = [
    { label: 'интервью проведено', value: '12К+' },
    { label: 'средняя оценка', value: '4.9/5' },
] as const;

export const SIGN_UP_STEPS = [
    { id: 1, label: 'email' },
    { id: 2, label: 'профиль' },
    { id: 3, label: 'код' },
] as const;

export type SignUpStep = (typeof SIGN_UP_STEPS)[number]['id'];

export const SIGN_UP_LEVELS = [
    { experience: 'стажировка', id: 'trainee', title: 'Trainee' },
    { experience: '0–1 год', id: 'junior', title: 'Junior' },
    { experience: '1–2 года', id: 'junior+', title: 'Junior+' },
    { experience: '2–4 года', id: 'middle', title: 'Middle' },
    { experience: '4–6 лет', id: 'middle+', title: 'Middle+' },
    { experience: '6+ лет', id: 'senior', title: 'Senior' },
] as const satisfies readonly { experience: string; id: UserGrade; title: string }[];

export type SignUpLevelId = (typeof SIGN_UP_LEVELS)[number]['id'];

export const SIGN_UP_LANGUAGES = [
    { id: 'js', label: 'JavaScript' },
    { id: 'ts', label: 'TypeScript' },
    { id: 'python', label: 'Python' },
    { id: 'go', label: 'Go' },
    { id: 'java', label: 'Java' },
    { id: 'rust', label: 'Rust' },
    { id: 'cpp', label: 'C++' },
    { id: 'kotlin', label: 'Kotlin' },
    { id: 'php', label: 'PHP' },
    { id: 'swift', label: 'Swift' },
] as const;

export type SignUpLanguageId = (typeof SIGN_UP_LANGUAGES)[number]['id'];

export const SIGN_UP_MAX_LANGUAGES = 3;

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
