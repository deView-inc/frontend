import { API_URL } from '~&/shared/config';
import { getAccessToken, setAccessToken } from '~&/shared/lib/session';

import { parseApiError } from './errors';

interface RequestOptions extends Omit<RequestInit, 'body'> {
    auth?: boolean;
    body?: unknown;
    skipRefresh?: boolean;
}

const REFRESH_PATH = '/v1/auth/refresh';

let refreshPromise: Promise<string | null> | null = null;

function resolveUrl(path: string) {
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

async function parseJson<T>(response: Response): Promise<T> {
    const payload = await response.text();

    if (!payload) {
        return undefined as T;
    }

    return JSON.parse(payload) as T;
}

export async function refreshAccessToken(): Promise<string | null> {
    if (refreshPromise) {
        return refreshPromise;
    }

    const tokenBefore = getAccessToken();

    refreshPromise = (async () => {
        const response = await fetch(resolveUrl(REFRESH_PATH), {
            credentials: 'include',
            method: 'POST',
        });

        if (!response.ok) {
            if (getAccessToken() === tokenBefore) {
                setAccessToken(null);
            }

            return getAccessToken();
        }

        const data = await parseJson<{ access?: string; token?: string }>(response);
        const token = data?.token ?? data?.access;

        if (!token) {
            if (getAccessToken() === tokenBefore) {
                setAccessToken(null);
            }

            return getAccessToken();
        }

        setAccessToken(token);
        return token;
    })().finally(() => {
        refreshPromise = null;
    });

    return refreshPromise;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { auth = false, body, headers, skipRefresh = false, ...rest } = options;

    const send = async () => {
        const requestHeaders = new Headers(headers);
        const token = getAccessToken();

        if (body !== undefined && !requestHeaders.has('Content-Type')) {
            requestHeaders.set('Content-Type', 'application/json');
        }

        if (auth && token) {
            requestHeaders.set('Authorization', `Bearer ${token}`);
        }

        return fetch(resolveUrl(path), {
            ...rest,
            body: body === undefined ? undefined : JSON.stringify(body),
            credentials: 'include',
            headers: requestHeaders,
        });
    };

    let response = await send();

    if (response.status === 401 && auth && !skipRefresh) {
        const nextToken = await refreshAccessToken();

        if (nextToken) {
            response = await send();
        }
    }

    if (!response.ok) {
        throw await parseApiError(response);
    }

    return parseJson<T>(response);
}

export function resolveBackendUrl(path: string) {
    return resolveUrl(path);
}
