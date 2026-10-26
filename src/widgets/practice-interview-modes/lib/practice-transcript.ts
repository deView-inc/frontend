export type TranscriptSegment =
    | { type: 'text'; text: string }
    | { type: 'highlight'; text: string }
    | { type: 'correction'; wrong: string; correct: string };

export interface TranscriptMessage {
    id: string;
    speaker: 'ai' | 'user';
    segments: TranscriptSegment[];
}

export const language_transcript: TranscriptMessage[] = [
    {
        id: '1',
        segments: [
            { text: "Can you walk me through how you'd ", type: 'text' },
            { text: 'optimize', type: 'highlight' },
            { text: ' a slow database query?', type: 'text' },
        ],
        speaker: 'ai',
    },
    {
        id: '2',
        segments: [
            { text: 'First I will ', type: 'text' },
            { correct: 'check', type: 'correction', wrong: 'to check' },
            { text: ' the execution plan, then I add ', type: 'text' },
            { text: 'indexes', type: 'highlight' },
            { text: ' on the ', type: 'text' },
            { correct: 'most frequently used', type: 'correction', wrong: 'most usage' },
            { text: ' columns.', type: 'text' },
        ],
        speaker: 'user',
    },
    {
        id: '3',
        segments: [{ text: 'Good. What trade-offs come with adding an index?', type: 'text' }],
        speaker: 'ai',
    },
    {
        id: '4',
        segments: [
            { text: 'It ', type: 'text' },
            { text: 'speeds up', type: 'highlight' },
            { text: ' reads but slows down writes and uses more disk space.', type: 'text' },
        ],
        speaker: 'user',
    },
];
