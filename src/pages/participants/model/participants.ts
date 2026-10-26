export type ParticipantRole = 'Frontend' | 'Backend';
export type ParticipantLevel = 'Junior' | 'Middle' | 'Senior';

export interface Participant {
    id: string;
    name: string;
    initials: string;
    role: ParticipantRole;
    level: ParticipantLevel;
    online: boolean;
    stack: string[];
    description: string;
    rating: string;
    sessions: number;
    avatarClassName: string;
}

export const STACK_FILTERS = ['JavaScript', 'TypeScript', 'React', 'Python', 'Go', 'Java', 'C++'];
export const LEVEL_FILTERS: readonly ParticipantLevel[] = ['Junior', 'Middle', 'Senior'];
export const ROLE_FILTERS: readonly ParticipantRole[] = ['Frontend', 'Backend'];

// Local fixtures until the participant API is available.
export const PARTICIPANTS: Participant[] = [
    {
        id: 'mark',
        name: 'Марк Гринёв',
        initials: 'МГ',
        role: 'Frontend',
        level: 'Middle',
        online: true,
        stack: ['JavaScript', 'React', 'Node'],
        description: 'Готовлю к System Design и алгоритмам. Ищу спарринг 2–3 раза в неделю.',
        rating: '8.6',
        sessions: 34,
        avatarClassName: 'bg-[#33204d] text-[#b995f5]',
    },
    {
        id: 'anna',
        name: 'Аня Кот',
        initials: 'АК',
        role: 'Backend',
        level: 'Junior',
        online: true,
        stack: ['Python', 'Django'],
        description: 'Первые собесы, хочу побороть страх и прокачать SQL.',
        rating: '7.9',
        sessions: 12,
        avatarClassName: 'bg-[#183e30] text-[#8ef6be]',
    },
    {
        id: 'dmitry',
        name: 'Дмитрий Со',
        initials: 'ДС',
        role: 'Backend',
        level: 'Senior',
        online: false,
        stack: ['Go', 'Kubernetes'],
        description: 'Провожу мок-интервью по распределённым системам и Go.',
        rating: '9.2',
        sessions: 78,
        avatarClassName: 'bg-[#4a381c] text-[#f5cc84]',
    },
    {
        id: 'lena',
        name: 'Лена Ро',
        initials: 'ЛР',
        role: 'Backend',
        level: 'Middle',
        online: true,
        stack: ['Java', 'Spring'],
        description: 'Алгоритмы и ООП-дизайн. Могу и собеседовать, и решать.',
        rating: '8.1',
        sessions: 41,
        avatarClassName: 'bg-[#1c3e4a] text-[#84d5f5]',
    },
    {
        id: 'kim',
        name: 'Ким Ли',
        initials: 'КЛ',
        role: 'Frontend',
        level: 'Senior',
        online: true,
        stack: ['TypeScript', 'React', 'GraphQL'],
        description: 'Фронтенд-архитектура, перф и доступность.',
        rating: '9.0',
        sessions: 63,
        avatarClassName: 'bg-[#4a1c3c] text-[#f584c7]',
    },
    {
        id: 'oleg',
        name: 'Олег Пи',
        initials: 'ОП',
        role: 'Backend',
        level: 'Middle',
        online: false,
        stack: ['C++', 'Algorithms'],
        description: 'ACM-стиль: динамика, графы, жадные алгоритмы.',
        rating: '8.4',
        sessions: 29,
        avatarClassName: 'bg-[#2f4a1c] text-[#b3f584]',
    },
];

export const MY_CARD: Participant = {
    id: 'alex',
    name: 'Алекс Ким',
    initials: 'АЛ',
    role: 'Frontend',
    level: 'Middle',
    online: true,
    stack: ['JavaScript', 'TypeScript', 'React'],
    description: 'Ищу партнёра для подготовки к техническим интервью.',
    rating: '8.5',
    sessions: 45,
    avatarClassName: 'bg-[#1c4a22] text-[#8ef69c]',
};
