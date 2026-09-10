'use client';

import { GithubLogoIcon, GoogleLogoIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { cn } from '~&/shared/lib/utils';
import { Button } from '~&/shared/ui';

import { getOAuthProviders, getOAuthStartUrl } from '../api/endpoints';
import type { OAuthProviderOption } from '../model/types';

interface Props {
    action?: 'continue' | 'sign-in';
    className?: string;
}

function ProviderIcon({ provider }: { provider: string }) {
    if (provider === 'github') {
        return <GithubLogoIcon size={18} />;
    }

    return <GoogleLogoIcon size={18} />;
}

export function OAuthButtons({ action = 'sign-in', className }: Props) {
    const [providers, setProviders] = useState<OAuthProviderOption[]>([]);

    useEffect(() => {
        let cancelled = false;

        getOAuthProviders()
            .then((items) => {
                if (!cancelled) {
                    setProviders(items);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setProviders([]);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    if (providers.length === 0) {
        return null;
    }

    const prefix = action === 'continue' ? 'Продолжить через' : 'Войти через';

    return (
        <div className={cn('flex flex-col gap-1.5', className)}>
            {providers.map((provider) => (
                <Button
                    className="h-[46px] w-full gap-2"
                    key={provider.value}
                    onClick={() => {
                        window.location.href = getOAuthStartUrl(provider.value);
                    }}
                    type="button"
                    variant="secondary"
                >
                    <ProviderIcon provider={provider.value} />
                    {prefix} {provider.label}
                </Button>
            ))}
        </div>
    );
}
