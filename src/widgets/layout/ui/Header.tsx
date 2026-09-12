'use client';

import { useParams, usePathname } from 'next/navigation';
import { GlobalSearch } from '~&/features/global-search';
import { NotificationBell } from '~&/features/notifications';
import { getBreadcrumb } from '~&/shared/config';

function readRouteParam(params: ReturnType<typeof useParams>) {
    const value = params?.roomId ?? params?.id;
    return typeof value === 'string' ? value : '';
}

export function Header() {
    const pathname = usePathname() ?? '';
    const param = readRouteParam(useParams());
    const routeMeta = getBreadcrumb(pathname, param);

    const label =
        typeof routeMeta?.label === 'function' ? routeMeta.label(param) : routeMeta?.label;

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
