export class ApiError extends Error {
    readonly status: number;
    readonly code?: string;

    constructor(status: number, message: string, code?: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.code = code;
    }
}

export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}

export async function parseApiError(response: Response): Promise<ApiError> {
    let message = response.statusText || 'Request failed';
    let code: string | undefined;

    try {
        const data: unknown = await response.json();

        if (data && typeof data === 'object') {
            const payload = data as {
                code?: unknown;
                error?: unknown;
                message?: unknown;
            };

            const nestedError =
                payload.error && typeof payload.error === 'object'
                    ? (payload.error as { code?: unknown; message?: unknown })
                    : null;

            if (typeof nestedError?.message === 'string' && nestedError.message) {
                message = nestedError.message;
            } else if (typeof payload.message === 'string' && payload.message) {
                message = payload.message;
            } else if (Array.isArray(payload.message)) {
                message = payload.message.filter(Boolean).join(', ');
            }

            if (typeof nestedError?.code === 'string') {
                code = nestedError.code;
            } else if (typeof payload.code === 'string') {
                code = payload.code;
            } else if (typeof payload.error === 'string') {
                code = payload.error;
            }
        }
    } catch {
        // Keep status text when the body is not JSON.
    }

    return new ApiError(response.status, message, code);
}
