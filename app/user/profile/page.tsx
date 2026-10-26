import type { Route } from 'next';
import { redirect } from 'next/navigation';
import { ROUTES } from '~&/shared/config';

export default async function UserProfileRedirectPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const params = await searchParams;
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (typeof value === 'string') {
            query.set(key, value);
        }
    });

    const suffix = query.size > 0 ? `?${query.toString()}` : '';
    redirect(`${ROUTES.PROFILE.ROOT}${suffix}` as Route);
}
