'use client';

import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ConnectedAccounts, oauthConnectedMessage, useSession } from '~&/features/auth';
import { ROUTES } from '~&/shared/config';
import { getUserInitials } from '~&/shared/lib/session';
import { Description } from '~&/shared/ui/description';
import { Spinner } from '~&/shared/ui/spinner';
import { Title } from '~&/shared/ui/title';

export function ProfileOverview() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { status, user } = useSession();
    const [notice, setNotice] = useState<string | null>(null);

    useEffect(() => {
        const success = searchParams?.get('success');
        const provider = searchParams?.get('provider');
        const message = searchParams?.get('message');

        if (success === 'true') {
            setNotice(oauthConnectedMessage(provider ?? null));
            router.replace(ROUTES.PROFILE.ROOT as Route);
            return;
        }

        if (success === 'false') {
            setNotice(message || 'Не удалось подключить аккаунт');
            router.replace(ROUTES.PROFILE.ROOT as Route);
        }
    }, [router, searchParams]);

    if (status === 'loading') {
        return (
            <div className="text-muted-foreground flex items-center gap-2">
                <Spinner />
                Загрузка профиля
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-0 flex-1 flex-col gap-2">
                <Title>Профиль</Title>
                <Description>Данные профиля появятся после входа</Description>
            </div>
        );
    }

    const displayName = user.firstName || user.email;

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-6">
            <header className="flex flex-col gap-1.5">
                <Title className="font-[family-name:var(--font-inter)] text-[22px] font-extrabold md:text-[26px]">
                    {displayName}
                </Title>
                <Description>{user.email}</Description>
            </header>

            {notice && (
                <p className="border-border bg-card rounded-2xl border px-4 py-3 text-sm">
                    {notice}
                </p>
            )}

            <div className="border-border bg-card grid gap-5 rounded-2xl border p-6 md:grid-cols-3">
                <ProfileFact
                    label="Инициалы"
                    value={getUserInitials(displayName)}
                />
                <ProfileFact
                    label="Уровень"
                    value={user.grade || '—'}
                />
                <ProfileFact
                    label="Стек"
                    value={user.stack.length > 0 ? user.stack.join(', ') : '—'}
                />
            </div>

            <ConnectedAccounts />
        </div>
    );
}

function ProfileFact({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-xs text-[#9A9A9A]">{label}</p>
            <p className="text-foreground text-base font-semibold">{value}</p>
        </div>
    );
}
