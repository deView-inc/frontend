'use client';

import { usePathname } from 'next/navigation';

export function usePathSegment(index: number) {
    const pathname = usePathname() ?? '';
    const segment = pathname.split('/').filter(Boolean)[index];
    return segment ? decodeURIComponent(segment) : undefined;
}

export function useRoomSlug() {
    return usePathSegment(1);
}

export function useRoomId() {
    return useRoomSlug()?.split('-').pop();
}
