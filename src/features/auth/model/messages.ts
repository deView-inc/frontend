import { isApiError } from '~&/shared/api';

const CODE_MESSAGES: Record<string, string> = {
    CODE_ALREADY_SENT: 'Код уже отправлен. Проверьте почту или запросите новый позже.',
    INVALID_CODE: 'Неверный код. Проверьте письмо и попробуйте снова.',
    REGISTRATION_EXPIRED: 'Срок регистрации истёк. Запросите код заново.',
};

export function hasAuthErrorCode(error: unknown, code: string) {
    return isApiError(error) && (error.code === code || error.message === code);
}

export function getAuthErrorMessage(error: unknown, fallback: string) {
    if (!isApiError(error)) {
        return fallback;
    }

    if (error.code && CODE_MESSAGES[error.code]) {
        return CODE_MESSAGES[error.code];
    }

    if (CODE_MESSAGES[error.message]) {
        return CODE_MESSAGES[error.message];
    }

    if (error.status === 409) {
        return 'Пользователь с таким email уже зарегистрирован';
    }

    if (error.status === 410) {
        return CODE_MESSAGES.REGISTRATION_EXPIRED;
    }

    if (error.status === 401) {
        return 'Аккаунт с таким email не найден';
    }

    if (error.status === 429) {
        return 'Слишком много попыток. Подождите немного.';
    }

    return error.message || fallback;
}

export function getResendCooldown(result?: { nextResendAt?: string; retryAfterSeconds?: number }) {
    if (typeof result?.retryAfterSeconds === 'number' && result.retryAfterSeconds >= 0) {
        return result.retryAfterSeconds;
    }

    if (result?.nextResendAt) {
        const nextAt = Date.parse(result.nextResendAt);

        if (!Number.isNaN(nextAt)) {
            return Math.max(0, Math.ceil((nextAt - Date.now()) / 1000));
        }
    }

    return 60;
}

export function isResendLimitReached(retries?: number) {
    return typeof retries === 'number' && retries >= 5;
}

export function providerLabel(provider: string) {
    if (provider === 'google') {
        return 'Google';
    }

    if (provider === 'github') {
        return 'GitHub';
    }

    return provider;
}
