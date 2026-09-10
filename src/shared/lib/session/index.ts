export const AUTH_COOKIE_NAME = '0auth';

let accessToken: string | null = null;

type AccessTokenListener = (token: string | null) => void;

const listeners = new Set<AccessTokenListener>();

export function getAccessToken() {
    return accessToken;
}

export function setAccessToken(token: string | null) {
    if (accessToken === token) {
        return;
    }

    accessToken = token;
    listeners.forEach((listener) => listener(token));
}

export function subscribeAccessToken(listener: AccessTokenListener) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

export function setAuthCookie() {
    document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; SameSite=Lax`;
}

export function clearAuthCookie() {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
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
