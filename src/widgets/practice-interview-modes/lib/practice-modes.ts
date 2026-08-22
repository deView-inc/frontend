import {
    ChatCircleIcon,
    GitBranchIcon,
    GlobeIcon,
    type Icon,
    LightningIcon,
    SparkleIcon,
    UsersIcon,
    UsersThreeIcon,
} from '@phosphor-icons/react';
import type { Route } from 'next';

export interface PracticeMode {
    cta: string;
    description: string;
    href: Route;
    icon: Icon;
    tags: string[];
    title: string;
}

export const practiceModes: PracticeMode[] = [
    {
        cta: 'Найти комнату',
        description:
            'Живое собеседование с реальным партнёром: видео, общий редактор, взаимный фидбэк.',
        href: '/practice/one-to-one',
        icon: UsersIcon,
        tags: ['Видео + код', 'Peer review'],
        title: '1-to-1 Live',
    },
    {
        cta: 'Практиковаться',
        description: 'AI ведёт интервью один на один: вопросы, подсказки и фидбэк — доступно 24/7.',
        href: '/practice/solo',
        icon: SparkleIcon,
        tags: ['24/7', 'Адаптивная сложность'],
        title: 'AI Solo',
    },
    {
        cta: 'Войти в панель',
        description:
            'Панель из нескольких интервьюеров — как настоящий финальный раунд в компании.',
        href: '/practice/panel',
        icon: UsersThreeIcon,
        tags: ['До 4 интервьюеров', 'Консенсус-оценка'],
        title: 'Group / Panel',
    },
    {
        cta: 'Открыть доску',
        description: 'Архитектурное собеседование с интерактивной доской и разбором trade-off’ов.',
        href: '/practice/system-design',
        icon: GitBranchIcon,
        tags: ['Доска', 'Оценка ёмкости'],
        title: 'System Design Room',
    },
    {
        cta: 'Начать разбор',
        description: 'Поведенческие вопросы по методу STAR с разбором по компетенциям.',
        href: '/practice/behavioral',
        icon: ChatCircleIcon,
        tags: ['STAR', 'Компетенции'],
        title: 'Behavioral Room',
    },
    {
        cta: 'Практиковать язык',
        description:
            'Отработка технического английского: произношение, грамматика, лексика в реальном времени.',
        href: '/practice/language',
        icon: GlobeIcon,
        tags: ['Live-транскрипт', 'CEFR'],
        title: 'Language Room',
    },
    {
        cta: 'В арену',
        description: 'Соревновательная дуэль 1×1 на скорость и корректность решения — рейтинг ELO.',
        href: '/practice/coding',
        icon: LightningIcon,
        tags: ['ELO-рейтинг', 'Реалтайм'],
        title: 'Coding Arena',
    },
];
