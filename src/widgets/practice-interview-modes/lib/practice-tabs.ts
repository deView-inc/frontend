import type { PracticeInterviewTabsOption } from '../ui/parts/PracticeInterviewTabsGroup';

export interface PracticeInterviewTabsConfig {
    id: string;
    title: string;
    description?: string;
    options: readonly PracticeInterviewTabsOption[];
    defaultValue: string;
    className?: string;
}

export const aiSoloTabs: readonly PracticeInterviewTabsConfig[] = [
    {
        defaultValue: 'javascript',
        id: 'language',
        options: [
            { label: 'JavaScript', value: 'javascript' },
            { label: 'TypeScript', value: 'typescript' },
            { label: 'Python', value: 'python' },
            { label: 'Go', value: 'go' },
        ],
        title: 'Язык программирования',
    },
    {
        defaultValue: 'middle',
        id: 'level',
        options: [
            { label: 'Junior', value: 'junior' },
            { label: 'Middle', value: 'middle' },
            { label: 'Senior', value: 'senior' },
        ],
        title: 'Уровень сложности',
    },
    {
        className: 'md:col-span-2',
        defaultValue: 'friendly',
        description:
            'Влияет на тон вопросов и на то, насколько быстро AI подсказывает при затруднении.',
        id: 'style',
        options: [
            { label: 'Дружелюбный', value: 'friendly' },
            { label: 'Строгий FAANG-стиль', value: 'strict' },
            { label: 'Разбор без давления', value: 'calm' },
        ],
        title: 'Стиль AI-интервьюера',
    },
];

export const languageRoomTabs: PracticeInterviewTabsConfig = {
    defaultValue: 'englishB2',
    id: 'languageLevel',
    options: [
        { label: 'English · B2', value: 'englishB2' },
        { label: 'English · C1', value: 'englishC1' },
        { label: 'Deutsch · B1', value: 'deutschB1' },
        { label: 'Español · B1', value: 'españolB1' },
    ],
    title: 'Целевой язык и уровень',
};

export const behavioralRoomTabs: PracticeInterviewTabsConfig = {
    defaultValue: 'leadership',
    id: 'Behavioral',
    options: [
        { label: 'Лидерство', value: 'leadership' },
        { label: 'Разрешение конфликтов', value: 'conflictResolution' },
        { label: 'Ownership', value: 'ownership' },
        { label: 'Коммуникация', value: 'communication' },
        { label: 'Работа с неудачей', value: 'dealingFailure' },
    ],
    title: 'Фокус компетенций на сессию',
};
