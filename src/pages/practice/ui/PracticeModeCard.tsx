import {
    ArrowRightIcon,
    ChatCircleIcon,
    GitBranchIcon,
    GlobeIcon,
    LightningIcon,
    SparkleIcon,
    UsersIcon,
    UsersThreeIcon,
    type Icon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '~&/shared/lib/utils';

export interface PracticeMode {
    icon: Icon;
    title: string;
    description: string;
    tags: string[];
    cta: string;
    href: string;
}

export const practiceModes: PracticeMode[] = [
    {
        icon: UsersIcon,
        title: '1-to-1 Live',
        description:
            'Живое собеседование с реальным партнёром: видео, общий редактор, взаимный фидбэк.',
        tags: ['Видео + код', 'Peer review'],
        cta: 'Найти комнату',
        href: '/practice/one-to-one',
    },
    {
        icon: SparkleIcon,
        title: 'AI Solo',
        description:
            'AI ведёт интервью один на один: вопросы, подсказки и фидбэк — доступно 24/7.',
        tags: ['24/7', 'Адаптивная сложность'],
        cta: 'Практиковаться',
        href: '/practice/solo',
    },
    {
        icon: UsersThreeIcon,
        title: 'Group / Panel',
        description:
            'Панель из нескольких интервьюеров — как настоящий финальный раунд в компании.',
        tags: ['До 4 интервьюеров', 'Консенсус-оценка'],
        cta: 'Войти в панель',
        href: '/practice/panel',
    },
    {
        icon: GitBranchIcon,
        title: 'System Design Room',
        description:
            'Архитектурное собеседование с интерактивной доской и разбором trade-off’ов.',
        tags: ['Доска', 'Оценка ёмкости'],
        cta: 'Открыть доску',
        href: '/practice/system-design',
    },
    {
        icon: ChatCircleIcon,
        title: 'Behavioral Room',
        description: 'Поведенческие вопросы по методу STAR с разбором по компетенциям.',
        tags: ['STAR', 'Компетенции'],
        cta: 'Начать разбор',
        href: '/practice/behavioral',
    },
    {
        icon: GlobeIcon,
        title: 'Language Room',
        description:
            'Отработка технического английского: произношение, грамматика, лексика в реальном времени.',
        tags: ['Live-транскрипт', 'CEFR'],
        cta: 'Практиковать язык',
        href: '/practice/language',
    },
    {
        icon: LightningIcon,
        title: 'Coding Arena',
        description:
            'Соревновательная дуэль 1×1 на скорость и корректность решения — рейтинг ELO.',
        tags: ['ELO-рейтинг', 'Реалтайм'],
        cta: 'В арену',
        href: '/practice/coding',
    },
];

interface PracticeModeCardProps extends PracticeMode, ComponentProps<'article'> {}

export function PracticeModeCard({
    icon,
    title,
    description,
    tags,
    cta,
    href,
    className,
    ...props
}: PracticeModeCardProps) {
    return (
        <article
            className={cn(
                'flex min-h-80 flex-col rounded-sm bg-card p-6 text-card-foreground',
                className,
            )}
            {...props}
        >
            <PracticeModeCardIcon icon={icon} />
            <PracticeModeCardTitle>{title}</PracticeModeCardTitle>
            <PracticeModeCardDescription>{description}</PracticeModeCardDescription>
            <PracticeModeCardTags tags={tags} />
            <PracticeModeCardAction cta={cta} href={href} />
        </article>
    );
}

export function PracticeModeCardIcon({ icon: Icon }: { icon: Icon }) {
    return (
        <div className="mb-5 flex size-15 items-center justify-center rounded-sm bg-secondary text-muted-foreground">
            <Icon size={28} weight="regular" aria-hidden="true" />
        </div>
    );
}

export function PracticeModeCardTitle({ className, ...props }: ComponentProps<'h2'>) {
    return <h2 className={cn('text-xl font-semibold tracking-tight', className)} {...props} />;
}

export function PracticeModeCardDescription({ className, ...props }: ComponentProps<'p'>) {
    return (
        <p className={cn('mt-3 text-base leading-7 text-muted-foreground', className)} {...props} />
    );
}

export function PracticeModeCardTags({ tags }: Pick<PracticeMode, 'tags'>) {
    return (
        <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
                <span
                    key={tag}
                    className="rounded-sm bg-secondary px-3 py-1 text-sm font-medium text-muted-foreground"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}

export function PracticeModeCardAction({
    cta,
    href,
}: Pick<PracticeMode, 'cta' | 'href'>) {
    return (
        <Link
            href={href}
            className="mt-auto pt-6 text-base font-semibold text-primary transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
            {cta} <ArrowRightIcon className="inline-block" weight="bold" aria-hidden="true" />
        </Link>
    );
}
