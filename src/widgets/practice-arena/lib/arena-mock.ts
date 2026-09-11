import { mergeIntervalsJsSnippet, mergeIntervalsPythonSnippet } from './arena-snippets';

export const arenaMock = {
    task: {
        name: 'Merge Intervals',
        level: 'Middle/Senior',
    },

    match: {
        statusLabel: 'матч в процессе',
        remainingTime: '04:12',
    },

    participants: [
        {
            id: 'current-user',
            initials: 'АК',
            name: 'Артём К.',
            elo: 1450,
            isCurrentUser: true,
            editor: {
                fileName: 'solution.js',
                passedTests: 3,
                totalTests: 4,
                snippet: mergeIntervalsJsSnippet,
            },
        },
        {
            id: 'opponent',
            initials: 'РК',
            name: 'Роман К.',
            elo: 1480,
            isCurrentUser: false,
            editor: {
                fileName: 'solution.py',
                passedTests: 2,
                totalTests: 4,
                snippet: mergeIntervalsPythonSnippet,
            },
        },
    ],

    testCases: [
        {
            id: 'test-1',
            input: 'intervals = [[1,3],[2,6],[8,10]]',
            result: 'pass',
        },
        {
            id: 'test-2',
            input: 'intervals = [[1,4],[4,5]]',
            result: 'pass',
        },
        {
            id: 'test-3',
            input: 'intervals = []',
            result: 'pass',
        },
        {
            id: 'test-4',
            input: 'intervals = 10 000 элементов (перф.)',
            result: 'fail',
            error: 'TLE',
        },
    ],

    leaderboard: [
        {
            id: 'roman',
            rank: 1,
            name: 'Роман К.',
            elo: 1480,
            isCurrentUser: false,
        },
        {
            id: 'elena',
            rank: 2,
            name: 'Елена В.',
            elo: 1465,
            isCurrentUser: false,
        },
        {
            id: 'artem',
            rank: 3,
            name: 'Артём К.',
            elo: 1450,
            isCurrentUser: true,
        },
        {
            id: 'danil',
            rank: 4,
            name: 'Данил С.',
            elo: 1402,
            isCurrentUser: false,
        },
    ],
} as const;
