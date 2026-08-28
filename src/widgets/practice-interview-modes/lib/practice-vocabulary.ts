export interface VocabularyTerm {
    id: string;
    label: string;
}

export const language_vocabulary: VocabularyTerm[] = [
    { id: '1', label: 'query plan' },
    { id: '2', label: 'composite index' },
    { id: '3', label: 'read replica' },
    { id: '4', label: 'N+1 problem' },
    { id: '5', label: 'bottleneck' },
];
