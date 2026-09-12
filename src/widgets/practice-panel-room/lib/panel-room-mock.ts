export type PanelParticipantType = 'candidate' | 'interviewer';

export type PanelRoundStageStatus = 'completed' | 'active' | 'upcoming' | 'locked';

export type PanelAiNoteTone = 'neutral' | 'success';

export interface PanelParticipant {
    id: string;
    name: string;
    role: string;
    type: PanelParticipantType;
    score: number | null;
    isActive: boolean;
    isCurrentUser: boolean;
}

export interface PanelRoundStage {
    id: string;
    title: string;
    description?: string;
    durationMinutes: number;
    status: PanelRoundStageStatus;
}

export interface PanelAiNote {
    id: string;
    title: string;
    description: string;
    tone: PanelAiNoteTone;
}

interface PanelRoomMock {
    session: {
        position: string;
        roundName: string;
        currentRound: number;
        totalRounds: number;
        remainingTime: string;
        consensusScore: number;
        moderator: string;
        currentStage: number;
        totalStages: number;
        isLive: boolean;
    };
    participants: PanelParticipant[];
    stages: PanelRoundStage[];
    aiNotes: PanelAiNote[];
}

export const panelRoomMock: PanelRoomMock = {
    session: {
        consensusScore: 7.8,
        currentRound: 2,
        currentStage: 2,
        isLive: true,
        moderator: 'AI',
        position: 'Senior Backend',
        remainingTime: '12:40',
        roundName: 'финальный раунд',
        totalRounds: 4,
        totalStages: 4,
    },

    participants: [
        {
            id: 'igor',
            isActive: true,
            isCurrentUser: false,
            name: 'Игорь Н.',
            role: 'Технический лид',
            score: 8.2,
            type: 'interviewer',
        },
        {
            id: 'olga',
            isActive: false,
            isCurrentUser: false,
            name: 'Ольга Т.',
            role: 'HR-партнёр',
            score: 7.9,
            type: 'interviewer',
        },
        {
            id: 'vsevolod',
            isActive: false,
            isCurrentUser: false,
            name: 'Всеволод П.',
            role: 'Архитектор',
            score: null,
            type: 'interviewer',
        },
        {
            id: 'artem',
            isActive: false,
            isCurrentUser: true,
            name: 'Артём Ковалёв',
            role: 'Кандидат',
            score: null,
            type: 'candidate',
        },
    ],

    stages: [
        {
            durationMinutes: 5,
            id: 'warm-up',
            status: 'completed',
            title: 'Знакомство и разогрев',
        },
        {
            description: 'Ведёт Игорь — сейчас идёт этот этап',
            durationMinutes: 15,
            id: 'technical-deep-dive',
            status: 'active',
            title: 'Техническое глубокое погружение',
        },
        {
            description: 'Ведёт Всеволод',
            durationMinutes: 15,
            id: 'system-design',
            status: 'upcoming',
            title: 'Вопрос по системному дизайну',
        },
        {
            description: 'Ведёт Ольга',
            durationMinutes: 10,
            id: 'behavioral',
            status: 'locked',
            title: 'Поведенческий блок и вопросы кандидата',
        },
    ],

    aiNotes: [
        {
            description:
                'Всеволод собирался спросить про идемпотентность — Игорь уже это покрыл. Предложено пропустить.',
            id: 'duplicate-question',
            title: 'Вопрос дублируется',
            tone: 'neutral',
        },
        {
            description: 'Раунд идёт по графику, до поведенческого блока — 25 минут.',
            id: 'timing',
            title: 'Тайминг под контролем',
            tone: 'success',
        },
    ],
};
