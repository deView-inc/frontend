import type { CodeSnippet } from '~&/shared/ui/code-window';

export const mergeIntervalsJsSnippet: CodeSnippet = {
    lines: [
        {
            number: 1,
            tokens: [
                { text: 'function', variant: 'keyword' },
                { text: ' ' },
                { text: 'merge', variant: 'function' },
                { text: '(intervals) {' },
            ],
        },
        {
            number: 2,
            tokens: [
                { text: '  intervals.' },
                { text: 'sort', variant: 'function' },
                { text: '((a,b)=>a[0]-b[0]);' },
            ],
        },
        {
            number: 3,
            tokens: [{ text: '  ' }, { text: 'const', variant: 'keyword' }, { text: ' res = [];' }],
        },
        {
            number: 4,
            tokens: [
                {
                    text: '  // ...',
                    variant: 'comment',
                },
            ],
        },
        {
            number: 5,
            tokens: [{ text: '}' }],
        },
    ],
};

export const mergeIntervalsPythonSnippet: CodeSnippet = {
    lines: [
        {
            number: 1,
            tokens: [
                { text: 'def', variant: 'keyword' },
                { text: ' ' },
                { text: 'merge', variant: 'function' },
                { text: '(intervals):' },
            ],
        },
        {
            number: 2,
            tokens: [
                { text: '  intervals.' },
                { text: 'sort', variant: 'function' },
                { text: '()' },
            ],
        },
        {
            number: 3,
            tokens: [{ text: '  res = []' }],
        },
        {
            number: 4,
            tokens: [
                {
                    text: '  # ...',
                    variant: 'comment',
                },
            ],
        },
    ],
};
