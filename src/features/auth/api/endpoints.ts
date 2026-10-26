import { apiRequest, resolveBackendUrl } from '~&/shared/api';
import { API_URL } from '~&/shared/config';

import type {
    AuthMessageResponse,
    AuthResendContext,
    AuthTokenResponse,
    AuthUser,
    OAuthConnectResponse,
    OAuthExchangeResponse,
    OAuthProviderId,
    OAuthProviderOption,
    ResendCodeResponse,
    SignUpPayload,
} from '../model/types';

function asRecord(value: unknown): Record<string, unknown> | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return null;
    }

    return value as Record<string, unknown>;
}

function unwrapUser(payload: unknown): Record<string, unknown> {
    const root = asRecord(payload);

    if (!root) {
        return {};
    }

    const nested = asRecord(root.data) ?? asRecord(root.user) ?? asRecord(root.profile);

    return nested ?? root;
}

export function normalizeUser(payload: unknown): AuthUser {
    const source = unwrapUser(payload);
    const { stack } = source;

    return {
        email: typeof source.email === 'string' ? source.email : '',
        firstName:
            (typeof source.firstName === 'string' && source.firstName) ||
            (typeof source.displayName === 'string' && source.displayName) ||
            (typeof source.name === 'string' && source.name) ||
            '',
        grade: typeof source.grade === 'string' ? source.grade : undefined,
        id: typeof source.id === 'string' ? source.id : undefined,
        stack: Array.isArray(stack) ? stack.map(String) : [],
    };
}

function normalizeProviders(payload: unknown): OAuthProviderOption[] {
    const root = asRecord(payload);
    const list = Array.isArray(payload)
        ? payload
        : Array.isArray(root?.providers)
          ? root.providers
          : Array.isArray(root?.data)
            ? root.data
            : [];

    return list.flatMap((item) => {
        if (typeof item === 'string') {
            return [{ label: item, value: item }];
        }

        const record = asRecord(item);

        if (!record) {
            return [];
        }

        const value = record.value ?? record.provider ?? record.id;
        const label = record.label ?? record.name ?? value;

        if (typeof value !== 'string' || !value) {
            return [];
        }

        return [
            {
                label: typeof label === 'string' ? label : value,
                value,
            },
        ];
    });
}

function normalizeConnectedProviders(payload: unknown): OAuthProviderId[] {
    return normalizeProviders(payload).map((item) => item.value);
}

export function getOAuthStartUrl(provider: OAuthProviderId) {
    return `${API_URL}/v1/oauth/${provider}`;
}

export async function signUp(payload: SignUpPayload) {
    return apiRequest<AuthMessageResponse>('/v1/auth/sign-up', {
        body: payload,
        method: 'POST',
    });
}

export async function confirmSignUp(email: string, code: string) {
    return apiRequest<AuthTokenResponse>('/v1/auth/sign-up/confirm', {
        body: { code, email },
        method: 'POST',
    });
}

export async function signIn(email: string) {
    return apiRequest<AuthMessageResponse>('/v1/auth/sign-in', {
        body: { email },
        method: 'POST',
    });
}

export async function confirmSignIn(email: string, code: string) {
    return apiRequest<AuthTokenResponse>('/v1/auth/sign-in/confirm', {
        body: { code, email },
        method: 'POST',
    });
}

export async function resendCode(email: string, context: AuthResendContext) {
    return apiRequest<ResendCodeResponse>('/v1/auth/resend', {
        body: { context, email },
        method: 'POST',
    });
}

export async function signOutRequest() {
    return apiRequest<AuthMessageResponse>('/v1/auth/sign-out', {
        auth: true,
        method: 'POST',
    });
}

export async function getCurrentUser() {
    const payload = await apiRequest<unknown>('/v1/users/me', { auth: true });
    return normalizeUser(payload);
}

export async function getOAuthProviders() {
    const payload = await apiRequest<unknown>('/v1/oauth/providers');
    return normalizeProviders(payload);
}

export async function exchangeOAuthToken(token: string, provider: string) {
    return apiRequest<OAuthExchangeResponse>('/v1/oauth/exchange', {
        body: { provider, token },
        method: 'POST',
    });
}

export async function getConnectedProviders() {
    const payload = await apiRequest<unknown>('/v1/oauth/providers/connected', { auth: true });
    return normalizeConnectedProviders(payload);
}

export async function connectOAuthProvider(provider: OAuthProviderId) {
    const response = await apiRequest<OAuthConnectResponse>(`/v1/oauth/${provider}/connect`, {
        auth: true,
        method: 'POST',
    });

    return resolveBackendUrl(response.url);
}

export async function disconnectOAuthProvider(provider: OAuthProviderId) {
    return apiRequest<AuthMessageResponse>(`/v1/oauth/${provider}/disconnect`, {
        auth: true,
        method: 'DELETE',
    });
}
