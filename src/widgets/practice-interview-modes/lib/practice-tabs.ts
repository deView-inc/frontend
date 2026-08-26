import type { PracticeInterviewTabsOption } from '~&/widgets/practice-interview-modes/ui/parts/PracticeInterviewTabsGroup';

export interface PracticeInterviewTabsConfig {
    id: 'language' | 'level' | 'style';
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
