export interface ChatMessage {
    id: string;
    role: 'ai' | 'user';
    text: string;
}

export type InterviewStyle = 'friendly' | 'strict' | 'calm';
export type InterviewCompetency =
    | 'leadership'
    | 'conflictResolution'
    | 'ownership'
    | 'communication'
    | 'dealingFailure';

export type FakeReplySource =
    | { mode: 'solo'; style: InterviewStyle }
    | { mode: 'behavioral'; competency: InterviewCompetency };

export const mockSoloMessages: ChatMessage[] = [
    {
        id: '1',
        role: 'ai',
        text: 'Начнём с валидации скобок. Прежде чем писать код — как думаете подступиться к задаче?',
    },
    {
        id: '2',
        role: 'user',
        text: 'Хочу использовать стек — открывающие скобки кладу внутрь, закрывающие сверяю с верхом стека.',
    },
    {
        id: '3',
        role: 'ai',
        text: 'Хорошее направление. А что делать, если стек окажется пустым в момент, когда встретилась закрывающая скобка?',
    },
    { id: '4', role: 'user', text: 'Тогда сразу возвращаем false — несоответствие.' },
    {
        id: '5',
        role: 'ai',
        text: 'Именно. Допишите это условие и переходите к финальной проверке пустого стека после цикла.',
    },
];

const FAKE_AI_REPLIES_BY_STYLE: Record<InterviewStyle, string[]> = {
    calm: [
        'Хороший ход мыслей, не торопитесь. Расскажите, что будете делать дальше.',
        'Всё в порядке, идём шаг за шагом. Как думаете проверить граничные случаи?',
        'Возьмите паузу если нужно. Когда будете готовы — обсудим сложность решения.',
    ],
    friendly: [
        'Логично. А как бы вы протестировали этот код на граничных случаях?',
        'Хорошо, продолжайте — что дальше по плану?',
        'Принято. Давайте оценим сложность вашего решения по времени и памяти.',
    ],
    strict: [
        'Какая асимптотика у вашего решения — и по времени, и по памяти? Обоснуйте.',
        'Это не покрывает граничный случай с пустой строкой. Как поправите?',
        'Достаточно поверхностно. Что если входные данные — миллион символов, выдержит ли ваш подход?',
    ],
};

export const mockBehavioralMessages: ChatMessage[] = [
    {
        id: '1',
        role: 'ai',
        text: 'Расскажите о случае, когда вам пришлось повести за собой команду в условиях неопределённости.',
    },
    {
        id: '2',
        role: 'user',
        text: 'На прошлом проекте мы теряли дедлайн из-за ухода тимлида, и я взял на себя координацию релиза.',
    },
    {
        id: '3',
        role: 'ai',
        text: 'Хорошее начало Situation. А что конкретно вы сделали в первые 48 часов — какие решения приняли лично вы?',
    },
    {
        id: '4',
        role: 'user',
        text: 'Перераспределил задачи, договорился с продактом о сокращении скоупа на 20%.',
    },
    {
        id: '5',
        role: 'ai',
        text: 'Отлично, это Action. Каким был измеримый результат — уложились в срок, что изменилось после?',
    },
];

const FAKE_AI_REPLIES_BY_COMPETENCY: Record<InterviewCompetency, string[]> = {
    communication: [
        'Как вы адаптировали формулировку под разные аудитории — например, для нетехнической команды?',
        'Была ли обратная связь от собеседника, что сообщение было воспринято верно?',
        'Что бы вы сделали, если бы вас неправильно поняли?',
    ],
    conflictResolution: [
        'Расскажите, в чём именно заключались разногласия сторон?',
        'Как вы добились компромисса — что предложили каждой стороне?',
        'Удалось ли сохранить отношения с этим человеком после конфликта?',
    ],
    dealingFailure: [
        'Что именно пошло не так, и когда вы это заметили?',
        'Какой вывод вы сделали из этой ошибки и как применили его позже?',
        'Как вы сообщили о неудаче команде или руководителю?',
    ],
    leadership: [
        'Хорошо. Как команда отреагировала на ваше решение — были возражения?',
        'Понятно. Что бы вы сделали иначе, если бы столкнулись с этим снова?',
        'Это Situation и Action. А какой был измеримый Result?',
    ],
    ownership: [
        'Кто ещё был вовлечён в задачу, и почему ответственность взяли на себя именно вы?',
        'Что случилось бы, если бы вы не вмешались?',
        'Как вы отслеживали прогресс до завершения задачи?',
    ],
};

function pickRandom<T>(items: readonly T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

export function getInitialMessages(source: FakeReplySource): ChatMessage[] {
    switch (source.mode) {
        case 'solo':
            return mockSoloMessages;
        case 'behavioral':
            return mockBehavioralMessages;
    }
}

export function getFakeReply(source: FakeReplySource): string {
    switch (source.mode) {
        case 'solo':
            return pickRandom(FAKE_AI_REPLIES_BY_STYLE[source.style]);
        case 'behavioral':
            return pickRandom(FAKE_AI_REPLIES_BY_COMPETENCY[source.competency]);
    }
}
