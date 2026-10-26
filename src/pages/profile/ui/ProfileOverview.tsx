'use client';

import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { oauthConnectedMessage, useSession } from '~&/features/auth';
import { ROUTES } from '~&/shared/config';
import { Description } from '~&/shared/ui/description';
import { Spinner } from '~&/shared/ui/spinner';
import { Title } from '~&/shared/ui/title';

import { ProfileAchievements } from './ProfileAchievements';
import { ProfileIdentityCard } from './ProfileIdentityCard';
import { ProfileLanguageChart } from './ProfileLanguageChart';
import { ProfileRecentSessions } from './ProfileRecentSessions';
import { ProfileRecommendations } from './ProfileRecommendations';
import { ProfileScoreTrend } from './ProfileScoreTrend';
import { ProfileSkillsChart } from './ProfileSkillsChart';
import { ProfileStats } from './ProfileStats';
import { ProfileWeeklySessions } from './ProfileWeeklySessions';

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

    return (
        <div className="flex min-h-0 w-full max-w-[1440px] flex-1 flex-col gap-5">
            {notice && (
                <p className="border-border bg-card rounded-sm border px-4 py-3 text-sm">
                    {notice}
                </p>
            )}

            <ProfileIdentityCard />
            <ProfileStats />
            <div className="grid items-stretch gap-3.5 lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)]">
                <ProfileSkillsChart />
                <ProfileRecommendations />
            </div>
            <div className="grid items-stretch gap-3.5 xl:grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,1fr))]">
                <ProfileScoreTrend />
                <ProfileLanguageChart />
                <ProfileWeeklySessions />
            </div>
            <div className="grid items-stretch gap-3.5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <ProfileRecentSessions />
                <ProfileAchievements />
            </div>
        </div>
    );
}
