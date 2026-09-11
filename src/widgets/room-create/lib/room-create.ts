export const DEFAULT_ROOM_NAME = 'Собеседование: массивы и хеш-таблицы';

export const PRIMARY_LANGUAGES = [
    { id: 'js', label: 'JS' },
    { id: 'ts', label: 'TS' },
    { id: 'python', label: 'Python' },
    { id: 'go', label: 'Go' },
    { id: 'java', label: 'Java' },
    { id: 'cpp', label: 'C++' },
] as const;

export const EXTRA_LANGUAGES = [
    { id: 'c', label: 'C' },
    { id: 'csharp', label: 'C#' },
    { id: 'kotlin', label: 'Kotlin' },
    { id: 'swift', label: 'Swift' },
    { id: 'rust', label: 'Rust' },
    { id: 'php', label: 'PHP' },
    { id: 'ruby', label: 'Ruby' },
    { id: 'scala', label: 'Scala' },
    { id: 'dart', label: 'Dart' },
    { id: 'sql', label: 'SQL' },
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'r', label: 'R' },
    { id: 'matlab', label: 'MATLAB' },
    { id: 'perl', label: 'Perl' },
    { id: 'haskell', label: 'Haskell' },
    { id: 'elixir', label: 'Elixir' },
    { id: 'clojure', label: 'Clojure' },
    { id: 'lua', label: 'Lua' },
    { id: 'objc', label: 'Objective-C' },
    { id: 'groovy', label: 'Groovy' },
    { id: 'bash', label: 'Bash' },
    { id: 'powershell', label: 'PowerShell' },
    { id: 'assembly', label: 'Assembly' },
    { id: 'fortran', label: 'Fortran' },
    { id: 'vbnet', label: 'VB.NET' },
    { id: 'fsharp', label: 'F#' },
    { id: 'ocaml', label: 'OCaml' },
    { id: 'zig', label: 'Zig' },
    { id: 'nim', label: 'Nim' },
    { id: 'solidity', label: 'Solidity' },
    { id: 'julia', label: 'Julia' },
    { id: 'erlang', label: 'Erlang' },
    { id: 'cobol', label: 'COBOL' },
] as const;

export const LANGUAGES = [...PRIMARY_LANGUAGES, ...EXTRA_LANGUAGES];

export const DIFFICULTIES = [
    { id: 'junior', label: 'Джуниор' },
    { id: 'middle', label: 'Мидл' },
    { id: 'senior', label: 'Синьор' },
    { id: 'system-design', label: 'Системный дизайн' },
] as const;

export type LanguageId = (typeof LANGUAGES)[number]['id'];
export type DifficultyId = (typeof DIFFICULTIES)[number]['id'];

export function isLanguageId(value: string): value is LanguageId {
    return LANGUAGES.some((item) => item.id === value);
}
