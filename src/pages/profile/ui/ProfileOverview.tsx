'use client';

import { useEffect, useState } from 'react';
import { type UserSession, getUserInitials, getUserSession } from '~&/shared/lib/session';
import { Description } from '~&/shared/ui/description';
import { Title } from '~&/shared/ui/title';

export function ProfileOverview() {
    const [user, setUser] = useState<UserSession | null>(null);

    useEffect(() => {
        setUser(getUserSession());
    }, []);

    if (!user) {
        return (
            <div className="flex min-h-0 flex-1 flex-col gap-2">
                <Title>Профиль</Title>
                <Description>Данные профиля появятся после регистрации</Description>
            </div>
        );
    }

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-6">
            <header className="flex flex-col gap-1.5">
                <Title className="font-[family-name:var(--font-inter)] text-[22px] font-extrabold md:text-[26px]">
                    {user.name}
                </Title>
                <Description>{user.email}</Description>
            </header>

            <div className="border-border bg-card grid gap-5 rounded-2xl border p-6 md:grid-cols-3">
                <ProfileFact
                    label="Инициалы"
                    value={getUserInitials(user.name)}
                />
                <ProfileFact
                    label="Уровень"
                    value={user.level}
                />
                <ProfileFact
                    label="Языки"
                    value={user.languages.join(', ')}
                />
            </div>
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
