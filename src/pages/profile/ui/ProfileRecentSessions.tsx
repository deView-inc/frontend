import Link from 'next/link';
import { ROUTES } from '~&/shared/config';
import { Card } from '~&/shared/ui';
import { Avatar, AvatarFallback } from '~&/shared/ui/avatar';

import { profileMock } from '../lib/profile-mock';

export function ProfileRecentSessions() {
    const { recentSessions } = profileMock;

    return (
        <Card className="h-full gap-4 rounded-sm p-5">
            <header className="flex items-center justify-between gap-4">
                <h2 className="text-[13px] font-bold">Последние сессии</h2>

                <Link
                    className="text-muted-foreground hover:text-foreground text-[11px]"
                    href={ROUTES.HISTORY.ROOT}
                >
                    Вся история →
                </Link>
            </header>

            <div>
                {recentSessions.map((session, index) => {
                    const isLast = index === recentSessions.length - 1;

                    return (
                        <article
                            key={session.id}
                            className={
                                isLast
                                    ? 'flex items-center gap-3.5 py-3'
                                    : 'flex items-center gap-3.5 border-b py-3'
                            }
                        >
                            <Avatar className="size-[34px] rounded-sm">
                                <AvatarFallback className="text-primary rounded-sm text-xs font-bold">
                                    {session.partnerInitials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-[13.5px] font-semibold">
                                    {session.task} — с {session.partner}
                                </h3>

                                <p className="text-muted-foreground mt-1 truncate text-xs">
                                    {session.language} · {session.durationMinutes} мин ·{' '}
                                    {session.relativeDate}
                                </p>
                            </div>

                            <span
                                aria-label={`Оценка ${session.score}`}
                                className="bg-primary h-5 w-9 shrink-0 rounded-sm"
                                title={`Оценка ${session.score}`}
                            />
                        </article>
                    );
                })}
            </div>
        </Card>
    );
}
