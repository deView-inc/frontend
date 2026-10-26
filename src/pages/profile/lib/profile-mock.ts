export const profileMock = {
    identity: {
        direction: 'Frontend',
        level: 'Senior',
        name: 'Артём Ковалёв',
        primaryTechnology: 'TypeScript',
        stack: ['JS', 'TS', 'Go'],
        username: 'artem_dev',
    },

    stats: {
        averageScore: 4.8,
        interviewsCount: 34,
        languagesCount: 6,
        totalHours: 12,
    },

    skills: [
        {
            label: 'Алгоритмы',
            value: 9,
        },
        {
            label: 'Код',
            value: 8,
        },
        {
            label: 'Архитектура',
            value: 4,
        },
        {
            label: 'Коммуникация',
            value: 7,
        },
        {
            label: 'Скорость',
            value: 6,
        },
    ],

    recommendations: [
        {
            description:
                'В среднем на 6 минут дольше выходите к рабочему решению, чем на схожих задачах уровня Middle.',
            kind: 'speed',
            title: 'Скорость — самое слабое место',
            tone: 'neutral',
        },
        {
            description:
                'Попробуйте 2-3 сессии по системному дизайну — сейчас это самая низкая оценка в профиле.',
            kind: 'architecture',
            title: 'Архитектура требует практики',
            tone: 'neutral',
        },
        {
            description:
                'Стабильно 9+ на задачах с хеш-таблицами и графами. Можно пробовать Senior-уровень.',
            kind: 'algorithms',
            title: 'Алгоритмы — сильная сторона',
            tone: 'success',
        },
    ],

    scoreTrend: [
        {
            label: 'Фев',
            value: 3.5,
        },
        {
            label: 'Мар',
            value: 3.8,
        },
        {
            label: 'Апр',
            value: 3.7,
        },
        {
            label: 'Май',
            value: 4.2,
        },
        {
            label: 'Июн',
            value: 4,
        },
        {
            label: 'Июл',
            value: 4.5,
        },
        {
            label: 'Авг',
            value: 4.8,
        },
    ],

    languageDistribution: [
        {
            label: 'JavaScript',
            value: 37,
        },
        {
            label: 'TypeScript',
            value: 22,
        },
        {
            label: 'Go',
            value: 15,
        },
        {
            label: 'Другие',
            value: 26,
        },
    ],

    weeklySessions: [1, 2, 2, 3, 2, 4, 3, 5],

    recentSessions: [
        {
            durationMinutes: 42,
            id: 'two-sum',
            language: 'JavaScript',
            partner: 'Марина Л.',
            partnerInitials: 'МЛ',
            relativeDate: 'вчера',
            score: 9.1,
            task: 'Two Sum',
        },
        {
            durationMinutes: 55,
            id: 'balanced-tree',
            language: 'Go',
            partner: 'Данил С.',
            partnerInitials: 'ДС',
            relativeDate: '3 дня назад',
            score: 8.4,
            task: 'Балансировка дерева',
        },
        {
            durationMinutes: 60,
            id: 'system-design-queue',
            language: 'TypeScript',
            partner: 'Елена В.',
            partnerInitials: 'ЕВ',
            relativeDate: 'неделю назад',
            score: 9.6,
            task: 'Системный дизайн: очередь',
        },
        {
            durationMinutes: 38,
            id: 'lru-cache',
            language: 'Python',
            partner: 'Роман К.',
            partnerInitials: 'РК',
            relativeDate: '2 недели назад',
            score: 7.9,
            task: 'LRU Cache',
        },
    ],

    achievements: [
        {
            kind: 'first-interview',
            label: 'Первое интервью',
        },
        {
            kind: 'seven-day-streak',
            label: 'Стрик 7 дней',
        },
        {
            kind: 'thirty-interviews',
            label: '30 интервью',
        },
        {
            kind: 'polyglot',
            label: 'Полиглот × 5',
        },
        {
            kind: 'high-score',
            label: 'Оценка 9+',
        },
        {
            kind: 'mentor',
            label: 'Ментор месяца',
        },
    ],
} as const;
