import { PencilSimpleLineIcon } from '@phosphor-icons/react';
import { getUserInitials } from '~&/shared/lib/session';
import { Badge, Button, Card } from '~&/shared/ui';

import { profileMock } from '../lib/profile-mock';

export function ProfileIdentityCard() {
    const { identity, stats } = profileMock;

    return (
        <Card className="flex flex-col gap-4 rounded-sm p-5 sm:flex-row sm:items-center sm:p-7">
            <div className="bg-primary text-primary-foreground grid size-[72px] shrink-0 place-items-center rounded-sm text-xl font-extrabold">
                {getUserInitials(identity.name)}
            </div>

            <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold">{identity.name}</h2>

                <p className="text-muted-foreground mt-1 text-sm">
                    @{identity.username} · {identity.direction} / {identity.primaryTechnology}
                </p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                    <span
                        aria-hidden
                        className="bg-primary h-[23px] w-[106px] rounded-sm"
                    />

                    <Badge
                        className="h-[23px] rounded-sm px-2.5 text-[11px]"
                        variant="secondary"
                    >
                        {identity.level} уровень
                    </Badge>

                    <Badge
                        className="h-[23px] rounded-sm px-2.5 text-[11px]"
                        variant="secondary"
                    >
                        {identity.stack.join(' · ')}
                    </Badge>
                </div>
            </div>

            <Button
                className="w-full gap-1.5 rounded-sm sm:w-auto"
                size="sm"
                type="button"
                variant="outline"
            >
                <PencilSimpleLineIcon />
                Редактировать
            </Button>
        </Card>
    );
}
