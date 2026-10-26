'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    OAuthButtons,
    exchangeOAuthToken,
    getAuthErrorMessage,
    useSession,
} from '~&/features/auth';
import { ROUTES } from '~&/shared/config';
import { Button, Spinner } from '~&/shared/ui';

const exchangedTokens = new Set<string>();

type CallbackStatus = 'error' | 'pending';

export function OAuthCallbackScreen() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { establishSession } = useSession();
    const [status, setStatus] = useState<CallbackStatus>('pending');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const success = searchParams?.get('success');
        const token = searchParams?.get('token') ?? searchParams?.get('exchange_token') ?? null;
        const access = searchParams?.get('access');
        const provider = searchParams?.get('provider');
        const message = searchParams?.get('message');

        if (success === 'false') {
            setError(message || 'Не удалось выполнить вход через OAuth');
            setStatus('error');
            return;
        }

        const exchangeKey = token ?? access;

        if (!provider || !exchangeKey) {
            setError('Некорректный ответ OAuth. Попробуйте войти ещё раз.');
            setStatus('error');
            return;
        }

        if (exchangedTokens.has(exchangeKey)) {
            return;
        }

        exchangedTokens.add(exchangeKey);
        setStatus('pending');

        const exchange = async () => {
            try {
                if (token) {
                    const result = await exchangeOAuthToken(token, provider);
                    await establishSession(result.access);
                } else if (access) {
                    await establishSession(access);
                }

                router.replace(ROUTES.PROFILE.ROOT as Route);
            } catch (exchangeError) {
                exchangedTokens.delete(exchangeKey);
                setError(
                    getAuthErrorMessage(exchangeError, 'Не удалось завершить вход через OAuth'),
                );
                setStatus('error');
            }
        };

        void exchange();
    }, [establishSession, router, searchParams]);

    if (status === 'error') {
        return (
            <div className="border-border bg-card w-full max-w-[420px] rounded-2xl border p-8">
                <h2 className="text-foreground font-[family-name:var(--font-inter)] text-[28px] leading-tight font-extrabold">
                    Не удалось войти
                </h2>
                <p className="mt-1.5 text-sm text-[#9A9A9A]">{error}</p>
                <OAuthButtons
                    action="continue"
                    className="mt-6"
                />
                <Button
                    className="mt-1.5 h-[46px] w-full"
                    render={<Link href={ROUTES.AUTH.SIGN_IN as Route} />}
                    variant="secondary"
                >
                    Войти по email
                </Button>
                <Button
                    className="mt-1.5 h-[46px] w-full"
                    render={<Link href={ROUTES.AUTH.SIGN_UP as Route} />}
                    variant="secondary"
                >
                    Создать аккаунт
                </Button>
            </div>
        );
    }

    return (
        <div className="border-border bg-card flex w-full max-w-[420px] flex-col items-center rounded-2xl border p-8">
            <Spinner className="size-6" />
            <p className="mt-4 text-sm text-[#9A9A9A]">Завершаем авторизацию…</p>
        </div>
    );
}
