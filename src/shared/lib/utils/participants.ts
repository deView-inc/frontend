export function getInitials(name: string): string {
    const base = name.split('@')[0];
    const parts = base.split(/[\s._-]+/).filter(Boolean);
    const letters = parts.length > 1 ? parts[0][0] + parts[1][0] : base.slice(0, 2);
    return (letters || '?').toUpperCase();
}

const rules = new Intl.PluralRules('ru');

export function pluralParticipants(n: number): string {
    switch (rules.select(n)) {
        case 'one':
            return `${n} участник`;
        case 'few':
            return `${n} участника`;
        default:
            return `${n} участников`;
    }
}

const AVATAR_COLORS = [
    'bg-red-700',
    'bg-yellow-600',
    'bg-emerald-700',
    'bg-sky-700',
    'bg-violet-700',
    'bg-pink-700',
];

export function getAvatarColor(identity: string): string {
    let hash = 0;
    for (const ch of identity) {
        hash = (hash * 31 + ch.charCodeAt(0)) | 0;
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
