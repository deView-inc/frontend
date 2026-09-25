'use client';

import { useParams, usePathname } from 'next/navigation';
import { getBreadcrumb } from '~&/shared/config';

export function useRouteMeta() {
    const pathname = usePathname() ?? '';
    const params = useParams();

    const raw = params?.roomId ?? params?.id;
    const param = typeof raw === 'string' ? raw : '';

    const routeMeta = getBreadcrumb(pathname, param);
    const label =
        typeof routeMeta?.label === 'function' ? routeMeta.label(param) : routeMeta?.label;

    return {
        pathname,
        param,
        routeMeta,
        label: label ?? 'Неизвестная страница',
        description: routeMeta?.description,
    };
}
