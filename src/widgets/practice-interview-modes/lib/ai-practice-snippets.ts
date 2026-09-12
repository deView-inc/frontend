import type { CodeSnippet, CodeToken, CodeTokenVariant } from '~&/shared/ui/code-window';

function token(text: string, variant: CodeTokenVariant = 'default'): CodeToken {
    return { text, variant };
}

function snippet(lines: CodeToken[][]): CodeSnippet {
    return { lines: lines.map((tokens, index) => ({ number: index + 1, tokens })) };
}

const description = 'Проверьте правильность вложенности скобок (), [] и {}.';
const javascriptBody = [
    [token('  const ', 'keyword'), token('stack = [];')],
    [token('  // TODO: обработайте скобки с помощью стека.', 'comment')],
    [token('  // Проверьте соответствие пар и пустой стек.', 'comment')],
    [
        token('  throw ', 'keyword'),
        token('new ', 'keyword'),
        token('Error', 'type'),
        token('('),
        token("'Допишите решение'", 'string'),
        token(');'),
    ],
    [token('}')],
];

export const aiPracticeSnippets = {
    javascript: {
        fileName: 'practice.js',
        snippet: snippet([
            [token('// Valid Parentheses', 'comment')],
            [token(`// ${description}`, 'comment')],
            [token('function ', 'keyword'), token('isValid', 'function'), token('(s) {')],
            ...javascriptBody,
        ]),
    },
    typescript: {
        fileName: 'practice.ts',
        snippet: snippet([
            [token('// Valid Parentheses', 'comment')],
            [token(`// ${description}`, 'comment')],
            [
                token('function ', 'keyword'),
                token('isValid', 'function'),
                token('(s: '),
                token('string', 'type'),
                token('): '),
                token('boolean', 'type'),
                token(' {'),
            ],
            [
                token('  const ', 'keyword'),
                token('stack: '),
                token('string', 'type'),
                token('[] = [];'),
            ],
            ...javascriptBody.slice(1),
        ]),
    },
    python: {
        fileName: 'practice.py',
        snippet: snippet([
            [token('# Valid Parentheses', 'comment')],
            [token(`# ${description}`, 'comment')],
            [
                token('def ', 'keyword'),
                token('is_valid', 'function'),
                token('(s: '),
                token('str', 'type'),
                token(') -> '),
                token('bool', 'type'),
                token(':'),
            ],
            [
                token('    stack: '),
                token('list', 'type'),
                token('['),
                token('str', 'type'),
                token('] = []'),
            ],
            [token('    # TODO: обработайте скобки с помощью стека.', 'comment')],
            [token('    # Проверьте соответствие пар и пустой стек.', 'comment')],
            [
                token('    raise ', 'keyword'),
                token('NotImplementedError', 'type'),
                token('('),
                token('"Допишите решение"', 'string'),
                token(')'),
            ],
        ]),
    },
    go: {
        fileName: 'practice.go',
        snippet: snippet([
            [token('package ', 'keyword'), token('practice')],
            [token('// Valid Parentheses', 'comment')],
            [token(`// ${description}`, 'comment')],
            [
                token('func ', 'keyword'),
                token('isValid', 'function'),
                token('(s '),
                token('string', 'type'),
                token(') '),
                token('bool', 'type'),
                token(' {'),
            ],
            [token('\t// TODO: обработайте скобки с помощью стека []rune.', 'comment')],
            [token('\t// Проверьте соответствие пар и пустой стек.', 'comment')],
            [
                token('\t'),
                token('panic', 'function'),
                token('('),
                token('"Допишите решение"', 'string'),
                token(')'),
            ],
            [token('}')],
        ]),
    },
} satisfies Record<string, { fileName: string; snippet: CodeSnippet }>;

export function getAiPracticeSnippet(language: string) {
    switch (language) {
        case 'typescript':
            return aiPracticeSnippets.typescript;
        case 'python':
            return aiPracticeSnippets.python;
        case 'go':
            return aiPracticeSnippets.go;
        default:
            return aiPracticeSnippets.javascript;
    }
}
