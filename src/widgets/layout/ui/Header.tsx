'use client';

import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { GlobalSearch } from '~&/features/global-search';
import { NotificationBell } from '~&/features/notifications';
import { BREADCRUMBS } from '~&/shared/config';

export function Header() {
    const pathname = usePathname();
    const params = useParams<{ id: string }>();

    const routeMeta = BREADCRUMBS.find((bread) => bread.path === pathname);

    // TODO: will review at feature, now is temporary
    const label =
        typeof routeMeta?.label === 'function'
            ? routeMeta.label(params?.id ?? '')
            : routeMeta?.label;

    return (
        <header className="bg-background z-10 flex h-auto shrink-0 items-center justify-between border-b px-8 py-3.5 transition-[width,height]">
            <div className="flex flex-col">
                <h1 className="text-lg leading-tight font-bold">
                    {label ?? 'Неизвестная страница'}
                </h1>
                <p className="text-muted-foreground text-xs leading-tight">
                    {routeMeta?.description}
                </p>
            </div>
            <div className="flex gap-4">
                <GlobalSearch />
                <NotificationBell />
            </div>
        </header>
    );
}
