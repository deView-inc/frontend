export const AUTH_COOKIE_NAME = '0auth';
export const USER_SESSION_KEY = 'deview-user';

export interface UserSession {
    email: string;
    languages: string[];
    level: string;
    name: string;
}

export function getUserSession(): UserSession | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const raw = localStorage.getItem(USER_SESSION_KEY);

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as UserSession;
    } catch {
        return null;
    }
}

export function saveUserSession(user: UserSession) {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; SameSite=Lax`;
}

export function getUserInitials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
        return 'DV';
    }

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
