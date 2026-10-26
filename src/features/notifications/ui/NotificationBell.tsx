import Link from 'next/link';
import { cn } from '~&/shared/lib/utils';
import { Badge, Icon, buttonVariants } from '~&/shared/ui';

import { useNotifications } from '../model/useNotifications';

export function NotificationBell() {
    const { count } = useNotifications();

    return (
        <Link
            className={cn(
                buttonVariants({ className: 'relative', size: 'icon', variant: 'outline' }),
            )}
            href="/notifications"
        >
            <Icon
                name="Bell"
                className="size-3.5"
            />
            <Badge
                variant="destructive"
                className="absolute -top-2.5 -right-2.5 h-5 min-w-5 rounded-full px-1 tabular-nums"
            >
                {count}
            </Badge>
        </Link>
    );
}
