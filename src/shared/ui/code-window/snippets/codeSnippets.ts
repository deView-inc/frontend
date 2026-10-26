export type CodeTokenVariant =
    | 'default'
    | 'keyword'
    | 'function'
    | 'type'
    | 'number'
    | 'string'
    | 'comment';

export interface CodeToken {
    text: string;
    variant?: CodeTokenVariant;
}

export interface CodeLine {
    number: number;
    tokens: CodeToken[];
    cursor?: boolean;
}

export interface CodeSnippet {
    lines: CodeLine[];
    hint?: { text: string };
}

export const CODE_TOKEN_STYLES: Record<CodeTokenVariant, string> = {
    comment: 'text-[#5a636d]',
    default: '',
    function: 'text-primary',
    keyword: 'text-ring',
    number: 'text-destructive',
    string: 'text-[#7dd3fc]',
    type: 'text-foreground-light',
};

export const twoSumSnippet: CodeSnippet = {
    hint: { text: 'Подсказка ИИ · видят все' },
    lines: [
        {
            number: 1,
            tokens: [
                { text: 'function', variant: 'keyword' },
                { text: ' ' },
                { text: 'twoSum', variant: 'function' },
                { text: '(nums, target) {' },
            ],
        },
        {
            number: 2,
            tokens: [
                { text: '    ' },
                { text: 'const', variant: 'keyword' },
                { text: ' seen = ' },
                { text: 'new', variant: 'keyword' },
                { text: ' ' },
                { text: 'Map', variant: 'type' },
                { text: '();' },
            ],
        },
        {
            number: 3,
            tokens: [
                { text: '    ' },
                { text: 'for', variant: 'keyword' },
                { text: ' (' },
                { text: 'let', variant: 'keyword' },
                { text: ' i = ' },
                { text: '0', variant: 'number' },
                { text: '; i < nums.length; i++) {' },
            ],
        },
        {
            cursor: true,
            number: 4,
            tokens: [
                { text: '      ' },
                { text: 'const', variant: 'keyword' },
                { text: ' need = target - nums[i];' },
            ],
        },
        {
            number: 5,
            tokens: [
                { text: '      ' },
                { text: '// [Марк] тут проверь seen.has(need)', variant: 'comment' },
            ],
        },
    ],
};

export const validParenthesesSnippet: CodeSnippet = {
    lines: [
        { number: 1, tokens: [{ text: '// Valid Parentheses', variant: 'comment' }] },
        {
            number: 2,
            tokens: [
                { text: 'function', variant: 'keyword' },
                { text: ' ' },
                { text: 'isValid', variant: 'function' },
                { text: '(s) {' },
            ],
        },
        {
            number: 3,
            tokens: [
                { text: '  ' },
                { text: 'const', variant: 'keyword' },
                { text: ' stack = [];' },
            ],
        },
        {
            number: 4,
            tokens: [
                { text: '  ' },
                { text: 'const', variant: 'keyword' },
                { text: ' pairs = { ' },
                { text: "')'", variant: 'string' },
                { text: ': ' },
                { text: "'('", variant: 'string' },
                { text: ', ' },
                { text: "']'", variant: 'string' },
                { text: ': ' },
                { text: "'['", variant: 'string' },
                { text: ' };' },
            ],
        },
        {
            number: 5,
            tokens: [
                { text: '  ' },
                { text: 'for', variant: 'keyword' },
                { text: ' (' },
                { text: 'const', variant: 'keyword' },
                { text: ' ch of s) {' },
            ],
        },
        { number: 6, tokens: [{ text: '    ' }, { text: '// ...', variant: 'comment' }] },
        { number: 7, tokens: [{ text: '  }' }] },
        { number: 8, tokens: [{ text: '}' }] },
    ],
};
