import Link from 'next/link';
import { cn } from '~&/shared/lib/utils';
import { Icon, buttonVariants } from '~&/shared/ui';

export function CreateSessionButton() {
    return (
        <Link
            className={cn(buttonVariants({ className: 'overflow-hidden', size: 'lg' }))}
            href="/room/create"
        >
            <Icon name="PlusIcon" />
            <span className="block group-data-[collapsible=icon]:hidden">Создать сессию</span>
        </Link>
    );
}
