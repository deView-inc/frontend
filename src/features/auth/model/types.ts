export const USER_GRADES = ['trainee', 'junior', 'junior+', 'middle', 'middle+', 'senior'] as const;

export type UserGrade = (typeof USER_GRADES)[number];

export type OAuthProviderId = 'github' | 'google' | (string & {});

export type AuthResendContext = 'sign-in' | 'sign-up';

export interface AuthUser {
    email: string;
    firstName: string;
    grade?: string;
    id?: string;
    stack: string[];
}

export interface AuthMessageResponse {
    message?: string;
    success?: boolean;
}

export interface AuthTokenResponse extends AuthMessageResponse {
    token: string;
}

export interface OAuthExchangeResponse extends AuthMessageResponse {
    access: string;
    provider?: string;
}

export interface OAuthProviderOption {
    label: string;
    value: OAuthProviderId;
}

export interface OAuthConnectResponse {
    success?: boolean;
    url: string;
}

export interface ResendCodeResponse extends AuthMessageResponse {
    nextResendAt?: string;
    retries?: number;
    retryAfterSeconds?: number;
}

export interface SignUpPayload {
    email: string;
    firstName: string;
    grade: UserGrade;
    stack: string[];
}
