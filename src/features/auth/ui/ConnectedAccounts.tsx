'use client';

import { GithubLogoIcon, GoogleLogoIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import { Button, Spinner } from '~&/shared/ui';

import {
    connectOAuthProvider,
    disconnectOAuthProvider,
    getConnectedProviders,
    getOAuthProviders,
} from '../api/endpoints';
import { getAuthErrorMessage, providerLabel } from '../model/messages';
import type { OAuthProviderId, OAuthProviderOption } from '../model/types';

export function ConnectedAccounts() {
    const [available, setAvailable] = useState<OAuthProviderOption[]>([]);
    const [connected, setConnected] = useState<OAuthProviderId[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [pendingProvider, setPendingProvider] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [providers, linked] = await Promise.all([
                getOAuthProviders().catch(() => []),
                getConnectedProviders(),
            ]);
            setAvailable(providers);
            setConnected(linked);
        } catch (loadError) {
            setError(getAuthErrorMessage(loadError, 'Не удалось загрузить подключённые аккаунты'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const handleConnect = async (provider: OAuthProviderId) => {
        setPendingProvider(provider);
        setError(null);

        try {
            const url = await connectOAuthProvider(provider);
            window.location.href = url;
        } catch (connectError) {
            setError(getAuthErrorMessage(connectError, 'Не удалось начать привязку'));
            setPendingProvider(null);
        }
    };

    const handleDisconnect = async (provider: OAuthProviderId) => {
        setPendingProvider(provider);
        setError(null);

        try {
            await disconnectOAuthProvider(provider);
            setConnected((current) => current.filter((item) => item !== provider));
        } catch (disconnectError) {
            setError(getAuthErrorMessage(disconnectError, 'Не удалось отвязать аккаунт'));
        } finally {
            setPendingProvider(null);
        }
    };

    const extra = connected
        .filter((id) => !available.some((item) => item.value === id))
        .map((id) => ({ label: providerLabel(id), value: id }));
    const providers = [...available, ...extra];

    return (
        <section className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-6">
            <div>
                <h2 className="text-foreground text-lg font-semibold">Подключённые аккаунты</h2>
                <p className="mt-1 text-sm text-[#9A9A9A]">
                    Привяжите Google или GitHub к текущему профилю
                </p>
            </div>

            {isLoading ? (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Spinner />
                    Загрузка
                </div>
            ) : providers.length === 0 ? (
                <p className="text-sm text-[#9A9A9A]">Нет настроенных провайдеров</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {providers.map((provider) => {
                        const isConnected = connected.includes(provider.value);
                        const isPending = pendingProvider === provider.value;

                        return (
                            <div
                                className="border-border flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
                                key={provider.value}
                            >
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    {provider.value === 'github' ? (
                                        <GithubLogoIcon size={18} />
                                    ) : (
                                        <GoogleLogoIcon size={18} />
                                    )}
                                    {provider.label}
                                </div>
                                {isConnected ? (
                                    <Button
                                        disabled={Boolean(pendingProvider)}
                                        onClick={() => void handleDisconnect(provider.value)}
                                        size="sm"
                                        type="button"
                                        variant="destructive"
                                    >
                                        {isPending ? <Spinner /> : 'Отвязать'}
                                    </Button>
                                ) : (
                                    <Button
                                        disabled={Boolean(pendingProvider)}
                                        onClick={() => void handleConnect(provider.value)}
                                        size="sm"
                                        type="button"
                                        variant="secondary"
                                    >
                                        {isPending ? <Spinner /> : 'Подключить'}
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {error && <p className="text-destructive text-sm">{error}</p>}
        </section>
    );
}

export function oauthConnectedMessage(provider: string | null) {
    if (!provider) {
        return 'Аккаунт подключён';
    }

    return `${providerLabel(provider)} подключён`;
}
