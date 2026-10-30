'use client';

import { ProhibitIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Button } from '~&/shared/ui/button';

import { Card, InitialsAvatar, plural, SectionHeader } from './shared';

interface BannedUser {
    id: string;
    name: string;
    note: string;
}

// TODO: заменить данными с бэка
const INITIAL: BannedUser[] = [
    {
        id: '1',
        name: 'Сергей Волков',
        note: 'заблокирован в 12:03 · вошёл по ссылке',
    },
];

export function BannedSettings() {
    const [banned, setBanned] = useState(INITIAL);

    // TODO: вызвать эндпоинт разблокировки
    const unban = (id: string) => setBanned((list) => list.filter((u) => u.id !== id));

    const count = banned.length;

    return (
        <>
            <SectionHeader
                icon={
                    <ProhibitIcon
                        size={16}
                        className="text-primary"
                    />
                }
                title="Блокировки"
                meta={`${count} ${plural(count, ['человек', 'человека', 'человек'])}`}
                hint="Заблокированные не войдут по ссылке и не увидят сессию. Снять блокировку можно в любой момент."
            />

            {count === 0 ? (
                <p className="text-foreground-muted px-0.5 text-sm">Заблокированных нет.</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {banned.map((u) => (
                        <Card
                            key={u.id}
                            className="flex items-center gap-2.5"
                        >
                            <InitialsAvatar name={u.name} />
                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <p className="text-foreground truncate text-[13px] font-semibold">
                                    {u.name}
                                </p>
                                <p className="text-muted-foreground truncate text-[10.5px]">
                                    {u.note}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                className="text-xs"
                                onClick={() => unban(u.id)}
                            >
                                Разблокировать
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}
