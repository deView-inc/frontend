'use client';

import { GlobalSearch } from '~&/features/global-search';
import { NotificationBell } from '~&/features/notifications';
import { useRouteMeta } from '~&/shared/lib/hooks';
import { PageHeader } from '~&/shared/ui';

export function Header() {
    const { label, description } = useRouteMeta();

    return (
        <PageHeader
            title={label}
            description={description}
        >
            <div className="flex max-w-full min-w-0 gap-4">
                <GlobalSearch />
                <NotificationBell />
            </div>
        </PageHeader>
    );
}
