const colors = [
    '#b9f24c',
    '#a78bfa',
    '#82aaff',
    '#ff9d76',
    '#5eead4',
    '#f472b6',
    '#facc15',
    '#38bdf8',
    '#fb7185',
    '#e2e8f0',
] as const;

export function getEditorUserColor(userId: string): string {
    let hash = 2166136261;

    for (let index = 0; index < userId.length; index++) {
        hash = Math.imul(hash ^ userId.charCodeAt(index), 16777619) >>> 0;
    }

    return colors[hash % colors.length];
}
